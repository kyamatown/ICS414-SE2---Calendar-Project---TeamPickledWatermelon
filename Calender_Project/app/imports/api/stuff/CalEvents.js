import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a collection to hold the event data. */
const CalEvents = new Mongo.Collection('CalEvents');

/** Define a shema to specify the structure of each documentation in the collection. */
const CalEventsSchema = new SimpleSchema({
    BEGIN: {
        type: String,
        optional: false,
        defaultValue: 'BEGIN:VEVENT',
    },
    SUMMARY: {
        type: String,
        optional: true,
    },
    Start_Date: {
        type: String,
        optional: true,
        defaultValue: ' ',
    },
    End_Date: {
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
    END: {
        type: String,
        optional: false,
        defaultValue: 'END:VEVENT',
    },
    owner: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
CalEvents.attachSchema(CalEventsSchema);

/** Make the collection and schema available to other code. */
export { CalEvents, CalEventsSchema };
