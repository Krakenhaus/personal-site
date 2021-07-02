import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import LinkCard from "./LinkCard";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  heading: {
    textAlign: "center",
  },
});

function Home() {
  const classes = useStyles();

  return (
    <>
      <h1 className={classes.heading}>Hello! Under construction, sorry!</h1>

      <Grid container className={classes.root} spacing={2} justify="center">
        <Grid item xs={4}>
          <LinkCard
            link="/animalcrossing"
            title="Animal Crossing Checklist"
            subtitle="Checklist for keeping track of which creatures you've caught in Animal Crossing New Horizons"
          />
        </Grid>

        <Grid item xs={4}>
          <LinkCard
            link="/tcgmarketprices"
            title="TCG Market Price Dashboard"
            subtitle="Dashboard for quickly viewing the market prices of specified trading cards on TCGPlayer"
          />
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
