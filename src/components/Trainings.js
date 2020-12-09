import { Button } from "@material-ui/core";
import { AgGridReact } from "ag-grid-react/lib/agGridReact";
import React, { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/fi";

function Trainings() {
  const [training, setTraining] = useState([]);

  const trainUrl = "https://customerrest.herokuapp.com/api/trainings";
  const [gridApi, setGridApi] = useState(null);

  const onGridReady = (params) => {
    setGridApi(params.api);

    params.api.sizeColumnsToFit();
  };

  useEffect(() => {
    async function getTrainings() {
      try {
        const response = await fetch(trainUrl);
        const json = await response.json();
        console.log(json);
        setTraining(
          json.content.map((item) => {
            return {
              activity: item.activity,
              date: moment(item.date).format("DD.MM.YYYY"),
              link: item.links.self,
            };
          })
        );
      } catch (error) {
        console.log(error);
      }
    }
    getTrainings();
  }, []);

  const columns = [
    {
      headerName: "Activity",
      field: "activity",
      filter: true,
      sortable: true,
      floatingFilter: true,
    },
    {
      headerName: "Date",
      field: "date",
      filter: true,
      sortable: true,
      floatingFilter: true,
    },
  ];

  moment(training.date).format("DD.MM.YYYY");

  return (
    <div>
      <div className="nappulat">
        <Button style={{ margin: "5px" }} variant="contained" color="primary">
          Add a excercise
        </Button>
        <Button style={{ margin: "5px" }} variant="contained" color="primary">
          Edit selected excercise
        </Button>
        <Button style={{ margin: "5px" }} variant="contained" color="secondary">
          Delete selected excercise
        </Button>
      </div>

      <div
        className="ag-theme-alpine-dark"
        style={{ height: "400px", width: "50%", margin: "auto" }}
      >
        <AgGridReact
          animateRows={true}
          rowSelection="single"
          defaultColDef={{ resizable: true }}
          columnDefs={columns}
          rowData={training}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
}

export default Trainings;
