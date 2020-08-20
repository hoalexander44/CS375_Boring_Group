import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import '../App.css';
import TextInputComponent from '../components/TextInputComponent'
import TextAreaComponent from '../components/TextAreaComponent'
import ButtonComponent from '../components/ButtonComponent'
import ImageDragDropComponent from '../components/ImageDragDropComponent'
import TextOutputComponent from "../components/TextOutputComponent";

class AddPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        };

        this.description = '';
        this.title = '';
        this.cost = 0;
        this.sellerId = 1; // TODO
    }

    descriptionChange = (event) => {
        this.description = event.target.value;
    };

    titleChange = (event) => {
        this.title = event.target.value;
    };

    costChange = (event) => {
        this.cost = event.target.value;
    };

    isRequestValid = (title, description, cost) => {
        return title && description && !isNaN(cost);
    };

    submitting = () => {
        if (this.isRequestValid(this.title, this.description, this.cost)) {
            this.setState({message: ''});
            let data = { title: this.title, description: this.description, cost: this.cost, sellerId: this.sellerId};
            let url = `http://${process.env['REACT_APP_SERVER_HOST']}:${process.env['REACT_APP_SERVER_PORT']}/add`;
            console.log(`Sending POST to ${url} with payload ${JSON.stringify(data)}`);
            fetch(url, {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(data)
            })
                .then(response => {
                    if (response.status === 201) {
                        this.setState({message: "Post created"});
                    } else {
                        this.setState({message: "Request failed"});
                        console.log(response);
                    }
                }).catch(r => {
                    this.setState({message: "Request failed"});
                    console.log(r);
            });
        }
        else {
            this.setState({message: "All fields must not be null and amount must be a number."});
        }
    };

    render() {
        return(
            <div>
                <h1>Add Post</h1>
                <div>
                    <Link to="/SellerHome">My Posts</Link>
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
                <TextOutputComponent
                    text={this.state.message}/>
                <ButtonComponent
                    label={"Submit"}
                    isPressed={this.submitting} />
            </div>
        );
    }
}

export default AddPost;
