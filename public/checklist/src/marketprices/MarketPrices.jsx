import React, { useEffect, useState } from "react";
import * as Scroll from "react-scroll";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress, Typography } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import {
  CollectionActions,
  Pagination,
  ProductCard,
  Menu,
  SearchDialog,
  UserIdDialog,
} from "./Components";
import { LocalStorageApi, TCGPlayerApi } from "./Api";
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
} from "react-grid-dnd";
import { cardTypes, formatCurrency } from "./utils";

import "./marketprices.css";

const scroller = Scroll.scroller;

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    overflowY: "scroll",
    height: "calc(100% - 115px) !important",
    transition: "background-color 0.6s linear",
    backgroundColor: (props) => {
      try {
        return cardTypes[props.typeFilter].color;
      } catch (error) {
        console.log("you forgot a type dingus");
      }
    },
  },
  cardContainer: {
    paddingTop: 20,
    paddingBottom: 100,
    width: "90%",
    textAlign: "left",
    display: "inline-block",
  },
  cardsLoading: {
    backgroundColor: "rgba(0,0,0,.5)",
    height: "100%",
    width: "100%",
    position: "absolute",
    zIndex: 999,
    paddingTop: 150,
    color: "#fff",
  },
  marketPriceLabel: { float: "left", paddingTop: 10, paddingLeft: 15 },
  paginationBar: {
    position: "absolute",
    bottom: 0,
    zIndex: 999,
    backgroundColor: "#fff",
    width: "100%",
    borderTop: "2px solid #999",
    boxShadow: "0px -1px 10px 4px rgba(0,0,0,0.21)",
  },
}));

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function MarketPrices() {
  const [displayCards, setDisplayCards] = useState([]);
  const [typeFilter, setTypeFilter] = useState("All");
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState({
    folderName: "All",
    displayOrder: 0,
  });
  const [totalMarketPrice, setTotalMarketPrice] = useState(0);
  const [allFolders, setAllFolders] = useState([]);
  const [isCondensed, setIsCondensed] = useState(false);
  const [sort, setSort] = useState({
    sortBy: "marketPrice",
    order: "desc",
  });
  const [pageSize, setPageSize] = useState(25);
  const [pageIndex, setPageIndex] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isCardsLoading, setIsCardsLoading] = useState(true);
  const [hasUserId, setHasUserId] = useState(!!LocalStorageApi.getUserId());
  const [error, setError] = useState("");

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const classes = useStyles({ typeFilter });

  useEffect(() => {
    document.body.classList.add("market-prices-body");

    return () => {
      document.body.classList.remove("market-prices-body");
    };
  });

  // target id will only be set if dragging from one dropzone to another.
  const onChange = async (sourceId, sourceIndex, targetIndex, targetId) => {
    try {
      const nextCards = swap(displayCards, sourceIndex, targetIndex);
      setDisplayCards(nextCards);
      // TODO: save order of entire collection at this point - put in save button?
    } catch (error) {
      // tried to drop outside of drop zone
    }
  };

  const getProductDetails = async () => {
    try {
      const response = await TCGPlayerApi.getCardCollection(
        sort,
        typeFilter,
        selectedFolder,
        pageSize,
        pageIndex
      );
      const { content, totalElements = 0 } = response;
      if (!content) {
        throw new Error("Error calling API");
      }

      setTotalProducts(totalElements);
      setDisplayCards(content);
      getProductMarketPrice();

      scroller.scrollTo("topScrollToElement", {
        duration: 800,
        delay: 100,
        smooth: true,
        containerId: "topScrollToElement",
        offset: -50,
      });
    } catch (error) {
      setDisplayCards([]);
      console.log(error);
    } finally {
      setIsCardsLoading(false);
    }
  };

  const getProductMarketPrice = async () => {
    try {
      const response = await TCGPlayerApi.getCardCollectionMarketPrice(
        typeFilter,
        selectedFolder
      );

      setTotalMarketPrice(response);
    } catch (error) {
      setTotalMarketPrice(0);
      console.log(error);
    }
  };

  const getAllFolders = async () => {
    try {
      const response = await TCGPlayerApi.getFolders();
      setAllFolders(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, typeFilter, selectedFolder, pageSize, pageIndex, hasUserId]);

  useEffect(() => {
    getAllFolders();
  }, []);

  const handleAddCard = async (productId) => {
    setIsCardsLoading(true);
    try {
      await TCGPlayerApi.addCardToCollection(productId, selectedFolder);
      await getProductDetails();
    } catch (error) {
      setError(error);
    } finally {
      setIsCardsLoading(false);
    }
  };

  const handleRemoveCard = async (productId) => {
    setIsCardsLoading(true);
    await TCGPlayerApi.removeCardFromCollection(productId);
    await getProductDetails();
  };

  const handleSelectFolder = (newFolder) => {
    setIsCardsLoading(true);
    setPageIndex(0);
    setSelectedFolder(newFolder);
  };

  const handleAddFolder = async (folderName) => {
    await TCGPlayerApi.addFolder(folderName);
    await getAllFolders();
  };

  const handleDeleteFolder = async (folderId) => {
    setIsCardsLoading(true);
    await TCGPlayerApi.deleteFolder(folderId);
    await getAllFolders();
    await getProductDetails();
  };

  const handlePriceRefresh = async () => {
    setIsCardsLoading(true);
    const skuIdsToRefresh = displayCards
      .filter((displayCard) => {
        return !!displayCard.skuId;
      })
      .map((displayCard) => {
        return displayCard.skuId;
      })
      .join(",");
    await TCGPlayerApi.getSkuPrices(skuIdsToRefresh);
    await getProductDetails();
  };

  const handleProductDetailsChange = async (productId, newAttributes) => {
    await TCGPlayerApi.updateCardInCollection(productId, newAttributes);
    await getProductDetails();
  };

  const handleTypeFilterChange = (newFilter) => {
    setIsCardsLoading(true);
    setPageIndex(0);
    setTypeFilter(newFilter);
  };

  const productDetailsArray = displayCards.map((card) => {
    const {
      productDetails: {
        skuDetails,
        cardType,
        productId,
        name,
        imageUrl,
        groupId,
        url,
      },
      skuPrice,
      cardFolders: folderMembership = [],
    } = card;

    const skuPriceIsDefault = !skuPrice;
    const defaultedSkuPrice = skuPrice || skuDetails[0];

    return (
      <GridItem key={productId}>
        <ProductCard
          allFolders={allFolders}
          folderMembership={folderMembership}
          cardType={cardType}
          productId={productId}
          name={name}
          imageUrl={imageUrl}
          set={groupId}
          url={url}
          selectedFolder={selectedFolder}
          skuDetails={skuDetails}
          skuPrice={defaultedSkuPrice}
          skuPriceIsDefault={skuPriceIsDefault}
          condition="near_mint"
          handleRemoveCard={handleRemoveCard}
          handleProductDetailsChange={handleProductDetailsChange}
          handleSelectFolder={handleSelectFolder}
          isCondensed={isCondensed}
        />
      </GridItem>
    );
  });

  return (
    <>
      <Menu
        allFolders={allFolders}
        selectedFolder={selectedFolder}
        handleAddFolder={handleAddFolder}
        handleDeleteFolder={handleDeleteFolder}
        handleOpenSearchDialog={() => setSearchDialogOpen(true)}
        handleSelectFolder={handleSelectFolder}
      />
      <div id="topScrollToElement" className={classes.root}>
        {isCardsLoading && (
          <div className={classes.cardsLoading}>
            <CircularProgress size={100} color="inherit" />
          </div>
        )}
        {!hasUserId && (
          <UserIdDialog
            isOpen={!hasUserId}
            handleClose={() => {
              setIsCardsLoading(true);
              setHasUserId(true);
            }}
          />
        )}
        {searchDialogOpen && (
          <SearchDialog
            isOpen={searchDialogOpen}
            handleClose={() => setSearchDialogOpen(false)}
            handleAddCard={handleAddCard}
          />
        )}
        <CollectionActions
          isCondensed={isCondensed}
          handleTypeFilterChange={handleTypeFilterChange}
          handleCondenseView={(checked) => setIsCondensed(checked)}
          typeFilter={typeFilter}
          currentSort={sort}
          handleSortChange={(newSort) => {
            setIsCardsLoading(true);
            setPageIndex(0);
            setSort(newSort);
          }}
          handlePriceRefresh={handlePriceRefresh}
        />
        <div className={classes.cardContainer}>
          {error && <Alert severity="error">{error}</Alert>}
          <GridContextProvider onChange={onChange}>
            <GridDropZone
              id="cards"
              boxesPerRow={Math.floor(windowDimensions.width / 290)}
              rowHeight={isCondensed ? 320 : 440}
              style={{
                // product cards + vertical margins
                height:
                  Math.ceil(
                    displayCards.length /
                      Math.floor(windowDimensions.width / 290)
                  ) *
                    (isCondensed ? 300 : 420) +
                  Math.ceil(
                    displayCards.length /
                      Math.floor(windowDimensions.width / 290)
                  ) *
                    20,
              }}
            >
              {productDetailsArray}
            </GridDropZone>
          </GridContextProvider>
        </div>
        <div className={classes.paginationBar}>
          <Typography
            className={classes.marketPriceLabel}
            variant="h6"
            gutterBottom
          >
            {selectedFolder.folderName}
            {` - Market Price: ${formatCurrency(totalMarketPrice)}`}
          </Typography>

          <Pagination
            totalProducts={totalProducts}
            pageIndex={pageIndex}
            pageSize={pageSize}
            handlePageIndexChange={(event, newPage) => {
              setIsCardsLoading(true);
              setPageIndex(newPage);
            }}
            handlePageSizeChange={(event) => {
              setIsCardsLoading(true);
              setPageSize(parseInt(event.target.value, 10));
              setPageIndex(0);
            }}
          />
        </div>
      </div>
    </>
  );
}
