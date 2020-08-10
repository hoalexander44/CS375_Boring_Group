import React, {Component} from 'react';
import { Link } from "react-router-dom";


class EditPost extends Component {
  render() {
    return(
        <div>
            <h1>Edit Page</h1>
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
    			<button> Submit </button>
    			<button> Delete </button>
    		</div>
        </div>
    );
  }
}

export default EditPost;
