import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { cardTypes } from "../../utils";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    marginBottom: 0,
  },
}));

export default function TypeFilter({ currentFilter, handleChange }) {
  const classes = useStyles();

  const menuItems = Object.keys(cardTypes).map((cardType) => {
    return (
      <MenuItem key={cardType} value={cardType}>
        {cardTypes[cardType].label}
      </MenuItem>
    );
  });
  return (
    <FormControl size="small" className={classes.formControl}>
      <InputLabel id="type-filter-select-label">Type</InputLabel>
      <Select
        labelId="type-filter-select-label"
        id="type-select"
        value={currentFilter}
        onChange={(e) => {
          handleChange(e.target.value);
        }}
      >
        {menuItems}
      </Select>
    </FormControl>
  );
}
