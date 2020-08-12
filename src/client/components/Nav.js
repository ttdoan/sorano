import React, { useState } from "react";
import { Link } from "react-router-dom";
import Brand from "./Brand";
import SearchBar from "./SearchBar";
import { connect } from "react-redux";
import { toggleNightMode } from "./../redux/actions/site";

// Material UI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

// Icons
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import SearchIcon from "@material-ui/icons/Search";

function Nav(props) {
  function login() {}

  function toggleMenu(open) {
    return () => {
      setOpenMenu(open);
    };
  }

  function handleNightMode() {
    props.dispatch(toggleNightMode(!props.nightMode));
  }

  // If not logged in, then show the signup button.
  // Otherwise, show the user button.

  // In order:
  // Brand
  // Search bar
  // Account
  // Night mode
  // Cart

  // TODO: pass in function to set search results for loading on page.
  // TODO: add toggle nightmode button

  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <AppBar position="relative" color="primary">
        <Toolbar>
          <Brand />
          <Grid container alignItems="flex-end">
            <Grid item>
              <TextField variant="outlined" label="Search..." />
            </Grid>
            <Grid item border="solid">
              <SearchIcon />
            </Grid>
          </Grid>
          <IconButton onClick={toggleMenu(true)}>
            <AccountCircleOutlinedIcon />
          </IconButton>
          <IconButton>
            <ShoppingCartOutlinedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        open={openMenu}
        onClose={toggleMenu(false)}
        onOpen={toggleMenu(true)}
        anchor="right"
      >
        <List>
          <ListItem button component={Link} to="/register">
            <ListItemText primary="Account" />
          </ListItem>
          <ListItem>
            <FormControlLabel
              label="Night Mode"
              control={
                <Switch checked={props.nightMode} onChange={handleNightMode} />
              }
            />
          </ListItem>
        </List>
      </SwipeableDrawer>
    </>
  );
}

const mapStateToProps = (state) => ({
  loggedIn: state.account.token !== "",
  nightMode: state.site.nightMode,
});

const something = (dispatch) => ({
  hey: (mode) => dispatch(toggleNightMode(mode)),
});

export default connect(mapStateToProps)(Nav);
