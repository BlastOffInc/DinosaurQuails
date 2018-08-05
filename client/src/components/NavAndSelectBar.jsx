import React from 'react';
import Nav from './Nav.jsx';
import SelectBar from './SelectBar.jsx';
import Application from './Application.jsx';

var NavAndSelectBar = props => {
  return (
    <React.Fragment>
      <Nav
        displayLoginSignup={props.displayLoginSignup}
        isLoggedIn={props.isLoggedIn}
        displayCreateJob={props.displayCreateJob}
        updateStatus={props.updateStatus}
        updateUserInfo={props.updateUserInfo}
      />
      <SelectBar changeTab={props.changeTab} />
    </React.Fragment>
  );
};

export default NavAndSelectBar;
