import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { baseModel } from '../base-model';

//declare collection name and export it
export const Friends = new Mongo.Collection('Friends');

//attach basics via baseModel (createdAt, title, etc.)
Friends.baseModel = baseModel;

Friends.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Friends.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});



Friends.schema = new SimpleSchema({
  friendId: {
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


Friends.attachSchema(Friends.schema);
Friends.attachSchema(Friends.baseModel);