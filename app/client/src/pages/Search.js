import React, {Component} from 'react';
import { Link } from "react-router-dom";
import TextInputComponent from '../components/TextInputComponent'
import ButtonComponent from '../components/ButtonComponent'


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
    }

    render() {
        return (

        <div>
            <h1> Search Page</h1>
            <div>
                <Link to="/BuyerHome"> Back to buyer home </Link>
            </div>

            <div>
                <Link to="/Favorites"> Favorites </Link>
            </div>

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
