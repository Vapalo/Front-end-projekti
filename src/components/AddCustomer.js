import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { useConfirm } from "material-ui-confirm";

function AddCustomer(props) {
  const [open, setOpen] = useState(false);
  const confirm = useConfirm();
  const [customer, setCustomer] = useState({
    firstname: "",
    lastname: "",
    city: "",
    streetaddress: "",
    postcode: "",
    email: "",
    phone: "",
  });

  const handleClickOpen = () => {
    setOpen(true);

    setCustomer({
      firstname: "",
      lastname: "",
      city: "",
      streetaddress: "",
      postcode: "",
      email: "",
      phone: "",
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    event.preventDefault();
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  };

  const saveCustomer = () => {
    confirm({
      description: `Add ${customer.firstname} ${customer.lastname} to the list?`,
    })
      .then(() => {
        props.saveCustomer(customer);
        setOpen(false);
      })
      .catch(() => console.log("Edit was cancelled"));
  };

  return (
    <div>
      <Button
        style={{ margin: "5px", opacity: "90%" }}
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
      >
        Add a customer
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add a customer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the following information
          </DialogContentText>
          <TextField
            color="white"
            autoFocus
            margin="dense"
            id="firstname"
            label="First name"
            name="firstname"
            value={customer.firstname}
            required
            onChange={(event) => handleChange(event)}
          />
          <TextField
            margin="dense"
            id="lastname"
            label="Last Name"
            name="lastname"
            value={customer.lastname}
            onChange={(event) => handleChange(event)}
            required
          />
          <TextField
            margin="dense"
            id="city"
            label="City"
            name="city"
            value={customer.city}
            onChange={(event) => handleChange(event)}
            required
          />
          <TextField
            margin="dense"
            id="streetaddress"
            label="Street Address"
            name="streetaddress"
            value={customer.streetaddress}
            onChange={(event) => handleChange(event)}
            required
          />
          <TextField
            margin="dense"
            id="postcode"
            label="Postcode"
            name="postcode"
            value={customer.postcode}
            onChange={(event) => handleChange(event)}
            required
          />
          <TextField
            margin="dense"
            id="email"
            label="Email"
            name="email"
            value={customer.email}
            onChange={(event) => handleChange(event)}
            required
          />
          <TextField
            margin="dense"
            id="phone"
            label="Phone"
            name="phone"
            value={customer.phone}
            onChange={(event) => handleChange(event)}
            required
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={saveCustomer} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default AddCustomer;
