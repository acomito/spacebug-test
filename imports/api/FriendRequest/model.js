import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { baseModel } from '../base-model';

//declare collection name and export it
export const FriendRequests = new Mongo.Collection('FriendRequests');

//attach basics via baseModel (createdAt, title, etc.)
FriendRequests.baseModel = baseModel;

FriendRequests.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

FriendRequests.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});



FriendRequests.schema = new SimpleSchema({
  email: {
    type: String,
    label: "Email address of the person requesting the invite.",
    optional: true
  },
  phone: {
    type: String,
    label: "Email address of the person requesting the invite.",
    optional: true
  },
  accepted: {
    type: Boolean,
    label: "Has this person been invited yet?",
  },
  recipientId: {
    type: String,
    label: "Has this invitation been accepted by a user?",
    optional: true
  },
  sentById: {
    type: String,
    label: "Has this invitation been accepted by a user?",
    optional: true
  },
  dateAccepted: {
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


FriendRequests.attachSchema(FriendRequests.schema);
FriendRequests.attachSchema(FriendRequests.baseModel);