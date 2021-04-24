import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  cardRoot: {
    minWidth: 275,
  },
  pos: {
    marginBottom: 12,
  },
});

function LinkCard({index, link, subtitle, title}) {
  const classes = useStyles();
  const history = useHistory();

  const followLink = () => {
    history.push(link);
  }

  return (
    <Card className={classes.cardRoot} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {subtitle}
        </Typography>
        <Typography variant="body2" component="p">
          Image goes here...
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={followLink}>Try it out!</Button>
      </CardActions>
    </Card>
  );
}

export default LinkCard;
