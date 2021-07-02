import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    marginBottom: 0,
  },
}));

export default function Sort({ currentSort, handleSortChange }) {
  const classes = useStyles();

  const { sortBy, order } = currentSort;

  const handleOrderChange = (newOrder) => {
    const newSort = { order: newOrder, sortBy };
    handleSortChange(newSort);
  };

  const handleSortByChange = (newSortBy) => {
    const newSort = { order, sortBy: newSortBy };
    handleSortChange(newSort);
  };

  return (
    <>
      <FormControl size="small" className={classes.formControl}>
        <InputLabel id="type-sortby-select-label">Sort By</InputLabel>
        <Select
          labelId="type-sortby-select-label"
          id="type-select"
          value={sortBy}
          onChange={(e) => {
            handleSortByChange(e.target.value);
          }}
        >
          <MenuItem value="marketPrice">Market Price</MenuItem>
          <MenuItem value="lowestPrice">Lowest Price</MenuItem>
        </Select>
      </FormControl>
      <FormControl size="small" className={classes.formControl}>
        <InputLabel id="type-order-select-label">Order</InputLabel>
        <Select
          labelId="type-order-select-label"
          id="type-select"
          value={order}
          onChange={(e) => {
            handleOrderChange(e.target.value);
          }}
        >
          <MenuItem value="desc">High to Low</MenuItem>
          <MenuItem value="asc">Low to High</MenuItem>
        </Select>
      </FormControl>
    </>
  );
}
