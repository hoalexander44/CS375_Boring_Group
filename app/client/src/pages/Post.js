import React, {Component} from 'react';
import { Link } from "react-router-dom";
import '../App.css';
import FavoriteStar from '../components/FavoriteStar'
import LinkBar from "../components/LinkBar";
import { post } from "../request";
import { get } from "../request";


class Post extends Component {
    constructor() {
        super();
        this.state = {
            userId: "",
            sellerId: "",
            isFavorite: false, //TODO
            linkBar: null,
            email: ''
        };
    }

    async componentDidMount() {

        // setups a barrier where you must login to enter. Also keeps track of the userId through the link bar
        if (this.props.location.state !== undefined) {
            console.log(this.props.location.state.userId)
            await this.setState({ userId: this.props.location.state.userId });
            await this.setState({ sellerId: this.props.location.state.seller_id });
            let table = [];
            table.push(
                <LinkBar key="linkBar" userId={this.props.location.state.userId} />
            )
            await this.setState({ linkBar: table });

            //await this.setState({isFavorite: this.props.location.state.isFavorite});
            await this.findIfFavorited();
            await this.getEmail();
        }
        else {
            this.props.history.push(
                {
                    pathname: "/"
                }
            );
        }

    }


    async findIfFavorited() {
        let response = await get(this, '/isFavorite?userId=' + this.state.userId + "&itemId=" + this.props.location.state.itemId).catch(error => {
            this.setState({ message: "Request failed", postList: [] });
            return;
        })
        let responseJson = await response.json();
        console.log(responseJson);
        await this.setState({ isFavorite: responseJson.isFavorite });
    }

    async getEmail() {
        let response = await get(this, '/getEmail?userId=' + this.state.sellerId).catch(error => {
            this.setState({ message: "Request failed", postList: [] });
            return;
        })
        let responseJson = await response.json();
        console.log("LOOK HERE");
        console.log(responseJson);
        await this.setState({ email: responseJson[0].email });
    }


    testFavorite = (event) => {
        console.log("WOW");

        this.changeFavorite();
    }

    async testChange() {
        if (this.state.isFavorite == true) {
            this.setState({ isFavorite: false });
            console.log(this.state.isFavorite);
        }
        else {
            console.log(this.state.isFavorite);
            this.setState({ isFavorite: true });
        }
    }

    async changeFavorite() {
        await this.testChange();

        let data = { "userId": this.state.userId, "itemId": this.props.location.state.itemId }
        if (this.state.isFavorite) {
            await post(this, '/addFavorite', data)
                .then(response => {
                    if (response.status === 201) {

                        this.setState({ message: "Favorite created" });
                    } else {
                        this.setState({ message: "Request failed" });
                        console.log(response);
                    }
                }).catch(err => {
                    this.setState({ message: "Request failed" });
                    console.log(err);
                }
                );
        }
        else {
            //let data = { "user_Id": this.state.userId, "item_id": this.props.location.state.item_id }
            await post(this, '/deleteFavorite', data)
                .then(response => {
                    if (response.status === 201) {
                        this.setState({ message: "Favorite deleted" });
                    } else {
                        this.setState({ message: "Request failed" });
                        console.log(response);
                    }
                }).catch(err => {
                    this.setState({ message: "Request failed" });
                    console.log(err);
                }
                );
        }
    }

  render() {
    return(
        <div>
            {this.state.linkBar}

            <Link
                to={{
                    pathname: "/Search",
                    state: { userId: this.state.userId }
                }}> BACK </Link>

            {
                this.state.isFavorite
                    ? <FavoriteStar favoriteClass="favorite" onPress={this.testFavorite} />
                    : <FavoriteStar favoriteClass="unfavorite" onPress={this.testFavorite} />
            }

            <h1>{this.props.location.state.title} - {this.props.location.state.cost}</h1>


            <p>
                {this.props.location.state.description}
            </p>

            <div>
                IMAGE HERE
            </div>

            contact seller at: {this.state.email}
        </div>
    );
  }
}

export default Post;
