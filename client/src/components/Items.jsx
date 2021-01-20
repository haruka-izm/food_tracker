import React, { useState } from 'react';
// import Item from './Item';
import { DataGrid } from '@material-ui/data-grid';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';


const Items = (props) => {
    const info = props.items;
    // data needs to be an array of  obj
    const data = Object.values(info);
    //console.log('data looks like this: ', data)
    const [columns, setColumns] = useState([
        { title: 'ID', field: "id" },
        { title: 'Name', field: 'name' },
        { title: 'Quantity', field: 'quantity' },
        { title: 'Purchased Date', field: 'purchased_date' },
        { title: 'Expiry Date', field: 'expiry_date' },
        { title: 'Category', field: 'category' }
    ]);

    const tableOptions = {
        search: false,  // search bar
        actionsColumnIndex: -1
    }


    const editable = {

    };


    const tableActions = [
        {
            icon: () => <EditIcon />,
            tooltip: 'edit data',
            onClick: (event, row) => console.log('row: ', row.name)
        },
        {
            icon: () => <DeleteIcon />,
            tooltip: 'delete item',
            onClick: (event, row) => {
                const id = row.id.toString();
                props.dispatch(actions.deleteItem(id));
                console.log("dispatched")
            }
        }
    ];


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
                data={data}
                options={tableOptions}
                actions={tableActions}
                editable={editable}
            />

        </div>
    )
}


export default connect((state, props) => {
    console.log("state? : ", state)
    return {
        items: state
    }
})(Items);