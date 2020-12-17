import React from "react";
import { Box } from "@material-ui/core";
import loadingGif from "../../assets/loading.gif";
import { loaderStyles } from "..";

export const Loader = () => {
  const classes = loaderStyles();
  return (
    <Box className={classes.root}>
      <img src={loadingGif} alt="loader" />
    </Box>
  );
};
