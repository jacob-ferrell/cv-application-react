import React from 'react';
import Field from './Field';

import '../styles/Section.css'

class WorkForm extends React.Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        return(
            <div className={this.props.className}>
                <form onSubmit={this.props.handleFormSubmit} id='work-form'>
                    {this.props.createFields([
                        'Company Name', 'Position', 'Title', 
                        'Main Tasks', 'Date Started', 'Date Ended'
                        ])}
                    <button type='submit'>Submit</button>
                </form>
            </div>
        );
    }
}

export default WorkForm;