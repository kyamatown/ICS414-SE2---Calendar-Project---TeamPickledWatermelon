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
        let newDate = date.toString();
        let dateParts = newDate.split(' ');
        let months = {
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
            Dec: '12'
        };
        let splitTime = dateParts[4].split(':');
        let newTime = 'T' + splitTime[0] + splitTime[1] + splitTime[2] + 'Z';
        return finalDate = dateParts[3] + months[dateParts[1]] + dateParts[2] + newTime;
    };

    /** On submit, insert the data. */
    submit(data) {
        const { summary, CLASS } = data;
        const owner = Meteor.user().username;
        const Start_Date = this.state.startDate;
        const End_Date = this.state.endDate;
        const timeStamp = new Date();

        let StartDate = this.convertDate(Start_Date);
        let EndDate = this.convertDate(End_Date);
        let DateStamp = this.convertDate(timeStamp);

        //Check Formatting
        //console.log(StartDate);
        //console.log(EndDate);
        //console.log(DateStamp);

        //Check owner
        //console.log(owner);

        CalEvent.insert({ summary, DateStamp, StartDate, EndDate, CLASS, owner },
            (error) => {
                if (error) {
                    swal('Error', error.message, 'error');
                } else {
                    swal('Success', 'Item added successfully', 'success');
                }
            });
    };


    /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
    render() {
        const padding = { paddingLeft: '8px' };
        return (
            <Grid container centered>
                <Grid.Column>
                    <Header as="h2" textAlign="center">Add Event</Header>
                    <AutoForm
                        schema={CalEventSchema}
                        ref={(ref) => { this.formRef = ref; }}
                        onSubmit={data => this.submit(data)}>
                        <Segment>
                            <TextField name='summary' />
                            <Form.Group style={padding}>
                                <DatePicker
                                    name='StartDate'
                                    label='StartDate'
                                    selected={this.state.startDate}
                                    onChange={this.handleStartChange}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={15}
                                    timeCaption="Start Time"
                                    dateFormat="MM/dd/yyyy h:mm aa"
                                />
                                <div style={padding}>
                                    <DatePicker
                                        name='EndDate'
                                        label='EndDate'
                                        selected={this.state.endDate}
                                        onChange={this.handleEndChange}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        timeCaption="Start Time"
                                        dateFormat="MM/dd/yyyy h:mm aa"
                                    />
                                    </div>
                            </Form.Group>
                            <SelectField
                                name='CLASS'
                                label='Class'
                                options={[
                                    { label: 'Public', value: 'PUBLIC' },
                                    { label: 'Private', value: 'PRIVATE' },
                                    { label: 'Confidential', value: 'CONFIDENTIAL' },
                                ]}
                            />
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
