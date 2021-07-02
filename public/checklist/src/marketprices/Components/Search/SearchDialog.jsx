import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  LinearProgress,
} from "@material-ui/core";
import SearchForm from "./SearchForm";
import ProductMatch from "./ProductMatch";

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
  linearProgress: {
    width: "100%",
  },
  loading: {
    marginTop: 50,
  },
}));

export default function SearchDialog({ isOpen, handleClose, handleAddCard }) {
  const [matches, setMatches] = useState([]);
  const [isBusy, setIsBusy] = useState(false);
  const [isBusy2, setIsBusy2] = useState(false);
  const [firstOpen, setFirstOpen] = useState(true);
  const classes = useStyles({ shouldScroll: matches.length !== 0 });

  const handleMatchesReceived = (matchesReceived) => {
    setMatches(matchesReceived || []);
  };

  const matchesArray = matches.map((match) => {
    const { groupId, imageUrl, name, productId, url } = match;
    return (
      <ProductMatch
        key={productId}
        handleAddCard={async (productId) => {
          setIsBusy2(true);
          await handleAddCard(productId);
          handleClose();
        }}
        name={name}
        productId={productId}
        imageUrl={imageUrl}
        groupId={groupId}
        url={url}
        isBusy={isBusy2}
      />
    );
  });

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
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
          {isBusy2 && <LinearProgress className={classes.linearProgress} />}
          {isBusy ? (
            <CircularProgress className={classes.loading} />
          ) : (
            <>{matchesArray}</>
          )}
        </div>
        <br />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
