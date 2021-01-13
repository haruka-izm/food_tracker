import React from 'react';
// import Item from './Item';
import { DataGrid } from '@material-ui/data-grid';
import EditIcon from '@material-ui/icons/Edit';
import MaterialTable from 'material-table';

const columns = [
    { title: 'ID', field: "id" },
    { title: 'Name', field: 'name' },
    { title: 'Quantity', field: 'quantity' },
    { title: 'Purchased Date', field: 'purchased_date' },
    { title: 'Expiry Date', field: 'expiry_date' },
    { title: 'Category', field: 'category' },
    { title: 'Edit' }
]

const Items = (props) => {
    const items = props.items;
    console.log('items: ', items)
    return (
        <div style={{ height: 400, width: '100%' }}>
            {/*
            <DataGrid
                rows={items}
                columns={columns}
                pageSize={1}
                checkboxSelection>
            </DataGrid>
            */}
            <MaterialTable
                columns={columns}
                data={items} />





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