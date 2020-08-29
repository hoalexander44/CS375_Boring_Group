import React, {Component} from 'react';
import {Link} from "react-router-dom";
import LinkBar from '../components/LinkBar'
import {get} from "../request";
import TextOutputComponent from "../components/TextOutputComponent";

class MyPosts extends Component {
    constructor(props) {
        super(props);
        //this.userId = 1; // TODO
        this.state = {
            message: '',
            postList: [],
            userId: "",
            linkBar: null
        }
    }


    async componentDidMount() {
        // setups a barrier where you must login to enter. Also keeps track of the userId through the link bar (which is the main mode of navigation)
        if (this.props.location.state !== undefined) {
            console.log(this.props.location.state.userId)
            await this.setState({ userId: this.props.location.state.userId })
            let table = [];
            table.push(
                <LinkBar key="linkBar" userId={this.props.location.state.userId} />
            )
            await this.setState({ linkBar: table })

            // gets and displays posts
            await this.getPostConnection();
            console.log(this.state.postList);
        }
        else {
            this.props.history.push(
                {
                    pathname: "/"
                }
            );
        }


    };


    async getPostConnection() {
        // Gets user posts
        let response = await fetch("http://localhost:3001/getPosts?userId=" + this.state.userId, {
            method: "Get",
            headers: {
                "Content-Type": "application/json"
            }
        }).catch(error => {
            this.setState({ message: "Request failed", postList: [] });
            return;
        })

        // processes user posts for UI
        if (response.status == 200) {
            let getPostsResponseJson = await response.json();
            //console.log(getPostsResponseJson);
            let rows = [];
            for (let i = 0; i < getPostsResponseJson.length; i++) {
                let title = getPostsResponseJson[i].title;
                let cost = getPostsResponseJson[i].cost;
                rows.push(<div><Link  to={{
                    pathname: "/EditPost",
                    state: {
                        loadedItemId: getPostsResponseJson[i].id,
                        loadedTitle: getPostsResponseJson[i].title,
                        loadedCost: getPostsResponseJson[i].cost,
                        loadedDescription: getPostsResponseJson[i].description,
                        loadedContactInfo: getPostsResponseJson[i].contact,
                        userId: this.state.userId
                    }
                }}>{title} ${cost}</Link></div>)
            }
            this.setState({
                message: '',
                postList: rows
            });
            console.log(this.state.postList);
        }
        else {
            this.setState({ message: "RequestFailed", postList: [] });
            console.log("request failed")
        }
    }


    render() {
        return (
            <div>
                {this.state.linkBar}
                <h1>My posts</h1>
                <div>
                    <TextOutputComponent text={this.state.message}/>
                    {this.state.postList}
                </div>
                <Link
                    to={{
                        pathname: "/AddPost",
                        state: {
                            userId: this.state.userId
                        }
                    }}>Add post</Link>
            </div>
        );
    }
}

export default MyPosts;
