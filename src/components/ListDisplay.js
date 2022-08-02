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
                <li key={uniqid()}>{item['company-name']}
                    <button name={item.id} onClick={this.props.deleteItem}>Delete</button>
                    <button name={item.id} onClick={this.props.edit}>Edit</button>
                </li>
            );
        })
    }

    render() {
        return(
            <div className='list'>
                <h3>{this.props.title}</h3>
                <ul>{this.displayList(this.props.list)}</ul>
            </div>
        );
    }
}

export default ListDisplay;