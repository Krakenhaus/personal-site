import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Collapse, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
  cardThumbnail: {
    height: 75,
  },
  cardDetails: {
    padding: 20
  },
  cardMetaInfo: {
    display: 'inline-block',
    verticalAlign: 'top',
    padding: 20,
  },
  collapse: {
    textAlign: 'left',
    outline: '2px solid #dedede',
    outlineOffset: -2,
    backgroundColor: '#efefef',
  },
  estimatedPrice: {
    color: 'green',
  },
  rightInfo: {
    float: 'right',
    marginRight: 10,
  },
  leftInfo: {
    marginLeft: 10,
  },
}));

// https://tcgplayer-cdn.tcgplayer.com/product/42415_200w.jpg
function CardDetails({ cardName, cardNumber, estimatedPrice, imageUrl, set}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItem divider button onClick={handleClick}>
        <ListItemIcon>
          <img className={classes.cardThumbnail} src={imageUrl} />
        </ListItemIcon>
        <ListItemText
          primary = {
            <>
              <span className={classes.leftInfo}><b>{cardName}</b></span>
              <span className={classes.rightInfo}><span className={classes.estimatedPrice}>{estimatedPrice}</span></span>
            </>
          }
          secondary = {
            <span className={classes.leftInfo}>
              {set}
            </span>
          }
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse className={classes.collapse} in={open} timeout="auto" unmountOnExit>
        <div className={classes.cardDetails}>
          <img src={imageUrl} />
          <div className={classes.cardMetaInfo}>
          <Typography color="textPrimary">
              {cardName}
            </Typography>
            <Typography color="textSecondary">
              {cardNumber}
            </Typography>
          </div>
        </div>
      </Collapse>
    </>
  );
}

export default CardDetails;