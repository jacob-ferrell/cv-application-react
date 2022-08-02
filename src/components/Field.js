import React from 'react';

class Field extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <input id={this.props.id} onChange={this.props.handleChange} 
                className={`input ${this.props.className}`} placeholder={this.props.label} required></input>
            </div>
        );
    }
}

export default Field;