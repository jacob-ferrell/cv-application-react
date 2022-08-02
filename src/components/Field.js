import React from 'react';

class Field extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <label>{this.props.label}</label>
                <input id={this.props.id} onChange={this.props.handleChange} required></input>
            </div>
        );
    }
}

export default Field;