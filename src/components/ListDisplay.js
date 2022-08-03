import React from 'react';
import uniqid from 'uniqid';

class ListDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.displayList = this.displayList.bind(this);
    }

    displayList = list => {
        return list.map(item => {
            return(
                <div className='list-item' key={uniqid()}>{this.props.type == 'work' ? 
                item['company-name'] : item['school-name']}
                  <div className='buttons-container'>
                    <button name={item.id} onClick={this.props.deleteItem}>Delete</button>
                    <button name={item.id} onClick={this.props.edit}>Edit</button>
                  </div>
                </div>
            );
        })
    }

    render() {
        return(
            <div className='list'>
                <h3>{this.props.title}</h3>
                {this.displayList(this.props.list)}
            </div>
        );
    }
}

export default ListDisplay;