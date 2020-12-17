import {
  Box,
  Button,
  Checkbox,
  Chip,
  Modal,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { addBoardStyles } from "..";
import { MemberSelector } from "../../../shared/components/MemberSelector";
import { SearchInput } from "../../../shared/components/SearchInput";
import { getUserDetails } from "../../../utils/common";
import { addNewBoard, getAllUsers } from "../apis/api";

export const AddBoard = ({ open, onClose, toggleSnackbar }) => {
  const classes = addBoardStyles();
  const [formData, setFormData] = useState({});
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    getData();
  }, [0]);

  const getData = () => {
    getAllUsers((data) => {
      setUsers(data.users);
    });
  };

  const validate = (data) => {
    let error = { ...errors };
    if (!data?.title || data.title.trim() === "") error.title = "Required";
    else if (data.title.length > 20) error.title = "Only 20 charachters";
    else delete error.title;
    if (!data?.desc || data.desc.trim() === "") error.desc = "Required";
    else if (data.desc.length > 30) error.desc = "Only 30 charachters";
    else delete error.desc;
    setErrors({ ...error });
  };

  const handleChangeTextField = ({ target }) => {
    let temp = { ...formData };
    temp[target.name] = target.value;
    validate(temp);
    setFormData({ ...temp });
  };

  const handleAddBoard = (e) => {
    e.preventDefault();
    validate(formData);
    const check = Object.keys(errors).length === 0;
    if (check) {
      addNewBoard(formData, (data) => {
        if (!data.error) {
          onClose();
        } else
          toggleSnackbar({
            severity: "error",
            status: data.error,
          });
      });
    }
  };

  const getContributorsData = (data) => {
    setFormData({ ...formData, contributors: data });
  };

  return (
    <Modal open={open} onClose={onClose} className={classes.root}>
      <Box className={classes.addBoard}>
        <Box className={classes.fields}>
          <TextField
            name="title"
            label="Title"
            error={errors?.title && errors?.title !== ""}
            helperText={errors?.title}
            inputProps={{
              autocomplete: "off",
            }}
            required
            onChange={handleChangeTextField}
          />
          <TextField
            name="desc"
            label="Description"
            inputProps={{
              autocomplete: "off",
            }}
            error={errors?.desc && errors.desc !== ""}
            helperText={errors?.desc}
            required
            onChange={handleChangeTextField}
          />
          <Box>
            <MemberSelector list={users} getData={getContributorsData} />
          </Box>
        </Box>
        <Button variant="contained" color="primary" onClick={handleAddBoard}>
          Submit
        </Button>
      </Box>
    </Modal>
  );
};
