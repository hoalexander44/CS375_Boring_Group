import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import './component.css';

class LinkBar extends Component {
    constructor() {
        super();
        this.state = {
            username: ""
        };
    }

    async componentDidMount() {
        console.log("LINK BAR's USERNMAE: " + this.props.username);
        this.setState({ username: this.props.username });
        //console.log(this.props.location.state.username)
        //await this.setState({ username: this.props.location.state.username })
    }

    render() {
        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th><Link
                                to={{
                                    pathname: "/Home",
                                    state: { username: this.props.username }
                                }}> Home </Link></th>

                            <th><Link
                                to={{
                                    pathname: "/MyPosts",
                                    state: { username: this.props.username }
                                }}> My Posts </Link></th>

                            <th><Link
                                to={{
                                    pathname: "/Favorites",
                                    state: { username: this.props.username }
                                }}> Favorites </Link></th>

                            <th><Link
                                to={{
                                    pathname: "/Search",
                                    state: { username: this.props.username }
                                }}> Search </Link></th>
                            <th><Link
                                to={{
                                    pathname: "/",
                                }}> LOG OUT </Link></th>

                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default LinkBar;
