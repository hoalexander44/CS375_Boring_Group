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
            message: '',
            userId: "",
            linkBar: null,
            imageDrop: null,
            imageDropRef: null
            
        };
        this.description = '';
        this.title = '';
        this.cost = 0;
        //this.userId = props.userId;
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
            await this.createImageDropComponent();


        }
        else {
            this.props.history.push(
                {
                    pathname: "/"
                }
            );
        }

    }


    async createImageDropComponent() {
        let imageDrop = [];
        let refs = [];
        let imageDropRef = React.createRef();
        refs.push(imageDropRef);
        imageDrop.push(
            <ImageDragDropComponent ref={imageDropRef}/>
        )
        this.setState({ imageDropRef: imageDropRef })
        this.setState({ imageDrop: imageDrop });
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


    submit = () => {
        this.submitConnection();
    };


    async submitConnection() {
        if (this.isRequestValid(this.title, this.description, this.cost)) {
            this.setState({ message: '' });

            let data = { title: this.title, description: this.description, cost: this.cost, userId: this.state.userId }; // change for later when we have login

            let response = await post(this, '/add', data).catch(err => {
                this.setState({ message: "Request failed" });
                console.log(err);
            });


            if (response.status === 200) {
                this.setState({ message: "Post created" });
                let responseJson = await response.json();
                await this.state.imageDropRef.current.submitUpload(responseJson.insert_id);
            } else {
                this.setState({ message: "Request failed" });
                console.log(response);
            }


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


    render() {
        return(
            <div>
                {this.state.linkBar}
                <Link
                    to={{
                        pathname: "/MyPosts",
                        state: { userId: this.state.userId }
                    }}> BACK </Link>
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
                    logChange={this.descriptionChange} />
                {this.state.imageDrop}
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
