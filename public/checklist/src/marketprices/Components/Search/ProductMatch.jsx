import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, IconButton, Typography, Tooltip } from "@material-ui/core";
import {
  OpenInNew as OpenInNewIcon,
  PlaylistAdd as PlaylistAddIcon,
} from "@material-ui/icons";
import { groupIds } from "../../utils";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    display: "inline-grid",
    margin: 20,
    width: 200,
  },
  title: {
    width: 200,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  image: {
    opacity: 1,
    display: "block",
    width: "100%",
    height: "auto",
    transition: ".5s ease",
    backfaceCisibility: "hidden",
    "&:hover": {
      opacity: "0.3",
    },
  },

  middle: {
    transition: ".5s ease",
    opacity: 0,
    position: "absolute",
    top: "calc(50% + 25px)",
    left: "50%",
    height: "calc(100% - 50px)",
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.6)",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    "&:hover": {
      opacity: 1,
    },
  },
  button: {
    margin: theme.spacing(1),
    marginTop: "50%",
  },
  tcpPlayerButton: {
    position: "absolute",
    top: 50,
    right: 10,
  },
}));

export default function ProductMatch({
  name,
  productId,
  imageUrl,
  url,
  groupId,
  handleAddCard,
  isBusy,
}) {
  const classes = useStyles();
  const setName = groupIds[groupId] ? groupIds[groupId].name : groupId;

  return (
    <div className={classes.root}>
      <Tooltip title={name} aria-label={name} placement="top">
        <Typography variant="h6" className={classes.title}>
          <IconButton aria-label="open" href={url} target="_blank" size="small">
            <OpenInNewIcon />
          </IconButton>
          {name}
        </Typography>
      </Tooltip>
      <Tooltip title={setName} aria-label={setName} placement="bottom">
        <Typography variant="caption" className={classes.title}>
          {setName}
        </Typography>
      </Tooltip>

      <img src={imageUrl} alt={name} className={classes.image} />
      <div className={classes.middle}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          disabled={isBusy}
          className={classes.button}
          startIcon={<PlaylistAddIcon />}
          onClick={() => handleAddCard(productId)}
        >
          Add!
        </Button>
      </div>
    </div>
  );
}
