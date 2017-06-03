import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { baseModel } from '../base-model';

//declare collection name and export it
export const Likes = new Mongo.Collection('Likes');

//attach basics via baseModel (createdAt, title, etc.)
Likes.baseModel = baseModel;

Likes.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Likes.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});



Likes.schema = new SimpleSchema({
  postId: {
    type: String,
  },
  userId: {
    type: String,
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


Likes.attachSchema(Likes.schema);
Likes.attachSchema(Likes.baseModel);