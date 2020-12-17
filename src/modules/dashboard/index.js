import { makeStyles } from "@material-ui/core";
import { lazy } from "react";

const Dashboard = lazy(() => import("./view/index.js"));

export { Dashboard };

export const bannerStyles = makeStyles((theme) => ({
  root: {
    height: "80vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    background: "rgba(255,255,255,0.8)",
    textAlign: "center",
    padding: "1rem",
    width: "80vw",
    border: `4px dashed ${theme.palette.primary.main}`,
    [theme.breakpoints.up("md")]: {
      width: "60vw",
    },
    [theme.breakpoints.up("lg")]: {
      width: "40vw",
    },
  },
  btn: {
    cursor: "pointer",
  },
}));

export const dashboardStyles = makeStyles((theme) => ({
  root: {
    padding: "1rem",
    maxHeight: "88vh",
    overflowY: "scroll",
  },
  popper: {
    padding: "0.5rem",
    boxShadow: theme.shadows[5],
    fontSize: "1.2em",
    background: "rgba(0,0,0,0.5)",
    color: "white",
  },
}));

export const addBoardStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  addBoard: {
    boxShadow: theme.shadows[5],
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    background: "#fff",
    outline: "none",
  },
  fields: {
    display: "flex",
    flexDirection: "column",
    padding: "1rem",
  },
  chipContainer: {
    margin: "1rem",
    marginTop: "0",
    padding: "10px",
    boxShadow: theme.shadows[3],
    borderRadius: "8px",
    height: "100px",
    overflowY: "scroll",
  },
}));
