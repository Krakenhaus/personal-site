import React from 'react';
import {
  FormControl,
  Select,
  MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { BY, ORDER } from '../utils/sort';
import { sortKey, setSaveData } from '../utils/storage';

const useStyles = makeStyles((theme) => ({
  root: {
  },
  formControl: {
    margin: theme.spacing(1),
    width: '100%',
    paddingLeft: 16,
    paddingRight: 24,
  },
}));

export default function Sort(props) {
  const classes = useStyles();
  const { currentSort, onChangeSort } = props;

  const onChangeSortBy = (e) => {
    const newSort = { ...currentSort, by: e.target.value }
    setSaveData({ key: sortKey }, newSort);
    onChangeSort(newSort);
  };

  const onChangeSortOrder = (e) => {
    const newSort = { ...currentSort, order: e.target.value }
    setSaveData({ key: sortKey }, newSort);
    onChangeSort(newSort);
  };

  return (
    <>
      <FormControl className={classes.formControl}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currentSort.by}
          onChange={onChangeSortBy}
        >
          <MenuItem value={BY.ALPHABETICAL}>{BY.ALPHABETICAL}</MenuItem>
          <MenuItem value={BY.CRITTERPEDIA}>{BY.CRITTERPEDIA}</MenuItem>
          <MenuItem value={BY.PRICE}>{BY.PRICE}</MenuItem>
        </Select>
        </FormControl>
          <FormControl className={classes.formControl}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currentSort.order}
          onChange={onChangeSortOrder}
        >
          <MenuItem value={ORDER.DESC}>{ORDER.DESC}</MenuItem>
          <MenuItem value={ORDER.ASC}>{ORDER.ASC}</MenuItem>
        </Select>
      </FormControl>
    </>
  );
}
