import React, {Component} from 'react';
import { Link } from "react-router-dom";
import '../App.css';
import FavoriteStar from '../components/FavoriteStar'
import LinkBar from "../components/LinkBar";


class Post extends Component {
  render() {
    return(
        <div>
            <LinkBar />
            <FavoriteStar isFavorite={this.props.location.state.favorite} />
            <h1>{this.props.location.state.title} - {this.props.location.state.cost} (Basic Post)</h1>

            <p>
                {this.props.location.state.description}
            </p>

            <div>
                IMAGE HERE
            </div>

            contact me at: {this.props.location.state.contact}
        </div>
    );
  }
}

export default Post;
