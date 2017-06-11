import { Meteor } from 'meteor/meteor';
import { Manufacturers } from './model';
import { createError } from 'apollo-errors';
import { isAuthenticatedResolver, isAdminResolver } from '../base-resolvers';

export const ManufacturerSchema = [`


type Manufacturer {
	    _id: ID!
	    title: String
	    website: String
	    parentId: ID
	    ownerId: ID
	    client: Client
	    owner: User
	    createdAt: Date
	    parentModelType: String
	}

input ManufacturerParams {
  	_id: ID
  	title: String
  	clientId: ID
  	website: String
}

type Query {
    manufacturers(params: ManufacturerParams): [Manufacturer],
    manufacturerById(_id: ID!): Manufacturer,
  }

type Mutation {
    createManufacturer(params: ManufacturerParams): Manufacturer,
    saveManufacturer(_id: ID, params: ManufacturerParams): Manufacturer,
  }

`];



export const ManufacturerResolvers = {
	Query: {
		manufacturers: (root, args, context) => {
			return Manufacturers.find().fetch()
		},
		manufacturerById: (root, { _id }, context) => {
			return Manufacturers.findOne({ _id });
		},
	},
	Mutation: {
		createManufacturer: (root, { params }, context) => {
			let manufacturer = {
				...params,
				ownerId: context.user._id
			}
			let manufacturerId =  Manufacturers.insert(manufacturer)
			return Manufacturers.findOne({_id: manufacturerId})
		},
		saveManufacturer: (root, { _id, params }, context) => {
			let manufacturer = {
				...params,
				ownerId: context.user._id
			}
			console.log(manufacturer)
			//return Facilities.insert()
		}
	},
};