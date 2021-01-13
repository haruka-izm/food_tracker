import React from 'react';
// import Item from './Item';
import { DataGrid } from '@material-ui/data-grid';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';

const columns = [
    { title: 'ID', field: "id" },
    { title: 'Name', field: 'name' },
    { title: 'Quantity', field: 'quantity' },
    { title: 'Purchased Date', field: 'purchased_date' },
    { title: 'Expiry Date', field: 'expiry_date' },
    { title: 'Category', field: 'category' }
]


const tableOptions = {
    search: false,  // search bar
    actionsColumnIndex: -1
}

const actions = [
    {
        icon: () => <EditIcon />,
        tooltip: 'edit data',
        onClick: (event, row) => alert("row.name: ")
    },
    {
        icon: () => <DeleteIcon />,
        tooltip: 'delete item',
        onClick: (event, row) => alert('bye')
    }
];

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
                title='Stocks'
                columns={columns}
                data={items}
                options={tableOptions}
                actions={actions}
            />





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