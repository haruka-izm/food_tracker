import React from 'react';
import Item from './Item';

const Items = (props) => {
    const { items } = props;
    //console.log('items: ', items)
    return (
        <div>
            {items.map(element => (<Item key={element.id} itemInfo={element} />))}
        </div>
    )
}

export default Items;