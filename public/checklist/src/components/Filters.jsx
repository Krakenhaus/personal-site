import React from 'react';
import {
  Chip,
} from '@material-ui/core';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import { makeStyles } from '@material-ui/core/styles';
import { FILTERS } from '../utils/filter';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 10,
  },
}));

export default function Filters(props) {
  const classes = useStyles();
  const { currentFilters, onChangeFilters } = props;
  // const [state, setState] = React.useState({ filters: [] });
  // const { search } = state;

  const handleChange = (filter) => {
    const newFilters = currentFilters.includes(filter) ? [] : [FILTERS.ACTIVE];
    onChangeFilters(newFilters);
  }

  const Chips = Object.keys(FILTERS).map((filter) => {
    const selected = currentFilters.includes(FILTERS[filter]);
    switch (FILTERS[filter]) {
      case FILTERS.ACTIVE:
        return <Chip
          color={selected ? 'secondary' : 'default'}
          icon={<AlarmOnIcon />}
          label="Active!"
          onClick={(e) => handleChange(FILTERS.ACTIVE)}
          key={FILTERS.ACTIVE}
          onDelete={selected ? () => handleChange(FILTERS.ACTIVE) : null}
        />;
      default:
        return null;
    }
  })
  return <div className={classes.root}>{Chips}</div>;
}
