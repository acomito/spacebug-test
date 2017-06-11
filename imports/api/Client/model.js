import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { baseModel, addressSchema} from '../base-model';

// DECLARE THE NAME OF MONGO COLLECTION & EXPORT
export const Clients = new Mongo.Collection('Clients'); 

// LOCKDOWN THE COLLECTIONS
Clients.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Clients.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});


Clients.schema = new SimpleSchema({
  // GENERAL FIELDS
  // ========================
  title:{
    type: String,
    optional: true,
    unique: true,
  },
  // RELATIONSHIP IDs
  // ========================
  clientAdminId: {
    type: String,
    optional: true
  },
  // OTHER FIELDS
  // ========================
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


// ASSIGN BASE MODEL
Clients.baseModel = baseModel;

// ATTACH SCHEMAS (BOTH CUSTOM ABOVE SCHEMA, AND IMPORTED BASE SCHEMA)
Clients.attachSchema(Clients.schema);
Clients.attachSchema(Clients.baseModel);