import React from 'react';
import { Meteor } from 'meteor/meteor';
import { CalEvent } from '/imports/api/stuff/CalEvents';
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

    exportICS() {

        var events = CalEvent.find({});
        //eslint-disable-next-line global-require
        const fileDownload = require('js-file-download');
        const filename = 'export.ics';
        let dateStamp = new Date();
        let DateStamp = this.convertDate(dateStamp);

        let icsFile = 'BEGIN:VCALENDAR\n';
        icsFile += 'VERSION:2.0\n';
        icsFile += 'CALSCALE:GREGORIAN\n';
        icsFile += 'METHOD:PUBLISH\n';
        icsFile += 'X-WR-CALNAME:' + Meteor.user().username + '\n';
        //icsFile += 'START:VTIMEZONE\n';
        icsFile += 'X-WR-TIMEZONE:Pacific/honolulu\n';
        //icsFile += 'END:VTIMEZONE\n';
        events.forEach(function (CalEvent) {
            icsFile += 'BEGIN:VEVENT\n'
                + 'DTSTART:' + CalEvent.StartDate + '\n'
                + 'DTEND:' + CalEvent.EndDate + '\n'
                + 'DTSTAMP:' + DateStamp + '\n'
                + 'ORGANIZER;CN=' + CalEvent.owner + ':mailto:' + CalEvent.owner + '\n'
                + 'CLASS:' + CalEvent.CLASS + '\n'
                + 'CREATED:' + CalEvent.Created + '\n'
                + 'DESCRIPTION:' + CalEvent.Description + '\n'
                + 'LOCATION:' + CalEvent.Location + '\n'
                + 'SUMMARY:' + CalEvent.Summary + '\n'
                + 'TRANSP:' + CalEvent.TRANSP + '\n'
                + 'END:VEVENT\n'
        });
        icsFile += 'END:VCALENDAR';

        fileDownload(icsFile, filename);
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