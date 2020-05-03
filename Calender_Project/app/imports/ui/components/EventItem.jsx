import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class EventItem extends React.Component {
    render() {
        return (
            <Table.Row>
                <Table.Cell>{this.props.event.summary}</Table.Cell>
                <Table.Cell>{this.props.event.StartDate}</Table.Cell>
                <Table.Cell>{this.props.event.EndDate}</Table.Cell>
                <Table.Cell>{this.props.event.CLASS}</Table.Cell>
            </Table.Row>
        );
    }
}

/** Require a document to be passed to this component. */
EventItem.propTypes = {
    event: PropTypes.object.isRequired,
};

export default EventItem;
