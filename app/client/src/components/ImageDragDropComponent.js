import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './component.css';
import { post } from "../request";
import axios from 'axios';
import { myConfig } from '../config.js';


class ImageDragDropComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileImage: null,
            fileReady: false
        };
    }

    submitUpload = (insertId) => {
        console.log("TEST UPLOAD: " + insertId);
        this.uploadImage(this.state.fileImage, insertId);

    }

    async uploadImage(file, insertId) {
        if (file !== null) {
            const fd = new FormData();
            fd.append('productImage', file, insertId);
            console.log(fd);
            let response = await axios.post( myConfig.serverUrl + '/uploadImage', fd);
            console.log(response);
        }
    }


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
        this.setState({ fileImage: files[0] });
        this.setState({fileReady: true});
    }

    render() {

        return (
            <div>
                {
                    this.state.fileReady
                        ? <div>FILE READY</div>
                        : <div
                            className="dropzone"
                            onDragOver={this.classChange}
                            onDragLeave={this.classRevert}
                            onDrop={this.fileDropped}>
                            Drop files here to upload
                          </div>
                }

            </div>
        );
    }
}

export default ImageDragDropComponent;
