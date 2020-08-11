import React, {Component} from 'react';
import { Link } from "react-router-dom";
import '../App.css';
import FavoriteStar from '../components/FavoriteStar'

let title = "New Phone";
let cost = 300;
let description = "This is my new phone wow! It is pretty wonderful.";
let contact = "abc123@gmail.com";
let isFavorite = true;

class Post extends Component {
  render() {
    return(
        <div>
            <p><Link to="/Search"> Back to Search </Link></p>
            <FavoriteStar />
            <h1>{title} - {cost} (Basic Post)</h1>

            <p>
                {description}
            </p>

            <div>
                IMAGE HERE
            </div>

            contact me at: {contact}
        </div>
    );
  }
}

export default Post;
