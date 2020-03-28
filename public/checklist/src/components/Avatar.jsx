import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar as AvatarUI,
} from '@material-ui/core';
import { getAvatarProps } from '../utils/avatarProps'
import StyledBadge from './StyledBadge';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: props => props.color,
  },
  needSpace: {
    marginRight: 10,
  },
});

export default function Avatar(props) {
  const { active, name, seen, type } = props;
  const { color, image, width, height } = getAvatarProps(name, type, seen);
  const classes = useStyles({ color });

  let avatarClasses = classes.avatar;
  avatarClasses = active ? avatarClasses : `${avatarClasses} ${classes.needSpace}`
  const AvatarBase = (
    <AvatarUI
      className={avatarClasses}
      imgProps={{style: {'width':`${width}`,'height':`${height}`}}}
      alt={name}
      src={image}
    />
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
