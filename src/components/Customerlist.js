import React, { useEffect, useState } from 'react'
import {AgGridReact} from "ag-grid-react"
import Button from '@material-ui/core/Button'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css'

function Customerlist() {
    const [customer, setCustomer] = useState([])
    const [gridApi, setGridApi] = useState(null)

    const custUrl = "https://customerrest.herokuapp.com/api/customers"

    const getCustomers = () => {
        fetch(custUrl)
        .then(res => res.json())
        .then(data => setCustomer(data.content))
        console.log(customer)
    }

    const onGridReady = (params) => {
        setGridApi(params.api)
        
        params.api.sizeColumnsToFit()
    }

    useEffect(() => getCustomers(), [])
  

    const columns = [
    {
        headerName: 'First name',
        field: 'firstname',
        filter: true,
        sortable: true,
        floatingFilter: true
        
    },
    {
        headerName: 'Last name',
        field: 'lastname',
        filter: true,
        sortable: true,
        floatingFilter: true
        
    },
    { 
        headerName: 'City', 
        field: 'city', 
        filter: true, 
        sortable: true, 
        floatingFilter: true
    },
    ]

    

    return (
        <div>

               
            <div className="nappulat">
                <Button style= {{margin: "5px"}} variant="contained" color="primary">Add a customer</Button>
                <Button style={{margin: "5px"}} variant="contained" color="primary">Edit selected customer</Button>
                <Button style={{margin: "5px"}} variant="contained" color="secondary">Delete selected customer</Button>
            </div>
           
        <div className="ag-theme-alpine-dark" style={{height: "400px", width:"50%", margin: "auto" }}>
        <AgGridReact
            animateRows={true}
            rowSelection="single"
            defaultColDef={{resizable: true}}
            columnDefs={columns}
            rowData={customer}
            onGridReady={onGridReady}
          
            ></AgGridReact>
            </div>
           
        </div>
    )
}

export default Customerlist
