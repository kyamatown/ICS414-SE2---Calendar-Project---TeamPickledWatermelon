import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a collection to hold the event data. */
const CalEvent = new Mongo.Collection('CalEvents');

/** Define a shema to specify the structure of each documentation in the collection. */
const CalEventSchema = new SimpleSchema({
    Summary: {
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
        defaultValue: 'PRIVATE',
    },
    owner: {
        type: String,
        optional: true,
    },
    attendee: {
        type: String,
    },
    organizer: {
        type: String,
        optional: true,
    },
    Created: {
        type: String,
        optional: true,
    },
    Description: {
        type: String,
        optional: true,
    },
    Location: {
        type: String,
        optional: true,
    },
    TRANSP: {
        type: String,
        optional: false,
        allowedValues: ['TRANSPARENT', 'OPAQUE'],
        defaultValue: 'OPAQUE',
    },
    Sequence: {
        type: String,
        optional: true,
    },
    priority: {
        type: Number,
        optional: true,
        allowedValues: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        defaultValue: 0,
    },
    geo: {
        type: String,
        optional: true,
    },
}, { tracker: Tracker });

/** Attach this schema to the collection. */
CalEvent.attachSchema(CalEventSchema);

/** Make the collection and schema available to other code. */
export { CalEvent, CalEventSchema };
