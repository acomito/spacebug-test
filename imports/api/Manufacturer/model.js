import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { baseModel } from '../base-model';

//declare collection name and export it
export const Manufacturers = new Mongo.Collection('Manufacturers');

//attach basics via baseModel (createdAt, title, etc.)
Manufacturers.baseModel = baseModel;

Manufacturers.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Manufacturers.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});



Manufacturers.schema = new SimpleSchema({
  title: {
    type: String,
  },
  website: {
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


Manufacturers.attachSchema(Manufacturers.schema);
Manufacturers.attachSchema(Manufacturers.baseModel);
