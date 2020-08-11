import React, {Component} from 'react';
import { Link } from "react-router-dom";
import TextInputComponent from '../components/TextInputComponent'
import ButtonComponent from '../components/ButtonComponent'


class Search extends Component {
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
        </div>
        );
    }
}

export default Search;
