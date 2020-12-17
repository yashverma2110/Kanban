import React, { useRef } from "react";
import { Box, Typography, TextField } from "@material-ui/core";
import _ from "lodash";
import Search from "@material-ui/icons/Search";
import { searchInputStyles } from "..";

export const SearchInput = ({ searchHandler, title }) => {
  const classes = searchInputStyles();
  const txtInput = useRef();

  const handleSearch = () => {
    searchHandler(txtInput?.current?.value);
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.pill}>
        <Typography component="span">{title}</Typography>
      </Box>
      <Box>
        <TextField
          inputRef={txtInput}
          placeholder="search"
          InputProps={{
            endAdornment: <Search color="secondary" />,
          }}
          onChange={_.debounce(handleSearch, 1000)}
        />
      </Box>
    </Box>
  );
};
