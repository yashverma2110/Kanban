import React from "react";
import { Box, Chip, Typography } from "@material-ui/core";
import Add from "@material-ui/icons/Add";
import downGif from "../../../assets/visit-arrow.gif";
import { bannerStyles } from "..";

export const Banner = ({ setOpen }) => {
  const classes = bannerStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.container}>
        <Typography variant="h4">Hi!</Typography>
        <br />
        <Typography>
          Get into a new level of task management. We use agile methodology for
          managing your todo list and bringing to the peak of your efficiency.
        </Typography>
        <br />
        <Typography>
          Manage your tasks in a visually engaging and interactive way.
        </Typography>
        <br />
        <Typography>
          Let's get you started by creating your first board.
        </Typography>
        <br />
        <img src={downGif} alt="downGif" className={classes.downGif} />
        <br />
        <br />
        <Chip
          label={<Typography variant="h6">New Board</Typography>}
          color="primary"
          icon={<Add />}
          onClick={() => setOpen(true)}
          className={classes.btn}
        />
      </Box>
    </Box>
  );
};
