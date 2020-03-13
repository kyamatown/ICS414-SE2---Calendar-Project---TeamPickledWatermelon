import React from 'react';
import Signin from './Signin';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div>
            <Signin/>
        </div>
    );
  }
}

export default Landing;
