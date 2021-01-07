import React from 'react';

const Item = (props) => {

    const { name, quantity, purchased_date, expiry_date, category, id } = props.itemInfo;
    return (
        <div>
            item: {name}
        </div>
    )

}

export default Item;