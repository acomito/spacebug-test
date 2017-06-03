// TOP LEVEL IMPORTS
import { Random } from 'meteor/random';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { createError } from 'apollo-errors';
// COLLECTIONS
import { Posts } from './model';
import { Likes } from '../Like/model';
import { Messages } from '../Message/model';



export const PostSchema = [`

type Post {
	    _id: ID!
	    title: String
	    description: String
	    image: String
	    category: String
	    subcategory: String
	    status: String
	    price: String
	    createdAt: Date
	    owner: User
	    comments: [Message]
	    numberOfComments: Int
	    numberOfLikes: Int
	}


input PostParams {
    description: String
    title: String
    image: String
    category: String
    subcategory: String
    status: String
    price: String
}

type Query {
	    post(_id: ID!): Post,
    	posts: [Post],
    	postsFeed: [Post],
    	myPosts: [Post],
	  }


type Mutation {
	  # creates a new Post 
	  # title is the Post title
	  # content is the Post content
	  createPost(params: PostParams): Post
	  savePost(_id: ID!, params: PostParams): Post
	}

`];

export const PostResolvers = {
	Query: {
	    post: (root, args, context) => {
	    	let query = { _id: args._id };
	    	let options = { sort: { createdAt: -1 }}
	    	return Posts.findOne(query, options)
	    },
	    posts: () => {
	    	let query = {  };
	    	let options = { sort: { createdAt: -1 }}
	    	return Posts.find(query, options).fetch()
	    },
	    postsFeed: () => {
	    	let query = {  };
	    	let options = { sort: { createdAt: -1 }}
	    	return Posts.find(query, options).fetch()
	    },
	    myPosts: (root, args, context) => {
	    	let query = {  };
	    	let options = { sort: { createdAt: -1 }}
	    	return Posts.find({ ownerId: context.user._id }).fetch();
	    },
  	},
  	Post: {
  		owner: ({ ownerId }, args, context) => {
  			let user = Meteor.users.findOne({_id: ownerId});
  			if (!user) { return null }
  			return user
  		},
  		comments: ({ _id }, args, context) => {
  			let query = { parentId: _id, parentModelType: 'post' }
  			let options = { sort: { createdAt: 1} }
  			let comments = Messages.find(query, options).fetch();
  			if (!comments) { return [] }
  			return comments
  		},
  		numberOfComments: ({ _id }, args, context) => {
  			let query = { parentId: _id, parentModelType: 'post' }
  			let numberOfComments = Messages.find(query).count();
  			if (!numberOfComments) { return 0 }
  			return numberOfComments
  		},
  		numberOfLikes: ({ _id }, args, context) => {
  			let query = { parentId: _id, parentModelType: 'post' }
  			let numberOfLikes = Likes.find(query).count();
  			if (!numberOfLikes) { return 0 }
  			return numberOfLikes
  		},
  		
  	},
	Mutation: {
		createPost(root, { params }, context) {
			if (!context.user) {
				throw new FooError({ data: { authentication: 'you must sign in first' } });
			}
			let docToInsert = {
				...params,
				ownerId: context.user._id
			}
			let docId = Posts.insert(docToInsert);
			if (docId) {
				return Posts.findOne({_id: docId});
			}
		},
	}
};



