import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Button, IconButton, Toolbar } from "@material-ui/core";
import { Home as HomeIcon } from "@material-ui/icons";
import GitHubIcon from "@material-ui/icons/GitHub";
import { useHistory } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";

const useStyles = makeStyles((theme) => ({
  drawerContents: {
    minWidth: 300,
    padding: 20,
  },
  appBar: {
    background:
      "repeating-linear-gradient(45deg, #333333 0, #333333 5%, #4f4f4f 0, #4f4f4f 50%) 0 / 10px 10px",
    flexGrow: 1,
  },
  button: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "inherit",
    },
    margin: theme.spacing(1),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    textAlign: "left",
  },

  subtitle2: {
    color: "#ddd",
    marginLeft: 25,
    flexGrow: 1,
  },
  barContent: {},
  endContent: {},
  startContent: { display: "flex", flexGrow: 1 },
}));

export default function Menu({ BarContent, DrawerContent }) {
  const classes = useStyles();
  const history = useHistory();
  const { authState, oktaAuth } = useOktaAuth();

  if (!authState) {
    return <div>Loading...</div>;
  }

  const AuthenticateButton = authState.isAuthenticated ? (
    <Button
      color="default"
      variant="contained"
      onClick={() => {
        oktaAuth.signOut();
      }}
    >
      Logout
    </Button>
  ) : (
    <Button
      color="primary"
      variant="contained"
      onClick={() => {
        history.push("/login");
      }}
    >
      Login
    </Button>
  );

  return (
    <>
      {DrawerContent}
      <AppBar className={classes.appBar} position="sticky">
        <Toolbar>
          <div className={classes.startContent}>{BarContent}</div>

          <div className={classes.endContent}>
            {AuthenticateButton}
            <IconButton
              onClick={() => history.push("/home")}
              style={{ color: "white" }}
            >
              <HomeIcon />
            </IconButton>
            <IconButton
              href="https://github.com/Krakenhaus/animalcrossing/issues"
              target="_blank"
              style={{ color: "white" }}
            >
              <GitHubIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
}
