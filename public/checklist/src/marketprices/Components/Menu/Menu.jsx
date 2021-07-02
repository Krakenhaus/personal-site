import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  PlaylistAdd as PlaylistAddIcon,
} from "@material-ui/icons";
import GitHubIcon from "@material-ui/icons/GitHub";
import Folders from "./Folders";

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
}));

export default function Menu({
  allFolders,
  selectedFolder,
  handleAddFolder,
  handleDeleteFolder,
  handleOpenSearchDialog,
  handleSelectFolder,
}) {
  const classes = useStyles();

  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false);

  return (
    <>
      <Drawer
        anchor="left"
        open={isMenuDrawerOpen}
        onClose={() => setIsMenuDrawerOpen(false)}
      >
        <div className={classes.drawerContents}>
          <Folders
            allFolders={allFolders}
            selectedFolder={selectedFolder}
            handleAddFolder={handleAddFolder}
            handleDeleteFolder={handleDeleteFolder}
            handleSelectFolder={(newFolder) => {
              handleSelectFolder(newFolder);
              setIsMenuDrawerOpen(false);
            }}
          />
        </div>
      </Drawer>
      <AppBar className={classes.appBar} position="sticky">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setIsMenuDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Current Market Prices
          </Typography>
          <Typography variant="subtitle2" className={classes.subtitle2}>
            This product uses TCGplayer data but is not endorsed or certified by
            TCGplayer.
          </Typography>

          <Button
            variant="contained"
            color="secondary"
            onClick={handleOpenSearchDialog}
            className={classes.button}
            startIcon={<PlaylistAddIcon />}
          >
            Add Card
          </Button>
          <Button
            href="https://github.com/Krakenhaus/animalcrossing/issues"
            target="_blank"
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<GitHubIcon />}
          >
            Report issues on GitHub
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
}
