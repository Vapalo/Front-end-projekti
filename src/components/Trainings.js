import { Button } from '@material-ui/core'
import { AgGridReact } from 'ag-grid-react/lib/agGridReact'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import 'moment/locale/fi'

function Trainings() {
    const [training, setTraining] = useState([])
    const [show, setShow] = useState([])

    const trainUrl = "https://customerrest.herokuapp.com/api/trainings"
    const [gridApi, setGridApi] = useState(null)
    

    const getTrainings = () => {
        fetch(trainUrl)
        .then(res => res.json())
        .then(data => setTraining(data.content))
    }
       
    

     function formatDate() {
        training.map((tulos, index) => setShow([...show, {
            date: moment(tulos.date).format("DD.MM.YYYY"),
            activity: tulos.activity
        }]))
        console.log(show)
    }
    
    const onGridReady = (params) => {
        setGridApi(params.api)
        
        params.api.sizeColumnsToFit()
    }
    
    useEffect(() => getTrainings(), [])
    
    
    
    const columns = [
        {
            headerName: 'Activity',
            field: 'activity',
            filter: true,
            sortable: true,
            floatingFilter: true
            
        },
        {
            headerName: 'Date',
            field: 'date',
            filter: true,
            sortable: true,
            floatingFilter: true
            
        },
        
    ]

    moment(training.date).format("DD.MM.YYYY")
    
    console.log(training)
    return (
        <div>
                      
             <div className="nappulat">
                <Button style= {{margin: "5px"}} variant="contained" color="primary">Add a excercise</Button>
                <Button style={{margin: "5px"}} variant="contained" color="primary">Edit selected excercise</Button>
                <Button style={{margin: "5px"}} variant="contained" color="secondary">Delete selected excercise</Button>
            </div>
            <button onClick={formatDate}>Paskavittu</button>
           
        <div className="ag-theme-alpine-dark" style={{height: "400px", width:"50%", margin: "auto" }}>
        <AgGridReact
            animateRows={true}
            rowSelection="single"
            defaultColDef={{resizable: true}}
            columnDefs={columns}
            rowData={training}
            onGridReady={onGridReady}
          
            ></AgGridReact>
        </div>
        </div>
    )
}

export default Trainings
