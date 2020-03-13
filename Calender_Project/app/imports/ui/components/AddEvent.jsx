import React from 'react';
import { CalEvents } from '/imports/api/stuff/Stuff';
import { Grid, Segment, Header, Form } from 'semantic-ui-react';
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField, TextField } from "uniforms-semantic";
import swal from 'sweetalert';
import 'uniforms-bridge-simple-schema-2';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
    BEGIN: {
        type: String,
        optional: false,
        defaultValue: 'BEGIN:VEVENT',
    },
    SUMMARY: {
        type: String,
        optional: true,
    },
    SDate_Year: {
        type: Number,
        optional: false,
        defaultValue: 2020,
    },
    SDate_Month: {
        type: Number,
        optional: false,
        defaultValue: 1,
    },
    SDate_Day: {
        type: Number,
        optional: false,
        defaultValue: 1,
    },
    EDate_Year: {
        type: Number,
        optional: false,
        defaultValue: 2020,
    },
    EDate_Month: {
        type: Number,
        optional: false,
        defaultValue: 1,
    },
    EDate_Day: {
        type: Number,
        optional: false,
        defaultValue: 1,
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
});

/** Renders the Page for adding a document. */
class AddEvent extends React.Component {

    createDateTime = (date) => {
        let dt = [];
        const today = new Date();

        dt = dt.concat(date);
        dt = dt.concat('T');
        dt = dt.concat(today.getHours());
        dt = dt.concat(today.getMinutes());
        dt = dt.concat('00');
        dt = dt.concat('Z');
        console.log(dt);
        return dt;
    }

    /** On submit, insert the data. */
    submit(data) {
        const { BEGIN, SUMMARY, CLASS, END } = data;
        let { SDate_Year, SDate_Month, SDate_Day, EDate_Year, EDate_Month, EDate_Day, } = data;
        const owner = Meteor.user().username;

        if (!Number.isInteger(SDate_Year) || !Number.isInteger(SDate_Month) || !Number.isInteger(SDate_Day)) {
            swal('Error! you have input a float/decimal/Empty field please insert an integer!\n');
        } else if (!Number.isInteger(EDate_Year) || !Number.isInteger(EDate_Month) || !Number.isInteger(EDate_Day)) {
            swal('Error You have inputed a float/decimal/Empty field please insert an integer!\n');
        }

        if (EDate_Year < 10) {
            // eslint-disable-next-line no-const-assign
            EDate_Year = `0${EDate_Year}`;
        }
        if (EDate_Month < 10) {
            // eslint-disable-next-line no-const-assign
            EDate_Month = `0${EDate_Month}`;
        }
        if (EDate_Day < 10) {
            // eslint-disable-next-line no-const-assign
            EDate_Day = `0${EDate_Day}`;
        }
        if (SDate_Year < 10) {
            // eslint-disable-next-line no-const-assign
            SDate_Year = `0${SDate_Year}`;
        }
        if (SDate_Month < 10) {
            // eslint-disable-next-line no-const-assign
            SDate_Month = `0${SDate_Month}`;
        }
        if (SDate_Day < 10) {
            // eslint-disable-next-line no-const-assign
            SDate_Day = `0${SDate_Day}`;
        }


        let startingDate = [];
        startingDate = startingDate.concat(SDate_Year);
        startingDate = startingDate.concat(SDate_Month);
        startingDate = startingDate.concat(SDate_Day);

        let endingDate = [];
        endingDate = endingDate.concat(EDate_Year);
        endingDate = endingDate.concat(EDate_Month);
        endingDate = endingDate.concat(EDate_Day);

        const Start_Date = this.createDateTime(startingDate);
        const End_Date = this.createDateTime(endingDate);

        CalEvents.insert({ BEGIN, SUMMARY, Start_Date, End_Date, CLASS, END, owner },
            (error) => {
                if (error) {
                    swal('Error', error.message, 'error');
                } else {
                    swal('Success', 'Item added successfully', 'success');
                }
            });
    }

    /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
    render() {
        return (
            <Grid container centered>
                <Grid.Column>
                    <Header as="h2" textAlign="center">Add Event</Header>
                    <AutoForm
                        schema={formSchema}
                        onSubmit={data => this.submit(data)}
                    >
                        <Segment>
                            <TextField name='SUMMARY'/>
                            <Form.Group widths='equal'>
                                <NumField name='SDate_Year'/>
                                <NumField name='SDate_Month'/>
                                <NumField name='SDate_Day'/>
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <NumField name='EDate_Year'/>
                                <NumField name='EDate_Month'/>
                                <NumField name='EDate_Day'/>
                            </Form.Group>
                            <SelectField
                                name='CLASS'
                                options={[
                                    { label: 'Public', value: 'PUBLIC' },
                                    { label: 'Private', value: 'PRIVATE' },
                                    { label: 'Confidential', value: 'CONFIDENTIAL' },
                                ]}
                            />
                            <SubmitField value='submit'/>
                            <ErrorsField/>
                        </Segment>
                    </AutoForm>
                </Grid.Column>
            </Grid>
        );
    }
}

export default AddEvent;
