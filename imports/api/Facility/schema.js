import { Meteor } from 'meteor/meteor';
import { Facilities } from './model';
import { Clients } from '../Client';
import { Machines } from '../Machine';
import { createError } from 'apollo-errors';
import { isAuthenticatedResolver, isAdminResolver } from '../base-resolvers';

export const FacilitySchema = [`


type Facility {
	    _id: ID!
	    title: String
	    parentId: ID
	    ownerId: ID
	    clientId: String
	    client: Client
	    owner: User
	    createdAt: Date
	    location: Address
	    parentModelType: String
	    machines: [Machine]
	}

input FacilityParams {
  	_id: ID
  	title: String
  	clientId: ID
  	location: LocationData
}

type Query {
    facilities(params: FacilityParams): [Facility],
    facilityById(_id: ID!): Facility
  }

type Mutation {
    createFacility(params: FacilityParams): Facility,
    saveFacility(_id: ID, params: FacilityParams): Facility,
  }

`];



export const FacilityResolvers = {
	Query: {
		facilities: (root, args, context) => {
			return Facilities.find().fetch()
		},
		facilityById: (root, { _id }, context) => {
			return Facilities.findOne({ _id });
		}
	},
	Facility: {
		client: ({ clientId }, args, context) => {
			return Clients.findOne({ _id: clientId });
		},
		machines: ({ _id }, args, context) => {
			return Machines.find({ facilityId: _id }).fetch();
		}
	},
	Mutation: {
		createFacility: (root, { params }, context) => {
			let facility = {
				title: params.title,
				clientId: params.clientId,
				ownerId: context.user._id,
				location: {
					...params.location
				},
			}
			console.log(facility)
			let facilityId =  Facilities.insert(facility)
			return Facilities.findOne({_id: facilityId})
		},
		saveFacility: (root, { _id, params }, context) => {
			let facilityToUpdate = Facilities.findOne({_id})
			let facility = {
				title: params.title,
				ownerId: context.user._id,
				location: {
					...params.location
				},
				...facilityToUpdate
			}
			console.log(facility)
			//return Facilities.insert()
		}
	},
};