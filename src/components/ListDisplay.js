import React, {useState, useEffect } from 'react';
import uniqid from 'uniqid';



function ListDisplay(props) {

    const displayList = list => {
        return list.map(item => {
            return(
                <div className='list-item' key={uniqid()}>{props.type == 'work' ? 
                item['company-name'] : item['school-name']}
                  <div className='buttons-container'>
                    <button name={item.id} onClick={props.deleteItem}>Delete</button>
                    <button name={item.id} onClick={props.edit}>Edit</button>
                  </div>
                </div>
            );
        })
    }
    return(
        <div className='list'>
            <h3>{props.title}</h3>
            {displayList(props.list)}
        </div>
    );
}

export default ListDisplay;