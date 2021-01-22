import React, { useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddBoxIcon from '@material-ui/icons/AddBox';
import MaterialTable from 'material-table';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';


const Items = (props) => {
    const info = props.items;
    // data needs to be an array of  obj
    const data = Object.values(info);
    //console.log('data looks like this: ', data)
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
        // newData: obj {name:"", quantity:''...} not 'id'
        onRowAdd: newItem => new Promise((resolve, reject) => {
            setTimeout(async () => {
                props.dispatch(await actions.addItem(newItem));
                resolve();
            }, 1000);
        }),
        onRowUpdate: () => { },
        onRowDelete: row =>
            new Promise((resolve, reject) => {
                setTimeout(async () => {
                    props.dispatch(await actions.deleteItem(row.id));
                    resolve();
                }, 1000);
            })

    }
    /*
        const tableActions = [
            {
                icon: () => <EditIcon />,
                tooltip: 'edit data',
                //onClick: (event, row) => console.log('row: ', row.name)
            },
            {
                icon: () => <DeleteIcon />,
                tooltip: 'delete item',
                onClick: async (event, row) => {
                    //const id = row.id.toString();
                    props.dispatch(await actions.deleteItem(row.id));
                }
            }
        ];
    */
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