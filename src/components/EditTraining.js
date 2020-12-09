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

function EditTraining(props) {
  const [open, setOpen] = useState(false);
  const confirm = useConfirm();
  const [text, setText] = useState("");
  const [date, setDate] = useState(new Date());
  const [training, setTraining] = useState({
    activity: "",
    date: "",
  });
  console.log(training);

  const handleClickOpen = () => {
    if (props.gridRef.current.getSelectedNodes().length > 0) {
      let data = props.gridRef.current.getSelectedNodes()[0].data;
      setOpen(true);

      setTraining({
        activity: data.activity,
        date: data.date,
      });
    } else {
      alert("please select an excercise first");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleText = (event) => {
    event.preventDefault();
    setText(event.target.value);
  };

  const handleDate = (date) => {
    setDate(date);
  };

  const editTraining = () => {
    setTraining(...training, {
      activity: text,
      date: moment(date).toISOString(),
    });
    console.log(training);

    confirm({
      description: `Save edits to ${training.activity} ${training.date}?`,
    })
      .then(() => {
        let link = props.gridRef.current.getSelectedNodes()[0].data.links[0]
          .href;
        props.modifyTraining(training, link);
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
        Edit selected excercise
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit an excercise</DialogTitle>
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
          <Button onClick={editTraining} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditTraining;
