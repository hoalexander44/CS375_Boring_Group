import React, {Component} from 'react';
import { Link } from "react-router-dom";
import LinkBar from "../components/LinkBar";
import ButtonComponent from '../components/ButtonComponent'


class Login extends Component {

    login = () => {
        this.props.history.push(
            {
                pathname: "/Home",
                state: {
                    userId: 1,
                }
            }
        );
    }

    render() {
    return(
        <div>
            <h1>Login</h1>
            <ButtonComponent
                label={"Fake Login"}
                onClick={this.login} />
        </div>
    );
    }
}

export default Login;
