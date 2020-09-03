import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import './component.css';

class LinkBar extends Component {
    constructor() {
        super();
        this.state = {
            userId: ""
        };
    }

    async componentDidMount() {
        console.log("LINK BAR's USERNMAE: " + this.props.userId);
        this.setState({ userId: this.props.userId });
        //console.log(this.props.location.state.userId)
        //await this.setState({ userId: this.props.location.state.userId })
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
                                    state: { userId: this.props.userId }
                                }}> Home </Link></th>

                            <th><Link
                                to={{
                                    pathname: "/MyPosts",
                                    state: { userId: this.props.userId }
                                }}> My Posts </Link></th>

                            <th><Link
                                to={{
                                    pathname: "/Favorites",
                                    state: { userId: this.props.userId }
                                }}> Favorites </Link></th>

                            <th><Link
                                to={{
                                    pathname: "/Search",
                                    state: {
                                        userId: this.props.userId,
                                        saveSearch: false
                                    }
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
