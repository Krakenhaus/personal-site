import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";
import {
  LocalAtm as LocalAtmIcon,
  OpenInNew as OpenInNewIcon,
} from "@material-ui/icons";
import ConditionSelect from "./ConditionSelect";
import PrintingSelect from "./PrintingSelect";
import FolderChips from "./FolderChips";
import PriceHistory from "./PriceHistory";
import { cardTypes, formatCurrency } from "../../utils";
import { TCGPlayerApi } from "../../Api";
import { useCardContext } from "../../CardContext";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 900,
  },
  formControl: {
    margin: theme.spacing(1),
    maxWidth: 100,
    marginBottom: 0,
    backgroundColor: "white",
  },
  cardConditions: {
    marginBottom: 10,
  },
  cardImage: {
    margin: 8,
    boxShadow: "0px 3px 20px -2px rgb(0 0 0 / 51%)",
    borderRadius: 9,
  },
  dialogTitle: {
    borderBottom: "1px solid #ccc",
    textAlign: "center",
    overflowX: "hidden",
  },
  dialogContent: {
    paddingTop: 0,
    background: (props) => {
      try {
        const color = cardTypes[props.cardType].color;
        return `linear-gradient(135deg, ${color} 5%, rgba(240,240,240,1) 35%)`;
      } catch (error) {}
    },
  },
  dialogContentInner: {
    display: "flex",
  },
  lastFetchDate: {
    color: "#999",
  },
  pricing: {
    marginLeft: 8,
    maxWidth: 300,
  },
  pricingHistory: {
    textAlign: "center",
    width: "100%",
  },
}));

export default function DetailsDialog({
  allFolders,
  isOpen,
  handleClose,
  handleSave,
  index,
}) {
  const {
    state: { displayCards },
  } = useCardContext();

  const {
    cardFolders: folderMembership = [],
    productDetails: { skuDetails = {}, cardType, name, imageUrl, url },
    skuPrice: initialSkuPrice,
    cardCount: initialCardCount,
  } = displayCards ? displayCards[index] : {};
  const { skuId } = initialSkuPrice || skuDetails[0];

  const classes = useStyles({ cardType });

  const { conditionId: initialConditionId, printingId: initialPrintingId } =
    skuDetails.find((skuDetail) => skuDetail.skuId === skuId) || {};

  const [currentConditionId, setCurrentConditionId] =
    useState(initialConditionId);
  const [currentPrintingId, setCurrentPrintingId] = useState(initialPrintingId);
  const [currentFolderMembership, setCurrentFolderMembership] =
    useState(folderMembership);
  const [currentCardCount, setCurrentCardCount] = useState(
    initialCardCount || 0
  );
  // TODO: is always true?
  const [isDirty, setIsDirty] = useState(true);
  const [skuPrice, setSkuPrice] = useState(initialSkuPrice);

  const availableConditionIds = [
    ...new Set(skuDetails.map((skuDetail) => skuDetail.conditionId)),
  ];
  const availablePrintingIds = [
    ...new Set(skuDetails.map((skuDetail) => skuDetail.printingId)),
  ];

  // const { skuId } = skuPrice;

  useEffect(() => {
    const getNewSkuPrices = async () => {
      const newSku =
        skuDetails.find(
          (skuDetail) =>
            skuDetail.conditionId === currentConditionId &&
            skuDetail.printingId === currentPrintingId
        ) || {};
      const skuPrice = await TCGPlayerApi.getSkuPrices(newSku.skuId);
      setSkuPrice(skuPrice[0]);
    };
    getNewSkuPrices();
  }, [currentConditionId, currentPrintingId, skuDetails]);

  const { marketPrice, lastUpdateTime, lowestListingPrice } = skuPrice || {};

  const handleConditionIdChange = (newConditionId) => {
    setIsDirty(true);
    setCurrentConditionId(newConditionId);
  };

  const handlePrintingIdChange = (newPrintingId) => {
    setIsDirty(true);
    setCurrentPrintingId(newPrintingId);
  };

  const handleCardCountChange = (newCardCount) => {
    setIsDirty(true);
    setCurrentCardCount(newCardCount);
  };

  const handleFolderMembershipChange = (newFolders) => {
    const currentFolderNames = currentFolderMembership
      .map((folder) => folder.folderName)
      .sort();
    const newFolderNames = newFolders.map((folder) => folder.folderName).sort();

    if (currentFolderNames !== newFolderNames) {
      setIsDirty(true);
      setCurrentFolderMembership(newFolders);
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth={false} maxWidth="xl">
      <DialogTitle className={classes.dialogTitle}>
        {`${name} `}
        <IconButton aria-label="open" href={url} target="_blank" size="small">
          <OpenInNewIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <div className={classes.dialogContentInner}>
          <div>
            <img src={imageUrl} className={classes.cardImage} alt="Card" />
          </div>
          <div>
            <div className={classes.cardConditions}>
              <PrintingSelect
                availablePrintingIds={availablePrintingIds}
                currentPrinting={currentPrintingId}
                handleChange={handlePrintingIdChange}
              />
              <ConditionSelect
                availableConditionIds={availableConditionIds}
                currentCondition={currentConditionId}
                handleChange={handleConditionIdChange}
              />
            </div>
            <Divider />
            <div>
              <FormControl size="small" className={classes.formControl}>
                <TextField
                  size="small"
                  id="standard-adornment-create-folder"
                  value={currentCardCount}
                  onChange={(e) => handleCardCountChange(e.target.value)}
                  inputProps={{ maxLength: 3 }}
                  label="Quantity"
                  variant="outlined"
                  onFocus={(e) => {
                    e.preventDefault();
                    const { target } = e;
                    target.focus();
                    target.setSelectionRange(0, target.value.length);
                  }}
                />
              </FormControl>
              <FolderChips
                handleFolderMembershipChange={handleFolderMembershipChange}
                allFolders={allFolders}
                folderMembership={currentFolderMembership}
              />
            </div>
            <Divider />
            <div className={classes.pricing}>
              <div>
                <span>Market: </span>
                <Chip
                  variant="outlined"
                  label={formatCurrency(marketPrice)}
                  icon={<LocalAtmIcon />}
                  style={
                    marketPrice
                      ? { fontWeight: 600, color: "#6d9e03", margin: "5px" }
                      : { color: "#888", margin: "5px" }
                  }
                />
              </div>
              <div>
                <span>Lowest: </span>
                <Chip
                  variant="outlined"
                  label={formatCurrency(lowestListingPrice)}
                  icon={<LocalAtmIcon />}
                  style={
                    lowestListingPrice
                      ? { fontWeight: 600, color: "#6d9e03", margin: "5px" }
                      : { color: "#888", margin: "5px" }
                  }
                />
              </div>
              {lastUpdateTime && (
                <Typography
                  variant="caption"
                  display="block"
                  gutterBottom
                  className={classes.lastFetchDate}
                >
                  Latest pricing data fetched from TCGPlayer.com on{" "}
                  {new Date(lastUpdateTime).toLocaleDateString("en-US")}.
                  Pricing is fetched at most once per month.
                </Typography>
              )}
            </div>
          </div>
        </div>
        <div className={classes.pricingHistory}>
          <Divider />
          <br />
          <PriceHistory skuId={skuId} name={name} />
        </div>
      </DialogContent>
      <DialogActions>
        {/* <Button>Prev</Button>
        <Button>Next</Button> */}

        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => {
            const newSku =
              skuDetails.find(
                (skuDetail) =>
                  skuDetail.conditionId === currentConditionId &&
                  skuDetail.printingId === currentPrintingId
              ) || {};

            handleSave(isDirty, {
              skuId: newSku.skuId,
              cardFolders: currentFolderMembership,
              cardCount: currentCardCount,
            });
            handleClose();
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
