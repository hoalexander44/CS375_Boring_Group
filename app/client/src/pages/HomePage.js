import React, {Component} from 'react';
import LinkBar from '../components/LinkBar'
import { get } from "../request";


class HomePage extends Component {
    constructor() {
        super();
        this.state = {
            userId: "",
            linkBar: null,
        };
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

        }
        else {
            this.props.history.push(
                {
                    pathname: "/"
                }
            );
        }

    }

    render() {

    return(
        <div>
            {this.state.linkBar}
            <h1>THE "BORING" MARKET PLACE</h1>
            <p>This is the brand new market place website we created!</p>
            <p>Please use the link bar to navigate!</p>
            <h2>VERSION 1.0</h2>
            <p>Developed by Alexander Ho, Harley Sacramento, Jared Miller, Akshit Anand</p>
        </div>
    );
  }
}

export default HomePage;
