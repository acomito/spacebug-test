import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { baseModel } from '../base-model';

//declare collection name and export it
export const Facilities = new Mongo.Collection('Facilities');

//attach basics via baseModel (createdAt, title, etc.)
Facilities.baseModel = baseModel;

Facilities.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Facilities.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});




// LOCATION SCHEMA
// ---------------------------------------------

export const addressSchema = new SimpleSchema({
    fullAddress: {
        type: String,
        optional: true
    },
    lat: {
        type: Number,
        decimal: true,
        optional: true
    },
    lng: {
        type: Number,
        decimal: true,
        optional: true
    },
    geometry: {
        type: Object,
        blackbox: true,
        optional: true
    },
    placeId: {
        type: String,
        optional: true
    },
    street: {
        type: String,
        max: 100,
        optional: true
    },
    street1: {
        type: String,
        max: 100,
        optional: true
    },
    street2: {
        type: String,
        max: 100,
        optional: true
    },
    city: {
        type: String,
        max: 50,
        optional: true
    },
    state: {
        type: String,
        optional: true
    },
    postal: {
        type: String,
        optional: true
    },
    country: {
        type: String,
        optional: true
    },
    maps_url: {
        type: String,
        optional: true
    },
});

Facilities.schema = new SimpleSchema({
  title: {
    type: String,
  },
  location: {
    type: addressSchema,
    optional: true
  },
  clientId: {
    type: String,
    optional: true
    // an optional field to capture a topic. At this point, only used with messages of type "supportTicket" whicha are
    // messages that comes in from the help form/modal (bug report, comment or other)
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


Facilities.attachSchema(Facilities.schema);
Facilities.attachSchema(Facilities.baseModel);
