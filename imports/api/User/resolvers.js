// TOP LEVEL IMPORTS
import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email'
import { check } from 'meteor/check';
import { Random } from 'meteor/random';
import { Accounts } from 'meteor/accounts-base'
// APOLLO
import { createError, isInstance } from 'apollo-errors';
import { SchemaMutations, SchemaTypes, userId } from 'meteor-apollo-accounts';
import { isAuthenticatedResolver, isAdminResolver } from '../base-resolvers';
// COLLECTIONS
import { Posts } from '../Post'
import { Friends } from '../Friend'
import { FriendRequests } from '../FriendRequest'
import { appConfig } from '/imports/modules/config'
// OTHER
import { addInvitation } from '../api-helpers';


// CONSTANTS AND DESTRUCTURING
// =================================
const { appName } = appConfig;


// HELPERS
// =================================
const buildUser = (params) => {
  let userToInsert = {
      emails:[ {address: params.email.toLowerCase(), verified: false }],
      roles: params.roles || [],
      profile: {
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

const getUsersNotToReturn = (root, args, context) => {
  let currentUsersFriends = Friends.find({ownerId: context.user._id}).fetch();
  let usersNotToReturn = currentUsersFriends.map( item => item.friendId); // do not return existing friends
  let query1 = { accepted: false, recipientId: context.user._id }
  let query2 = { accepted: false, sentById: context.user._id }
  let currentPendingFriendRequests = FriendRequests.find({ $or: [query1, query2]}).fetch();
  let pendingRequestUserIds = []
  currentPendingFriendRequests.forEach( item => {
    pendingRequestUserIds.push(item.sentById)
    pendingRequestUserIds.push(item.recipientId)
  });
  usersNotToReturn.push(context.user._id) // add current users _id to this list, so we dont return the current user
  usersNotToReturn = [...usersNotToReturn, ...pendingRequestUserIds];
  return usersNotToReturn
}

const buildUsersFriendSearchQuery = async (root, args, context) => {

  let usersNotToReturn = getUsersNotToReturn(root, args, context);
  
  return new Promise(
      (resolve, reject) => {
        let query = { 
          _id: { $nin: usersNotToReturn },
          roles: { $nin: ['admin'] }
        };
        let andQueryArray = [];

        let options = { sort: { createdAt: -1}, limit: 10  } // at some point, when pagination is added, you'll want to add a limit here, e.g. limit: 10,

        // If an offset arguement is passed, add it as an option. 
        // offset is (one potential strategy) used for pagination/infinite loading if it ever gets added.
        // see: https://dev-blog.apollodata.com/pagination-and-infinite-scrolling-in-apollo-client-59ff064aac61
        // see: http://dev.apollodata.com/react/pagination.html
        //if (args && args.params && args.params.offset) { options.skip = args.params.offset }
      // IF NO ARGS EXIST, JUST RETURN BASIC QUERY
      // ====================================
      // if no arguments were passed, just return all messages using the above query and options variables
      if (!args || !args.params) {
        let count = Meteor.users.find(query).count()
        return resolve({ query, options, count })
      }
      
      // declare a unitIds variable. users do not have a buildingId, so we have to query the units in a building
      // make an array of unitIds, then concat that with any other _ids coming from the client (which is 'args.params.unitIds' )


      // TEXT SEARCH QUERY
      // ====================================
      // If a search string was passed, then add search terms to the andQueryArray
      if (args && args.params && args.params.searchText) {
        let regex = new RegExp( args.params.searchText, 'i' );
        let orSearchQuery = { $or: [ 
          { 'profile.firstName': regex }, 
          { 'profile.lastName': regex }, 
        ]};
        andQueryArray.push(orSearchQuery)
      }
      if (andQueryArray && andQueryArray.length > 0) {
        query = { $and: andQueryArray }
      }
      
      let count = Meteor.users.find(query).count();
      resolve({ query, options, count });

      }
  )
};

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
    usersFriendSearch: async (root, args, context) => {
      let { query, options, count } = await buildUsersFriendSearchQuery(root, args, context);
      console.log(query)
      return Meteor.users.find(query).fetch();
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
    sendUserInvites: async (root, { emails }, context) => {
      let currentUserId = context.user._id;
      let currentUserEmail = context.user.emails[0].address;
      let options = {
        from: currentUserEmail,
        subject: `You have been invited to ${appName}`,
        text: `signup at https://junkbook.meteorapp.com/invite/${currentUserId}`,
      }
       
      emails.forEach(item => {
        let userExists = Accounts.findUserByEmail(item); // check to see if user already exists
        if (userExists) {
          return console.log('user already exists');
        }
        options.to = item;
        Email.send(options);
      })
     
    }
  },
  User: {
    _id: ({ _id }) => _id,
    emails: ({ emails }) => emails,
    roles: ({ roles }) => roles,
    posts({ _id }, args, context) {
      return Posts.find({ ownerId: _id }).fetch();
    },
    isFriend({ _id }, args, context) {
      let currentUserId = context.user._id;
      let otherUserId = _id;
       if (currentUserId === otherUserId) {
        return false
       }

      let friendExists = Friends.findOne({ ownerId: currentUserId, friendId: otherUserId })
      if (friendExists) {
        return true
      } else {
        return false
      }
      //otherwise return false by default for safety
      return false
    }, 
  },
};