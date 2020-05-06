import React from 'react';
import { CalEvent, CalEventSchema } from '/imports/api/stuff/CalEvents';
import { Grid, Segment, Header, Form } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import 'uniforms-bridge-simple-schema-2';
import { Meteor } from 'meteor/meteor';
import DatePicker from 'react-datepicker/es';
import 'react-datepicker/dist/react-datepicker.css';

/** Renders the Page for adding a document. */
class AddEvent extends React.Component {

    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.render = this.render.bind(this);
    }

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

    convertDate = (date) => {
        let finalDate = [];
        const dateParts = date.toString().split(' ');
        const months = {
            Jan: '01',
            Feb: '02',
            Mar: '03',
            Apr: '04',
            May: '05',
            Jun: '06',
            Jul: '07',
            Aug: '08',
            Sep: '09',
            Oct: '10',
            Nov: '11',
            Dec: '12',
        };
        const splitTime = dateParts[4].split(':');
        const newTime = `T${splitTime[0]}${splitTime[1]}${splitTime[2]}Z`;
        return finalDate = dateParts[3] + months[dateParts[1]] + dateParts[2] + newTime;
    };

    dateValidation = (dateValid, stDate, enDate) => {
        const curDate = new Date();
        const cDate = curDate.toString().split(' ');
        const sDate = stDate.toString().split(' ');
        const eDate = enDate.toString().split(' ');
        const cTime = cDate[4].split(':');
        const sTime = sDate[4].split(':');
        const eTime = eDate[4].split(':');
        const months = {
            Jan: '01',
            Feb: '02',
            Mar: '03',
            Apr: '04',
            May: '05',
            Jun: '06',
            Jul: '07',
            Aug: '08',
            Sep: '09',
            Oct: '10',
            Nov: '11',
            Dec: '12',
        };
        // Check start and end against current date first
        // Then check against each other
        if (cDate[3] > sDate[3] || cDate[3] > eDate[3]) {
            swal('Error', 'Invalid Date', 'error');
            console.log('Checking CurYear');
            return dateValid = false;
        }
        if (months[cDate[1]] > months[sDate[1]] || months[cDate[1]] > months[eDate[1]]) {
            swal('Error', 'Invalid Date', 'error');
            console.log('Checking CurMonth');
            return dateValid = false;
        }
        if (cDate[2] > sDate[2] || cDate[2] > eDate[2]) {
            swal('Error', 'Invalid Date', 'error');
            console.log('Checking CurDay');
            return dateValid = false;
        }
        if ((cDate[2] == sDate[2] || cDate[2] == eDate[2]) && (cTime[0] >= sTime[0] || cTime[0] >= eTime[0])) {
            swal('Error', 'Invalid Time', 'error');
            console.log('Checking CurTime Hours');
            return dateValid = false;
        }
        if (eDate[3] < sDate[3]) {
            swal('Error', 'Invalid Date', 'error');
            console.log('Checking Start and End Year');
            return dateValid = false;
        }
        if (months[eDate[1]] < months[sDate[1]]) {
            swal('Error', 'Invalid Date', 'error');
            console.log('Checking Start and End Month');
            return dateValid = false;
        }
        if (eDate[2] < sDate[2]) {
            swal('Error', 'Invalid Date', 'error');
            console.log('Checking Start and End Day');
            return dateValid = false;
        }
        if ((eDate[2] == sDate[2]) && (eTime[0] < sTime[0])) {
            swal('Error', 'Invalid Time', 'error');
            console.log(sTime[0]);
            console.log(eTime[0]);
            console.log('Checking Start and End Time Hours');
            return dateValid = false;
        }
        if ((eTime[0] == sTime[0]) && (eTime[1] < sTime[1])) {
            swal('Error', 'Invalid Time', 'error');
            console.log('Checking Start and End Time Minutes');
            return dateValid = false;
        }

            console.log('Date Valid');
            return dateValid = true;

    }

    /** On submit, insert the data. */
    submit(data) {
        // eslint-disable-next-line prefer-const
        const { Summary, CLASS, Description, Location, TRANSP, priority } = data;
        const owner = Meteor.user().username;
        const Start_Date = this.state.startDate;
        const End_Date = this.state.endDate;
        const timeStamp = new Date();
        const organizer = owner;
        let attendee = data.attendee;
        let dateValid = false;
        let StartDate = [];
        let EndDate = [];
        let Created = [];


        attendee = attendee.split(' ');

        dateValid = this.dateValidation(dateValid, Start_Date, End_Date);
        console.log(dateValid);


        if (dateValid) {
            StartDate = this.convertDate(Start_Date);
            EndDate = this.convertDate(End_Date);
            Created = this.convertDate(timeStamp);
            CalEvent.insert({ Summary, Created, StartDate, EndDate, CLASS, owner, Description, Location, TRANSP, priority, organizer, attendee },
                (error) => {
                    if (error) {
                        swal('Error', error.message, 'error');
                    } else {
                        swal('Success', 'Item added successfully', 'success');
                    }
                });
        }
    }


    /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
    render() {
        const sbsStyle = { paddingLeft: '8px' };
        const inSBSStyle = { width: '160px' };
        const inSBSStyle2 = { paddingLeft: '8px', width: '170px' };
        return (
            <Grid container centered>
                <Grid.Column>
                    <Header as="h2" textAlign="center">Add Event</Header>
                    <AutoForm
                        schema={CalEventSchema}
                        ref={(ref) => { this.formRef = ref; }}
                        onSubmit={data => this.submit(data)}>
                        <Segment>
                            <TextField name='Summary' />
                            <Form.Group style={sbsStyle}>
                                <div style={inSBSStyle}>
                                    <label style={{ fontWeight: 'bold' }}>Start Date</label>
                                    <DatePicker
                                        name='StartDate'
                                        selected={this.state.startDate}
                                        onChange={this.handleStartChange}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        timeCaption="Start Time"
                                        dateFormat="MM/dd/yyyy h:mm aa"
                                    />
                                </div>
                                <div style={inSBSStyle2}>
                                    <label style={{ fontWeight: 'bold' }}>End Date</label>
                                    <DatePicker
                                        name='EndDate'
                                        selected={this.state.endDate}
                                        onChange={this.handleEndChange}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        timeCaption="End Time"
                                        dateFormat="MM/dd/yyyy h:mm aa"
                                    />
                                </div>
                            </Form.Group>
                            <TextField name='Description' />
                            <TextField name='Location' />
                            <TextField name='attendee' label='Attendee(s)'/>
                            <Form.Group>
                                <div>
                                <SelectField
                                    name='TRANSP'
                                    label='Transparency'
                                    options={[
                                        { label: 'Busy', value: 'OPAQUE' },
                                        { label: 'Free', value: 'TRANSPARENT' },
                                    ]}
                                />
                                </div>
                                <div style={inSBSStyle2}>
                                <SelectField
                                    name='CLASS'
                                    label='Class'
                                    options={[
                                        { label: 'Public', value: 'PUBLIC' },
                                        { label: 'Private', value: 'PRIVATE' },
                                        { label: 'Confidential', value: 'CONFIDENTIAL' },
                                    ]}
                                />
                                </div>
                            </Form.Group>
                            <Form.Group>
                            <SelectField
                                name='priority'
                                label='Priority'
                                options={[
                                    { label: 'None', value: 0 },
                                    { label: 'High', value: 1 },
                                    { label: 'Medium', value: 5 },
                                    { label: 'Low', value: 9 },
                                ]}
                            />
                            </Form.Group>
                            <SubmitField value='submit' />
                            <ErrorsField/>
                        </Segment>
                    </AutoForm>
                </Grid.Column>
            </Grid>
        );
    }
}

export default AddEvent;
