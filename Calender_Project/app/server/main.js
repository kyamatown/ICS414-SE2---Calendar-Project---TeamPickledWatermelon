import '/imports/startup/server/Accounts';
import '/imports/startup/server/Publications';
import '/imports/startup/server/Mongo';
import { CalEvents } from '/imports/api/stuff/CalEvents.js';

if (Meteor.isServer) {
    Meteor.methods({
        removeCollection: function () {
            CalEvents.remove({});
        }
    });
}