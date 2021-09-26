import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import LinkCard from "./LinkCard";
import { Menu } from "../shared/Components";
import "./home.css";

const useStyles = makeStyles({
  root: {
    height: "calc(100% - 55px) !important",
    textAlign: "center",
    overflowY: "auto",
    overflowX: "hidden",
    transition: "background-color 0.6s linear",
  },
  heading: {
    textAlign: "center",
  },
  subheading: {
    textAlign: "center",
  },
});

function Home() {
  const classes = useStyles();

  useEffect(() => {
    document.body.classList.add("home-body");

    return () => {
      document.body.classList.remove("home-body");
    };
  });

  return (
    <>
      <Menu />
      <div className={classes.root}>
        <h1 className={classes.heading}>Welcome!</h1>

        <p className={classes.subheading}>
          This is the site where I host my personal, for-fun projects. This site
          was built using spring-boot, react, and h2. See my{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/Krakenhaus/personal-site"
          >
            Github
          </a>{" "}
          for the source. Also check out my{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.deviantart.com/drawn-blank/gallery"
          >
            DeviantArt
          </a>{" "}
          account for some of my art.
        </p>

        <Grid container spacing={2} justify="center">
          <Grid item xs={4}>
            <LinkCard
              link="/animalcrossing"
              title="Animal Crossing Checklist"
              source="../images/home/animalcrossing.png"
              subtitle="Checklist for keeping track of which creatures you've caught in Animal Crossing New Horizons."
            />
          </Grid>

          <Grid item xs={4}>
            <LinkCard
              link="/tcgmarketprices"
              title="TCG Market Price Dashboard"
              source="../images/home/tcgplayer.png"
              subtitle="Dashboard for quickly viewing the market prices of specified trading cards on TCGPlayer."
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default Home;
