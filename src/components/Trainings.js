import { Button } from "@material-ui/core";
import { AgGridReact } from "ag-grid-react/lib/agGridReact";
import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import "moment/locale/fi";
import { useConfirm } from "material-ui-confirm";
import AddTraining from "./AddTraining";

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

  {
    headerName: "Customer",
    field: "firstname",
    filter: true,
    sortable: true,
    floatingFilter: true,
  },
];

function Trainings() {
  const gridRef = useRef();
  const [training, setTraining] = useState([]);
  const confirm = useConfirm();

  const trainUrl = "https://customerrest.herokuapp.com/gettrainings";

  const onGridReady = (params) => {
    gridRef.current = params.api;
    params.api.sizeColumnsToFit();
  };

  const getTrainings = () => {
    fetch(trainUrl)
      .then((response) => response.json())
      .then((data) =>
        setTraining(
          data.map((item) => {
            return {
              activity: item.activity,
              date: moment(item.date).format("DD.MM.YYYY"),
              firstname: item.customer.firstname + " " + item.customer.lastname,
              id: item.id,
            };
          })
        )
      );
  };

  useEffect(() => {
    getTrainings();
  }, []);

  const deleteFunction = (id) => {
    fetch(`https://customerrest.herokuapp.com/api/trainings/${id}`, {
      method: "DELETE",
    })
      .then((res) => getTrainings())
      .catch((error) => console.error(error));
  };

  const deleteTraining = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {
      let selected = gridRef.current.getSelectedNodes()[0].data;

      confirm({
        description: `Are you sure you want to delete ${selected.activity}?`,
      })
        .then(() => {
          deleteFunction(selected.id);
        })
        .catch(() => console.log("Delete was cancelled"));
    } else {
      alert("Please select an excercise first");
    }
  };

  const saveTraining = (text, date, id, duration) => {
    const parsedDuration = parseInt(duration);
    fetch(`https://customerrest.herokuapp.com/api/trainings`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        date: date,
        activity: text,
        duration: parsedDuration,
        customer: `https://customerrest.herokuapp.com/api/customers/${id}`,
      }),
    }).then((res) => getTrainings());
  };

  return (
    <div>
      <div className="nappulat">
        <AddTraining saveTraining={saveTraining} />

        <Button
          style={{ margin: "5px", opacity: "90%" }}
          variant="contained"
          color="secondary"
          onClick={deleteTraining}
        >
          Delete selected excercise
        </Button>
      </div>

      <div
        className="ag-theme-alpine-dark"
        style={{
          height: "400px",
          width: "50%",
          margin: "auto",
          opacity: "90%",
        }}
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
