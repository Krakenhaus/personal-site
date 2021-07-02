import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  LinearProgress,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import {
  Delete as DeleteIcon,
  DragIndicator as DragIndicatorIcon,
  LocalAtm as LocalAtmIcon,
} from "@material-ui/icons";
import DetailsDialog from "./Details";
import { getColorRepresentation } from "../utils/condition";
import {
  cardTypes,
  conditionIds,
  formatCurrency,
  groupIds,
  printingIds,
} from "../utils";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 230,
    display: "inline-grid",
    margin: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    opacity: (props) => (props.isBusy ? 0.5 : 1),
    cursor: (props) => (props.isBusy ? "0.5" : 1),
  },
  alert: {
    marginTop: 30,
    marginBottom: 15,
  },
  cardMedia: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    backgroundPosition: "top",
    borderBottom: "1pt solid #999",
    "&:hover": {
      boxShadow: "inset 0 0 100px 100px rgb(255 255 255 / 30%) !important",
    },
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    border: "2px solid #bbb",
    outlineOffset: -2,
  },
  header: {
    textAlign: "left",
    position: "relative",
    width: 200,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  subHeader: {
    textAlign: "left",
    color: "#999999",
    borderBottom: "1px solid #ccc",
    width: 200,
    overflow: "hidden",
    position: "relative",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  button: {
    color: "#1976d2",
    fontWeight: 800,
  },
  notifyBadge: {
    position: "absolute",
    right: 0,
    top: 0,
    textAlign: "center",
    borderRadius: "30px 30px 30px 30px",
    height: 8,
    width: 8,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: -1,
      left: -1,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
  cardContent: {
    padding: 0,
  },
  cardContentInner: {
    padding: 16,
  },
  typeBar: {
    backgroundColor: (props) => {
      try {
        return cardTypes[props.cardType].color;
      } catch (error) {
        return "#FFFFFF";
      }
    },
    height: 5,
  },
  cardActions: {
    backgroundColor: "#efefef",
    borderTop: "1px solid #ddd",
  },
  linearProgress: {
    width: "100%",
  },
  folderChip: {
    marginLeft: 2,
  },
  folderChips: {
    "&::-webkit-scrollbar": {
      display: "none",
    },
    marginTop: 5,
    display: "flex",
    overflow: "scroll",
    width: 200,
  },
}));

export default function ProductCard({
  allFolders,
  folderMembership,
  cardType,
  productId,
  name,
  condition,
  imageUrl,
  url,
  set,
  skuDetails,
  handleRemoveCard,
  selectedFolder,
  skuPrice,
  handleProductDetailsChange,
  handleSelectFolder,
  skuPriceIsDefault,
  isCondensed,
}) {
  const [isBusy, setIsBusy] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const classes = useStyles({ isBusy, cardType });
  const conditionStyles = {
    color: getColorRepresentation(condition),
    backgroundColor: getColorRepresentation(condition),
  };
  const {
    lowestListingPrice,
    marketPrice,
    skuId: currentSkuId,
  } = skuPrice || {};

  const setName = groupIds[set] ? groupIds[set].name : set;

  const { conditionId, printingId } =
    skuDetails.find((skuDetail) => skuDetail.skuId === currentSkuId) || {};

  const conditionName = conditionIds[conditionId]
    ? conditionIds[conditionId].abbreviation
    : "";
  const printingName = printingIds[printingId]
    ? printingIds[printingId].name
    : "";

  const folderMembershipJsx = folderMembership.map((folder) => {
    const { folderId, folderName } = folder;
    const isSelected = folderId === selectedFolder.folderId;
    return (
      <Chip
        className={classes.folderChip}
        key={folderId}
        label={folderName}
        onClick={() => {
          handleSelectFolder(folder);
        }}
        component="a"
        clickable
        variant={isSelected ? "default" : "outlined"}
      />
    );
  });

  return (
    <>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.cardMedia}
            image={imageUrl}
            title={name}
            onClick={() => {
              window.open(url, "_blank");
            }}
          />
        </CardActionArea>
        <CardContent className={classes.cardContent}>
          <div className={classes.typeBar}></div>
          <div className={classes.cardContentInner}>
            {!isCondensed && (
              <>
                <Tooltip title={name} aria-label={name} placement="top">
                  <Typography
                    variant="h5"
                    component="h5"
                    className={classes.header}
                  >
                    {!skuPriceIsDefault && (
                      <span
                        className={classes.notifyBadge}
                        style={conditionStyles}
                      />
                    )}
                    {name}
                  </Typography>
                </Tooltip>
                <Tooltip title={setName} aria-label={setName} placement="top">
                  <Typography
                    variant="caption"
                    display="block"
                    gutterBottom
                    className={classes.subHeader}
                  >
                    {setName}
                  </Typography>
                </Tooltip>
              </>
            )}
            {!skuPriceIsDefault ? (
              <>
                {!isCondensed && (
                  <Typography
                    variant="caption"
                    display="block"
                    gutterBottom
                    className={classes.subHeader}
                  >
                    {`${conditionName} ${printingName}`}
                  </Typography>
                )}

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
              </>
            ) : (
              <Alert severity="info" className={classes.alert}>
                Set details to view pricing
              </Alert>
            )}
            {!isCondensed && (
              <div className={classes.folderChips}>
                <Chip
                  label="All"
                  component="a"
                  clickable
                  onClick={() => {
                    handleSelectFolder({ folderName: "All" });
                  }}
                  variant={selectedFolder.folderId ? "outlined" : "default"}
                />
                {folderMembershipJsx}
              </div>
            )}
          </div>
        </CardContent>
        <CardActions disableSpacing className={classes.cardActions}>
          <IconButton
            disabled={isBusy}
            aria-label="move"
            size="small"
            style={{ cursor: "move" }}
          >
            <DragIndicatorIcon />
          </IconButton>

          <Button
            disabled={isBusy}
            size="small"
            color="primary"
            className={classes.button}
            onClick={() => {
              if (!isBusy) {
                setDetailsDialogOpen(true);
              }
            }}
          >
            Details
          </Button>
          <IconButton
            disabled={isBusy}
            aria-label="delete"
            style={{ marginLeft: "auto" }}
            size="small"
            onClick={() => {
              if (!isBusy) {
                setIsBusy(true);
                handleRemoveCard(productId);
              }
            }}
          >
            <DeleteIcon />
          </IconButton>
          {isBusy && <LinearProgress className={classes.linearProgress} />}
        </CardActions>
      </Card>
      {detailsDialogOpen && (
        <DetailsDialog
          isOpen={detailsDialogOpen}
          skuDetails={skuDetails}
          name={name}
          imageUrl={imageUrl}
          productId={productId}
          folderMembership={folderMembership}
          initialSkuId={currentSkuId}
          allFolders={allFolders}
          cardType={cardType}
          skuPriceIsDefault={skuPriceIsDefault}
          initialSkuPrice={skuPrice}
          handleSave={async (needsSave, newAttributes) => {
            if (needsSave) {
              setIsBusy(true);
              await handleProductDetailsChange(productId, newAttributes);
              setIsBusy(false);
            }
          }}
          handleClose={() => setDetailsDialogOpen(false)}
          url={url}
        />
      )}
    </>
  );
}
