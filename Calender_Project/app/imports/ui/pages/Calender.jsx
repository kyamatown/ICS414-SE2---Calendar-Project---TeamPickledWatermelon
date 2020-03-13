import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import AddEvent from '../components/AddEvent';

/** A simple static component to render some text for the landing page. */
class Calender extends React.Component {
    render() {
        return (
            <div>
                <Grid columns={2}>
                    <Grid.Row comlums={2} centered>
                        <Grid.Column>
                            <AddEvent/>
                        </Grid.Column>
                        <Grid.Column>
                            <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png'/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

export default Calender;
