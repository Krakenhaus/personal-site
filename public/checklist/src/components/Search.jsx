import React from 'react';
import {
  IconButton,
  InputAdornment,
  InputBase,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import { fade, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearIcon: {
    color: theme.palette.common.white,
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function Search(props) {
  const classes = useStyles();
  const { onChangeSearch } = props;
  const [state, setState] = React.useState({ search: '' });
  const { search } = state;

  const handleChange = (e) => {
    const newSearch = e.target.value;
    setState({ search: newSearch });
    onChangeSearch(newSearch);
  }

  const handleClear = () => {
    const newSearch = '';
    setState({ search: newSearch });
    onChangeSearch(newSearch);
  }

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
        onChange={handleChange}
        value={search}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="clear"
              onClick={handleClear}
              className={classes.clearIcon}
            >
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </div>
  );
}
