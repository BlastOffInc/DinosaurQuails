import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import axios from 'axios';

// This will build the Modal for User Login and signing up

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});

class LoginSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [],
      open: false,
      nonExistentUser: false,
      alreadyExistingUser: false,
      blankFields: false,
    };
  }

  /**
   * @description button that checks key press for enter and if it is it runs the function it is passed
   * @param { { } } event the event being checked for enter
   * @param { Function } callback the function to run if enter was pressed
   *
   * @return { undefined } undefined
   */
  handleEnter(event, callback) {
    if (event.key === 'Enter') {
      callback();
    }
  }

  /** *This function takes the inputted values of email and password field and sends a post request to the server to check if the username/password combination is valid. If valid then the userinfo is saved in main app state with isLoggedIn state toggling to true and the login modal closes.*/
  logIntoAccount() {
    let requestData = {
      email: document.getElementsByClassName('email')[0].value,
      password: document.getElementsByClassName('password')[0].value,
    };

    this.props.submitData('/login', requestData, (response, err) => {
      if (response.data.messageCode === 103 || response.data.messageCode === 104) {
        this.setState({
          nonExistentUser: true,
        });
      } else {
        this.props.updateUserInfo(
          response.data.firstName,
          response.data.lastName,
          response.data.userName,
          response.data.email,
          response.data._id
        );
        this.props.isLoggedIn(true);
        this.props.displayLoginSignup(false);
        this.props.getJobData();
      }
    });
  }

  /** *This function takes the inputted values of the registration fields, sends a post request to server to make a new entry in database for the new user. Also checks if email or username is already in use, if so displays message to client.*/
  registerForAccount() {
    this.state.blankFields = false;
    this.state.alreadyExistingUser = false;
    if (
      document.getElementsByClassName('firstName')[0].value === '' ||
      document.getElementsByClassName('lastName')[0].value === '' ||
      document.getElementsByClassName('userName')[0].value === '' ||
      document.getElementsByClassName('email')[0].value === '' ||
      document.getElementsByClassName('password')[0].value === ''
    ) {
      this.setState({ blankFields: true });
    } else {
      let requestData = {
        firstName: document.getElementsByClassName('firstName')[0].value,
        lastName: document.getElementsByClassName('lastName')[0].value,
        userName: document.getElementsByClassName('userName')[0].value,
        email: document.getElementsByClassName('email')[0].value,
        password: document.getElementsByClassName('password')[0].value,
      };

      this.props.submitData('/signup', requestData, (response, err) => {
        // todo this is all wrong, should be a 400 type error with a message explaining it
        if (response.data.messageCode === 101 || response.data.messageCode === 102) {
          this.setState({
            alreadyExistingUser: true,
          });
        } else {
          this.props.updateUserInfo(
            requestData.firstName,
            requestData.lastName,
            requestData.userName,
            requestData.email,
            response.data._id
          );
          this.props.isLoggedIn(true);
          this.props.displayLoginSignup(false);
        }
      });
    }
  }

  /** * This conditionally renders signup or registration modals depending on which button was clicked in the Nav bar as well as have user message appear in case there is an issue with logging in/registering. Would be a good idea to make separate components to call here for both Login and SignUp and have tab on each one to toggle in case user misclicked*/
  render() {
    let MessageToUser = '';

    if (this.state.nonExistentUser) {
      MessageToUser = 'Sorry! This email and password combination is not valid...';
    }

    if (this.state.alreadyExistingUser) {
      MessageToUser = 'User already exists';
    }

    if (this.props.view === 'login') {
      return (
        <React.Fragment>
          <Dialog
            open={!!this.props.view}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{'Log into your account'}</DialogTitle>

            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <div style={!this.state.nonExistentUser ? { display: 'none ' } : { color: 'red', fontSize: '0.8em' }}>
                  <React.Fragment>{MessageToUser}</React.Fragment>
                </div>
                <React.Fragment>
                  Email:
                  <input
                    onKeyUp={e => this.handleEnter(e, this.logIntoAccount.bind(this))}
                    type="text"
                    className="email"
                    name="email"
                    required
                  />
                </React.Fragment>

                <React.Fragment>
                  Password:
                  <input
                    onKeyUp={e => this.handleEnter(e, this.logIntoAccount.bind(this))}
                    type="password"
                    className="password"
                    name="password"
                    required
                  />
                </React.Fragment>


              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button color="primary">
                <a href='/login'>Log in</a>
              </Button>
              <Button onClick={() => this.props.displayLoginSignup(false)} color="primary" autoFocus>
                Exit
            </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      )
    }

    if (this.props.view === 'register') {
      return (
        <React.Fragment>
          <Dialog
            open={!!this.props.view}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{'Register for a new account'}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <div
                  style={!this.state.alreadyExistingUser ? { display: 'none ' } : { color: 'red', fontSize: '0.8em' }}
                >
                  <React.Fragment>{MessageToUser}</React.Fragment>
                </div>
                <div style={!this.state.blankFields ? { display: 'none ' } : { color: 'red', fontSize: '0.8em' }}>
                  <React.Fragment>{'Cannot Leave Fields Blank'}</React.Fragment>
                </div>
                <React.Fragment>
                  <input
                    type="text"
                    onKeyUp={e => this.handleEnter(e, this.registerForAccount.bind(this))}
                    className="firstName"
                    name="firstName"
                    placeholder="First Name"
                    required
                  />
                </React.Fragment>
                <br />

                <React.Fragment>
                  <input
                    type="text"
                    onKeyUp={e => this.handleEnter(e, this.registerForAccount.bind(this))}
                    className="lastName"
                    name="lastName"
                    placeholder="Lastname"
                    required
                  />
                </React.Fragment>
                <br />

                <React.Fragment>
                  <input
                    type="text"
                    onKeyUp={e => this.handleEnter(e, this.registerForAccount.bind(this))}
                    className="userName"
                    name="userName"
                    placeholder="Username"
                    required
                  />
                </React.Fragment>
                <br />

                <React.Fragment>
                  <input
                    type="text"
                    onKeyUp={e => this.handleEnter(e, this.registerForAccount.bind(this))}
                    className="email"
                    name="email"
                    placeholder="Email"
                    required
                  />
                </React.Fragment>
                <br />

                <React.Fragment>
                  <input
                    onKeyUp={e => this.handleEnter(e, this.registerForAccount.bind(this))}
                    type="password"
                    className="password"
                    name="password"
                    placeholder="Password"
                    required
                  />
                </React.Fragment>
                <br />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.registerForAccount()} color="primary">
                Register
              </Button>
              <Button onClick={() => this.props.displayLoginSignup(false)} color="primary" autoFocus>
                Exit
              </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment >
      );
    }
  }
}

export default LoginSignUp;
