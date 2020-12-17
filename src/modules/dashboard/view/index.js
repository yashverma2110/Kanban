import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  Box,
  Chip,
  CardHeader,
  IconButton,
  Popper,
  Paper,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Banner } from "../components/Banner";
import { dashboardStyles } from "..";
import { useHistory } from "react-router-dom";
import { ContributorList } from "../../../shared/components/ContributorList";
import { getAllBoards } from "../apis/api";
import { AddBoard } from "../components/AddBoard";
import Add from "@material-ui/icons/Add";
import Info from "@material-ui/icons/Info";
import { getFormattedDate, isAuthenticated } from "../../../utils/common";
import { Loader } from "../../../shared/components/Loader";

const Dashboard = ({ toggleSnackbar }) => {
  const classes = dashboardStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [boards, setBoards] = useState([]);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currDesc, setCurrDesc] = useState("");

  useEffect(() => {
    if (!isAuthenticated()) history.push("/");
  }, [0]);

  useEffect(() => {
    getAllBoards((data) => {
      if (!data?.error) {
        setBoards(data.boards);
        setLoading(false);
      } else {
        toggleSnackbar({
          severity: "error",
          status: data.error,
        });
        setLoading(false);
      }
    });
  }, [open]);

  const infoHandler = (event, desc) => {
    event.stopPropagation();
    setCurrDesc(desc);
    setAnchorEl(event.target);
    setTimeout(() => setAnchorEl(null), 2000);
  };

  if (loading) return <Loader />;

  if (boards.length === 0)
    return (
      <>
        <Banner setOpen={setOpen} />
        <AddBoard
          open={open}
          onClose={() => setOpen(false)}
          toggleSnackbar={toggleSnackbar}
        />
      </>
    );
  else
    return (
      <Grid container spacing={2} className={classes.root}>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center">
            <Chip
              label={<Typography variant="h6">New Board</Typography>}
              icon={<Add color="primary" />}
              onClick={() => setOpen(true)}
              color="secondary"
            />
          </Box>
        </Grid>
        {boards.map((board, index) => (
          <Grid key={index} item xs={12} sm={4} lg={2}>
            <Card onClick={(e) => history.push(`/board?id=${board._id}`)}>
              <CardActionArea>
                <CardHeader
                  title={board.title}
                  action={
                    <IconButton
                      onClick={(e) =>
                        infoHandler(e, getFormattedDate(board.createdAt))
                      }
                    >
                      <Info />
                    </IconButton>
                  }
                />
                <CardContent>
                  <Typography>{board.desc}</Typography>
                  <br />
                  <Box display="flex" justifyContent="flex-end">
                    <ContributorList list={board.contributors} />
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
        <AddBoard
          open={open}
          onClose={() => setOpen(false)}
          toggleSnackbar={toggleSnackbar}
        />
        <Popper open={Boolean(anchorEl)} anchorEl={anchorEl}>
          <Paper elevation={3} className={classes.popper}>
            {currDesc}
          </Paper>
        </Popper>
      </Grid>
    );
};

export default Dashboard;
