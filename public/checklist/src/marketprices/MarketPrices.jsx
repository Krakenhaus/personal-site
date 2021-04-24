import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardDetails from './Components/CardDetails';
import { AppBar, List, ListSubheader, Toolbar, Typography, Button } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';

import './marketprices.css';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    overflowY: 'scroll',
    height: 'calc(100% - 50px) !important',
  },
  list: {
    marginTop: 50,
    marginBottom: 50,
    width: '70%',
    backgroundColor: theme.palette.background.paper,
    display: 'inline-block',
    boxShadow: '0px 0px 6px 0px rgba(0,0,0,0.51)',
  },
  subheader: {
    backgroundColor: '#555',
    color: '#fff',
  },
  appBar: {
    background: 'repeating-linear-gradient(45deg, #333333 0, #333333 5%, #4f4f4f 0, #4f4f4f 50%) 0 / 10px 10px',
    flexGrow: 1,
  },
  button: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'inherit',
    },
  },
  menuTitle: {
    textAlign: 'center',
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    textAlign: 'left',
  },
  toolbar: {
    backgroundColor: '#f0f0f0',
    height: 50
  },
  leftMoney: {
    float: 'left',
    height: 10,
  },
  rightMoney: {
    float: 'right',
    transform: 'scaleX(-1)',
  },
  moneyImage: {
    height: 40,
    marginTop: 5,
  },
}));

function MarketPrices() {
  const classes = useStyles();

  useEffect(() => {
    document.body.classList.add('market-prices-body');

    return () => {
      document.body.classList.remove('market-prices-body');
    }
  });

  const cards = [
    {
      index: 0,
      cardName: 'Hitmonchan',
      cardNumber: '1 of 120',
      imageUrl: 'https://tcgplayer-cdn.tcgplayer.com/product/42415_200w.jpg',
      set: 'Base Set',
      estimatedPrice: '$23.04',
    },
    {
      index: 1,
      cardName: 'Snorlax Ex',
      cardNumber: '1 of 120',
      imageUrl: 'https://tcgplayer-cdn.tcgplayer.com/product/88796_200w.jpg',
      set: 'Team Rocket Returns',
      estimatedPrice: '$389.50',
    },
    {
      index: 2,
      cardName: 'Wailord Ex',
      cardNumber: '1 of 120',
      imageUrl: 'https://tcgplayer-cdn.tcgplayer.com/product/90463_200w.jpg',
      set: 'Sandstorm',
      estimatedPrice: '$51.82',
    },
    {
      index: 3,
      cardName: 'Pidgeot',
      cardNumber: '1 of 120',
      imageUrl: 'https://tcgplayer-cdn.tcgplayer.com/product/45134_200w.jpg',
      set: 'Jungle',
      estimatedPrice: '$27.52',
    },
    {
      index: 4,
      cardName: 'Chansey',
      cardNumber: '1 of 120',
      imageUrl: 'https://tcgplayer-cdn.tcgplayer.com/product/42371_200w.jpg',
      set: 'Base Set',
      estimatedPrice: '$31.30',
    },
  ];

  const cardDetailsArray = cards.map((card) => {
    const { index, estimatedPrice, cardName, cardNumber, imageUrl, set } = card;
    return (
      <CardDetails
        key={index}
        cardName={cardName}
        cardNumber={cardNumber}
        imageUrl={imageUrl}
        set={set}
        estimatedPrice={estimatedPrice}
      />
    );
  });

  return (
    <>
      <AppBar className={classes.appBar} position="sticky">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Current Market Prices
          </Typography>
          <Button
            href="https://github.com/Krakenhaus/animalcrossing/issues"
            target="_blank"
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<GitHubIcon />}
          >
            Report issues on GitHub
          </Button>
        </Toolbar>
      </AppBar>
      <div className={classes.root}>
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader className={classes.subheader} component="div" id="nested-list-subheader">
              <span className={classes.leftMoney}><img className={classes.moneyImage} src="https://www.animatedimages.org/data/media/100/animated-money-image-0062.gif" /></span>
              Watched Cards
              <span className={classes.rightMoney}><img className={classes.moneyImage} src="https://www.animatedimages.org/data/media/100/animated-money-image-0062.gif" /></span>
            </ListSubheader>
          }
          className={classes.list}
        >
          {cardDetailsArray}
        </List>
      </div>
    </>
  );
}

export default MarketPrices;