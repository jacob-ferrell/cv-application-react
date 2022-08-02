import React from 'react';
import Field from './Field';

import '../styles/Section.css'

class Section extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className={this.props.className}>
                <h4>{this.props.title}</h4>
                <form onSubmit={this.props.handleFormSubmit} id={this.props.formType}>
                {this.props.createFields(this.props.labels)}
                { this.props.hideSubmit ? null : <button type='submit'>Submit</button>}
                </form>
            </div>
        );
    }
}

export default Section;