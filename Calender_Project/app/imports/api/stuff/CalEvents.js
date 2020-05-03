import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a collection to hold the event data. */
const CalEvent = new Mongo.Collection('CalEvents');

/** Define a shema to specify the structure of each documentation in the collection. */
const CalEventSchema = new SimpleSchema({
    summary: {
        type: String,
        optional: true,
    },
    StartDate: {
        type: String,
        optional: true,
        defaultValue: ' ',
    },
    EndDate: {
        type: String,
        optional: true,
        defaultValue: ' ',
    },
    CLASS: {
        type: String,
        optional: false,
        allowedValues: ['PUBLIC', 'PRIVATE', 'CONFIDENTIAL'],
        defaultValue: 'PUBLIC',
    },
}, { tracker: Tracker });

/** Attach this schema to the collection. */
CalEvent.attachSchema(CalEventSchema);

/** Make the collection and schema available to other code. */
export { CalEvent, CalEventSchema };
