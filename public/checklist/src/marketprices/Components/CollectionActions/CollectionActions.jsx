import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  FormControlLabel,
  FormGroup,
  Switch,
  Tooltip,
} from "@material-ui/core";
import TypeFilter from "./TypeFilter";
import Sort from "./Sort";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    backgroundColor: "#dedede",
    padding: 10,
  },
  refreshPricesButton: {
    marginRight: 10,
  },
}));

export default function CollectionActions({
  isCondensed,
  handleTypeFilterChange,
  handleCondenseView,
  handlePriceRefresh,
  currentSort,
  handleSortChange,
  typeFilter,
}) {
  const classes = useStyles({ typeFilter });

  return (
    <div className={classes.root}>
      <FormGroup row>
        <Tooltip
          title="Once retrieved, prices are cached for 30 days. This button will do nothing if you keep clicking it without 30 days passing."
          aria-label="info"
        >
          <Button
            className={classes.refreshPricesButton}
            color="secondary"
            onClick={async () => handlePriceRefresh()}
          >
            Refresh Prices
          </Button>
        </Tooltip>
        <FormControlLabel
          control={
            <Switch
              checked={isCondensed}
              onChange={(e) => handleCondenseView(e.target.checked)}
              name="condensed"
            />
          }
          label="Condensed View"
        />
        <TypeFilter
          handleChange={handleTypeFilterChange}
          currentFilter={typeFilter}
        />
        <Sort currentSort={currentSort} handleSortChange={handleSortChange} />
      </FormGroup>
    </div>
  );
}
