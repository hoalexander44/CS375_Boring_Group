import React, {Component} from 'react';
import LinkBar from '../components/LinkBar'


class HomePage extends Component {
  render() {
    return(
        <div>
            <LinkBar />
            <h1>Home</h1>
            <p>This is the brand new market place website we created!</p>
            <p>Please use the link bar to navigate!</p>
        </div>
    );
  }
}

export default HomePage;
