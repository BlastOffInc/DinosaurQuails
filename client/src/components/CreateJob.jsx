import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

// This is the component for creating a new job. Since we need to host a form in the component, follow
// the React Design Patterns rules, we are using a stateful component with local states to dynamically
// take care of the events.

class CreateJob extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.user,
      name: '',
      title: '',
      website: '',
      email: '',
      phone: '',
      recruiter: '',
      postDate: '',
      appliedDate: '',
      interviewedDate: '',
      coverLetterUrl: '',
      payRange: '',
      state: '',
      open: true,
    };

    this.handleClose = this.handleClose.bind(this);
    this.createNewJob = this.createNewJob.bind(this);
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
  // Here is only close the modal when click the button.
  // Eventally, we should handle when click the outside of the modal, still close the modal.
  handleClose() {
    this.setState({ open: false });
    this.props.onClose();
  }

  // Follow the React Best Practice Design Patterns to dynamiclly updates the state
  handleChange(event) {
    var target = event.target;
    var value = target.value;
    var name = target.name;
    this.setState({
      [name]: value,
    });
  }

  // Event listener for create a new job, and bubble the event back to trigger the
  // Ajax call from the main component.
  // Eventually, we should have form validation for this part.
  createNewJob() {
    console.log(this.state);
    this.props.onSubmit(this.state);
  }

  // JSX renders html elements
  render() {
    return (
      <div>
        <Dialog
          open={!!this.props.view}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Create a new job'}</DialogTitle>

          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <div>
                <label>Company name:</label>
                <input
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  onKeyPress={e => this.handleEnter(e, this.createNewJob.bind(this))}
                  required
                />
              </div>

              <div>
                <label>Job title:</label>
                <input
                  type="text"
                  name="title"
                  value={this.state.title}
                  onChange={this.handleChange}
                  onKeyPress={e => this.handleEnter(e, this.createNewJob.bind(this))}
                  required
                />
              </div>
              <div>
                <label>Web site:</label>
                <input
                  type="text"
                  name="website"
                  value={this.state.website}
                  onChange={this.handleChange}
                  onKeyPress={e => this.handleEnter(e, this.createNewJob.bind(this))}
                />
              </div>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  onKeyPress={e => this.handleEnter(e, this.createNewJob.bind(this))}
                />
              </div>
              <div>
                <label>Phone:</label>
                <input
                  type="phone"
                  name="phone"
                  value={this.state.phone}
                  onChange={this.handleChange}
                  onKeyPress={e => this.handleEnter(e, this.createNewJob.bind(this))}
                />
              </div>
              <div>
                <label>Recruiter:</label>
                <input
                  type="text"
                  name="recruiter"
                  value={this.state.recruiter}
                  onChange={this.handleChange}
                  onKeyPress={e => this.handleEnter(e, this.createNewJob.bind(this))}
                />
              </div>
              <div>
                <label>Post Date:</label>
                <input
                  type="date"
                  name="postDate"
                  value={this.state.postDate}
                  onChange={this.handleChange}
                  onKeyPress={e => this.handleEnter(e, this.createNewJob.bind(this))}
                />
              </div>
              <div>
                <label>Applied Date:</label>
                <input
                  type="date"
                  name="appliedDate"
                  value={this.state.appliedDate}
                  onChange={this.handleChange}
                  onKeyPress={e => this.handleEnter(e, this.createNewJob.bind(this))}
                />
              </div>
              <div>
                <label>Interviewed Date:</label>
                <input
                  type="date"
                  name="interviewedDate"
                  value={this.state.interviewedDate}
                  onChange={this.handleChange}
                  onKeyPress={e => this.handleEnter(e, this.createNewJob.bind(this))}
                />
              </div>
              <div>
                <label>Cover letter url:</label>
                <input
                  type="text"
                  name="coverLetterUrl"
                  value={this.state.coverLetterUrl}
                  onChange={this.handleChange}
                  onKeyPress={e => this.handleEnter(e, this.createNewJob.bind(this))}
                />
              </div>
              <div>
                <label>Salary:</label>
                <input
                  type="text"
                  name="payRange"
                  value={this.state.payRange}
                  onChange={this.handleChange}
                  onKeyPress={e => this.handleEnter(e, this.createNewJob.bind(this))}
                />
              </div>
              <div>
                <label>State:</label>
                <select
                  name="state"
                  value={this.state.state}
                  onChange={this.handleChange}
                  onKeyPress={e => this.handleEnter(e, this.createNewJob.bind(this))}
                >
                  <option value="">Please choose an option</option>
                  <option value="pending">Pending</option>
                  <option value="offered">Offered</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.createNewJob} color="primary">
              Create
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Exit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default CreateJob;
