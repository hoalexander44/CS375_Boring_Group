import React, {Component} from 'react';
import {Link} from "react-router-dom";
import LinkBar from '../components/LinkBar'
import {get} from "../request";
import TextOutputComponent from "../components/TextOutputComponent";

class MyPosts extends Component {
    constructor(props) {
        super(props);
        this.userId = 1; // TODO
        this.state = {
            postList: []
        }
    }

    componentDidMount() {
        get(this, `/getPosts?userId=${this.userId}`)
            .then(response => response.json())
            .then(data => {
                let rows = [];
                for (let i of data) {
                    console.log(`${i.title} - ${i.cost}`);
                    rows.push(<div><Link to={{
                        pathname: "/EditPost",
                        state: {
                            loadedItemId: i.id,
                            loadedTitle: i.title,
                            loadedCost: i.cost,
                            loadedDescription: i.description,
                            loadedContactInfo: i.contact,
                        }
                    }}>{i.title} - ${i.cost}</Link></div>);
                }
                this.setState({
                    message: '',
                    postList: rows
                });
            })
            .catch(err => this.setState({message: "Request failed", postList: []}));
    };

    render() {
        return (
            <div>
                <LinkBar />
                <h1>My posts</h1>
                <div>
                    <TextOutputComponent
                        text={this.state.message}/>
                    {this.state.postList}
                </div>
                <Link
                    to={{
                        pathname: "/AddPost",
                        state: {
                            userId: 1
                        }
                    }}>Add post</Link>
            </div>
        );
    }
}

export default MyPosts;
