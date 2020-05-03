import '/imports/startup/server/Accounts';
import '/imports/startup/server/Publications';
import '/imports/startup/server/Mongo';
import { CalEvent } from '/imports/api/stuff/CalEvents.js';

if (Meteor.isServer) {
    Meteor.methods({
        //TESTING USAGE: Delete Collection to get rid of Junk Data
        removeCollection: function () {
            CalEvent.remove({});
        }
    });
}