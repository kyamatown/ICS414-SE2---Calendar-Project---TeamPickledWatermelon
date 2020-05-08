import React from 'react';
import { CalEvent, CalEventSchema } from '/imports/api/stuff/CalEvents';
import { Grid, Segment, Header, Form } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import 'uniforms-bridge-simple-schema-2';
import { Meteor } from 'meteor/meteor';
import DatePicker from 'react-datepicker/es';
import 'react-datepicker/dist/react-datepicker.css';
//Package npm react-google-places-autocomplete
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import 'react-google-places-autocomplete/dist/index.min.css';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';

var selectedLoc = [];
var curLat = '';
var curLon = '';
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

    onPlaceSelected = (place) => {
        selectedLoc = place;
        console.log(selectedLoc);
        geocodeByAddress(selectedLoc.description).then(results => getLatLng(results[0]))
            .then(({ lat, lng }) => this.setLatLon(lat, lng));
    };

    setLatLon = (lat, lng) => {
        curLat = lat;
        curLon = lng;
        console.log({ curLat, curLon });
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
            //console.log('Checking CurYear');
            return dateValid = false;
        }
        if (months[cDate[1]] > months[sDate[1]] || months[cDate[1]] > months[eDate[1]]) {
            swal('Error', 'Invalid Date', 'error');
            console.log('Checking CurMonth');
            return dateValid = false;
        }
        if (cDate[2] > sDate[2] || cDate[2] > eDate[2]) {
            swal('Error', 'Invalid Date', 'error');
            //console.log('Checking CurDay');
            return dateValid = false;
        }
        if ((cDate[2] == sDate[2] || cDate[2] == eDate[2]) && (cTime[0] >= sTime[0] || cTime[0] >= eTime[0])) {
            swal('Error', 'Invalid Time', 'error');
            //console.log('Checking CurTime Hours');
            return dateValid = false;
        }
        if (eDate[3] < sDate[3]) {
            swal('Error', 'Invalid Date', 'error');
            //console.log('Checking Start and End Year');
            return dateValid = false;
        }
        if (months[eDate[1]] < months[sDate[1]]) {
            swal('Error', 'Invalid Date', 'error');
            console.log('Checking Start and End Month');
            return dateValid = false;
        }
        if (eDate[2] < sDate[2]) {
            swal('Error', 'Invalid Date', 'error');
            //console.log('Checking Start and End Day');
            return dateValid = false;
        }
        if ((eDate[2] == sDate[2]) && (eTime[0] < sTime[0])) {
            swal('Error', 'Invalid Time', 'error');
            //console.log(sTime[0]);
            //console.log(eTime[0]);
            //console.log('Checking Start and End Time Hours');
            return dateValid = false;
        }
        if ((eTime[0] == sTime[0]) && (eTime[1] < sTime[1])) {
            swal('Error', 'Invalid Time', 'error');
            //console.log('Checking Start and End Time Minutes');
            return dateValid = false;
        }

            //console.log('Date Valid');
            return dateValid = true;

    }

    /** On submit, insert the data. */
    submit(data) {
        // eslint-disable-next-line prefer-const
        const { Summary, CLASS, Description, TRANSP, priority } = data;
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
        //attendee = attendee.split(' ');
        dateValid = this.dateValidation(dateValid, Start_Date, End_Date);
        //console.log(dateValid);
        let Location = selectedLoc.description;
        let geo = curLat + ';' + curLon;

        if (dateValid) {
            StartDate = this.convertDate(Start_Date);
            EndDate = this.convertDate(End_Date);
            Created = this.convertDate(timeStamp);
            CalEvent.insert({ Summary, Created, StartDate, EndDate, CLASS, owner, Description, Location, geo, TRANSP, priority, organizer, attendee },
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
        const labelStyle = { paddingTop: '10px' };
        return (
            <Grid>
                <Grid.Row columns={1}>
                    <Grid.Column>
                        <Header as='h2'>Add Event</Header>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns='equal' width={'auto'}>
                    <Grid.Column>
                        <Segment.Group>
                            <AutoForm
                                schema={CalEventSchema}
                                ref={(ref) => { this.formRef = ref; }}
                                onSubmit={data => this.submit(data)}>
                            <Segment>
                                    <TextField name='Summary' />
                                    <TextField name='Description' />
                                    <div>
                                        <label style={{ fontWeight: 'bold' }}>Location</label>
                                    </div>
                                    <GooglePlacesAutocomplete
                                        apiKey='AIzaSyBxY0OanPbFWvb71ef89bv6v9fMKPFTIHs'
                                        onSelect={this.onPlaceSelected}
                                    />
                                    <TextField name='attendee' label='Attendee(s)' style={labelStyle} />
                                    <div>
                                        <div>
                                            <label style={{ fontWeight: 'bold' }}>Start Date</label>
                                        </div>
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
                                    <div>
                                        <div>
                                            <label style={{ fontWeight: 'bold' }}>End Date</label>
                                        </div>
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
                                    <div>
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
                                    <div>
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
                                    </div>
                            </Segment>
                            <Segment>
                                <SubmitField value='submit' />
                                <ErrorsField />
                                </Segment>
                            </AutoForm>
                        </Segment.Group>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

export default AddEvent;
