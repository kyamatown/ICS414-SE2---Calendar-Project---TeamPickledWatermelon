import React from 'react';
import { Meteor } from 'meteor/meteor';
import { CalEvent } from '/imports/api/stuff/CalEvents';
import EventItem from '/imports/ui/components/EventItem';
import { Grid, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

class ExportCal extends React.Component {

    constructor(props) {
        super(props);
        this.onCLick = this.onClick.bind(this);
    }

    onClick() {
        this.exportICS();
    }

    deleteMongo() {
        Meteor.call('removeCollection')
    }

    exportICS() {

        var events = CalEvent.find({});
        //eslint-disable-next-line global-require
        const fileDownload = require('js-file-download');
        const filename = 'export.ics';

        let icsFile = 'BEGIN:VCALENDAR\n';
        icsFile += 'VERSION:2.0\n';
        icsFile += 'START:VTIMEZONE\n';
        icsFile += 'TZID:Pacific/honolulu\n';
        icsFile += 'END:VTIMEZONE\n';
        events.forEach(function (CalEvent) {
            icsFile += "BEGIN:VEVENT\n" + "SUMMARY:" + CalEvent.summary + "\n"
                + "DTSTART:" + CalEvent.StartDate + "\n"
                + "DTEND:" + CalEvent.EndDate + "\n"
                + "CLASS:" + CalEvent.CLASS + "\n"
                + "END:VEVENT\n"
        });
        icsFile += 'END:VCALENDAR';

        fileDownload(icsFile, filename);
    };

    createDateTime = (date) => {
        let dt = [];
        let result;
        const today = new Date();

        dt = dt.concat(date.toString());
        dt = dt.concat('T');
        dt = dt.concat(today.getHours().toString());
        dt = dt.concat(today.getMinutes().toString());
        dt = dt.concat('00');
        dt = dt.concat('Z');

        // eslint-disable-next-line prefer-const
        result = dt.join('');

        console.log(result);
        return result.replace(/,/g, '');
    };

    render() {
        const calStyle = { paddingTop: '55px' }
        return (
            <Grid container centered>
                <Button basic onClick={this.exportICS.bind(this)}>Export Calendar</Button>
                <Button basic onClick={this.deleteMongo.bind(this)}>TESTING: DELETE COLLECTION</Button>
            </Grid>
        )
    }
}

ExportCal.propTypes = {
    calevents: PropTypes.array.isRequired,
    ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe('AllEvents');
    return {
        calevents: CalEvent.find({}).fetch(),
        ready: subscription.ready(),
    };
})(ExportCal);