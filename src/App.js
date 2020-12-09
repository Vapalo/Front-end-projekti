import "./App.css";
import {
  AppBar,
  Grid,
  makeStyles,
  Tab,
  Tabs,
  Toolbar,
} from "@material-ui/core";
import React, { useState } from "react";
import Customerlist from "./components/Customerlist";
import Trainings from "./components/Trainings";
import Home from "./components/Home";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  otsikko: {
    width: 135,
    height: 40,
  },
  bar: {
    backgroundColor: "grey",
  },
});

function App() {
  const classes = useStyles();
  const [value, setValue] = useState("one");

  return (
    <div>
      <nav className={classes.root}>
        <AppBar position="sticky" color="inherit" className={classes.bar}>
          <Toolbar>
            <Grid justify={"space-between"} container>
              <Grid xs={1} item>
                <h3 className={classes.otsikko}>Personal Trainer</h3>
              </Grid>
              <Grid xs={4} item>
                <Grid container justify={"center"} width="25%">
                  <Tabs
                    variant="scrollable"
                    scrollButtons="auto"
                    onChange={(e, v) => setValue(v)}
                    value={value}
                    aria-label="Navigation Tabs"
                  >
                    <Tab label={"Home"} value="one" />
                    <Tab label={"Customer list"} value="two" />
                    <Tab label={"Training list"} value="three" />
                  </Tabs>
                </Grid>
              </Grid>
              <Grid item xs={1} />
            </Grid>
          </Toolbar>
        </AppBar>
        {value === "one" && <Home />}
        {value === "two" && <Customerlist />}
        {value === "three" && <Trainings />}
      </nav>
    </div>
  );
}

export default App;
