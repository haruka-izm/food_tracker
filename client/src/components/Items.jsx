import React, { useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddBoxIcon from '@material-ui/icons/AddBox';
import MaterialTable from 'material-table';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';


const Items = (props) => {
    const info = props.items;
    const data = Object.values(info);
    const [columns, setColumns] = useState([
        { title: 'Name', field: 'name' },
        { title: 'Quantity', field: 'quantity' },
        { title: 'Purchased Date', field: 'purchased_date' },
        { title: 'Expiry Date', field: 'expiry_date' },
        { title: 'Category', field: 'category' }
    ]);

    const tableOptions = {
        search: false,  // search bar disabled
        actionsColumnIndex: -1
    }

    const editable = {
        onRowAdd: newItem => new Promise((resolve, reject) => {
            setTimeout(async () => {
                props.dispatch(await actions.addItem(newItem));
                resolve();
            }, 1000);
        }),
        onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
                setTimeout(async () => {
                    props.dispatch(await actions.updateItem(newData));
                    resolve();
                }, 1000);
            })
        ,
        onRowDelete: row =>
            new Promise((resolve, reject) => {
                setTimeout(async () => {
                    props.dispatch(await actions.deleteItem(row.id));
                    resolve();
                }, 1000);
            })
    }

    const icons = {
        Add: () => <AddBoxIcon />,
        Edit: () => <EditIcon />,
        Delete: () => <DeleteIcon />
    }

    return (
        <div style={{ height: 400, width: '100%' }} >
            <MaterialTable
                title='Stocks'
                columns={columns}
                data={data}
                options={tableOptions}
                editable={editable}
                icons={icons}
            />
        </div >
    )
}


export default connect((state, props) => {
    console.log("state? : ", state)
    return {
        items: state
    }
})(Items);