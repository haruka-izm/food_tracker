import React, { useState, useEffect } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddBoxIcon from '@material-ui/icons/AddBox';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import MaterialTable from 'material-table';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import { withStyles } from "@material-ui/core/styles";
import style from '../styles/styleItems';


const Items = (props) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const { classes } = props;


    //const info = props.items;
    //const data = Object.values(info);
    const [columns, setColumns] = useState([
        { title: 'Name', field: 'name' },
        { title: 'Quantity', field: 'quantity' },
        { title: 'Purchased Date', field: 'purchased_date' },
        { title: 'Expiry Date', field: 'expiry_date' },
        { title: 'Category', field: 'category' }
    ]);

    const tableOptions = {
        search: false,  // search bar disabled
        actionsColumnIndex: -1,
        rowStyle: rowData => ({
            color: checkExpiryDate(rowData),
            fontFamily: 'Arial'
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
        PreviousPage: () => <NavigateBeforeIcon />,
        Clear: () => <ClearIcon style={{ color: 'red' }} />,
        Check: () => <DoneIcon color='secondary' />,
        SortArrow: () => <ArrowDropDownIcon />
    }

    const checkExpiryDate = (rowData) => {
        const today = (new Date()).toISOString().split('T')[0];
        const expiring = new Date(rowData.expiry_date);
        expiring.setDate(expiring.getDate() - 14);
        const warning14DaysBeforeExpiration = expiring.toISOString().split('T')[0];

        if (rowData.expiry_date < today) {
            return 'red';
        }
        if (today >= warning14DaysBeforeExpiration) {
            return 'blue';
        }
    };

    ;

    let pageSize = props.pageSize;
    let offset = pageSize * props.page;
    const totalCount = props.totalCount;
    const items = props.items;
    const page = props.page;
    async function fetchData() {
        const reqOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': "*" }
        };

        //setIsLoaded(true);

        const QUERY_URL = `http://localhost:8080/api/items/query?limit=${pageSize}&offset=${offset}`;
        const res = await fetch(QUERY_URL, reqOptions);

        if (res.status === 200) {
            const json = await res.json();
            props.dispatch(actions.getItems(json));

            // couse: values are not updated
            console.log("returning totalCount: ", props.totalCount)

            return {
                data: Object.values(items),
                page: page,
                totalCount: totalCount
            }

        }

        if (res.status === 400) {
            console.log('400 called')
            let json = await res.json();
            // setError(json.message);
            //setError(error.res.data.message)
            return false;
        } else {
            console.error('API error /api/login ', res);
            return false
        }

    };




    /*
        useEffect(() => {
            if (!isLoaded) {
                fetchData();
            }
        });
    
    */



    return (

        <div className={classes.table} >

            <MaterialTable
                title='Stocks'
                columns={columns}
                data={fetchData
                    /*
                                        query =>
                    
                                            new Promise((resolve, reject) => {
                                                const pageSize = props.pageSize;
                                                const offset = props.page;
                                                const QUERY_URL = `http://localhost:8080/api/items/query?limit=${pageSize}&offset=${offset}`;
                                                fetch(QUERY_URL)
                                                    .then(response => response.json())
                                                    .then(result => props.dispatch(actions.getItems(result)))
                                                    .then(result => {
                                                        console.log("totalCount in pro: ", props.totalCount);
                                                        resolve({
                                                            data: Object.values(props.items),
                                                            page: props.page,
                                                            totalCount: props.totalCount,
                                                        })
                                                    })
                                            })
                    */

                }
                options={tableOptions}
                editable={editable}
                icons={icons}
            />
        </div >
    )
}


export default withStyles(style)(connect((state) => {
    console.log("state? : ", state);
    return {
        items: state.data,
        page: state.page,
        pageSize: state.pageSize,
        totalCount: state.totalCount
    }
})(Items));