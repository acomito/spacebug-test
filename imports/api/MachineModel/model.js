import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { baseModel } from '../base-model';

//declare collection name and export it
export const MachineModels = new Mongo.Collection('MachineModels');

//attach basics via baseModel (createdAt, title, etc.)
MachineModels.baseModel = baseModel;

MachineModels.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

MachineModels.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});



MachineModels.schema = new SimpleSchema({
  title: {
    type: String,
  },
  manufacturerId: {
    type: String,
  },
  category: {
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


MachineModels.attachSchema(MachineModels.schema);
MachineModels.attachSchema(MachineModels.baseModel);
