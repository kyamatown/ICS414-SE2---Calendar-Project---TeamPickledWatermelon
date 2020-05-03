import React from 'react';
import { Grid, Table, Header, Loader } from 'semantic-ui-react';
import Calendar from 'react-calendar';
import AddEvent from '../components/AddEvent';
import 'react-calendar/dist/Calendar.css';
import SimpleSchema from 'simpl-schema';
import { CalEvents, CalEventsSchema } from '/imports/api/stuff/CalEvents';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** A simple static component to render some text for the landing page. */
class EventsPage extends React.Component {

    state = {
        date: new Date(),
    };

    render() {
        return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
    }
    renderPage() {
        return (
            <div className='background-image'>
                <Grid container centered>
                    <Grid.Column>
                        <Header as="h2" textAlign="center" inverted>Listed Items</Header>
                        <Table celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Summary</Table.HeaderCell>
                                    <Table.HeaderCell>Start Date</Table.HeaderCell>
                                    <Table.HeaderCell>End Date</Table.HeaderCell>
                                    <Table.HeaderCell>Class</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {this.props.events.map((Publications) => <CalEvents key={Publications._id} Publications={Publications} />)}
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}
EventsPage.propTypes = {
    eventss: PropTypes.array.isRequired,
    ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe('CalEvents');
    return {
        events: Stuffs.find({}).fetch(),
        ready: subscription.ready(),
    };
})(ListStuff);
