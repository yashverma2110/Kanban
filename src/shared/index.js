import { makeStyles } from "@material-ui/core";

export const headerStyles = makeStyles((theme) => ({
  root: {
    height: "5vh",
    padding: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btn: {
    cursor: "pointer",
  },
}));

export const searchInputStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid white",
    borderRadius: "8px 8px 0px 0px",
    background: theme.palette.primary.main,
    marginBottom: 0,
  },
  pill: {
    flexBasis: "33%",
    color: "white",
    textAlign: "center",
    marginRight: "10px",
  },
}));

export const memberListStyles = makeStyles((theme) => ({
  root: {
    margin: "0.5rem",
    boxShadow: theme.shadows[3],
    borderRadius: "8px",
    height: "180px",
    maxWidth: "80vw",
    overflow: "scroll",
  },
  chip: {
    width: "max-content",
  },
  selectedContainer: {
    maxWidth: "99%",
    overflowX: "scroll",
  },
}));

export const loaderStyles = makeStyles((theme) => ({
  root: {
    height: "90vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#fff",
  },
}));
