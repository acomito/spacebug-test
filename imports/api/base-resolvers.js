import { UnknownError, UnauthorizedError, AlreadyAuthenticatedError, ForbiddenError, MongoError } from './base-errors';
import { createResolver } from 'apollo-resolvers';
import { createError, isInstance } from 'apollo-errors';

// THESE RESOLVES CAN BE ATTACHED TO OTHER RESOLVERS 
// TO PROVIDE MIDDLEWARE FUNCTIONALITY FOR CATCHING AND RETURNING ERRORS
// see: https://www.youtube.com/watch?v=xaorvBjCE7A
// =============================================================================



/*
EXMAPLE ERROR RESPONSE FROM MONGODB
{ [MongoError: E11000 duplicate key error index: friendpm-dev.users.$emails.address_1 dup key: { : "arcomito@gmail.com" }]
I20170608-10:39:47.951(-4)?   name: 'MongoError',
I20170608-10:39:47.953(-4)?   message: 'E11000 duplicate key error index: friendpm-dev.users.$emails.address_1 dup key: { : "arcomito@gmail.com" }',
I20170608-10:39:47.954(-4)?   driver: true,
I20170608-10:39:47.960(-4)?   code: 11000,
I20170608-10:39:47.961(-4)?   index: 0,
I20170608-10:39:47.962(-4)?   errmsg: 'E11000 duplicate key error index: friendpm-dev.users.$emails.address_1 dup key: { : "arcomito@gmail.com" }',
I20170608-10:39:47.991(-4)?   getOperation: [Function],
I20170608-10:39:47.994(-4)?   toJSON: [Function],
I20170608-10:39:47.996(-4)?   toString: [Function] }
*/

const getMongoErrorMessage = (errorCode) => {
  switch(errorCode) {
    case 11000:
      return 'it seems that user or record already exists in the database';
    default:
      return 'hmm... something went wrong with the database. Please try again or contact support.';
  }
}

const baseResolver = createResolver(
   //incoming requests will pass through this resolver like a no-op
  null,

  (root, args, context, error) => {
    
    // is it an instance of an apollo error?
    // if so, return the error
    if (isInstance(error)) return error; 

    // is it an instance of a mongo error?
    // if so, build the error message to return, then return it.
    if (error.name === 'MongoError') {
      return new MongoError({
        message: getMongoErrorMessage(error.code),
        data: {
          name: error.message
        }
      });
    }

     // if all else fails, just return an unknown error
    return new UnknownError({
      data: {
        name: error.name
      }
    });
  }
);


export const isAuthenticatedResolver = baseResolver.createResolver(
	(root, args, context) => {
		const { user } = context;
		if (!user) throw new UnauthorizedError();
	}
);



export const isAdminResolver = isAuthenticatedResolver.createResolver(
	(root, args, context) => {
		const { user } = context;
		if (!user.roles.includes('admin')) throw new ForbiddenError();
	}
);


