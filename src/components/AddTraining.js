import React, { useState } from "react";
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

function AddTraining(props) {
  const [open, setOpen] = useState(false);
  const confirm = useConfirm();
  const [text, setText] = useState("");
  const [date, setDate] = useState(new Date());
  const [training, setTraining] = useState([
    {
      activity: "",
      date: "",
    },
  ]);

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
    setTraining({
      activity: text,
      date: moment(date).toISOString(),
    });

    saveTraining();
  };

  const saveTraining = () => {
    confirm({
      description: `Add ${training.activity} ${moment(date).format(
        "DD.MM.YYYY"
      )} to the list?`,
    })
      .then(() => {
        props.saveCustomer(training);
        setOpen(false);
        setTraining({
          activity: "",
          date: "",
        });
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
