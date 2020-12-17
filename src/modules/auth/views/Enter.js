import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@material-ui/core";
import { loginStyles } from "..";
import { emailRegx, nameRegx } from "../../../utils/const";
import { useHistory } from "react-router-dom";
import { Signup, Login } from "../apis/api";
import { isAuthenticated } from "../../../utils/common";

const Enter = ({ setLoggedIn, toggleSnackbar }) => {
  const classes = loginStyles();
  const history = useHistory();
  const [type, setType] = useState(true);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) history.push("/dashboard");
  }, [0]);

  const validate = (data) => {
    const error = { ...errors };
    if (data?.name) {
      if (data.name.trim() === "") error.name = "Required";
      else if (!nameRegx.test(data.name.trim()))
        error.name = "Not a valid name";
      else delete error.name;
    } else if (!type) error.name = "Required";

    if (data?.email) {
      if (data.email.trim() === "") error.email = "Required";
      else if (!emailRegx.test(data.email)) error.email = "Not a valid email";
      else delete error.email;
    } else error.email = "Required";

    if (data?.password) {
      if (data.password.trim() === "") error.password = "Required";
      else if (data.password.length < 6) error.password = "Password too small";
      else delete error.password;
    } else error.password = "Required";
    setErrors({ ...error });
    return error;
  };

  const handleTextFieldChange = ({ target }) => {
    let temp = { ...formData };
    temp[target.name] = target.value;
    validate(temp);
    setFormData({ ...temp });
  };

  const apiSuccessCallback = (data) => {
    if (!data?.error) {
      localStorage.setItem("key", data.token);
      localStorage.setItem("userProfile", JSON.stringify(data.user));
      setLoggedIn(true);
      history.push("/dashboard");
    } else
      toggleSnackbar({
        severity: "error",
        status: data.error,
      });
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const check = Object.keys(validate(formData)).length === 0;
    if (check) {
      if (!type) {
        Signup(formData, apiSuccessCallback);
      } else {
        Login(formData, apiSuccessCallback);
      }
    }
  };

  return (
    <div className={classes.root}>
      <form className={classes.form}>
        <Typography variant="h5">{type ? "Login" : "Signup"}</Typography>
        {!type && (
          <TextField
            name="name"
            label="Name"
            required
            error={errors?.name && errors.name !== ""}
            helperText={errors.name}
            onChange={handleTextFieldChange}
          />
        )}
        <TextField
          name="email"
          label="Email"
          required
          error={errors?.email && errors.email !== ""}
          helperText={errors.email}
          onChange={handleTextFieldChange}
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          required
          error={errors?.password && errors.password !== ""}
          helperText={errors.password}
          onChange={handleTextFieldChange}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          {type ? "Login" : "Sign Up"}
          {loading && (
            <CircularProgress
              color="secondary"
              disableShrink
              size={20}
              style={{ position: "absolute", right: 10 }}
            />
          )}
        </Button>
        <Button variant="text" onClick={() => setType(!type)}>
          {type ? "Don't" : "Already"} have an account?
        </Button>
      </form>
      <div className={classes.banner} id="banner">
        <Typography variant="h4">Welcome!</Typography>
        <Typography variant="body1">
          Manage your tasks in agile method and achieve more in less time.
        </Typography>
        <Typography variant="body1">
          Create boards, add tasks, manage contributors and more..
        </Typography>
      </div>
    </div>
  );
};

export default Enter;
