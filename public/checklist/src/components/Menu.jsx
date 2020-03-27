import React from 'react';
import {
  AppBar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
});

function Menu(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({ open: false });
  const { onUpdatePage, pageName } = props;
  const toggleDrawer = (open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, open });
  };

  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button key="Fish" onClick={() => onUpdatePage('Fish')}>
          <ListItemIcon>{<MenuIcon />}</ListItemIcon>
          <ListItemText primary="Fish" />
        </ListItem>
        <ListItem button key="Bugs" onClick={() => onUpdatePage('Bugs')}>
          <ListItemIcon>{<MenuIcon />}</ListItemIcon>
          <ListItemText primary="Bugs" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <>
      <Drawer anchor="left" open={state.open} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">
            {pageName}
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Menu;
