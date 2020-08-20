import React, {Component} from 'react';
import '../App.css';
import TextInputComponent from '../components/TextInputComponent'
import TextAreaComponent from '../components/TextAreaComponent'
import ButtonComponent from '../components/ButtonComponent'
import ImageDragDropComponent from '../components/ImageDragDropComponent'
import LinkBar from "../components/LinkBar";
import {post} from "../request";
import TextOutputComponent from "../components/TextOutputComponent";

class EditPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        };

        this.description = '';
        this.title = '';
        this.cost = 0;
        this.itemId = props.itemId;
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

    isRequestValid = (title, description, cost, itemId) => {
        return title && description && !isNaN(cost) && itemId;
    };

    submit = () => {
        if (this.isRequestValid(this.title, this.description, this.cost, this.itemId)) {
            this.setState({message: ''});

            let data = { title: this.title, description: this.description, cost: this.cost, itemId: this.itemId};
            post(this, '/edit', data)
                .then(response => {
                    if (response.status === 204) {
                        this.setState({message: "Post edited"});
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

    delete = () => {
        this.setState({message: ''});

        post(this, '/delete', {'itemId':`${this.props.location.state.loadedItemId}`})
            .then(response => {
                if (response.status === 204) {
                    this.setState({message: "Post deleted"});
                } else {
                    this.setState({message: "Request failed"});
                    console.log(response);
                }
            }).catch(err => {
                this.setState({message: "Request failed"});
                console.log(err);
            }
        );
    };

    render() {
        return(
            <div>
                <LinkBar />
                <h1>Edit Post</h1>
                <TextInputComponent
                    label={"Title: "}
                    logChange={this.titleChange}
                    defaultText={this.props.location.state.loadedTitle}
                />
                <TextInputComponent
                    label={"Cost: "}
                    logChange={this.costChange}
                    defaultText={this.props.location.state.loadedCost}
                />
                <TextAreaComponent
                    label={"Description: "}
                    logChange={this.descriptionChange}
                    defaultText={this.props.location.state.loadedDescription}
                />
                <ImageDragDropComponent />
                <TextOutputComponent
                    text={this.state.message}/>
                <ButtonComponent
                    label={"Submit"}
                    onClick={this.submit} />
                <ButtonComponent
                    label={"Delete"}
                    onClick={this.delete}
                />
            </div>
        );
    }
}

export default EditPost;
