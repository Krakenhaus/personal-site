import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Typography } from "@material-ui/core";
import OktaSignInWidget from "./OktaSignInWidget";
import { useOktaAuth } from "@okta/okta-react";
import { makeStyles } from "@material-ui/core/styles";
import { Menu } from "../../../shared/Components";

import "./login.css";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    overflowY: "scroll",
    // top: 55,
    // position: "relative",
    paddingTop: 20,
    height: "calc(100% - 95px) !important",
    transition: "background-color 0.6s linear",
  },
  title: {
    margin: "auto",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    textAlign: "left",
  },

  subtitle2: {
    margin: "auto",
    color: "#ddd",
    marginLeft: 25,
    flexGrow: 1,
  },
}));

const Login = ({ config }) => {
  const classes = useStyles();
  const { oktaAuth, authState } = useOktaAuth();

  useEffect(() => {
    document.body.classList.add("home-body");

    return () => {
      document.body.classList.remove("home-body");
    };
  });

  const onSuccess = (tokens) => {
    oktaAuth.handleLoginRedirect(tokens);
  };

  const onError = (err) => {
    console.log("error logging in", err);
  };

  if (!authState) return <Menu />;

  const BarContent = () => {
    return (
      <>
        <Typography variant="h6" className={classes.title}>
          Login
        </Typography>
        <Typography variant="subtitle2" className={classes.subtitle2}>
          Don't haven an account? <a>Signup!</a>
        </Typography>
      </>
    );
  };

  return authState.isAuthenticated ? (
    <Redirect to={{ pathname: "/" }} />
  ) : (
    <>
      <Menu BarContent={BarContent()} />
      <div className={classes.root}>
        <OktaSignInWidget
          config={config}
          onSuccess={onSuccess}
          onError={onError}
        />
      </div>
    </>
  );
};
export default Login;
