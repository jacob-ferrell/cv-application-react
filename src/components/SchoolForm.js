import React from 'react';
import Field from './Field';

import '../styles/Section.css'

class SchoolForm extends React.Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        return(
            <div className={this.props.className}>
                <form onSubmit={this.props.handleFormSubmit} id='school-form'>
                    {this.props.createFields([
                        'School Name', 'Title of Study', 'Date of Study'
                        ])}
                    <button type='submit'>Submit</button>
                </form>
            </div>
        );
    }
}

export default SchoolForm;