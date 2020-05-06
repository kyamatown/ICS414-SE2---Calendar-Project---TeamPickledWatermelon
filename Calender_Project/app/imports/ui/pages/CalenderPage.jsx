import React from 'react';
import { Grid } from 'semantic-ui-react';
import Calendar from 'react-calendar';
import AddEvent from '../components/AddEvent';
import ExportCal from '../components/ExportCal';
import 'react-calendar/dist/Calendar.css';

/** A simple static component to render some text for the landing page. */
class CalenderPage extends React.Component {

    state = {
        date: new Date(),
    };

    onChange = date => this.setState({ date });

    render() {
        const divStyle = { paddingTop: '20px', paddingBottom: '20px' };
        const calStyle = { paddingTop: '55px' }
        return (
            <div>
                <Grid style={divStyle} container stackable centered columns={2}>
                        <Grid.Column>
                        <AddEvent />
                        <ExportCal />
                        </Grid.Column>
                    <Grid.Column style={calStyle} >
                            <Calendar
                                onChange={this.onChange}
                                value={this.state.date}
                            />
                        </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default CalenderPage;
