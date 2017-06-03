import { Random } from 'meteor/random';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Posts } from './model';
import { createError } from 'apollo-errors';

const FooError = createError('FooError', {
  message: 'A foo error has occurred'
});

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
  		}
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



