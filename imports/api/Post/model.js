import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { baseModel } from '../base-model';

//declare collection name and export it
export const Posts = new Mongo.Collection('Posts');

//attach basics via baseModel (createdAt, title, etc.)
Posts.baseModel = baseModel;

Posts.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Posts.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});


Posts.schema = new SimpleSchema({
  image: {
    type: String,
    optional: true,
  },
  attachments: {
    type: String,
    optional: true,
  },
  category: {
    type: String,
    optional: true,
  },
  subcategory: {
    type: String,
    optional: true,
  },
  price: {
    type: String,
    optional: true,
  },
  status: {
    type: String, //Free, For Sale, For Borrow, Not Available
    optional: true,
  },
  schemaVersion: {
    type: Number,
    autoValue: function() {
      // only set on insert
        if (this.isInsert && (!this.isSet || this.value.length === 0)) {
            return 0
        }
    }
  },
});



Posts.attachSchema(Posts.schema);
Posts.attachSchema(Posts.baseModel);