import {
  Box,
  Card,
  CardActionArea,
  CardHeader,
  IconButton,
} from "@material-ui/core";
import ArrowLeft from "@material-ui/icons/ArrowLeft";
import ArrowRight from "@material-ui/icons/ArrowRight";
import React from "react";
import { ContributorList } from "../../../shared/components/ContributorList";
import { boardTypes } from "../../../utils/const";
import { updateTask } from "../apis/api";

export const SwipeableCard = ({
  task,
  clickHandler,
  setRefresh,
  setRefreshParam,
}) => {
  const getIndex = () => {
    for (var i = 0; i < boardTypes.length; i++) {
      if (boardTypes[i] === task.status) return [i - 1, i + 1];
    }
  };

  const handleStatusChangeLeft = (e) => {
    e.stopPropagation();
    const index = getIndex()[0];
    updateTask({ _id: task._id, status: boardTypes[index] }, () => {
      setRefresh("toggle");
      setRefreshParam(task.status);
    });
  };

  const handleStatusChangeRight = (e) => {
    e.stopPropagation();
    const index = getIndex()[1];
    updateTask({ _id: task._id, status: boardTypes[index] }, () => {
      setRefresh(boardTypes[index]);
      setRefreshParam(task.status);
    });
  };

  return (
    <Card
      style={{ marginBottom: "1rem", cursor: "grabbing" }}
      elevation={3}
      onClick={() => clickHandler(task.index)}
    >
      <CardActionArea>
        <CardHeader title={task.title} />
        <Box
          display="flex"
          justifyContent="flex-end"
          style={{ padding: "0rem 1rem 1rem 0rem" }}
        >
          <ContributorList list={task.contributors} />
        </Box>
      </CardActionArea>
      <Box display="flex" justifyContent="space-between">
        <IconButton
          onClick={handleStatusChangeLeft}
          disabled={task.status === "To Do"}
        >
          <ArrowLeft />
        </IconButton>
        <IconButton
          onClick={handleStatusChangeRight}
          disabled={task.status === "Finished"}
        >
          <ArrowRight />
        </IconButton>
      </Box>
    </Card>
  );
};
