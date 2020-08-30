import React, {Component} from 'react';
import { Link } from "react-router-dom";
import LinkBar from "../components/LinkBar";
import TextInputComponent from '../components/TextInputComponent'
import ButtonComponent from '../components/ButtonComponent'
import InputPasswordComponent from '../components/InputPasswordComponent'
import { post } from "../request";

let username = '';
let password = '';
let email = '';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            registerMessage: ''
        };
    }

    async componentDidMount() {
        username = '';
        password = '';
    }

    usernameChange = (event) => {
        username = event.target.value;
        //console.log(username);
    }

    passwordChange = (event) => {
        password = event.target.value;
        //console.log(password);
    }

    emailChange = (event) => {
        email = event.target.value;
        //console.log(email);
    }

    postRegister = (event) => {
        this.registerConnection();
    }

    async registerConnection() {
        let data = {
            username: username,
            password: password,
            email: email
        }

        let response = await await post(this, '/user', data)

        if (response.status === 200) {
            console.log("Success");
            this.setState({ registerMessage: "REGISTERED!" })
        } else {
            console.log("Failure");
            console.log(response);
            this.setState({ registerMessage: "Registration failed" })
        }
    }


    render() {
    return(
        <div>
            <div className>
                <h1>REGISTER</h1>
                <TextInputComponent label="Username: " logChange={this.usernameChange} />
                <TextInputComponent label="Email: " logChange={this.emailChange} />
                <InputPasswordComponent type="password" label="Password: " logChange={this.passwordChange} />
                <ButtonComponent label="Register" onClick={this.postRegister} />
                <div>
                    {this.state.registerMessage}
                </div>
                <Link to="/"> Back to login </Link>




            </div>
        </div>
    );
    }
}

export default Login;
