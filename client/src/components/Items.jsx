import React, { useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddBoxIcon from '@material-ui/icons/AddBox';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import MaterialTable from 'material-table';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import { withStyles } from "@material-ui/core/styles";
import style from '../styles/styleItems';

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
    const { classes } = props;
    const today = (new Date()).toISOString().split('T')[0];


    const tableOptions = {
        search: false,  // search bar disabled
        actionsColumnIndex: -1,
        rowStyle: rowData => ({
            color: checkExpiryDate(rowData)
            //(rowData.expiry_date < today ? 'red' : 'yellow')
        })
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
            }),
    }


    const icons = {
        Add: () => <AddBoxIcon />,
        Edit: () => <EditIcon />,
        Delete: () => <DeleteIcon />,
        FirstPage: () => <FirstPageIcon />,
        LastPage: () => <LastPageIcon />,
        NextPage: () => <NavigateNextIcon />,
        PreviousPage: () => <NavigateBeforeIcon />
    }

    const checkExpiryDate = (rowData) => {
        if (rowData.expiry_date < today) {
            return 'red';
        }
    }



    return (
        <div className={classes.table} >
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


export default withStyles(style)(connect((state) => {
    console.log("state? : ", state)
    return {
        items: state
    }
})(Items));