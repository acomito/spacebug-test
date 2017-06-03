import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { baseModel } from '../base-model';

//declare collection name and export it
export const Messages = new Mongo.Collection('Messages');

//attach basics via baseModel (createdAt, title, etc.)
Messages.baseModel = baseModel;

Messages.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Messages.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});



Messages.schema = new SimpleSchema({
  messageValue: {
    type: String,
    label: "The actual text value of the message"
  },
  topic: {
    type: String,
    optional: true
    // an optional field to capture a topic. At this point, only used with messages of type "supportTicket" whicha are
    // messages that comes in from the help form/modal (bug report, comment or other)
  },
  modelType: {
    type: String,
    label: "The type of message", 
    // discussion: a message tied to a ticket
    // reply: a message tied to a reply
    // dm: a private message
    // supportTicket: a message that comes in from the help form/modal (bug report, comment or other)
    //, etc. 
    // NOTE: maybe ch property name to messageType?
  },
  parentModelType: {
    type: String,
    label: "The type of message", 
    // parent may be ticket, or another message (e.g. a reply, or nested reply), 
    // or a Thread (Thread is not a model that has created yet)
  },
  parentId: {
    type: String,
    label: "The type of message", // id of the 
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


Messages.attachSchema(Messages.schema);
Messages.attachSchema(Messages.baseModel);