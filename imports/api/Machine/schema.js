import { Meteor } from 'meteor/meteor';
import { Machines } from './model';
import { MachineModels } from '../MachineModel';
import { Facilities } from '../Facility';
import { createError } from 'apollo-errors';
import { isAuthenticatedResolver, isAdminResolver } from '../base-resolvers';

export const MachineSchema = [`


type Machine {
	    _id: ID!
	    title: String
	    parentId: ID
	    ownerId: ID
	    facilityId: ID
	    machineModelId: ID
	    client: Client
	    owner: User
	    createdAt: Date
	    parentModelType: String
	    machineModel: MachineModel
	    facility: Facility
	}

input MachineParams {
  	_id: ID
  	title: String
  	machineModelId: ID
  	facilityId: ID
}

type Query {
    machines(params: MachineParams): [Machine],
    machineById(_id: ID!): Machine,
  }

type Mutation {
    createMachine(params: MachineParams): Machine,
    saveMachine(_id: ID, params: MachineParams): Machine,
  }

`];



export const MachineResolvers = {
	Query: {
		machines: (root, args, context) => {
			return Machines.find().fetch()
		},
		machineById: (root, { _id }, context) => {
			return Machines.findOne({_id});
		}
	},
	Machine: {
		machineModel: ({ machineModelId }, args, context) => {
			return MachineModels.findOne({ _id: machineModelId });		
		},
		facility: ({ facilityId }, args, context) => {
			return Facilities.findOne({ _id: facilityId });		
		},
	},
	Mutation: {
		createMachine: (root, { params }, context) => {
			let machine = {
				...params,
				ownerId: context.user._id
			}
			let machineId =  Machines.insert(machine)
			return Machines.findOne({_id: machineId})
		},
		saveMachine: (root, { _id, params }, context) => {
			let machine = {
				...params,
				ownerId: context.user._id
			}
			console.log(machine)
			//return Facilities.insert()
		}
	},
};