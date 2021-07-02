import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, MenuItem, Select } from "@material-ui/core";
import { printingIds } from "../../utils";

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

export default function PrintingSelect({
  currentPrinting,
  availablePrintingIds,
  handleChange,
}) {
  const classes = useStyles();

  const availablePrintingsArray = availablePrintingIds.map((id) => {
    const { name } = printingIds[id];
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
        disabled={availablePrintingIds.length === 1}
        variant="outlined"
        labelId="printing-select-label"
        id="printing-select"
        value={currentPrinting}
        onChange={(e) => handleChange(e.target.value)}
      >
        {availablePrintingsArray}
      </Select>
    </FormControl>
  );
}
