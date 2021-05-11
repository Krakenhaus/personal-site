import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField } from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";
import { TCGPlayerApi } from "../../Api";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function SearchForm({
  handleMatchesReceived,
  handleIsSearching,
}) {
  const classes = useStyles();
  const [productNameSearch, setProductNameSearch] = useState("");
  const [setNameSearch, setSetNameSearch] = useState("");

  const handleSearch = async () => {
    if (!productNameSearch && !setNameSearch) {
      return;
    }

    try {
      handleIsSearching(true);
      const matches = await TCGPlayerApi.searchProducts(
        productNameSearch,
        setNameSearch
      );
      handleMatchesReceived(matches);
    } catch (error) {
      console.log(error);
    } finally {
      handleIsSearching(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onKeyPress={handleKeyPress}
    >
      <TextField
        autoFocus={true}
        id="card-name-search"
        label="Card Name"
        value={productNameSearch}
        onChange={(e) => {
          setProductNameSearch(e.target.value);
        }}
      />
      <br />
      <TextField
        id="set-name-search"
        label="Set Name"
        value={setNameSearch}
        onChange={(e) => {
          setSetNameSearch(e.target.value);
        }}
      />
      <br />
      <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<SearchIcon />}
        onClick={handleSearch}
      >
        Search!
      </Button>
    </form>
  );
}
