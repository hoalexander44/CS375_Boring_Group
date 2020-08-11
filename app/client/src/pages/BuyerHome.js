import React, {Component} from 'react';
import { Link } from "react-router-dom";
import LinkBar from '../components/LinkBar'

class BuyerHome extends Component {
  render() {
    return(
        <div>
            <LinkBar />
            <h1>Buyer Home</h1>
            <div>
                <Link to="/Search"> Search </Link>
            </div>
            <div>
                <Link to="/Favorites"> Favorites </Link>
            </div>
            <div>
                <Link to="/Home"> Home </Link>
            </div>
        </div>
    );
  }
}

export default BuyerHome;
