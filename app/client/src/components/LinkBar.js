import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import './component.css';

class LinkBar extends Component {
    render() {
        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th><Link to="/Home">Home</Link> </th>
                            <th><Link to="/MyPosts">My Posts</Link> </th>
                            <th><Link to="/Favorites">Favorites</Link> </th>
                            <th><Link to="/Search">Search</Link> </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default LinkBar;
