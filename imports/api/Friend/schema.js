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
