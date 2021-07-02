import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
} from "@material-ui/core";
import {
  LocalAtm as LocalAtmIcon,
  OpenInNew as OpenInNewIcon,
} from "@material-ui/icons";
import ConditionSelect from "./ConditionSelect";
import PrintingSelect from "./PrintingSelect";
import FolderChips from "./FolderChips";
import { cardTypes, formatCurrency } from "../../utils";
import { TCGPlayerApi } from "../../Api";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 900,
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
    display: "flex",
    paddingTop: 0,
    background: (props) => {
      try {
        const color = cardTypes[props.cardType].color;
        return `linear-gradient(135deg, ${color} 5%, rgba(240,240,240,1) 35%)`;
      } catch (error) {}
    },
  },
  lastFetchDate: {
    color: "#999",
  },
  pricing: {
    marginLeft: 8,
    maxWidth: 300,
  },
}));

export default function DetailsDialog({
  allFolders,
  isOpen,
  handleClose,
  handleSave,
  skuDetails,
  productId,
  imageUrl,
  cardType,
  folderMembership,
  name,
  initialSkuId,
  skuPriceIsDefault,
  initialSkuPrice,
  url,
}) {
  const classes = useStyles({ cardType });
  const { conditionId: initialConditionId, printingId: initialPrintingId } =
    skuDetails.find((skuDetail) => skuDetail.skuId === initialSkuId) || {};

  const [currentConditionId, setCurrentConditionId] =
    useState(initialConditionId);
  const [currentPrintingId, setCurrentPrintingId] = useState(initialPrintingId);
  const [currentFolderMembership, setCurrentFolderMembership] =
    useState(folderMembership);
  const [isDirty, setIsDirty] = useState(skuPriceIsDefault);
  const [skuPrice, setSkuPrice] = useState(initialSkuPrice);

  const availableConditionIds = [
    ...new Set(skuDetails.map((skuDetail) => skuDetail.conditionId)),
  ];
  const availablePrintingIds = [
    ...new Set(skuDetails.map((skuDetail) => skuDetail.printingId)),
  ];

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
                {new Date(lastUpdateTime).toLocaleDateString("en-US")}. Pricing
                is fetched at most once per month.
              </Typography>
            )}
          </div>
        </div>
      </DialogContent>
      <DialogActions>
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
