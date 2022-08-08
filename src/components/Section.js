import React from 'react';
import Field from './Field';

import '../styles/Section.css'

function Section(props) {



    return(
        <div className={props.className}>
            <h4>{props.title}</h4>
            <form onSubmit={props.handleFormSubmit} id={props.formType}>
            {props.createFields(props.labels)}
            { props.hideSubmit ? null : <button type='submit'
            style={{marginTop: '10px'}}>{ props.edit ? 'Edit'
            : 'Add'} </button>}
            </form>
        </div>
    );
}


export default Section;