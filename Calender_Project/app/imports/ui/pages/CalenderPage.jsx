import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
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
        const calStyle = { paddingTop: '55px', paddingLeft: '100px' }
        return (
            <div>
                <Grid style={divStyle} container>
                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <AddEvent />
                        </Grid.Column>
                        <Grid.Column style={calStyle}>
                            <Segment.Group>
                                <Segment>
                                    <Calendar
                                        onChange={this.onChange}
                                        value={this.state.date}
                                    />
                                </Segment>
                                <Segment>
                                    <ExportCal/>
                                </Segment>
                            </Segment.Group>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

export default CalenderPage;
