import React from "react";
import { Box, Chip, Typography } from "@material-ui/core";
import { headerStyles } from "../..";
import { useHistory } from "react-router-dom";
import { Logout } from "../../../modules/auth/apis/api";

const Header = ({ loggedIn, toggleSnackbar, setLoggedIn }) => {
  const classes = headerStyles();
  const history = useHistory();

  const logoutHandler = () => {
    Logout({}, (data) => {
      if (!data.error) {
        setLoggedIn(false);
        history.push("/");
        localStorage.clear();
      } else {
        toggleSnackbar({
          severity: "error",
          status: data.error,
        });
      }
    });
  };

  return (
    <Box className={classes.root}>
      <Chip
        label={<Typography variant="h6">KanBan</Typography>}
        color="secondary"
        onClick={() => history.push("/dashboard")}
      />
      {loggedIn && (
        <Chip
          className={classes.btn}
          label={<Typography variant="h6">Logout</Typography>}
          color="secondary"
          onClick={logoutHandler}
        />
      )}
    </Box>
  );
};

export default Header;
