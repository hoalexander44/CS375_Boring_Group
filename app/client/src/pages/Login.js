import React, {Component} from 'react';
import { Link } from "react-router-dom";
import LinkBar from "../components/LinkBar";


class Login extends Component {
  render() {
    return(
        <div>
            <LinkBar />
            <h1>Login</h1>
        </div>
    );
  }
}

export default Login;
