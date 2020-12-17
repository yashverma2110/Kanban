import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@material-ui/core";
import { taskPopUpStyles } from "..";
import { boardTypes } from "../../../utils/const";
import { addTask, updateTask } from "../apis/api";
import { MemberSelector } from "../../../shared/components/MemberSelector";

export const TaskPopUp = ({ open, setOpen, task, type, board }) => {
  const classes = taskPopUpStyles();
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({
    contributors: [],
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) {
      if (type === "add") {
        setEdit(true);
      } else {
        setFormData(task);
      }
    }
  }, [open]);

  const handleChange = ({ target }) => {
    let temp = { ...formData };
    temp[target.name] = target.value;
    validate(temp);
    setFormData({ ...temp });
  };

  const validate = (data) => {
    let error = { ...errors };
    if (!data?.title && data.title !== "") error.title = "Required";
    else delete error.title;
    setErrors(error);
  };

  const getContribtorList = (data) => {
    setFormData({ ...formData, contributors: data });
  };

  const handleSubmit = () => {
    validate(formData);
    const check = Object.keys(errors).length === 0;
    if (check) {
      if (type === "add")
        addTask({ ...formData, id: board._id, status: open }, () => {
          setOpen(false);
        });
      else
        updateTask({ ...formData }, () => {
          setEdit(false);
          setOpen(false);
        });
    }
  };

  return (
    <Modal
      open={Boolean(open)}
      onClose={() => setOpen(false)}
      className={classes.root}
    >
      <Grid container className={classes.modal}>
        <Grid item xs={12} style={{ padding: "1rem" }}>
          <Grid container alignItems="center">
            <Grid item xs={12}>
              <TextField
                label="Title"
                required
                value={formData?.title}
                error={errors?.title && errors.title !== ""}
                helperText={errors.title}
                disabled={!edit}
                inputProps={{
                  autocomplete: "off",
                }}
                style={{ width: "100%" }}
                name="title"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <MemberSelector
                type={type}
                list={board.contributors}
                selectedList={task?.contributors}
                getData={getContribtorList}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                multiline
                rows={3}
                inputProps={{
                  autocomplete: "off",
                }}
                rowsMax={5}
                value={formData?.desc}
                disabled={!edit}
                style={{ width: "100%" }}
                name="desc"
                onChange={handleChange}
              />
            </Grid>
            {type !== "add" && (
              <Grid item xs={12}>
                <br />
                <Typography>Move To</Typography>
                <ButtonGroup color="primary" variant="text">
                  {boardTypes.map((type, index) => {
                    if (type !== task.status)
                      return (
                        <Button
                          key={index}
                          onClick={() =>
                            setFormData({ ...formData, status: type })
                          }
                        >
                          {type}
                        </Button>
                      );
                    return "";
                  })}
                </ButtonGroup>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {!edit ? (
            <Button
              color="primary"
              variant="contained"
              onClick={() => setEdit(true)}
              className={classes.btn}
            >
              Edit
            </Button>
          ) : (
            <Button
              color="primary"
              variant="contained"
              className={classes.btn}
              onClick={handleSubmit}
            >
              Save
            </Button>
          )}
        </Grid>
      </Grid>
    </Modal>
  );
};
