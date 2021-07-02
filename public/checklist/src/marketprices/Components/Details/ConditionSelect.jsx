import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, MenuItem, Select } from "@material-ui/core";
import { conditionIds } from "../../utils";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    marginBottom: 0,
  },
  selectOption: {
    backgroundColor: "#fff",
  },
}));

export default function ConditionSelect({
  currentCondition,
  availableConditionIds,
  handleChange,
}) {
  const classes = useStyles();

  const availableConditionsArray = availableConditionIds.map((id) => {
    const { name } = conditionIds[id];
    return (
      <MenuItem key={id} value={id}>
        {name}
      </MenuItem>
    );
  });

  return (
    <FormControl size="small" className={classes.formControl}>
      <Select
        className={classes.selectOption}
        variant="outlined"
        labelId="condition-select-label"
        id="condition-select"
        value={currentCondition}
        onChange={(e) => handleChange(e.target.value)}
      >
        {availableConditionsArray}
      </Select>
    </FormControl>
  );
}
