import React, {Component} from 'react';
import { Link } from "react-router-dom";


class HomePage extends Component {
  render() {
    return(
        <div>
            <h1>Home</h1>
            <div>
                <Link to="/BuyerHome"> Buyer Home </Link>
            </div>
            <div>
                <Link to="/SellerHome"> Seller Home </Link>
            </div>
        </div>
    );
  }
}

export default HomePage;
