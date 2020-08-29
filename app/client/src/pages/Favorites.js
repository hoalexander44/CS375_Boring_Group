import React, {Component} from 'react';
import { Link } from "react-router-dom";
import Post from './Post';
import LinkBar from '../components/LinkBar'
import { get } from "../request";

// THIS IS THE DATA THAT FAVORITES WILL NEED TO POPULATE ITS LIST
let data = [

]



class Favorites extends Component {
    constructor() {
        super();
        this.state = {
            userId: "",
            favList: [],
            linkBar: null,
        };
    }

    copyArray(arrToCopy) {
        let copyArray = [];
        for (let i = 0; i < arrToCopy.length; i++) {
            copyArray.push(arrToCopy[i]);
        }
        return copyArray;
    }

    async componentDidMount() {

        // setups a barrier where you must login to enter. Also keeps track of the userId through the link bar (which is the main mode of navigation)
        if (this.props.location.state !== undefined) {
            console.log(this.props.location.state.userId)
            await this.setState({ userId: this.props.location.state.userId })
            let table = [];
            table.push(
                <LinkBar key="linkBar" userId={this.props.location.state.userId} />
            )
            await this.setState({ linkBar: table })
            await this.getFavoriteConnection();
            
        }
        else {
            this.props.history.push(
                {
                    pathname: "/"
                }
            );
        }

    }


    async getFavoriteConnection() {
        let response = await get(this, '/getFavorite?userId=' + this.state.userId).catch(error => {
            this.setState({ message: "Request failed", postList: [] });
            return;
        })
        console.log("response received");
        let getFavoriteJson = await response.json();
        await this.updateList(getFavoriteJson.favorite_items);


    }


    async updateList(items) {
        let data = this.copyArray(items);
        console.log(data[0][0].title);
        let rows = [];
        for (var i = 0; i < data.length; i++) {
            rows.push(<div><Link to={{
                pathname: "/Post",
                state: {
                    title: data[i][0].title,
                    cost: data[i][0].cost,
                    description: data[i][0].description,
                    seller_id: data[i][0].user_id,
                    userId: this.state.userId,
                    itemId: data[i][0].id
                }
            }}>{data[i][0].title} - ${data[i][0].cost}</Link></div>);
        }
        this.setState({ favList: rows })
    }

    render() {
        return(
            <div>
                {this.state.linkBar}
                <h1>Favorites</h1>
                <div>
                    {this.state.favList}
                </div>
            </div>
    );
  }
}

export default Favorites;
