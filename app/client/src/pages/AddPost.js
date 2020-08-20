import React, {Component} from 'react';
import { Link } from "react-router-dom";
import '../App.css';
import TextInputComponent from '../components/TextInputComponent'
import TextAreaComponent from '../components/TextAreaComponent'
import ButtonComponent from '../components/ButtonComponent'
import ImageDragDropComponent from '../components/ImageDragDropComponent'
import TextOutputComponent from "../components/TextOutputComponent";
import LinkBar from "../components/LinkBar";
import {post} from "../request";

class AddPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        };

        this.description = '';
        this.title = '';
        this.cost = 0;
        this.userId = props.userId;
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

    userIdChange = (event) => {
        this.userId = event.target.value;
    };

    isRequestValid = (title, description, cost, userId) => {
        return title && description && !isNaN(cost) && userId;
    };

    submit = () => {
        if (this.isRequestValid(this.title, this.description, this.cost, this.userId)) {
            this.setState({message: ''});

            let data = { title: this.title, description: this.description, cost: this.cost, userId: this.userId};
            post(this, '/add', data)
                .then(response => {
                    if (response.status === 201) {
                        this.setState({message: "Post created"});
                    } else {
                        this.setState({message: "Request failed"});
                        console.log(response);
                    }
                }).catch(err => {
                    this.setState({message: "Request failed"});
                    console.log(err);
                }
            );
        }
        else {
            this.setState({message: "All fields must not be null and amount must be a number."});
        }
    };

    render() {
        return(
            <div>
                <LinkBar />
                <h1>Add Post</h1>
                <div>
                    <Link to="/MyPosts">My Posts</Link>
                </div>
                <TextInputComponent
                    label={"Title: "}
                    logChange={this.titleChange}
                />
                <TextInputComponent
                    label={"Cost: "}
                    logChange={this.costChange}/>
                <TextAreaComponent
                    label={"Description: "}
                    logChange={this.descriptionChange}/>
                <TextInputComponent
                    label={"User id: "}
                    logChange={this.userIdChange}/>
                <ImageDragDropComponent />
                <TextOutputComponent
                    text={this.state.message}/>
                <ButtonComponent
                    label={"Submit"}
                    onClick={this.submit} />
            </div>
        );
    }
}

export default AddPost;
