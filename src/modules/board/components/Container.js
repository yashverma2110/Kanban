import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Paper, Typography } from "@material-ui/core";
import { containerStyles } from "..";
import { SwipeableCard } from "./SwipableCard";
import DoneAll from "@material-ui/icons/DoneAll";
import Add from "@material-ui/icons/Add";
import { getTasks } from "../apis/api";

export const Container = ({
  title,
  board,
  setOpen,
  setCurrTask,
  setType,
  open,
  refreshParam,
  setRefreshParam,
}) => {
  const classes = containerStyles();
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState("");

  useEffect(() => {
    if (board._id || refreshParam === title) {
      getTasks({ status: title, id: board._id }, (data) => {
        if (!data?.error) {
          setTasks(data.tasks);
        }
      });
    }
  }, [board, open, refresh, refreshParam]);

  const clickHandler = (i) => {
    setOpen(title);
    setType("edit");
    setCurrTask(tasks[i]);
  };

  return (
    <Paper className={classes.root} elevation={4}>
      <Grid container>
        <Grid item xs={12} className={classes.titleBox}>
          <Typography variant="h5" className={classes.title}>
            {title}
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.cardBox}>
          {tasks.length === 0 && (
            <Box className={classes.empty}>
              <DoneAll color="primary" />
              <Typography>All Sorted!</Typography>
            </Box>
          )}
          {tasks.map((task, index) => (
            <SwipeableCard
              task={{ ...task, index }}
              key={index}
              setRefresh={setRefresh}
              setRefreshParam={setRefreshParam}
              clickHandler={clickHandler}
            />
          ))}
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            style={{ width: "100%" }}
            startIcon={<Add color="secondary" />}
            onClick={() => {
              setType("add");
              setOpen(title);
            }}
          >
            Add Task
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};
