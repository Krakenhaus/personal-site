import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import {
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Chip,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
} from '@material-ui/core';
import Calendar from './Calendar';

const useStyles = makeStyles({
  root: {
    width: 350,
    padding: 0,
  },

  title: {
    marginTop: 0,
  },
  complete: {
    backgroundColor: '#e7ffc9',
  },
});

export default function Fish(props) {

  const classes = useStyles();
  const { name, index, isDonated, isHoarded, northernMonths, time, toggleAccumulation } = props;
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const isActive = northernMonths.includes(currentMonth);
  const complete = isDonated && isHoarded;

  let rootClasses = classes.root;
  rootClasses = complete ? `${rootClasses} ${classes.complete}` : rootClasses;
  return (
    <Card className={rootClasses}>
      <CardContent>
        <div style={{display: 'flex'}}>
          <h3 className={classes.title}>{name}</h3>
          <div style={{'margin-left': 'auto'}}>
          {isActive && <Chip color="secondary" icon={<AlarmOnIcon />} label={"Available Today!"}/>}
          </div>
        </div>
        <Divider variant="inset"  />
        <Grid container cellHeight={160} cols={2} spacing={2} justify="center" style={{'margin-top': '10px'}}>
          <Grid item justify="center">
            <span>{time}</span>
          </Grid>
          <Grid item justify="center">
            <Calendar currentMonth={currentMonth} activeMonths={northernMonths} />
          </Grid>
        </Grid>

      </CardContent>
      <CardActions style={{'background-color': '#f0f0f0'}}>
        <FormGroup row>
          <FormControlLabel
            control={<Checkbox
              data-id={index}
              checked={isDonated}
              color="primary"
              onChange={(e) => toggleAccumulation(e, 'isDonated')}
              name="Donated"
            />}
            label="Donated"
          />
          <FormControlLabel
            control={<Checkbox
              data-id={index}
              checked={isHoarded}
              color="primary"
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
