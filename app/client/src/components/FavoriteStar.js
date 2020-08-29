import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './component.css';

let unSelectImage = './images/Star_Unselected.png';
let SelectImage = './images/Star_Selected.png';

let isSelected = false;

class FavoriteStar extends Component {

    changeButton = (event) => {
        this.props.onPress();
    }


    render() {
        return (
            <div className={this.props.favoriteClass} onClick={this.changeButton}>
            </div>
            )
        }
}

export default FavoriteStar;
