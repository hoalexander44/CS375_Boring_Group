import React, {Component} from 'react';
import {Link} from "react-router-dom";
import TextInputComponent from '../components/TextInputComponent'
import ButtonComponent from '../components/ButtonComponent'
import LinkBar from '../components/LinkBar'
import { get } from "../request";

// THIS IS THE DATA THAT SEARCH PAGE WILL NEED TO RECEIVE AFTER CALLING THE SERVER
let data = [

]


class Search extends Component {
    constructor() {
        super();
        this.state = {
            userId: "",
            search: '',
            linkBar: null,
            searchList: null
        };
        this.searchFor = '';
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
            if (this.props.location.state.saveSearch) {
                await this.updateList();
            }
            //await this.updateList();

        }
        else {
            this.props.history.push(
                {
                    pathname: "/"
                }
            );
        }

    }

    searchChange = (event) => {
        //this.setState({ search: event.target.value });
        this.searchFor = event.target.value;
        console.log(this.searchFor);
    };

    search = (event) => {
        console.log(this.searchFor);
        this.searchConnection();
    }

    async searchConnection() {
        console.log(this.searchFor);
        let response = await get(this, '/search?keyword=' + this.searchFor).catch(error => {
            this.setState({ message: "Request failed", postList: [] });
            return;
        })
        let searchResponseJson = await response.json();
        console.log("SEARCH RESPONSE JSON");
        console.log(searchResponseJson);
        data = searchResponseJson;
        await this.updateList();
    }

    async updateList() {
        let rows = [];
        for (var i = 0; i < data.length; i++) {
            rows.push(<div><Link to={{
                pathname: "/Post",
                state: {
                    title: data[i].title,
                    cost: data[i].cost,
                    description: data[i].description,
                    itemId: data[i].id,
                    seller_id: data[i].user_id,
                    userId: this.state.userId,
                    returnPath: "/Search"
                }
            }}>{data[i].title} - ${data[i].cost}</Link></div>);
        }
        this.setState({ searchList: rows })
    };

    render() {
        return (
            <div>
                {this.state.linkBar}
                <h1> Search Posts</h1>
                <TextInputComponent label={"Find Item: "} logChange={this.searchChange}/>
                <ButtonComponent
                    label={"Search"}
                    onClick={this.search}
                    />
                <div>
                    {this.state.searchList}
                </div>
            </div>
        );
    }
}

export default Search;
