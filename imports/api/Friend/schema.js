import { Random } from 'meteor/random';
import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import { Accounts } from 'meteor/accounts-base'
import { check } from 'meteor/check';
import { Friends } from './model';
import { createError } from 'apollo-errors';
import { isAuthenticatedResolver, isAdminResolver, units, group, tickets, owner, invites } from '../base-resolvers';
import { PRODUCTION_URL } from '/imports/modules/config';

export const FriendSchema = [`

type Friend {
	_id: ID!
	friendId: String
	friend: User
}

type Query {
	myFriends: [Friend]
}

type Mutation {
	addFriendsOnInviteSignup(inviterId: ID!): [Friend]
}

`];





export const FriendResolvers = {
	Query: {
		myFriends: (root, args, context) => {
			let currentUserId = context.user._id;
			let query = { ownerId: currentUserId }
			let friends = Friends.find(query).fetch();
			if (!friends) {
				return []
			}
			return friends
		},
	},
	Mutation: {
		addFriendsOnInviteSignup(root, { inviterId }, context){
			let currentUserId = context.user._id;
			let friendRecord1 = {
				friendId: inviterId,
				ownerId: currentUserId
			}
			let friendRecord2 = {
				friendId: currentUserId,
				ownerId: inviterId
			}
			console.log(friendRecord1)
			console.log(friendRecord2)
			Friends.insert(friendRecord1)
			Friends.insert(friendRecord2)

		}
	},
	Friend: {
		friend: ({ friendId }, args, context) => {
			let friend = Meteor.users.findOne({_id: friendId});
			if (!friend) {
				return null
			}
			return friend
		}
	}
};
