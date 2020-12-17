import { lazy } from "react";
import { makeStyles } from "@material-ui/core";

const Enter = lazy(() => import("./views/Enter"));

export { Enter };

export const loginStyles = makeStyles(
  (theme) => ({
    root: {
      display: "flex",
      height: "82vh",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      padding: "1rem 2.5rem",
      [theme.breakpoints.up("md")]: {
        flexDirection: "row",
      },
    },
    form: {
      background: theme.palette.secondary.main,
      border: `2px solid ${theme.palette.primary.main}`,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height: "41vh",
      padding: "1rem",
      width: "88%",
      animation: `$slide-up 1s ${theme.transitions.easing.easeInOut}`,
      [theme.breakpoints.up("md")]: {
        animation: `$slide-left 1s ${theme.transitions.easing.easeInOut}`,
        width: "50%",
        height: "35vh",
      },
      [theme.breakpoints.up("lg")]: {
        animation: `$slide-left 1s ${theme.transitions.easing.easeInOut}`,
        width: "30%",
        height: "35vh",
      },
    },
    banner: {
      display: "flex",
      height: "41vh",
      justifyContent: "space-evenly",
      textAlign: "center",
      flexDirection: "column",
      padding: "1rem",
      animation: `$slide-down 1s ${theme.transitions.easing.easeInOut}`,
      zIndex: 1,
      width: "88%",
      [theme.breakpoints.up("md")]: {
        animation: `$slide-right 1s ${theme.transitions.easing.easeInOut}`,
        width: "50%",
        height: "35vh",
      },
      [theme.breakpoints.up("lg")]: {
        animation: `$slide-right 1s ${theme.transitions.easing.easeInOut}`,
        width: "30%",
        height: "35vh",
      },
    },
    "@keyframes slide-up": {
      from: {
        transform: "translateY(50%)",
      },
      to: {
        transform: "translateY(0%)",
      },
    },
    "@keyframes slide-right": {
      from: {
        transform: "translateX(-50%)",
      },
      to: {
        transform: "translateX(0%)",
      },
    },
    "@keyframes slide-down": {
      from: {
        transform: "translateY(-50%)",
      },
      to: {
        transform: "translateY(0%)",
      },
    },
    "@keyframes slide-left": {
      from: {
        transform: "translateX(50%)",
      },
      to: {
        transform: "translateX(0%)",
      },
    },
  }),
  {
    index: 1,
  }
);
