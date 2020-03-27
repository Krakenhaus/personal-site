import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActions,
  CardContent,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: 275,
    padding: 15,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Fish(props) {

  const classes = useStyles();
  const { name, index, isDonated, isHoarded, toggleAccumulation } = props;
  console.log(props);
  return (
    <Card className={classes.root}>
      <CardContent>
        {name}
      </CardContent>
      <CardActions>
        <FormGroup row>
          <FormControlLabel
            control={<Checkbox
              data-id={index}
              checked={isDonated}
              onChange={(e) => toggleAccumulation(e, 'isDonated')}
              name="Donated"
            />}
            label="Donated"
          />
          <FormControlLabel
            control={<Checkbox
              data-id={index}
              checked={isHoarded}
              onChange={(e) => toggleAccumulation(e, 'isHoarded')}
              name="Hoarded"
            />}
            label="Hoarded"
          />
        </FormGroup>
      </CardActions>
    </Card>
  );
}
