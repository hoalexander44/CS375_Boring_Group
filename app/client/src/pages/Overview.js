import React, { Component } from 'react';
import { Link } from "react-router-dom";


class Overview extends Component {
    render() {
        return (
            <div>
                <h1>Overview</h1>
                <div>
                    <Link to="/"> Overview Again </Link>
                </div>
                <div>
                    <Link to="/Home"> Home </Link>
                </div>
                <div>
                    <Link to="/AddPost"> Add Post </Link>
                </div>
                <div>
                    <Link to="/404"> Not Found </Link>
                </div>
                <div>
                    <Link to="/Login"> Login </Link>
                </div>
                <div>
                    <Link to="/BuyerHome"> Buyer Home </Link>
                </div>
                <div>
                    <Link to="/SellerHome"> Seller Home </Link>
                </div>
                <div>
                    <Link to="/EditPost"> Edit Post </Link>
                </div>
                <div>
                    <Link to="/Favorites"> Favorites </Link>
                </div>
                <div>
                    <Link to="/Search"> Search </Link>
                </div>
                <div>
                    <Link to="/Post"> Generic Post </Link>
                </div>

            </div>
        );
    }
}

export default Overview;
