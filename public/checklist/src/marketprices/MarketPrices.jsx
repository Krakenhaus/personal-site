import React, { useEffect, useState, useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ProductCard, SearchDialog } from "./Components";
import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  PlaylistAdd as PlaylistAddIcon,
} from "@material-ui/icons";
import { LocalStorageApi, TCGPlayerApi } from "./Api";
import GitHubIcon from "@material-ui/icons/GitHub";

import "./marketprices.css";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    overflowY: "scroll",
    height: "calc(100% - 65px) !important",
  },
  cardRoot: {
    marginTop: 50,
    marginBottom: 30,
    textAlign: "center",
    overflowY: "scroll",
    height: "calc(100% - 50px) !important",
  },
  cardContainer: {
    paddingTop: 40,
    paddingBottom: 100,
    width: "90%",
    textAlign: "left",
    display: "inline-block",
  },
  drawerContents: {
    minWidth: 300,
    padding: 20,
  },
  appBar: {
    background:
      "repeating-linear-gradient(45deg, #333333 0, #333333 5%, #4f4f4f 0, #4f4f4f 50%) 0 / 10px 10px",
    flexGrow: 1,
  },
  button: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "inherit",
    },
    margin: theme.spacing(1),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    textAlign: "left",
  },
  subtitle2: {
    color: "#ddd",
    marginLeft: 25,
    flexGrow: 1,
  },
}));

function MarketPrices() {
  const classes = useStyles();
  const [cards, setCards] = useState([]);
  const [prices, setPrices] = useState([]);
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false);

  const [initialCardLoad, setInitialCardLoad] = useState(true);
  const [initialPriceLoad, setInitialPriceLoad] = useState(true);

  const [searchDialogOpen, setSearchDialogOpen] = useState(false);

  useEffect(() => {
    document.body.classList.add("market-prices-body");

    return () => {
      document.body.classList.remove("market-prices-body");
    };
  });

  const getProductDetails = async (params) => {
    const watchedProducts = LocalStorageApi.getWatchedProducts();
    const watchedProductIds = Object.keys(watchedProducts);
    if (watchedProductIds.length === 0) {
      if (cards.length !== 0) {
        setCards([]);
      }
      return;
    }

    try {
      const response = await TCGPlayerApi.getProductDetails(watchedProductIds);
      response.sort((product1, product2) => {
        return (
          watchedProducts[product1.productId].order -
          watchedProducts[product2.productId].order
        );
      });
      setCards(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getSkuPrices = async () => {
    const watchedProducts = LocalStorageApi.getWatchedProducts();
    const watchedSkuIds = Object.keys(watchedProducts).map(
      (watchedProductId) => {
        return watchedProducts[watchedProductId].skuId;
      }
    );
    if (watchedSkuIds.length === 0) {
      return;
    }

    try {
      const response = await TCGPlayerApi.getSkuPrices(watchedSkuIds);
      setPrices(response);
    } catch (error) {
      console.log(error);
    }
  };

  // Get the product details from h2/tcgplayer
  useEffect(() => {
    if (initialCardLoad) {
      setInitialCardLoad(false);
      getProductDetails();
    }
  });

  // Get the sku prices from h2/tcgplayer
  useEffect(() => {
    if (initialPriceLoad) {
      setInitialPriceLoad(false);
      getSkuPrices();
    }
  }, [cards]);

  const handleRemoveCard = (productId) => {
    LocalStorageApi.removeWatchedProduct(productId);
    getProductDetails();
  };

  const handleSkuChange = async () => {
    await getSkuPrices();
  };

  const totalMarketPrice = prices.reduce(function (acc, price) {
    if (price.marketPrice) {
      acc = acc + price.marketPrice;
    }
    return acc;
  }, 0);

  const productDetailsArray = cards.map((card) => {
    const { productId, name, imageUrl, groupId, skuDetails, url } = card;

    // Find the price
    let skuPriceIsDefault = true;
    let skuPrice = skuDetails[0];
    if (prices.length > 0) {
      const watchedPrice = prices.find((price) => {
        if (price.skuDetails) {
          return price.skuDetails.productId === productId;
        }
        return false;
      });
      if (watchedPrice) {
        skuPrice = watchedPrice;
        skuPriceIsDefault = false;
      }
    }

    return (
      <ProductCard
        key={productId}
        productId={productId}
        name={name}
        imageUrl={imageUrl}
        set={groupId}
        url={url}
        skuDetails={skuDetails}
        skuPrice={skuPrice}
        skuPriceIsDefault={skuPriceIsDefault}
        condition="near_mint"
        handleRemoveCard={handleRemoveCard}
        handleSkuChange={handleSkuChange}
      />
    );
  });

  return (
    <>
      <Drawer
        anchor="left"
        open={isMenuDrawerOpen}
        onClose={() => setIsMenuDrawerOpen(false)}
      >
        <div className={classes.drawerContents}>
          {`Total Market Price: $${totalMarketPrice}`}
        </div>
      </Drawer>
      <AppBar className={classes.appBar} position="sticky">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setIsMenuDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Current Market Prices
          </Typography>
          <Typography variant="subtitle2" className={classes.subtitle2}>
            This product uses TCGplayer data but is not endorsed or certified by
            TCGplayer.
          </Typography>

          <Button
            variant="contained"
            color="secondary"
            onClick={() => setSearchDialogOpen(true)}
            className={classes.button}
            startIcon={<PlaylistAddIcon />}
          >
            Add Card
          </Button>
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
        {searchDialogOpen && (
          <SearchDialog
            isOpen={searchDialogOpen}
            handleClose={(cardAdded) => {
              if (cardAdded) {
                getProductDetails();
              }
              setSearchDialogOpen(false);
            }}
          />
        )}
        <div className={classes.cardContainer}>{productDetailsArray}</div>
      </div>
    </>
  );
}

export default MarketPrices;
