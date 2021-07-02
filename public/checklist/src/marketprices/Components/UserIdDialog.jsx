import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  TextField,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { LocalStorageApi, TCGPlayerApi } from "../Api";

const useStyles = makeStyles(() => ({
  root: { textAlign: "center", minHeight: 210, maxWidth: 800 },
  description: { textAlign: "left" },
  dialogTitle: { textAlign: "center" },
  gridContainer: { marginBottom: 25 },
}));

export default function UserIdDialog({ isOpen, handleClose }) {
  const [userId, setUserId] = useState("");
  const [nickname, setNickname] = useState("My Amazing Collection");
  const [error, setError] = useState("");
  const classes = useStyles();

  const handleLoadExisting = async () => {
    try {
      const { userId: localUserId } = await TCGPlayerApi.getUser(userId);
      LocalStorageApi.setUserId(localUserId);
      handleClose();
    } catch (error) {
      setError("Existing collection not found.");
    }
  };

  const handleCreate = async () => {
    try {
      const { userId: localUserId } = await TCGPlayerApi.createUser(nickname);
      LocalStorageApi.setUserId(localUserId);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog
      disableBackdropClick
      open={isOpen}
      onClose={handleClose}
      maxWidth="xl"
    >
      <DialogTitle className={classes.dialogTitle}>Welcome!</DialogTitle>
      <DialogContent className={classes.root}>
        <Divider />
        <p className={classes.description}>
          This site does not have any sort of login mechanism. Collections are
          persisted via a UUID (Universally Unique IDentifier). Save this UUID
          if you want to come back to your specific collection at a later date.
          By default it is stored in LocalStorage in your browser. But
          LocalStorage can be cleared by various actions and is not persisted
          across devices/browsers. The other implication is that if you share
          this UUID with someone else they will be able to view and modify your
          collection.
        </p>
        <Divider />
        <br />
        {error && (
          <>
            <Alert severity="error">{error}</Alert>
            <br />
          </>
        )}
        <Grid className={classes.gridContainer} container spacing={3}>
          <Grid item xs={5}>
            <TextField
              label="Collection Name"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <br />
            <br />
            <Button variant="contained" color="primary" onClick={handleCreate}>
              Create New Collection
            </Button>
          </Grid>
          <Grid item xs={2}>
            OR
          </Grid>
          <Grid item xs={5}>
            <TextField
              label="Existing UUID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <br />
            <br />
            <Button
              variant="contained"
              color="primary"
              onClick={handleLoadExisting}
            >
              Load Existing Collection
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
