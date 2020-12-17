import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  Popper,
  Typography,
} from "@material-ui/core";
import { Container } from "../components/Container";
import { boardPageStyles } from "..";
import { TaskPopUp } from "../components/TaskPop";
import { boardTypes } from "../../../utils/const";
import { getAllTasks, updateBoard } from "../apis/api";
import { MemberSelector } from "../../../shared/components/MemberSelector";
import { getAllUsers } from "../../dashboard/apis/api";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import { Loader } from "../../../shared/components/Loader";
import { isAuthenticated } from "../../../utils/common";
import { useHistory } from "react-router-dom";

const Board = ({ toggleSnackbar }) => {
  const classes = boardPageStyles();
  const id = window.location.href.split("=")[1];
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [users, setUsers] = useState([]);
  const [currTask, setCurrTask] = useState(null);
  const [type, setType] = useState("add");
  const [boardDetails, setBoardDetails] = useState({});
  const [refreshParam, setRefreshParam] = useState("");
  const [selectedContributors, setSelectedContributos] = useState([]);

  useEffect(() => {
    if (!isAuthenticated()) history.push("/");
    getAllTasks(id, (data) => {
      if (!data?.error) {
        setBoardDetails(data.board);
        setLoading(false);
      } else
        toggleSnackbar({
          severity: "error",
          status: data.error,
        });
      setLoading(false);
    });
    getUsers();
  }, [0]);

  const getUsers = () => {
    getAllUsers((data) => {
      setUsers(data.users);
    });
  };

  const getDataFromMemberSelector = (data) => {
    setSelectedContributos(data);
  };

  const handleEditBoardContributors = (data) => {
    updateBoard(
      { contributors: selectedContributors, _id: boardDetails._id },
      (data) => {
        setBoardDetails(data.board);
        setAnchorEl(null);
      }
    );
  };

  if (loading) return <Loader />;
  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid item xs={12}>
        <Box display="flex" justifyContent="center">
          <Chip
            label={<Typography variant="h6">Edit contributors</Typography>}
            icon={<Edit color="primary" />}
            onClick={({ target }) => setAnchorEl(target)}
            color="secondary"
          />
        </Box>
      </Grid>
      {boardTypes.map((t, index) => (
        <Grid item xs={12} sm={6} lg={3} key={index}>
          <Container
            title={t}
            board={boardDetails}
            open={open}
            setCurrTask={setCurrTask}
            setOpen={setOpen}
            setType={setType}
            refreshParam={refreshParam}
            setRefreshParam={setRefreshParam}
          />
        </Grid>
      ))}
      <Popper
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        className={classes.popper}
      >
        <Box display="flex" justifyContent="flex-end" alignItems="center">
          <IconButton onClick={() => setAnchorEl(null)} style={{ padding: 0 }}>
            <Close />
          </IconButton>
        </Box>
        <MemberSelector
          list={users}
          selectedList={boardDetails.contributors}
          getData={getDataFromMemberSelector}
        />
        <Box display="flex">
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleEditBoardContributors}
          >
            Save
          </Button>
        </Box>
      </Popper>
      <TaskPopUp
        open={open}
        setOpen={setOpen}
        task={currTask}
        board={boardDetails}
        type={type}
      />
    </Grid>
  );
};

export default Board;
