import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './component.css';

let unSelectImage = './images/Star_Unselected.png';
let SelectImage = './images/Star_Selected.png';

let isSelected = false;

class FavoriteStar extends Component {
    changeButton = (event) => {
        if (isSelected) {
            event.target.className = "unfavorite";
            isSelected = false;
            console.log("UnFavorited");
        }
        else {
           event.target.className = "favorite";
            isSelected = true;
            console.log("Favorited");
        }

    }

    render() {
        return (
            <div className="unfavorite" onClick={this.changeButton}>
            </div>
        )
        }
}

export default FavoriteStar;
