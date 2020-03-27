import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import CheckIcon from '@material-ui/icons/Check';
import {
  Avatar,
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
import avatarProps from '../utils/avatarProps'
import StyledBadge from './StyledBadge';
import Calendar from './Calendar';

const useStyles = makeStyles({
  root: {
    width: 350,
    padding: 0,
  },
  title: {
    marginTop: 0,
  },
  avatar: {
    marginRight: 10,
  },
});

export default function Creature(props) {

  const classes = useStyles();
  const { name, index, isDonated, isHoarded, northernMonths, time, toggleAccumulation, type } = props;
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const isActive = northernMonths.includes(currentMonth);
  const complete = isDonated && isHoarded;
  const seen = isDonated || isHoarded;

  const avatarImage = seen ? `../images/${type}/${name.toLowerCase().replace(/\s/g, '')}.png` : null;
  const avatarInfo = avatarProps[name.toLowerCase()] || avatarProps.default;
  const avatarColor = seen ? avatarInfo.color : avatarProps.default.color;
  const avatarHeight = seen ? avatarInfo.height : avatarProps.default.height;
  const avatarWidth = seen ? avatarInfo.width : avatarProps.default.width;
  const avatar = isActive ? (
      <StyledBadge
        overlap="circle"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        variant="dot"
        className={classes.avatar}
      >
        <Avatar style={{'background-color': `${avatarColor}`}} imgProps={{style: {'width':`${avatarWidth}`,'height':`${avatarHeight}`}}} alt={name} src={avatarImage} />
      </StyledBadge>
    ): <Avatar style={{'background-color': `${avatarColor}`}} imgProps={{style: {'width':`${avatarWidth}`,'height':`${avatarHeight}`}}} className={classes.avatar} alt={name} src={avatarImage} />;

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <div style={{display: 'flex'}}>
            {avatar}
            <h3 className={classes.title}>{name}</h3>
            <div style={{'margin-left': 'auto'}}>
            {isActive && <Chip color="secondary" icon={<AlarmOnIcon />} label={"Active!"}/>}
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
          {complete && <CheckIcon style={{'margin-left': 'auto'}} fontSize="large"/>}
        </CardActions>
      </Card>
    </>
  );
}
