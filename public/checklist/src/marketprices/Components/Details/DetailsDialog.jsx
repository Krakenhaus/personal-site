import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import ConditionSelect from "./ConditionSelect";
import PrintingSelect from "./PrintingSelect";
import { LocalStorageApi } from "../../Api";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 900,
  },
  dialogTitle: {
    borderBottom: "1px solid #ccc",
    textAlign: "center",
    overflowX: "hidden",
  },
  dialogContent: {
    display: "flex",
    paddingTop: 0,
  },
}));

export default function DetailsDialog({
  isOpen,
  handleClose,
  skuDetails,
  productId,
  name,
  initialSkuId,
}) {
  const classes = useStyles();
  const { conditionId: initialConditionId, printingId: initialPrintingId } =
    skuDetails.find((skuDetail) => skuDetail.skuId === initialSkuId) || {};

  const [currentConditionId, setCurrentConditionId] = useState(
    initialConditionId
  );
  const [currentPrintingId, setCurrentPrintingId] = useState(initialPrintingId);
  const [currentSkuId, setCurrentSkuId] = useState(0);
  const [isDirty, setIsDirty] = useState(false);

  const availableConditionIds = [
    ...new Set(skuDetails.map((skuDetail) => skuDetail.conditionId)),
  ];
  const availablePrintingIds = [
    ...new Set(skuDetails.map((skuDetail) => skuDetail.printingId)),
  ];

  const handleConditionIdChange = (newConditionId) => {
    setCurrentConditionId(newConditionId);
  };

  const handlePrintingIdChange = (newPrintingId) => {
    setCurrentPrintingId(newPrintingId);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => handleClose(false)}
      fullWidth={false}
      maxWidth="xl"
    >
      <DialogTitle className={classes.dialogTitle}>{name}</DialogTitle>
      <DialogContent className={classes.dialogContent}>
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
            setCurrentSkuId(newSku.skuId);
            const updated = LocalStorageApi.updateWatchedProductSkuId(
              productId,
              newSku.skuId
            );
            setIsDirty(isDirty || updated);
            handleClose(true);
          }}
        >
          Save
        </Button>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleClose(false);
          }}
          color="primary"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
