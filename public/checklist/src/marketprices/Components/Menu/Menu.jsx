import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Drawer, IconButton, Typography } from "@material-ui/core";
import {
  Menu as MenuIcon,
  PlaylistAdd as PlaylistAddIcon,
} from "@material-ui/icons";
import Folders from "./Folders";
import { Menu as SharedMenu } from "../../../shared/Components";

const useStyles = makeStyles((theme) => ({
  drawerContents: {
    minWidth: 300,
    padding: 20,
  },

  button: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "inherit",
    },
    margin: theme.spacing(1),
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

  const DrawerContent = () => {
    return (
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
    );
  };

  const BarContent = () => {
    return (
      <>
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
      </>
    );
  };

  return (
    <>
      <SharedMenu DrawerContent={DrawerContent()} BarContent={BarContent()} />
    </>
  );
}
