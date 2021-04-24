import React from "react";
import {
  AppBar,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import Sort from "./Sort";
import Search from "./Search";
import Filters from "./Filters";

const useStyles = makeStyles((theme) => ({
  appBar: {
    background:
      "repeating-linear-gradient(45deg, #333333 0, #333333 5%, #4f4f4f 0, #4f4f4f 50%) 0 / 10px 10px",
    flexGrow: 1,
  },
  button: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "inherit",
    },
  },
  list: {
    width: 250,
  },
  menuTitle: {
    textAlign: "center",
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    textAlign: "left",
  },
  toolbar: {
    backgroundColor: "#f0f0f0",
    // display: 'flex',
    // marginLeft: 'auto',
    height: 50,
  },
}));

function Menu(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({ open: false });
  const {
    onUpdatePage,
    onChangeFilters,
    onChangeSearch,
    onChangeSort,
    pageName,
    filters,
    sort,
  } = props;
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, open });
  };

  const handleUpdatePage = (page) => {
    onUpdatePage(page);
    setState({ ...state, open: false });
  };

  const MenuList = (
    <div className={classes.list} role="presentation">
      <List>
        <Typography variant="h6" className={classes.menuTitle}>
          Page
        </Typography>
        <Divider />
        <ListItem button key="Fish" onClick={() => handleUpdatePage("Fish")}>
          <ListItemIcon>{<MenuIcon />}</ListItemIcon>
          <ListItemText primary="Fish" />
        </ListItem>
        <ListItem button key="Bugs" onClick={() => handleUpdatePage("Bugs")}>
          <ListItemIcon>{<MenuIcon />}</ListItemIcon>
          <ListItemText primary="Bugs" />
        </ListItem>

        <Typography variant="h6" className={classes.menuTitle}>
          Sort
        </Typography>
        <Divider />
        <Sort currentSort={sort} onChangeSort={onChangeSort} />

        <Typography variant="h6" className={classes.menuTitle}>
          Filters
        </Typography>
        <Divider />
        <Filters currentFilters={filters} onChangeFilters={onChangeFilters} />
      </List>
    </div>
  );

  return (
    <>
      <Drawer anchor="left" open={state.open} onClose={toggleDrawer(false)}>
        {MenuList}
      </Drawer>
      <AppBar className={classes.appBar} position="sticky">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {pageName}
          </Typography>
          <Button
            href="https://github.com/Krakenhaus/animalcrossing/issues"
            target="_blank"
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<GitHubIcon />}
          >
            Report issues on GitHub
          </Button>
          <Search onChangeSearch={onChangeSearch} />
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Menu;
