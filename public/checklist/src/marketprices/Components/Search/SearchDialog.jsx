import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import SearchForm from "./SearchForm";
import ProductMatch from "./ProductMatch";
import { LocalStorageApi } from "../../Api";

const useStyles = makeStyles((theme) => ({
  root: {},
  matchContainer: {
    textAlign: "center",
    marginLeft: "auto",
    display: "block",
    backgroundColor: "#efefef",
    overflowY: (props) => (props.shouldScroll ? "scroll" : "hidden"),
    width: "100%",
    minHeight: 100,
  },

  searchFormContainer: {
    marginRight: "auto",
    display: "flex",
  },
  dialogTitle: {
    borderBottom: "1px solid #ccc",
    textAlign: "center",
    overflowX: "hidden",
  },
  dialogContent: {
    display: "flex",
    paddingTop: 0,
  },
  loading: {
    marginTop: 50,
  },
}));

export default function SearchDialog({ isOpen, handleClose }) {
  const [matches, setMatches] = useState([]);
  const [isBusy, setIsBusy] = useState(false);
  const [firstOpen, setFirstOpen] = useState(true);
  const classes = useStyles({ shouldScroll: matches.length !== 0 });

  const handleMatchesReceived = (matchesReceived) => {
    setMatches(matchesReceived || []);
  };

  const handleAddCard = (productId) => {
    LocalStorageApi.addWatchedProduct(productId);
    handleClose(true);
  };

  const matchesArray = matches.map((match) => {
    const { groupId, imageUrl, name, productId, url } = match;
    return (
      <ProductMatch
        key={productId}
        handleAddCard={handleAddCard}
        name={name}
        productId={productId}
        imageUrl={imageUrl}
        groupId={groupId}
        url={url}
      />
    );
  });

  return (
    <Dialog
      open={isOpen}
      onClose={() => handleClose(false)}
      fullWidth={!firstOpen}
      maxWidth="xl"
    >
      <DialogTitle className={classes.dialogTitle}>
        Search for Cards to Add!
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <div className={classes.searchFormContainer}>
          <SearchForm
            handleIsSearching={(isSearching) => {
              setFirstOpen(false);
              setIsBusy(isSearching);
            }}
            handleMatchesReceived={handleMatchesReceived}
          />
        </div>
        <div className={classes.matchContainer}>
          {isBusy ? (
            <CircularProgress className={classes.loading} />
          ) : (
            <>{matchesArray}</>
          )}
        </div>
        <br />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(false)} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
