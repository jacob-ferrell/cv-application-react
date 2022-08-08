import React from 'react';

function Field(props) {

    return(
        <div>
            <input id={props.id} 
            onChange={props.handleChange} 
            value={props.values[props.id]} 
            className={`input ${props.className}`} 
            placeholder={props.label} required>
            </input>
        </div>
    );
}

export default Field;