import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './component.css';

//www.youtube.com/watch?v=hqSlVvKvvjQ was heavily referenced

class ImageDragDropComponent extends Component {

    classChange = (event) => {
        event.preventDefault();
        event.target.classList = "dropzone dragover"
        return false;
    }

    classRevert = (event) => {
        event.preventDefault();
        event.target.classList = "dropzone"
        return false;
    }

    fileDropped = (event) => {
        event.preventDefault();
        event.target.classList = "dropzone";
        console.log(event.dataTransfer.files);
    }

    render() {

        return (

            <div
                className="dropzone"
                id="dropzone"
                onDragOver={this.classChange}
                onDragLeave={this.classRevert}
                onDrop={this.fileDropped}>
                Drop files here to upload
            </div>
        );
    }
}

export default ImageDragDropComponent;
