import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar as AvatarUI,
} from '@material-ui/core';
import Confetti from 'react-dom-confetti';
import { getAvatarProps } from '../utils/avatarProps'
import StyledBadge from './StyledBadge';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: props => props.color,
  },
  needSpace: {
    marginRight: 10,
  },
  confetti: {
    left: 5,
    top: -20,
    position: 'relative',
  },
});

export default function Avatar(props) {
  const { active, name, seen, type } = props;
  const { color, image, width, height } = getAvatarProps(name, type, seen);
  const classes = useStyles({ color });
  const confettiConfig = {
    colors: [color],
    spread: 360,
    startVelocity: 25,
    elementCount: 50,
    stagger: 10,
  }


  let avatarClasses = classes.avatar;
  avatarClasses = active ? avatarClasses : `${avatarClasses} ${classes.needSpace}`
  const AvatarBase = (
    <div>
    <AvatarUI
      className={avatarClasses}
      imgProps={{style: {'width':`${width}`,'height':`${height}`}}}
      alt={name}
      src={image}
    />
    <Confetti className={classes.confetti} active={ seen } config={confettiConfig} />
    </div>
  );

  if (active) {
    return (
      <StyledBadge
        overlap="circle"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        variant="dot"
        className={classes.needSpace}
      >
        {AvatarBase}
      </StyledBadge>
    );
  }

  return AvatarBase;
}
