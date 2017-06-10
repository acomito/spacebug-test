// TOP LEVEL IMPORTS
import { Random } from 'meteor/random';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { createError } from 'apollo-errors';
// COLLECTIONS
import { Posts } from './model';
import { Likes } from '../Like';
import { Messages } from '../Message';
import { Friends } from '../Friend';


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
    searchText: String
    image: String
    category: String
    categories: [String]
    statuses: [String]
    subcategory: String
    status: String
    price: String
}

type Query {
	    post(_id: ID!): Post,
    	posts(params: PostParams): [Post],
    	postsFeed: [Post],
    	myPosts: [Post],
      allPosts(params: PostParams): [Post],
	  }


type Mutation {
	  # creates a new Post 
	  # title is the Post title
	  # content is the Post content
	  createPost(params: PostParams): Post
	  savePost(_id: ID!, params: PostParams): Post
    deletePost(_id: ID!): Post
	}

`];




const buildPostsSearchQuery = async (root, args, context) => {
  
  return new Promise(
      (resolve, reject) => {
        let query = { ownerId: { $in: args.friendIds } }; //query to make sure you only bring back a friends posts
        // declare the andQueryArray which will be used as the array of queries for an $and mongoDB query
        // we push new queries in the array as needed (e.g. when specific unitIds are passed in args.params.unitIds, we build a query and it into the array)
        let andQueryArray = [query]; 
        console.log(args.friendIds)
        let options = { sort: { createdAt: -1}, limit: 10  } // at some point, when pagination is added, you'll want to add a limit here, e.g. limit: 10,

        // If an offset arguement is passed, add it as an option. 
        // offset is (one potential strategy) used for pagination/infinite loading if it ever gets added.
        // see: https://dev-blog.apollodata.com/pagination-and-infinite-scrolling-in-apollo-client-59ff064aac61
        // see: http://dev.apollodata.com/react/pagination.html
        if (args && args.params && args.params.offset) { options.skip = args.params.offset }
      // IF NO ARGS EXIST, JUST RETURN BASIC QUERY
      // ====================================
      // if no arguments were passed, just return all messages using the above query and options variables
      if (!args) {
        let count = Posts.find(query).count()
        let tickets = Posts.find(query, options).fetch();
        posts.count = count
        return resolve(posts)
      }
      
     

      // declare a unitIds variable. tickets do not have a buildingId, so we have to query the units in a building
      // make an array of unitIds, then concat that with any other _ids coming from the client (which is 'args.params.unitIds' )


      // friendIds
      // ====================================
/*      if (args.friendIds && args.friendIds && args.friendIds.length > 0) {
        let friendsQuery = { ownerIds: { $in: args.friendIds } };
        andQueryArray.push(friendsQuery)
      }*/


      // DATE RANGE QUERY
      // ====================================
      if (args.params && args.params.dateRange && args.params.dateRange.length > 0) {

        let startDate = new Date(args.params.dateRange[0])
        let endDate = new Date(args.params.dateRange[1])

        let dateQuery = { 
          createdAt: { $gte: startDate, $lte: endDate } 
        }

        andQueryArray.push(dateQuery)

      }

      // STATUS QUERY
      // ====================================
      if (args.params && args.params.statuses && args.params.statuses.length > 0) {
        let statusesQuery = { status: { $in: args.params.statuses } }
        andQueryArray.push(statusesQuery)
      }


      // CATEGORY QUERY
      // ====================================
      if (args.params && args.params.categories && args.params.categories.length > 0) {
        let categoriesQuery = { category: { $in: args.params.categories } }
        andQueryArray.push(categoriesQuery)
      }

      // TEXT SEARCH QUERY
      // ====================================
      // If a search string was passed, then add search terms to the andQueryArray
      if (args && args.params && args.params.searchText) {
        let regex = new RegExp( args.params.searchText, 'i' );
        let orSearchQuery = { $or: [ 
          { title: regex }, 
          { description: regex },
        ]};
        andQueryArray.push(orSearchQuery)
      }

      query = { $and: andQueryArray }
      let count = Posts.find(query).count();
      //let tickets = Posts.find(query, options).fetch();
      resolve({ query, options, count });

      }
  )
};


export const PostResolvers = {
	Query: {
	    post: (root, args, context) => {
	    	let query = { _id: args._id };
	    	let options = { sort: { createdAt: -1 }}
	    	return Posts.findOne(query, options)
	    },
      allPosts: async (root, args, context) => {
        return Posts.find().fetch()
      },
	    posts: async (root, args, context) => {
        let friends = Friends.find({ownerId: context.user._id}).fetch();
        let friendIds = friends.map((item) => item.friendId);
        args.friendIds = friendIds
	    	let { query, options, count } = await buildPostsSearchQuery(root, args, context)
    		let posts = Posts.find(query, options).fetch();
        console.log(query)
    		return posts;
	    },
	    postsFeed: (root, args, context) => {
	    	// find all of my friends
	    	let friends = Friends.find({ownerId: context.user._id}).fetch();
	    	let friendIds = friends.map((item) => item.friendId);
	    	let query = { ownerIds: { $in: friendIds } }; //serach for posts by these userIds
	    	let posts = Posts.find().fetch()
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
			let docToInsert = {
				...params,
				ownerId: context.user._id
			}
			let docId = Posts.insert(docToInsert);
			if (docId) {
				return Posts.findOne({_id: docId});
			}
		},
    savePost(root, { _id, params }, context) {
      let dataToUpdate = {
        ...params
      }
      let query = { _id }
      Posts.update(query, { $set: dataToUpdate });
      return Posts.findOne(query);
    },
    deletePost(root, { _id, params }, context) {
      let dataToUpdate = {
        ...params
      }
      let query = { _id }
      let docToUpdate = Posts.findOne(query);
      if (docToUpdate.ownerId === context.user._id) {
        Posts.remove(query);
      }
      return docToUpdate;
    },
	}
};



