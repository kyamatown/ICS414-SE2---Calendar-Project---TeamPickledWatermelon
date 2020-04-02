import React from 'react';
import { Grid } from 'semantic-ui-react';
import Calendar from 'react-calendar';
import AddEvent from '../components/AddEvent';
import 'react-calendar/dist/Calendar.css';

/** A simple static component to render some text for the landing page. */
class CalenderPage extends React.Component {

    state = {
        date: new Date(),
    };

    onChange = date => this.setState({ date });

    render() {
        const padding = { paddingLeft: '50px' };
        return (
            <div>
                <Grid columns={2}>
                    <Grid.Row comlums={2} centered>
                        <Grid.Column>
                            <AddEvent/>
                        </Grid.Column>
                        <Grid.Column className={ padding }>
                            <Calendar
                                onChange={this.onChange}
                                value={this.state.date}
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

export default CalenderPage;
