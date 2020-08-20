import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import './component.css';

class LinkBar extends Component {
    render() {
        return (
            <div>
                <table>
                    <tr>
                        <th><Link to="/Home"> Home </Link> </th>
                        <th><Link to="/Search"> Search </Link> </th>
                        <th><Link to="/Favorites"> Favorites </Link> </th>
                        <th><Link to="/AddPost"> Add Post </Link> </th>
                        <th><Link to="/SellerHome"> My Posts </Link> </th>
                    </tr>
                </table>
            </div>
        );
    }
}

export default LinkBar;
