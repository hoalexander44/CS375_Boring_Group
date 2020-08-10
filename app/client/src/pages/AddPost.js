import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import '../App.css';

class AddPost extends Component {
  render() {
    return(
    	<div>
    		<h1>Add Post</h1>
    		<div>
    			<label for="title">Title:</label>
    			<input type="text" id="title" name="title"></input>
    		    <label for="price">Price:</label>
    			<input type="text" id="price" name="price"></input>
    		</div>
    		<div>
    	    	<label for="description">Description:</label>
    		    <textarea id="description" name="description" rows="4" cols="50"></textarea>
    		</div>
    		<div>
    	    	<label for="contact">Contact Info:</label>
    		    <input type="contact" id="contact" name="Price"></input>
    		</div>
    		<div>
    			<button onClick={hi}> Submit </button>
    		</div>
    	</div>
    );
  }
}

export default AddPost;
