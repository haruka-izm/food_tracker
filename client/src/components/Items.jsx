import React from 'react';
// import Item from './Item';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 120 },
    { field: 'quantity', headerName: 'Quantity', width: 120 },
    { field: 'purchased_date', headerName: 'Purchased Date', width: 140 },
    { field: 'expiry_date', headerName: 'Expiry Date', width: 140 },
    { field: 'category', headerName: 'Category', width: 120 }
]

const Items = (props) => {
    const items = props.items;
    console.log('items: ', items)
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={items}
                columns={columns}
                pageSize={5}
                checkboxSelection>
            </DataGrid>
        </div>
    )
}





/*
const Items = (props) => {
    const { items } = props;
    //console.log('items: ', items)
    return (
        <div>
            {items.map(element => (<Item key={element.id} itemInfo={element} />))}
        </div>
    )
}

*/

export default Items;