import { Random } from 'meteor/random';
import { SchemaMutations, SchemaTypes, userId } from 'meteor-apollo-accounts';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { createError, isInstance } from 'apollo-errors';
import { isAuthenticatedResolver, isAdminResolver } from '../base-resolvers';
import { addInvitation } from '../api-helpers';
import { Posts } from '../Post'

const buildUser = (params) => {
  let userToInsert = {
      emails:[ {address: params.email.toLowerCase(), verified: false }],
      roles: params.roles || [],
      profile: {
/*        firstName: params.firstName || '',
        lastName: params.lastName || '',
        workPhone: params.workPhone || null,
        cellPhone: params.cellPhone || null,
        image: params.image || null,
        groupId: params.groupId || null,
        unitId: params.unitId || null,
        userModelType: params.userModelType || null,*/
        ...params,
        userModelType: params.userModelType || null
      }
    }
    return userToInsert
}

const adminCreateUser = isAdminResolver.createResolver(
  async (root, { params }, { user }) => {
    let userToInsert = buildUser(params) // build user object to insert
    let _id = Meteor.users.insert(userToInsert); // runs sync, returns _id of inserted doc
    addInvitation(_id, userToInsert.userModelType, user._id) // will add an Invite record to Invites collection
    return Meteor.users.findOne({ _id }); // return related user to client mutation
  }
);


const adminDeleteUser = isAdminResolver.createResolver(
  async (root, { _id }, context) => {
    let user = Meteor.users.findOne({_id});
    if (user) {
      Meteor.users.remove({_id});
      Invites.remove({userId: _id})
    }
    return user;
  }
);

const adminSaveUserProfile = isAdminResolver.createResolver(
  async (root, { params }, context) => {
    let dataToUpdate = {
        'emails.0.address': params.email,
        roles: params.roles,
      }
      Meteor.users.update({ _id: params._id }, { $set: dataToUpdate }, (err, res) => {
        if (err) { return err }
        return Meteor.users.findOne({ _id: params._id });
      });
  }
);


const users = isAuthenticatedResolver.createResolver(
  async (root, args, { user }) => {
    let query = {};
      return Meteor.users.find(query).fetch();
  }
)

const getUserById = isAuthenticatedResolver.createResolver(
  async (root, { _id }, { user }) => {
    return Meteor.users.findOne({ _id });
  }
)



const saveUserExpoPushId = async (root, { expoPushId }, { user }) => {
      check(expoPushId, String);
      check(user, Object);
      check(user._id, String);
      let dataToUpdate = { $set: {'profile.expoPushId': expoPushId} }
      let docToupdate = { _id: user._id };
      return Meteor.users.update(docToupdate, dataToUpdate);
};

export const UserResolvers = {
  Query: {
    user(root, args, context) {
      return context.user;
    },
    usersAdmin(root, args, context) {
      return Meteor.users.find().fetch();
    },
    getUserByIdAdmin(root, { _id }, context) {
      return Meteor.users.findOne({ _id });
    },
    users,
    getUserById,
  },
  Mutation:{
    adminCreateUser,
    adminDeleteUser,
    saveUserAccount(root, { _id, params }, context) {
      let dataToUpdate = { 
        'emails.0.address': params.email,
        'profile.firstName': params.firstName,
        'profile.lastName': params.lastName,
        'profile.cellPhone': params.cellPhone,
        'profile.workPhone': params.workPhone, 
      }
      Meteor.users.update({ _id }, { $set: dataToUpdate });
      return Meteor.users.findOne({ _id });
    },
    saveUserExpoPushId,
    saveUserImage(root, { image }, { user }) {
      let dataToUpdate = { 'profile.image': image };
      Meteor.users.update({ _id: user._id }, { $set: dataToUpdate });
      return Meteor.users.findOne({ _id: user._id });
    },
  },
  User: {
    _id: ({ _id }) => _id,
    emails: ({ emails }) => emails,
    roles: ({ roles }) => roles,
    posts({ _id }, args, context) {
      return Posts.find({ ownerId: _id }).fetch();
    },
  },
};