import React from 'react';

const Item = (props) => {
    console.log("what's this", props.value);
    return (
        <div>
            result: {props.value}
        </div>
    )

}

export default Item;