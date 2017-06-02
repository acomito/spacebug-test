import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { baseModel } from '../base-model';

//declare collection name and export it
export const Invites = new Mongo.Collection('Invites');

//attach basics via baseModel (createdAt, title, etc.)
Invites.baseModel = baseModel;

Invites.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Invites.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});



Invites.schema = new SimpleSchema({
  email: {
    type: String,
    label: "Email address of the person requesting the invite.",
  },
  invited: {
    type: Boolean,
    label: "Has this person been invited yet?",
  },
  userId: {
    type: String,
    label: "Has this person been invited yet?",
  },
  token: {
    type: String,
    label: "The token for this invitation.",
    optional: true
  },
  modelType: {
    type: String,
    optional: true
  },
  accepted: {
    type: Boolean,
    label: "Has this invitation been accepted by a user?",
    optional: true
  },
  dateInvited: {
    type: Date,
    label: "The date this user was invited",
    optional: true
  },
  dateAdded: {
    type: Date,
    label: "The date this user was invited",
    optional: true
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


Invites.attachSchema(Invites.schema);
Invites.attachSchema(Invites.baseModel);