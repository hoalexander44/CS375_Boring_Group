import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './component.css';

//www.youtube.com/watch?v=hqSlVvKvvjQ was heavily referenced

function save(data, filename, type) {

}

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
        let files = event.dataTransfer.files;
        console.log(event.dataTransfer.files);
        for (let i = 0; i < files.length; i++) {
            if (files[i].type !== "image/png") {
                console.log("Invalid file dropped!");
                return;
            }
        }

        console.log(files[0]);
        console.log("valid file!");
    }

    render() {

        return (

            <div
                className="dropzone"
                onDragOver={this.classChange}
                onDragLeave={this.classRevert}
                onDrop={this.fileDropped}>
                Drop files here to upload
            </div>
        );
    }
}

export default ImageDragDropComponent;
