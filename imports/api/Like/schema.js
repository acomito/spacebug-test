import { Meteor } from 'meteor/meteor';
import { Likes } from './model';
import { Posts } from '../Post/model';
import { createError } from 'apollo-errors';
import { isAuthenticatedResolver, isAdminResolver, units, group, tickets, owner, invites } from '../base-resolvers';

export const LikeSchema = [`

type Like {
    _id: ID!
    postId: ID!
    owner: User
    post: Post
}

input LikeParams {
  	postId: ID!
}
type Query {
    likes(params: LikeParams): [Like],
  }
type Mutation {
    createLike(params: LikeParams): Like,
  }
`];



export const LikeResolvers = {
	Query: {
		likes: (root, args, context) => {
			return Likes.find().fetch()
		}
	},
	Like: {
		owner: ({ userId }, args, context) => {
			return Meteor.users.findOne({_id: userId})
		},
		post: ({ postId }, args, context) => {
			return Posts.findOne({_id: postId})
		},
	},
	Mutation: {
		createLike: (root, args, context) => {
			
		}
	}

};