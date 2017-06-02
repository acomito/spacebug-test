import { UnknownError, UnauthorizedError, AlreadyAuthenticatedError, ForbiddenError } from './base-errors';
import { createResolver } from 'apollo-resolvers';
import { createError, isInstance } from 'apollo-errors';

// THESE RESOLVES CAN BE ATTACHED TO OTHER RESOLVERS 
// TO PROVIDE MIDDLEWARE FUNCTIONALITY FOR CATCHING AND RETURNING ERRORS
// see: https://www.youtube.com/watch?v=xaorvBjCE7A
// =============================================================================




const baseResolver = createResolver(
   //incoming requests will pass through this resolver like a no-op
  null,

  (root, args, context, error) => {
  	
  	if (isInstance(error)) return error;
    console.log(error)
  	return new UnknownError({
  		data: {
  			name: error.name
  		}
  	})
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


