import React, {Component} from 'react';
import { Link } from "react-router-dom";
import Post from './Post';
import LinkBar from '../components/LinkBar'

// THIS IS THE DATA THAT FAVORITES WILL NEED TO POPULATE ITS LIST
let data = [
    {
        title: "IPHONE SE",
        cost: 450,
        description: "This is my new phone wow! It is pretty wonderful. YEEEEET!",
        contact: "abc123@gmail.com",
        favorite: true
    },

    {
        title: "IPHONE 11",
        cost: 1000,
        description: "NEW IPHONE 11. Perfect condition. Email me if you are interested.",
        contact: "dsafasd@gmail.com",
        favorite: true
    }
]



class Favorites extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            linkBar: null,
        };
    }

    async componentDidMount() {

        // setups a barrier where you must login to enter. Also keeps track of the username through the link bar (which is the main mode of navigation)
        if (this.props.location.state !== undefined) {
            console.log(this.props.location.state.username)
            await this.setState({ username: this.props.location.state.username })
            let table = [];
            table.push(
                <LinkBar key="linkBar" username={this.props.location.state.username} />
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

    favoriteList = () => {
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
    }

    render() {
        return(
            <div>
                {this.state.linkBar}
                <h1>Favorites</h1>
                <div>
                    {this.favoriteList()}
                </div>
            </div>
    );
  }
}

export default Favorites;
