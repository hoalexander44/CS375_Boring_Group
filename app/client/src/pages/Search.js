import React, {Component} from 'react';
import {Link} from "react-router-dom";
import TextInputComponent from '../components/TextInputComponent'
import ButtonComponent from '../components/ButtonComponent'
import LinkBar from '../components/LinkBar'

// THIS IS THE DATA THAT SEARCH PAGE WILL NEED TO RECEIVE AFTER CALLING THE SERVER
let data = [
    {
        title: "MEGA PHONE",
        cost: 500,
        description: "This is my new MEGA phone wow! It is pretty wonderful. YEEEEET!",
        contact: "abc123@gmail.com",
        favorite: false
    },

    {
        title: "SUPER MEGA PHONE",
        cost: 900,
        description: "NEW SUPER MEGA PHONE. Perfect condition. Email me if you are interested.",
        contact: "dsafasd@gmail.com",
        favorite: false
    }
]


class Search extends Component {
    constructor() {
        super();
        this.state = {
            userId: "",
            linkBar: null,
        };
    }

    async componentDidMount() {

        // setups a barrier where you must login to enter. Also keeps track of the userId through the link bar
        if (this.props.location.state !== undefined) {
            console.log(this.props.location.state.userId)
            await this.setState({ userId: this.props.location.state.userId })
            let table = [];
            table.push(
                <LinkBar key="linkBar" userId={this.props.location.state.userId} />
            )
            await this.setState({ linkBar: table })
        }
        else {
            this.props.history.push(
                {
                    pathname: "/"
                }
            );
        }

    }

    searchList = () => {

        let rows = [];
        for (var i = 0; i < data.length; i++) {
            rows.push(<div><Link to={{
                pathname: "/Post",
                state: {
                    title: data[i].title,
                    cost: data[i].cost,
                    description: data[i].description,
                    contact: data[i].contact,
                    favorite: data[i].favorite
                }
            }}>{data[i].title} - ${data[i].cost}</Link></div>);
        }
        return rows
    };

    render() {
        return (
            <div>
                {this.state.linkBar}
                <h1> Search Page</h1>
                <TextInputComponent label={"Find Item: "} />
                <ButtonComponent
                    label={"Search"}
                    />
                <div>
                        {this.searchList()}
                </div>
            </div>
        );
    }
}

export default Search;
