import { Random } from 'meteor/random';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
// COLLECTIONS
import { Clients } from './model';
import { Messages } from '../Message';
import { Facilities } from '../Facility';
import { createError, isInstance } from 'apollo-errors';
import { isAuthenticatedResolver, isAdminResolver } from '../base-resolvers';



export const ClientSchema = [`

type Client {
  _id: ID!
  clientAdminId: ID
  title: String
  clientAdmin: User
  users: [User]
  facilities: [Facility]
}

type Query {
  clientById(_id: ID!): Client,
  clients( params: ClientParams ): [Client]
}

input ClientParams {
  title: String!,
  clientAdminId: ID
}

type Mutation {
  createClient( params: ClientParams ): Client
  saveClient(_id: ID, params: ClientParams): Client
  deleteClient(_id: ID): Client
}

`];


const createClient = isAdminResolver.createResolver(
	async (root, { params }, { user }) => {

		let group = {
			title: params.title,
			clientAdminId: params.clientAdminId,
			ownerId: user._id
		}

		let _id = Clients.insert(group);
		return Clients.findOne({ _id });
	}
);

const saveClient = isAdminResolver.createResolver(
  async (root, { _id, params }, { user }) => {
    let query = { _id }
    let docToUpdate = Clients.findOne(query);

    let dataToUpdate = {
      ...docToUpdate,
      ...params,
    }

    Clients.update(query, { $set: dataToUpdate }, function(err, res){
      let updatedDoc = Clients.findOne(query);
      return updatedDoc;
    });
    
  }
);

const clientAdmin = isAdminResolver.createResolver(
	async ({ groupAdminId }, args, { user }) => {
		return Meteor.users.findOne({ _id: groupAdminId });
	}
);

const clientById = isAdminResolver.createResolver(
  async (root, { _id }, context) => {
    return Clients.findOne({ _id })
  }
);

const clients = isAdminResolver.createResolver(
  async (root, args, context) => {
    return Clients.find().fetch();
  }
);



const users = isAdminResolver.createResolver(
  async ({ _id }, args, context) => {
    return Meteor.users.find({'profile.groupId': _id }).fetch();
  }
);

export const ClientResolvers = {
	Query: {
	    clientById,
	    clients,
  	},
  	Client: { 
  		clientAdmin,
      facilities: ({ _id }, args, context) => {
        let facilities = Facilities.find({clientId: _id}).fetch();
        return facilities;
      }
  	},
  	Mutation: { 
  		createClient,
  		saveClient,
      deleteClient(root, { _id }, { user }){
        if (!user) { return; }
        if (!user.roles.includes('admin')){ return; }
        Clients.remove({ _id });
      }
  	},
};