import { makeStyles } from "@material-ui/core";
import { lazy } from "react";

const Board = lazy(() => import("./views/index.js"));

export { Board };

export const boardPageStyles = makeStyles((theme) => ({
  root: {
    padding: "1rem",
  },
  popper: {
    background: "#fff",
    paddingTop: "5px",
    zIndex: 999,
    borderRadius: "8px",
    boxShadow: theme.shadows[5],
    maxWidth: "30vw",
  },
}));

export const containerStyles = makeStyles((theme) => ({
  root: {
    background: "rgba(255,255,255,0.8)",
    borderRadius: "8px",
    margin: "0 1rem",
  },
  titleBox: {
    borderRadius: "8px",
    background: theme.palette.primary.main,
    padding: "1rem",
  },
  title: {
    color: "white",
    letterSpacing: "1px",
    fontWeight: 600,
  },
  empty: {
    height: "200px",
    width: "100%",
    background: "rgba(255,255,255,0.7)",
    border: "2px dashed",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  cardBox: {
    borderRadius: "0px 8px",
    height: "fit-content",
    maxHeight: "40vh",
    overflowY: "scroll",
    borderTop: "none",
    padding: "1rem",
    [theme.breakpoints.up("lg")]: {
      maxHeight: "90vh",
    },
  },
}));

export const taskPopUpStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    background: "#fff",
    borderRadius: "8px",
    maxWidth: "90vw",
    outline: "none",
    boxShadow: theme.shadows[5],
    [theme.breakpoints.up("md")]: {
      maxWidth: "70vw",
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: "40vw",
    },
  },

  btn: {
    width: "100%",
  },
  search: {
    margin: theme.spacing(1),
  },
}));
