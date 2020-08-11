import React, {Component} from 'react';
import { Link } from "react-router-dom";
import '../App.css';
import TextInputComponent from '../components/TextInputComponent'
import TextAreaComponent from '../components/TextAreaComponent'
import ButtonComponent from '../components/ButtonComponent'
import ImageDragDropComponent from '../components/ImageDragDropComponent'


let description = '';
let title = '';
let cost = 0;
let contact = '';

function isNum(num) {
    return !isNaN(num)
}

class EditPost extends Component {
    descriptionChange = (event) => {
        description = event.target.value;
        console.log(description);
    }

    titleChange = (event) => {
        title = event.target.value;
        console.log(title);
    }

    costChange = (event) => {
        cost = event.target.value;
        console.log(cost);
    }

    contactChange = (event) => {
        contact = event.target.value;
        console.log(contact);
    }

    //Output
    submitting = (event) => {
        if (isNum(cost)) {
            console.log("submitting...");
            let data = { description: description, title: title, cost: cost, contact: contact }
            console.log(data);
        }
        else {
            console.log("cost is not valid");
        }

    }

  render() {
    return(
        <div>
            <h1>Edit Post</h1>
            <div>
                <Link to="/SellerHome"> Back </Link>
            </div>


            <TextInputComponent
                label={"Title: "}
                logChange={this.titleChange}
                defaultText={this.props.location.state.loadedTitle}
            />

            <TextInputComponent
                label={"Price: "}
                logChange={this.costChange}
                defaultText={this.props.location.state.loadedPrice}
            />

            <TextAreaComponent
                label={"Description: "}
                logChange={this.descriptionChange}
                defaultText={this.props.location.state.loadedDescription}
            />

            <ImageDragDropComponent />

            <TextInputComponent
                label={"Contact Info: "}
                logChange={this.contactChange}
                defaultText={this.props.location.state.loadedContactInfo}
            />

            <ButtonComponent
                label={"Submit"}
                isPressed={this.submitting} />

            <ButtonComponent
                label={"Delete"}
            />
        </div>
    );
  }
}

export default EditPost;
