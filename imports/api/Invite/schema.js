import { Random } from 'meteor/random';
import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import { Accounts } from 'meteor/accounts-base'
import { check } from 'meteor/check';
import { Invites } from './model';
import { createError } from 'apollo-errors';
import { isAuthenticatedResolver, isAdminResolver, units, group, tickets, owner, invites } from '../base-resolvers';
import { PRODUCTION_URL } from '/imports/modules/config';

export const InviteSchema = [`
type Invite {
	    _id: ID!
	    accepted: Boolean
	    modelType: String
	    token: String
		userId: ID
		invited: Boolean
		email: String
	    dateInvited: Date
	    dateAdded: Date
	    owner: User
	}
input InviteParams {
  	_id: ID
	accepted: Boolean
	modelType: String
	token: String
	userId: ID
	invited: Boolean
	email: String
}
type Query {
	    inviteById(_id: ID!): Invite,
	    inviteByToken(token: String!): Invite,
	    
    	invites (
    		string: String, 
    		offset: Int,
    		params: InviteParams
    	): [Invite],
	  }
type Mutation {
	# admin adds a building
    sendInviteEmail(params: InviteParams): Invite
    createInvite(params: InviteParams): Invite
    # function for signup page
    # browserToken is the token from URL, sent to be matched with back-end token for verification
    # then users password is set as their password, on success a login function will run on the client after mutation
    acceptInvite(params: InviteParams, password: String, browserToken: String): Invite
  }
`];



const sendInviteEmail = isAuthenticatedResolver.createResolver(
  async (root, { params }, context) => {

  	let user = Meteor.users.findOne({_id: params.userId}); //grab the user/investor who was just added
	let invite = Invites.findOne({ _id: params._id, userId: params.userId }); // gra the user's invite

	if (invite.invited) {
		return invite // if already invited, exit/return from mutation
	}
		let dataToUpdate = {
			accepted: false,
			invited: true,
			dateInvited: new Date()
		}

		const urls = {
		  development: 'http://localhost:3000/signup/',
		  production: `${PRODUCTION_URL}/signup/`
		};

		//send email
		let emailToSend = {
			to: user.emails[0].address,
	      	from: Meteor.settings.public.config.supportEmail,
	      	subject: 'invitation to join this application',
	      	text: `join our app: ${urls[ process.env.NODE_ENV ] + invite.token}`
		}
		Email.send(emailToSend);
		//update record

		let docToUpdate = { _id: invite._id };
		
		Invites.update(docToUpdate, { $set: dataToUpdate });
		return invite;
  	}
);

export const InviteResolvers = {
	Query: {
	    inviteById: (root, args, context) => Invites.findOne({ _id: args._id }),
	    inviteByToken: (root, { token }, context) => {
	    	return Invites.findOne({ token })
	    },
	    invites,
  	},
  	Invite: {
  		owner
  	},
  	Mutation: {
  		createInvite: (root, { params }, context) => {
  			let userExists = Accounts.findUserByEmail(params.email);
  			if (userExists) {
  				//create friend request
  				return console.log('create friend request')
  			}
  			let invite = {
  				email: params.email
  			}
  			return console.log('send invite');
  			
  		},
  		sendInviteEmail,
  		acceptInvite: (root, { params, password, browserToken }, context) => {
  			let invite = Invites.findOne({token: browserToken});
				if (!invite || invite.accepted) { return; }
				let userId = invite.userId;
				let user = Meteor.users.findOne({_id: userId});

				//set new password
				Accounts.setPassword(user._id, password);

				//update invite record
				let docToUpdate = { _id: invite._id };
				Invites.update(docToUpdate, { $set: {accepted: true }, $unset: { token: "" } }, function(error, response){
					if (error) { console.warn(error); return; }
					Meteor.users.update({_id: userId}, { $set: { 'profile.verified': true }});
				});
  		}
  	}
};
