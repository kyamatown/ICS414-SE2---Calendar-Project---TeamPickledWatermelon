import React from 'react';
import { Grid, Table, Header, Loader } from 'semantic-ui-react';
import 'react-calendar/dist/Calendar.css';
import { CalEvent } from '/imports/api/stuff/CalEvents';
import EventItem from '/imports/ui/components/EventItem';
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
                                    <Table.HeaderCell>Description</Table.HeaderCell>
                                    <Table.HeaderCell>Location</Table.HeaderCell>
                                    <Table.HeaderCell>Priority</Table.HeaderCell>
                                    <Table.HeaderCell>Class</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {this.props.events.map((event) => <EventItem key={event._id} event={event} />)}
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

EventsPage.propTypes = {
    events: PropTypes.array.isRequired,
    ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
    const subscription = Meteor.subscribe('AllEvents');
    return {
        events: CalEvent.find({}).fetch(),
        ready: subscription.ready(),
    };
})(EventsPage);
