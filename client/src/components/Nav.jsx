import React, { Component } from 'react';
import Banner from './Banner.jsx';
import { AppBar, Toolbar, Typography, IconButton, Button } from '@material-ui/core';

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flexGrow: 1,
    marginLeft: 100
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  appbar: {
    backgroundColor: '#7dce94'
  }
};

const Nav = props => (
  <div id="nav" style={styles.root}>
    <AppBar position="static" style={styles.appbar}>
      <Toolbar variant="dense" >
        <Typography variant="headline" color="inherit" id="banner" style={styles.flex}>
          <div><Banner /></div>
        </Typography>
        {props.isLoggedIn ? (
          <div>
            <Button color="inherit" id="Create" onClick={() => props.displayCreateJob('create')}>Add</Button>
            <Button color="inherit" id="logout" href="/auth/google/logout">Logout</Button>
          </div>
        ) : (
            <div>
              <Button color="inherit" id="login" href="/auth/google">Login</Button>
            </div>
          )}
      </Toolbar>
    </AppBar>
  </div>
);


export default Nav;
