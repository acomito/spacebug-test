import { Meteor } from 'meteor/meteor';
import { Messages } from './model';
import { createError } from 'apollo-errors';
import { isAuthenticatedResolver, isAdminResolver, units, group, tickets, owner, invites } from '../base-resolvers';

export const MessageSchema = [`
type Comment {
	    _id: ID!
	    messageValue: String
	    parentId: ID
	    ownerId: ID
	    owner: User
	    parentModelType: String
	    createdAt: Date
	}
type Message {
	    _id: ID!
	    messageValue: String
	    parentId: ID
	    ownerId: ID
	    owner: User
	    createdAt: Date
	    parentModelType: String
	    messages: [Comment]
	}

input MessageParams {
  	_id: ID
  	parentModelType: String,
	parentId: String,
	messageValue: String,
}

type Query {
    messages(params: MessageParams): [Message],
  }
type Mutation {
    createMessage(params: MessageParams): Message,
  }
`];



export const MessageResolvers = {
	Query: {
		messages: (root, args, context) => {
			return Messages.find().fetch()
		}
	},
	Message: {
		owner: ({ ownerId }, args, context) => {
			return Meteor.users.findOne({_id: ownerId})
		},
		messages: ({ _id, parentModelType }, args, context) => {
			return Messages.find({ parentId: _id, parentModelType: 'message' }).fetch()
		},
	},
	Comment: {
		owner: ({ ownerId }, args, context) => {
			return Meteor.users.findOne({_id: ownerId})
		},
	},
	Mutation: {
		createMessage: (root, { params }, context) => {
			let message = {
				parentModelType: params.parentModelType,
				parentId: params.parentId,
				messageValue: params.messageValue,
				ownerId: context.user._id,
				modelType: 'comment'
			}
			Messages.insert(message);
		}
	}

};