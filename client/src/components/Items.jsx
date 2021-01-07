import React from 'react';
import Item from './Item';

const Items = (props) => {
    const { items } = props;
    console.log('items: ', items)
    return (
        <div>
            {items.map(element => (<Item key={element} value={element} />))}
        </div>
    )
}

export default Items;