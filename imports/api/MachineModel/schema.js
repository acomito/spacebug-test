import { Meteor } from 'meteor/meteor';
import { MachineModels } from './model';
import { Manufacturers } from '../Manufacturer';
import { createError } from 'apollo-errors';
import { isAuthenticatedResolver, isAdminResolver } from '../base-resolvers';

export const MachineModelSchema = [`


type MachineModel {
      _id: ID!
      title: String
      parentId: ID
      ownerId: ID
      manufacturerId: ID
      category: String
      client: Client
      owner: User
      createdAt: Date
      parentModelType: String
      manufacturer: Manufacturer
  }

input MachineModelParams {
    _id: ID
    title: String
    clientId: ID
    category: String
    manufacturerId: ID
}

type Query {
    machineModels: [MachineModel],
    machineModelById(_id: ID!): MachineModel
  }

type Mutation {
    createMachineModel(params: MachineModelParams): MachineModel,
    saveMachineModel(_id: ID, params: MachineModelParams): MachineModel,
  }

`];



export const MachineModelResolvers = {
  Query: {
    machineModels: (root, args, context) => {
      let result = MachineModels.find().fetch();
      return result;
    },
    machineModelById: (root, { _id }, context) => {
      let result = MachineModels.findOne({_id});
      return result;
    },
  },
  MachineModel: {
    manufacturer: ({manufacturerId}, args, context) => {
      let result = Manufacturers.findOne({_id: manufacturerId});
      return result;
    },
    
  },
  Mutation: {
    createMachineModel: (root, { params }, context) => {
      let machineModel = {
        ...params,
        ownerId: context.user._id
      }
      console.log(machineModel)
      let manufacturerId =  MachineModels.insert(machineModel)
      return MachineModels.findOne({_id: manufacturerId})
    },
    saveMachineModel: (root, { _id, params }, context) => {
      let machineModel = {
        ...params,
        ownerId: context.user._id
      }
      console.log(machineModel)
      //return Facilities.insert()
    }
  },
};