import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { FormControl, Select, MenuItem } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    marginBottom: 0,
  },
}));

function Condition({ id, condition, disabled, handleChange }) {
  const classes = useStyles();

  return (
    <FormControl size="small" className={classes.formControl}>
      <Select
        disabled={disabled}
        variant="outlined"
        labelId="condition-select-label"
        id="condition-select"
        value={condition}
        onChange={(e) => {
          handleChange(id, e.target.value);
        }}
      >
        <MenuItem value="near_mint">Near Mint</MenuItem>
        <MenuItem value="lightly_played">Lightly Played</MenuItem>
        <MenuItem value="moderately_played">Moderately Played</MenuItem>
        <MenuItem value="heavily_played">Heavily Played</MenuItem>
        <MenuItem value="damaged">Damaged</MenuItem>
      </Select>
    </FormControl>
  );
}

export default Condition;
