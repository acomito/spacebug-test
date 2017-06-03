import { Random } from 'meteor/random';
import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import { Accounts } from 'meteor/accounts-base'
import { check } from 'meteor/check';
import { FriendRequests } from './model';
import { Friends } from '../Friend/model';

import { createError } from 'apollo-errors';
import { isAuthenticatedResolver, isAdminResolver, units, group, tickets, owner, invites } from '../base-resolvers';
import { PRODUCTION_URL } from '/imports/modules/config';

export const FriendRequestSchema = [`

type FriendRequest {
	_id: ID!
	email: String
	phone: String
	accepted: Boolean
	recipientId: ID
	sentById: ID
	dateAccepted: Date
	sentByUser: User
}

input FriendRequestParams {
	_id: ID
	email: String
	phone: String
	accepted: Boolean
	recipientId: ID
	sentById: ID
	dateAccepted: Date
}

type Query {
	getFriendRequestById(targetUserId: ID!): FriendRequest
	getIncomingReqests: [FriendRequest]
}

type Mutation {
	createFriendRequest(targetUserId: ID!): FriendRequest
	acceptFriendRequest(requestId: ID!): FriendRequest
}

`];





export const FriendRequestResolvers = {
	Query: {
		getIncomingReqests: (root, args, context) => {
			let currentUserId = context.user._id;
			let query = { recipientId: currentUserId, accepted: false }
			let friendRequests = FriendRequests.find(query).fetch();
			if (!friendRequests) {
				return []
			}
			return friendRequests
		},
		getFriendRequestById: (root, args, context) => {
			let currentUserId = context.user._id;
			let targetUserId = args.targetUserId
			let query1 = { sentById: targetUserId, recipientId: currentUserId }
			let query2 = { sentById: currentUserId, recipientId: targetUserId }
			let friendRequest = FriendRequests.findOne({ $or: [query1, query2]});
			if (!friendRequest) {
				 console.log('no friend request exists')
				 return null
			}
			return friendRequest
		}
	},
	FriendRequest: {
		sentByUser: ({ sentById }, args, context) => {
			let sentByUser = Meteor.users.findOne({_id: sentById})
			return sentByUser
		}
	},
	Mutation: {
		acceptFriendRequest: (root, args, context) => {
			console.log('it ran')
			let currentUserId = context.user._id;
			let query = { _id: args.requestId, accepted: false  }
			let friendRequest = FriendRequests.findOne(query);
			if (!friendRequest) {
				 console.log('this request does not exist')
				 return null
			}
			let dataToUpdate = { accepted: true };
			FriendRequests.update(query, { $set: dataToUpdate });
			let friendRecord1 = {
				ownerId: friendRequest.sentById,
				friendId: friendRequest.recipientId
			}
			let friendRecord2 = {
				ownerId: friendRequest.recipientId,
				friendId: friendRequest.sentById
			}
			Friends.insert(friendRecord1) // insert a friend record for each user
			Friends.insert(friendRecord2)
			return friendRequest; 
		},
		createFriendRequest: (root, args, context) => {
			let currentUserId = context.user._id;
			let targetUserId = args.targetUserId
			let query1 = { sentById: targetUserId, recipientId: currentUserId }
			let query2 = { sentById: currentUserId, recipientId: targetUserId }
			let friendRequest = FriendRequests.findOne({ $or: [query1, query2]});
			if (friendRequest) {
				 console.log('friend already request exists')
				 return null
			}
			let dataToInsert = {
				sentById: currentUserId, 
				recipientId: targetUserId,
				accepted: false,
				ownerId: currentUserId
			}
			let requestId = FriendRequests.insert(dataToInsert);
			let request = FriendRequests.findOne({ _id: requestId });
			return request;
		}
	}
};
