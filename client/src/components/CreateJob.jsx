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
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios';

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
      jobImportURL: '',
      missingFields: false,
      analytics: {
        customizedFull: false,
        customizedPersonal: false,
        customizedSotwareEngineeringProjects: false,
        customizedCoverLetter: false,
        mentionedNonTechnicalExperience: false,
        codeLinks: false,
        deployedLinks: false,
        referral: false,
        usedARecruiter: false,
        networked: false,
        inCompanyConnection: false,
      },
    };

    this.handleClose = this.handleClose.bind(this);
    this.createNewJob = this.createNewJob.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.getJobInfoFromURL = this.getJobInfoFromURL.bind(this);
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

  handleCheck({ target }) {
    this.state.analytics[target.name] = target.checked;
    this.setState({ analytics: this.state.analytics });
  }

  // Event listener for create a new job, and bubble the event back to trigger the
  // Ajax call from the main component.
  // Eventually, we should have form validation for this part.
  createNewJob() {
    this.state.missingFields = false;
    if (
      (this.state.name === '' ||
        this.state.title === '' ||
        this.state.website === '' ||
        this.state.email === '' ||
        this.state.phone === '' ||
        this.state.recruiter === '' ||
        this.state.postDate === '' ||
        this.state.appliedDate === '' ||
        this.state.interviewedDate === '' ||
        this.state.coverLetterUrl === '' ||
        this.state.payRange === '' ||
        this.state.state === '') &&
      this.state.jobImportURL === ''
    ) {
      this.setState({ missingFields: true });
    } else {
      this.props.onSubmit(this.state);
    }
  }

  getJobInfoFromURL() {
    axios
      .get('/joburl', {
        params: {
          url: this.state.jobImportURL,
        },
      })
      .then(response => {
        console.log(response);
      })
      .catch(err => console.log(err));
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
            <div style={this.state.missingFields ? { color: 'red' } : { display: 'none', fontSize: '1.5em' }}>
              <a>{'You must fill in either the Job Listing'}</a>
              <br />
              <a> {'URL or all the fields in the form'}</a>
              <br />
            </div>
            <DialogContentText id="alert-dialog-description">
              <div>
                <label>Job Listing URL</label>
                <input
                  type="text"
                  name="jobImportURL"
                  value={this.state.jobImportURL}
                  onChange={e => {
                    this.handleChange(e);
                  }}
                  required
                />
              </div>
            </DialogContentText>
          </DialogContent>

          <Button variant="outlined" onClick={this.getJobInfoFromURL}>
            Import from URL
          </Button>

          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <div>
                <label>Company name:</label>
                <input
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange.bind(this)}
                  onKeyUp={e => this.handleEnter(e, this.createNewJob.bind(this))}
                  required
                />
              </div>
              <div>
                <label>Job title:</label>
                <input
                  type="text"
                  name="title"
                  value={this.state.title}
                  onChange={this.handleChange.bind(this)}
                  onKeyUp={e => this.handleEnter(e, this.createNewJob.bind(this))}
                  required
                />
              </div>
              <div>
                <label>Web site:</label>
                <input
                  type="text"
                  name="website"
                  value={this.state.website}
                  onChange={this.handleChange.bind(this)}
                  onKeyUp={e => this.handleEnter(e, this.createNewJob.bind(this))}
                />
              </div>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange.bind(this)}
                  onKeyUp={e => this.handleEnter(e, this.createNewJob.bind(this))}
                />
              </div>
              <div>
                <label>Phone:</label>
                <input
                  type="phone"
                  name="phone"
                  value={this.state.phone}
                  onChange={this.handleChange.bind(this)}
                  onKeyUp={e => this.handleEnter(e, this.createNewJob.bind(this))}
                />
              </div>
              <div>
                <label>Recruiter: </label>
                <input
                  type="text"
                  name="recruiter"
                  value={this.state.recruiter}
                  onChange={this.handleChange.bind(this)}
                  onKeyUp={e => this.handleEnter(e, this.createNewJob.bind(this))}
                />
              </div>
              <div>
                <label>Post Date:</label>
                <input
                  type="date"
                  name="postDate"
                  value={this.state.postDate}
                  onChange={this.handleChange.bind(this)}
                  onKeyUp={e => this.handleEnter(e, this.createNewJob.bind(this))}
                />
              </div>
              <div>
                <label>Applied Date: </label>
                <input
                  type="date"
                  name="appliedDate"
                  value={this.state.appliedDate}
                  onChange={this.handleChange.bind(this)}
                  onKeyUp={e => this.handleEnter(e, this.createNewJob.bind(this))}
                />
              </div>
              <div>
                <label>Interviewed Date:</label>
                <input
                  type="date"
                  name="interviewedDate"
                  value={this.state.interviewedDate}
                  onChange={this.handleChange.bind(this)}
                  onKeyUp={e => this.handleEnter(e, this.createNewJob.bind(this))}
                />
              </div>
              <div>
                <label>Cover letter url:</label>
                <input
                  type="text"
                  name="coverLetterUrl"
                  value={this.state.coverLetterUrl}
                  onChange={this.handleChange.bind(this)}
                  onKeyUp={e => this.handleEnter(e, this.createNewJob.bind(this))}
                />
              </div>
              <div>
                <label>Salary:</label>
                <input
                  type="text"
                  name="payRange"
                  value={this.state.payRange}
                  onChange={this.handleChange.bind(this)}
                  onKeyUp={e => this.handleEnter(e, this.createNewJob.bind(this))}
                />
              </div>
              <div>
                <label>State:</label>
                <select
                  name="state"
                  value={this.state.state}
                  onChange={this.handleChange.bind(this)}
                  onKeyUp={e => this.handleEnter(e, this.createNewJob.bind(this))}
                >
                  <option value="">Please choose an option</option>
                  <option value="pending">Pending</option>
                  <option value="offered">Offered</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div>
                <label>Customized Fully: </label>
                <Checkbox
                  name="customizedFull"
                  checked={this.state.analytics.customizedFull}
                  onChange={this.handleCheck}
                />
              </div>
              <div>
                <label>Customized Cover Letter: </label>
                <Checkbox
                  name="customizedCoverLetter"
                  checked={this.state.analytics.customizedCoverLetter}
                  onChange={this.handleCheck}
                />
              </div>
              <div>
                <label>Customized Sotware Engineering Projects: </label>
                <Checkbox
                  name="customizedSotwareEngineeringProjects"
                  checked={this.state.analytics.customizedSotwareEngineeringProjects}
                  onChange={this.handleCheck}
                />
              </div>
              <div>
                <label>Customized Personal Section: </label>
                <Checkbox
                  name="customizedPersonal"
                  checked={this.state.analytics.customizedPersonal}
                  onChange={this.handleCheck}
                />
              </div>
              <div>
                <label>Mentioned Non-Technical Experience: </label>
                <Checkbox
                  name="mentionedNonTechnicalExperience"
                  checked={this.state.analytics.mentionedNonTechnicalExperience}
                  onChange={this.handleCheck}
                />
              </div>
              <div>
                <label>Included Codebase Links: </label>
                <Checkbox name="codeLinks" checked={this.state.analytics.codeLinks} onChange={this.handleCheck} />
              </div>
              <div>
                <label>Included Deployed Links: </label>
                <Checkbox
                  name="deployedLinks"
                  checked={this.state.analytics.deployedLinks}
                  onChange={this.handleCheck}
                />
              </div>
              <div>
                <label>Had A Referral: </label>
                <Checkbox name="referral" checked={this.state.analytics.referral} onChange={this.handleCheck} />
              </div>
              <div>
                <label>Used A Recruiter: </label>
                <Checkbox
                  name="usedARecruiter"
                  checked={this.state.analytics.usedARecruiter}
                  onChange={this.handleCheck}
                />
              </div>
              <div>
                <label>Networked: </label>
                <Checkbox name="networked" checked={this.state.analytics.networked} onChange={this.handleCheck} />
              </div>
              <div>
                <label>Have A In Company Connection: </label>
                <Checkbox
                  name="inCompanyConnection"
                  checked={this.state.analytics.inCompanyConnection}
                  onChange={this.handleCheck}
                />
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
