import React, {Component} from 'react';
import { Link } from "react-router-dom";
import LinkBar from '../components/LinkBar'


class HomePage extends Component {
  render() {
    return(
        <div>
            <LinkBar />
            <h1>Home</h1>
        </div>
    );
  }
}

export default HomePage;
