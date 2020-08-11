import React, { Component } from 'react';


class TextInputComponent extends Component {
    render() {
        return (
            <div>
                <label for="textInput">{this.props.label}</label>
                <input
                    type="text"
                    id="textInput"
                    name="textInput"
                    onChange={this.props.logChange}>
                </input>
            </div>
        );
    }
}

export default TextInputComponent;
