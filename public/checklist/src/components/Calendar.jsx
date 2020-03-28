import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Paper,
} from '@material-ui/core';
import { getCurrentMonth } from '../utils/date';

const useStyles = makeStyles({
  root: {
    width: 120,
  },
  month: {
    width: 30,
    height:20,
  },
  inactive: {
    backgroundColor: '#949494',
  },
  current: {
    outline: '2px solid #444',
    outlineOffset: -2
  }
});

export default function Calendar(props) {
  const { activeMonths } = props;
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={0}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(value => {
        const active = activeMonths.includes(value);
        const current = value === getCurrentMonth();
        let classNames = classes.month;
        classNames = active ? classes.month : `${classes.month} ${classes.inactive}`;
        classNames = current ? `${classNames} ${classes.current}` : classNames;
        return (
          <Grid key={value} item>
            <Paper className={classNames} square>
              {value}
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
}
