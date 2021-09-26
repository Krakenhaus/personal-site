import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  cardRoot: {
    minWidth: 275,
  },
  pos: {
    marginBottom: 12,
  },
});

function LinkCard({ index, link, subtitle, source, title }) {
  const classes = useStyles();
  const history = useHistory();

  const followLink = () => {
    history.push(link);
  };

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
          <img
            src={source}
            alt="Card Tracker"
            style={{ width: "100%", border: "1px solid #888" }}
          />
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={followLink}
        >
          Try it out!
        </Button>
      </CardActions>
    </Card>
  );
}

export default LinkCard;
