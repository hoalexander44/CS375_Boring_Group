import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
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

class AddPost extends Component {
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

    //Output **********************************************************************************************************
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

            <h1>Add Post</h1>
            <div>
                <Link to="/SellerHome"> My Posts </Link>
            </div>

            <TextInputComponent
                label={"Title: "}
                logChange={this.titleChange}
                />

            <TextInputComponent
                label={"Price: "}
                logChange={this.costChange}/>

            <TextAreaComponent
                label={"Description: "}
                logChange={this.descriptionChange}/>

            <ImageDragDropComponent />

            <TextInputComponent
                label={"Contact Info: "}
                logChange={this.contactChange} />
            
            <ButtonComponent
                label={"Submit"}
                isPressed={this.submitting} />

        </div>
    );
  }
}

export default AddPost;
