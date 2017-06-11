import { Random } from 'meteor/random';
import { UserResolvers, UserSchema } from './User';
import { PostResolvers, PostSchema } from './Post';
import { InviteResolvers, InviteSchema } from './Invite';
import { MessageResolvers, MessageSchema } from './Message';
import { merge } from 'lodash';
import { ClientResolvers, ClientSchema } from './Client';
import { FacilityResolvers, FacilitySchema } from './Facility';
import { ManufacturerResolvers, ManufacturerSchema } from './Manufacturer';
import { MachineModelResolvers, MachineModelSchema } from './MachineModel';
import { MachineResolvers, MachineSchema } from './Machine';


export const BaseSchemas = [`
type Geometry {
	    type: String!
	    coordinates: [Int]
	}

scalar Date



type Count { 
  count: Int
}

input LocationData {
	street1: String
	street2: String
	postal: String
	country: String
	city: String
	state: String
	suburb: String
}

input ImageObject {
	fileType: String
	name: String
	uid: String
	url: String
}

type Address {
	    fullAddress: String!
	    lat: String
	    lng: String
	    geometry: Geometry
	    placeId: String
	    street: String
	    street1: String
		street2: String
	    city: String
	    state: String
	    postal: String
	    country: String
	    maps_url: String
	}
`];


export const BaseResolvers = {
  	Date: {
	  __parseValue(value) {
	    return new Date(value); // value from the client
	  },
	  __serialize(value) {
	    return value.toISOString(); // value sent to the client
	  },
	  __parseLiteral(ast) {
	    return ast.value;
	  },
	},
};

export const typeDefs = [
	...BaseSchemas,
	...UserSchema, 
	...PostSchema,
	...MessageSchema,
	...ClientSchema,
	...FacilitySchema,
	...ManufacturerSchema,
	...MachineModelSchema,
	...MachineSchema
];


export const resolvers = merge(
	BaseResolvers,
	UserResolvers, 
	PostResolvers,
	MessageResolvers,
	ClientResolvers,
	FacilityResolvers,
	ManufacturerResolvers,
	MachineModelResolvers,
	MachineResolvers
);


