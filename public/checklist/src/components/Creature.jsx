import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import CheckIcon from '@material-ui/icons/Check';
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
import { getSaveData, setSaveData } from '../utils/storage';
import { isActive } from '../utils/date';
import Calendar from './Calendar';
import Avatar from './Avatar';

const useStyles = makeStyles({
  root: {
    width: 350,
    padding: 0,
  },
  title: {
    marginTop: 0,
  },
});

const defaultSaveData = {
  isDonated: false,
  isHoarded: false,
}

export default function Creature(props) {

  const classes = useStyles();
  const {
    name,
    index,
    activeMonths,
    time,
    type,
  } = props;

  const [state, setState] = useState({
    ...defaultSaveData,
    isLoading: true,
  });
  const { isDonated, isHoarded, isLoading } = state;

  useEffect(() => {
    const saveData = getSaveData({ type });
    setState({ ...defaultSaveData, ...saveData[index], isLoading: false });
  }, [index, type]);

  const active = isActive(activeMonths);
  const complete = isDonated && isHoarded;
  const seen = isDonated || isHoarded;

  const toggleAccumulation = (e) => {
    const prop = e.target.name;
    const saveData = getSaveData({ type });
    if (saveData[index]) {
      saveData[index][prop] = !saveData[index][prop];
    } else {
      saveData[index] = {}
      saveData[index][prop] = true;
    }
    setSaveData({ type }, saveData);
    setState({...defaultSaveData, ...saveData[index], isLoading: false});
  }

  if (isLoading) {
    return null;
  }

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <div style={{display: 'flex'}}>
            <Avatar active={active} name={name} seen={seen} type={type} />
            <h3 className={classes.title}>{name}</h3>
            <div style={{'marginLeft': 'auto'}}>
            {active && <Chip color="secondary" icon={<AlarmOnIcon />} label={"Active!"}/>}
            </div>
          </div>
          <Divider variant="inset"  />
          <Grid container cols={2} spacing={2} justify="center" style={{'marginTop': '10px'}}>
            <Grid item container justify="center">
              <span>{time}</span>
            </Grid>
            <Grid item container justify="center">
              <Calendar activeMonths={activeMonths} />
            </Grid>
          </Grid>

        </CardContent>
        <CardActions style={{'backgroundColor': '#f0f0f0'}}>
          <FormGroup row>
            <FormControlLabel
              control={<Checkbox
                data-id={index}
                checked={isDonated}
                color="primary"
                onChange={toggleAccumulation}
                name="isDonated"
              />}
              label="Donated"
            />
            <FormControlLabel
              control={<Checkbox
                data-id={index}
                checked={isHoarded}
                color="primary"
                onChange={toggleAccumulation}
                name="isHoarded"
              />}
              label="Hoarded"
            />
          </FormGroup>
          {complete && <CheckIcon style={{'marginLeft': 'auto'}} fontSize="large"/>}
        </CardActions>
      </Card>
    </>
  );
}
