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
            message: '',
            userId: "",
            linkBar: null
        };

        this.description = '';
        this.title = '';
        this.cost = 0;
        this.itemId = props.itemId;
    }

    async componentDidMount() {
        // setups a barrier where you must login to enter. Also keeps track of the userId through the link bar
        if (this.props.location.state !== undefined) {
            console.log(this.props.location.state.userId)
            await this.setState({ userId: this.props.location.state.userId })
            let table = [];
            table.push(
                <LinkBar key="linkBar" userId={this.props.location.state.userId} />
            )
            await this.setState({ linkBar: table })

            this.itemId = this.props.location.state.loadedItemId;
            this.description = this.props.location.state.loadedDescription;
            console.log("DESCRIPTION: " + this.description);
            this.cost = this.props.location.state.loadedCost;
            this.title = this.props.location.state.loadedTitle;
        }
        else {
            this.props.history.push(
                {
                    pathname: "/"
                }
            );
        }


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
        this.submitConnection();
    };

    async submitConnection() {
        if (this.isRequestValid(this.title, this.description, this.cost, this.itemId)) {
            this.setState({ message: '' });

            let data = { title: this.title, description: this.description, cost: this.cost, itemId: this.itemId };
            await post(this, '/edit', data)
                .then(response => {
                    if (response.status === 204) {
                        this.setState({ message: "Post edited" });
                    } else {
                        this.setState({ message: "Request failed" });
                        console.log(response);
                    }
                }).catch(err => {
                    this.setState({ message: "Request failed" });
                    console.log(err);
                }
            );
            this.props.history.push(
                {
                    pathname: "/MyPosts",
                    state: {
                        userId: this.state.userId
                    }
                }
            );
        }
        else {
            this.setState({ message: "All fields must not be null and amount must be a number." });
        }
    }

    delete = () => {
        this.deleteConnection();
    };

    async deleteConnection() {
        this.setState({ message: '' });

        await post(this, '/delete', { 'itemId': `${this.props.location.state.loadedItemId}` })
            .then(response => {
                if (response.status === 204) {
                    this.setState({ message: "Post deleted" });
                } else {
                    this.setState({ message: "Request failed" });
                    console.log(response);
                }
            }).catch(err => {
                this.setState({ message: "Request failed" });
                console.log(err);
            }
        );

        this.props.history.push(
            {
                pathname: "/MyPosts",
                state: {
                    userId: this.state.userId
                }

            }
        );
    }

    render() {
        return(
            <div>
                {this.state.linkBar}
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
