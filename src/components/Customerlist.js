import React, { useEffect, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import Button from "@material-ui/core/Button";
import { useConfirm } from "material-ui-confirm";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import EditCustomer from "./EditCustomer";

function Customerlist() {
  const [customer, setCustomer] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const gridRef = useRef();
  const confirm = useConfirm();
  const custUrl = "https://customerrest.herokuapp.com/api/customers";

  const getCustomers = () => {
    fetch(custUrl)
      .then((res) => res.json())
      .then((data) => setCustomer(data.content));
  };

  const onGridReady = (params) => {
    setGridApi(params.api);
    gridRef.current = params.api;
    params.api.sizeColumnsToFit();
  };

  useEffect(() => getCustomers(), []);

  const columns = [
    {
      headerName: "First name",
      field: "firstname",
      filter: true,
      sortable: true,
      floatingFilter: true,
    },
    {
      headerName: "Last name",
      field: "lastname",
      filter: true,
      sortable: true,
      floatingFilter: true,
    },
    {
      headerName: "City",
      field: "city",
      filter: true,
      sortable: true,
      floatingFilter: true,
    },
  ];

  const deleteFunction = (id) => {
    fetch(id, { method: "DELETE" })
      .then((res) => getCustomers())
      .catch((error) => console.log(error));
  };

  const deleteClick = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {
      let selected = gridRef.current.getSelectedNodes()[0].data;
      console.log(selected);

      confirm({
        description: `Are you sure you want to delete ${selected.firstname}?`,
      })
        .then(() => {
          deleteFunction(selected.links[0].href);
        })
        .catch(() => console.log("Delete was cancelled"));
    } else {
      alert("Please select a customer first");
    }
  };

  const modifyCustomer = (customer, link) => {
    fetch(link, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(customer),
    })
      .then((res) => getCustomers())
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <div className="nappulat">
        <Button
          style={{ margin: "5px", opacity: "90%" }}
          variant="contained"
          color="primary"
        >
          Add a customer
        </Button>
        <EditCustomer gridRef={gridRef} modifyCustomer={modifyCustomer} />
        <Button
          onClick={deleteClick}
          style={{ margin: "5px", opacity: "90%" }}
          variant="contained"
          color="secondary"
        >
          Delete selected customer
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
          ref={gridRef}
          animateRows={true}
          rowSelection="single"
          defaultColDef={{ resizable: true }}
          columnDefs={columns}
          rowData={customer}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
}

export default Customerlist;
