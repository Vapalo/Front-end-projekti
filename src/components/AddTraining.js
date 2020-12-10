import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { useConfirm } from "material-ui-confirm";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";
import {
  FormControl,
  Input,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
}));

function AddTraining(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const confirm = useConfirm();
  const [text, setText] = useState("");
  const [date, setDate] = useState(new Date());
  const [customers, setCustomers] = useState([]);
  const [customerid, setCustomerid] = useState("");
  const [duration, setDuration] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
    setText("");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleText = (event) => {
    event.preventDefault();
    setText(event.target.value);
    console.log(text);
  };

  const handleDate = (date) => {
    setDate(date);
  };

  const handleClick = () => {
    saveTraining();
  };

  const saveTraining = () => {
    confirm({
      description: `Add ${text} ${moment(date).format(
        "DD.MM.YYYY"
      )} to the list?`,
    })
      .then(() => {
        props.saveTraining(
          text,
          moment(date).toISOString(),
          customerid,
          duration
        );
        setOpen(false);
        setText("");
        setDate(new Date());
        setCustomerid("");
        setDuration("");
      })
      .catch(() => console.log("Edit was cancelled"));
  };

  const getCustomers = () => {
    fetch("https://customerrest.herokuapp.com/getcustomers")
      .then((response) => response.json())
      .then((data) => setCustomers(data));
  };

  useEffect(() => {
    getCustomers();
  }, []);

  const handleID = (event) => {
    event.preventDefault();
    setCustomerid(event.target.value);
  };

  const handleDuration = (event) => {
    event.preventDefault();
    setDuration(event.target.value);
  };

  return (
    <div>
      <Button
        style={{ margin: "5px", opacity: "90%" }}
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
      >
        Add a new excercise
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add a new excercise</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the following information
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="activity"
            label="Activity"
            name="activity"
            value={text}
            required
            onChange={(event) => handleText(event)}
          />
          <TextField
            margin="dense"
            id="duration"
            label="Duration"
            name="duration"
            value={duration}
            required
            onChange={(event) => handleDuration(event)}
          />
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <DatePicker
              id="paiva"
              locale="fi"
              name="date"
              format="DD.MM.YYYY"
              value={date}
              onChange={(date) => handleDate(date)}
            />
          </MuiPickersUtilsProvider>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-mutiple-name-label">Name</InputLabel>
            <Select
              labelId="demo-mutiple-name-label"
              id="demo-mutiple-name"
              single
              value={customerid}
              onChange={(event) => handleID(event)}
              input={<Input />}
            >
              {customers.map((customer) => (
                <MenuItem key={customer.id} value={customer.id}>
                  {customer.firstname + " " + customer.lastname}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClick} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default AddTraining;
