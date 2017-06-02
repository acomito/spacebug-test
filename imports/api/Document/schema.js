import { Random } from 'meteor/random';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Documents } from './model';
import { createError } from 'apollo-errors';

const FooError = createError('FooError', {
  message: 'A foo error has occurred'
});

export const DocumentSchema = [`

type Document {
	    _id: ID!
	    title: String
	    content: String
	    image: String
	    category: String
	    owner: User
	}


input DocumentParams {
    content: String
    title: String
    image: String
    category: String
}

type Query {
	    documentById(_id: ID!): Document,
    	documents: [Document],
	  }


type Mutation {
	  # creates a new document 
	  # title is the document title
	  # content is the document content
	  createDocument(params: DocumentParams): Document
	}

`];

export const DocumentResolvers = {
	Query: {
	    documentById: (root, args, context) => Documents.findOne({ _id: args._id }),
	    documents: () => Documents.find().fetch(),
  	},
  	Document: {
  		owner: ({ ownerId }, args, context) => {
  			let user = Meteor.users.findOne({_id: ownerId});
  			if (!user) { return null }
  			return user
  		}
  	},
	Mutation: {
		createDocument(root, { params }, context) {
			if (!context.user) {
				throw new FooError({ data: { authentication: 'you must sign in first' } });
			}
			let docToInsert = {
				...params,
				ownerId: context.user._id
			}
			let docId = Documents.insert(docToInsert);
			if (docId) {
				return Documents.findOne({_id: docId});
			}
		},
	}
};



