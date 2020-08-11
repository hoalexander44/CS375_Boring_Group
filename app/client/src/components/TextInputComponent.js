import React, { Component } from 'react';


class TextInputComponent extends Component {
    render() {
        return (
            <div>
                <label for="textInput">{this.props.label}</label>
                <input
                    type="text"
                    name="textInput"
                    onChange={this.props.logChange}
                    defaultValue={this.props.defaultText}>
                </input>
            </div>
        );
    }
}

export default TextInputComponent;
