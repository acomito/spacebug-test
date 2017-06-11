import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { baseModel } from '../base-model';

//declare collection name and export it
export const Machines = new Mongo.Collection('Machines');

//attach basics via baseModel (createdAt, title, etc.)
Machines.baseModel = baseModel;

Machines.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Machines.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});



Machines.schema = new SimpleSchema({
  title: {
    type: String,
  },
  machineModelId: {
    type: String,
  },
  facilityId: {
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


Machines.attachSchema(Machines.schema);
Machines.attachSchema(Machines.baseModel);