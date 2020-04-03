import React from 'react';
import { CalEvents } from '/imports/api/stuff/Stuff';
import { Grid, Segment, Header, Form } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import 'uniforms-bridge-simple-schema-2';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import DatePicker from 'react-datepicker/es';
import 'react-datepicker/dist/react-datepicker.css';

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

    state = {
        startDate: new Date(),
        endDate: new Date(),
    };

    handleStartChange = date => {
        this.setState({
            startDate: date,
        });
    };

    handleEndChange = date => {
        this.setState({
            endDate: date,
        });
    };


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
    };

    /** On submit, insert the data. */
    submit(data) {
        const { SUMMARY, CLASS } = data;
        const owner = Meteor.user().username;
        const StartDate = this.state.startDate;
        const EndDate = this.state.endDate;
        const startingDate = [];
        const endingDate = [];
        const stYear = StartDate.toString().split(' ');
        const enYear = EndDate.toString().split(' ');

        console.log(stYear);
        console.log(enYear);

        startingDate[0] = stYear[3];
        endingDate[0] = enYear[3];

        if (stYear[1].includes('Jan')) {
            startingDate[1] = '01';
        } else if (stYear[1].includes('Feb')) {
            startingDate[1] = '02';
        } else if (stYear[1].includes('Mar')) {
            startingDate[1] = '03';
        } else if (stYear[1].includes('Apr')) {
            startingDate[1] = '04';
        } else if (stYear[1].includes('May')) {
            startingDate[1] = '05';
        } else if (stYear[1].includes('June')) {
            startingDate[1] = '06';
        } else if (stYear[1].includes('July')) {
            startingDate[1] = '07';
        } else if (stYear[1].includes('Aug')) {
            startingDate[1] = '08';
        } else if (stYear[1].includes('Sep')) {
            startingDate[1] = '09';
        } else if (stYear[1].includes('Oct')) {
            startingDate[1] = '10';
        } else if (stYear[1].includes('Nov')) {
            startingDate[1] = '11';
        } else if (stYear[1].includes('Dec')) {
            startingDate[1] = '12';
        }

        if (enYear[1].includes('Jan')) {
            endingDate[1] = '01';
        } else if (enYear[1].includes('Feb')) {
            endingDate[1] = '02';
        } else if (enYear[1].includes('Mar')) {
            endingDate[1] = '03';
        } else if (enYear[1].includes('Apr')) {
            endingDate[1] = '04';
        } else if (enYear[1].includes('May')) {
            endingDate[1] = '05';
        } else if (enYear[1].includes('June')) {
            endingDate[1] = '06';
        } else if (enYear[1].includes('July')) {
            endingDate[1] = '07';
        } else if (enYear[1].includes('Aug')) {
            endingDate[1] = '08';
        } else if (enYear[1].includes('Sep')) {
            endingDate[1] = '09';
        } else if (enYear[1].includes('Oct')) {
            endingDate[1] = '10';
        } else if (enYear[1].includes('Nov')) {
            endingDate[1] = '11';
        } else if (enYear[1].includes('Dec')) {
            endingDate[1] = '12';
        } else {
            swal('error');
        }

        startingDate[2] = stYear[2];
        endingDate[2] = enYear[2];

        const Start_Date = this.createDateTime(startingDate);
        const End_Date = this.createDateTime(endingDate);

        console.log(SUMMARY);

        CalEvents.insert({ SUMMARY, Start_Date, End_Date, CLASS, owner },
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
        const padding = { paddingLeft: '7px' };
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
                            <Form.Group widths='equal' style={padding}>
                                <DatePicker
                                    label='Start Date'
                                    selected={this.state.startDate}
                                    onChange={this.handleStartChange}
                                />
                                <div style={padding}>
                                    <DatePicker
                                        label='End Date'
                                        selected={this.state.endDate}
                                        onChange={this.handleEndChange}
                                    />
                                </div>
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
