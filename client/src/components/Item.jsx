import React from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 70 },
    { field: 'quantity', headerName: 'Quantity', width: 70 },
    { field: 'purchased_date', headerName: 'Purchased Date', width: 70 },
    { field: 'expiry_date', headerName: 'Expiry Date', width: 70 },
    { field: 'category', headerName: 'Category', width: 70 }
]

const Item = (props) => {
    const items = props.itemInfo;
    console.log('items: ', props.itemInfo)
    return (
        <div>
            <DataGrid
                rows={items}
                columns={columns}
                pageSize={5}
                checkboxSelection>
            </DataGrid>
        </div>
    )
}

export default Item;