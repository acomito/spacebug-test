import { Email } from 'meteor/email';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Random } from 'meteor/random';
import { appConfig } from '/imports/modules/config';
import { Invites } from './Invite/model';




// ================================================
//	ADD INVITATION TO DB
// ================================================
export const addInvitation = (userId, modelType, ownerId) => {
	check(userId, String);
	check(ownerId, String);

	let user = Meteor.users.findOne({_id: userId}); //grab the user/investor who was just added

	let inviteExists = Invites.findOne({userId});
	if (inviteExists) {
		console.log('invite already exists for this user');
		return;
	}
	//create new invitation record to insert
	let newInvite = {
		email: user.emails[0].address,
		userId: user._id,
		invited: false,
		token: Random.hexString( 15 ),
		dateAdded: new Date(),
		modelType,
		ownerId
	}
	console.log(newInvite)
	Invites.insert(newInvite); //insert new invite
};