import React, { Component, Fragment } from 'react';
import Nav from './Nav.jsx';
import LandingPage from './LandingPage.jsx';
import SelectBar from './SelectBar.jsx';
import JobList from './JobList.jsx';
import LoginSignUp from './LoginSignUp.jsx';
import CreateJob from './CreateJob.jsx';
import JobDetailWrapped from './JobDetail.jsx';
import JobTable2 from './JobTable2.jsx';
import axios from 'axios';
import Application from './Application.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        id: '',
      },
      jobs: [],
      filter: 'all',
      selectedJob: null,
      detailOpen: false,
      loginSignupButtonIsClicked: false,
      isLoggedIn: false,
      tab: 'all',
      view: false,
      createView: false,
      appStats: {},
    };
    this.showLoginOrSignUp = this.showLoginOrSignUp.bind(this);
    this.submitData = this.submitData.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.detailOpen = this.detailOpen.bind(this);
    this.showDetail = this.showDetail.bind(this);
  }

  /** @description Very reusable methods for server requests - parameters are simply endpoint instead of entire URL, request object and callback function*/
  retrieveData(endpoint, params, callback) {
    axios
      .get(endpoint, params)
      .then(response => {
        // update respective data
        callback(response);
      })
      .catch(err => console.log(err));
  }

  submitData(endpoint, params, callback) {
    axios
      .post(endpoint, params, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
      .then(response => {
        callback(response);
      })
      .catch(err => {
        console.log(err);
      });
  }

  updateData(endpoint, params, callback) {
    axios
      .put(endpoint, params, callback)
      .then(response => {
        callback(response);
      })
      .catch(err => console.log(err));
  }

  deleteData(endpoint, params, callback) {
    axios
      .put(endpoint, params, callback)
      .then(response => {
        callback(response);
      })
      .catch(err => console.log(err));
  }

  retrieveStats() {
    axios
      .get('/application/analytics', { params: { type: 'My', userId: this.state.user.id } })
      .then(({ data }) => console.log(data) || this.setState({ appStats: data }))
      .catch(err => console.log(err));
  }

  // componentDidMount() {
  //   console.log('hi on line 91');
  //   this.retrieveStats();
  // }

  /** @description This function changes the loginSignupButtonIsClicked state to retermine if the login or register modal should popup for user to input information */
  displayLoginSignup(id) {
    this.setState({
      loginSignupButtonIsClicked: id,
    });
  }

  /** @description This function changes isLoggedIn state to determine how the Nav bar appears and whether the user's job info is showing or cleared(upon logout). */
  updateStatus(status) {
    this.setState({
      isLoggedIn: status,
    });
  }

  /** @description This function is utilized by both the login/register as well as logout components. Logging in/registering changes the main app state to have the user's info so subcomponents can receive them to utilize in server calls if needed. Logging out sets the user info in the state to be null.
   */
  updateUserInfo(firstName, lastName, userName, email, id) {
    this.setState(
      {
        user: {
          firstName: firstName,
          lastName: lastName,
          userName: userName,
          email: email,
          id: id,
        },
      },
      this.getJobData()
    );
  }

  /** @description Conditional rendering for the login/register modal.
<<<<<<< Updated upstream
   */

  showLoginOrSignUp() {
    const view = this.state.loginSignupButtonIsClicked;
=======
 */
  showLoginOrSignUp() {
    const view = this.state.loginSignupButtonIsClicked
>>>>>>> Stashed changes

    if (view) {
      return (
        <LoginSignUp
          view={view}
          displayLoginSignup={this.displayLoginSignup.bind(this)}
          submitData={this.submitData}
          isLoggedIn={this.updateStatus.bind(this)}
          updateUserInfo={this.updateUserInfo.bind(this)}
          getJobData={this.getJobData.bind(this)}
        />
<<<<<<< Updated upstream
      );
=======
      )
>>>>>>> Stashed changes
    }
  }

  /** @description this function gets called when user logs in, adds job, updates/deletes job */
  getJobData() {
    if (this.state.isLoggedIn) {
<<<<<<< Updated upstream
      this.retrieveData('/jobs', { params: { userId: this.state.user.id } }, (response, err) => {
=======
      this.retrieveData('/jobs', { params: { userId: this.state.user.id } }, ((response, err) => {
>>>>>>> Stashed changes
        this.setState({
          jobs: response.data,
        });
        this.retrieveStats();
      });
    }
  }

  /** @description Conditional rendering if the Create button was clicked.
   */
  showCreate() {
    if (this.state.createView === 'create') {
      return (
        <CreateJob
          user={this.state.user.id}
          submitData={this.submitData}
          view={this.state.createView}
          onSubmit={this.createNewJob.bind(this)}
          onClose={this.closeCreate.bind(this)}
        />
      );
    }
  }

  /** @description Updates the visible jobs to match the category that the user selected. */
  // changeJobFilter(status) {
  //   this.setState({
  //     filter: status,
  //   });
  // }

  changeTab(tab) {
    this.setState({
      tab: tab,
    });
  }

  displayCreateJob(option) {
    this.setState({
      createView: option,
      //? Path for function below:
      loginSignupButtonIsClicked: false,
    });
  }

  /** @description This function sends a post request to server with the job info andn then updates page with the new jobs from database and closes the create job modal. */
  createNewJob(job) {
    this.submitData('/jobs', job, (response, err) => {
<<<<<<< Updated upstream
      this.retrieveData('/jobs', { params: { userId: this.state.user.id } }, (response, err) => {
=======
      this.retrieveData('/jobs', { params: { userId: this.state.user.id } }, ((response, err) => {
>>>>>>> Stashed changes
        this.setState({
          jobs: response.data,
          createView: '',
        });
      });
    });
  }

  //? Login and Signup Functions:

  closeDialog() {
    this.setState({
      view: '',
    });
  }

  //? Create Job Functions:

  closeCreate() {
    this.setState({
      createView: '',
    });
  }

  //? Job Detail Functions:

  detailOpen(currentJob) {
    console.log('detail open is working');
    console.log(currentJob);
    this.setState({
      selectedJob: currentJob,
      detailOpen: true,
    });
  }

  detailClose() {
    this.setState({
      selectedJob: {},
      detailOpen: false,
    });
  }

  /** @description This function is utilized when a job is clicked on so the detailed modal of job pops up for user to read/edit/close */
  showDetail() {
    if (this.state.detailOpen) {
      return (
        <JobDetailWrapped
          view={this.state.detailOpen}
          getJobData={this.getJobData.bind(this)}
          detailClose={this.detailClose.bind(this)}
          job={this.state.selectedJob}
          saveChanges={this.updateData.bind(this)}
        />
<<<<<<< Updated upstream
      );
    }
  }

  /**
   *  @description This gets the Nav bar and landing page if logged in and Nav bar with Select bars to render if this.state.isLoggedIn
   *
   */

  render() {
    if (this.state.isLoggedIn && this.state.tab === 'all') {
      return (
        <div>
          <Fragment>
            <Nav
              displayLoginSignup={this.displayLoginSignup.bind(this)}
              isLoggedIn={this.state.isLoggedIn}
              displayCreateJob={this.displayCreateJob.bind(this)}
              updateStatus={this.updateStatus.bind(this)}
              updateUserInfo={this.updateUserInfo.bind(this)}
            />
            <SelectBar changeTab={this.changeTab.bind(this)} />
          </Fragment>
          <div className="dashboard">
            <div className="latestjobs">
              <div>Latest Applications </div>
              <JobList
                detailOpen={this.detailOpen.bind(this)}
                jobData={this.state.jobs.slice(0, 3)}
                filter={this.state.filter}
              />
            </div>

            <div className="stats">
              <div className="statstitle">Stats</div>
              <div className="activeapps">
                Applications
                <div>
                  <h1>{this.state.appStats.total}</h1>
                </div>
              </div>
              <div className="callbackrate">
                Callback Rate
                <div>
                  <h1>{this.state.appStats.callback}%</h1>
                </div>
              </div>
              <div className="interviewrate">
                Interview Rate
                <div>
                  <h1>{this.state.appStats.interview}%</h1>
                </div>
              </div>
            </div>
            <div className="tasks">Fun list of todos</div>
            <div className="signInRegister">{this.showLoginOrSignUp()}</div>
            <div className="createJob">{this.showCreate()}</div>
            <div className="jobDetail">{this.showDetail()}</div>
          </div>
        </div>
      );
    } else if (this.state.isLoggedIn && this.state.tab === 'tracker') {
      return (
        <div>
          <Fragment>
            <Nav
              displayLoginSignup={this.displayLoginSignup.bind(this)}
              isLoggedIn={this.state.isLoggedIn}
              displayCreateJob={this.displayCreateJob.bind(this)}
              updateStatus={this.updateStatus.bind(this)}
              updateUserInfo={this.updateUserInfo.bind(this)}
            />
            <div>
              <SelectBar changeTab={this.changeTab.bind(this)} />
            </div>
          </Fragment>
          <div className="signInRegister">{this.showLoginOrSignUp()}</div>
          <div className="createJob">{this.showCreate()}</div>
          <div className="jobDetail">{this.showDetail()}</div>
          <div className="trackerpage">
            <JobTable2 jobData={this.state.jobs} detailOpen={this.detailOpen.bind(this)} />
          </div>
=======
      )
    }
  }

  /** @description This gets the Nav bar and Select bars to render as the default view regardless of login status */
  render() {
    return (
      <div>
        <Fragment>
          <Nav
            displayLoginSignup={this.displayLoginSignup.bind(this)}
            isLoggedIn={this.state.isLoggedIn}
            displayCreateJob={this.displayCreateJob.bind(this)}
            updateStatus={this.updateStatus.bind(this)}
            updateUserInfo={this.updateUserInfo.bind(this)}
          />
          <SelectBar changeJobFilter={this.changeJobFilter.bind(this)} />

          <JobList detailOpen={this.detailOpen.bind(this)} jobData={this.state.jobs} filter={this.state.filter} />
        </Fragment>
        <div className="signInRegister">
          {this.showLoginOrSignUp()}
        </div>
        <div className="createJob">
          {this.showCreate()}
>>>>>>> Stashed changes
        </div>
      );
    } else if (this.state.isLoggedIn && this.state.tab === 'tasks') {
      return (
        <div>
          <Fragment>
            <Nav
              displayLoginSignup={this.displayLoginSignup.bind(this)}
              isLoggedIn={this.state.isLoggedIn}
              displayCreateJob={this.displayCreateJob.bind(this)}
              updateStatus={this.updateStatus.bind(this)}
              updateUserInfo={this.updateUserInfo.bind(this)}
            />
            <div>
              <SelectBar changeTab={this.changeTab.bind(this)} />
            </div>
          </Fragment>
          <div className="signInRegister">{this.showLoginOrSignUp()}</div>
          <div className="createJob">{this.showCreate()}</div>
          <div className="jobDetail">{this.showDetail()}</div>
          <div className="main-body">Google Calendar to do lists thing</div>
        </div>
      );
    } else if (this.state.isLoggedIn && this.state.tab === 'analytics') {
      return (
        <div>
          <Fragment>
            <Nav
              displayLoginSignup={this.displayLoginSignup.bind(this)}
              isLoggedIn={this.state.isLoggedIn}
              displayCreateJob={this.displayCreateJob.bind(this)}
              updateStatus={this.updateStatus.bind(this)}
              updateUserInfo={this.updateUserInfo.bind(this)}
            />
            <div>
              <SelectBar changeTab={this.changeTab.bind(this)} />
            </div>
          </Fragment>
          <div className="signInRegister">{this.showLoginOrSignUp()}</div>
          <div className="createJob">{this.showCreate()}</div>
          <div className="jobDetail">{this.showDetail()}</div>
          <Application />
        </div>
      );
    } else {
      return (
        <div>
          <Fragment>
            <Nav
              displayLoginSignup={this.displayLoginSignup.bind(this)}
              isLoggedIn={this.state.isLoggedIn}
              displayCreateJob={this.displayCreateJob.bind(this)}
              updateStatus={this.updateStatus.bind(this)}
              updateUserInfo={this.updateUserInfo.bind(this)}
            />
            <div>
              <LandingPage />
            </div>
          </Fragment>
          <div className="signInRegister">{this.showLoginOrSignUp()}</div>
          <div className="createJob">{this.showCreate()}</div>
          <div className="jobDetail">{this.showDetail()}</div>
        </div>
      );
    }
  }
}

export default App;
