import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    height: theme.spacing.unit * 55,
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  palette: {
    color: '#7dce94',
    backgroundColor: '#CE7D86',
  },
});

class JobDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'detail',
      appliedDate: null,
      state: null,
      payRange: null,
      open: true,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  update() {
    let updatedData = {
      id: this.props.job._id,
      edits: {
        appliedDate: this.state.appliedDate || this.props.job.appliedDate,
        state: this.state.state || this.props.job.state,
        company: {
          payRange: this.state.payRange || this.props.job.company.payRange,
          name: this.props.job.company.name,
          jobTitle: this.props.job.company.jobTitle,
          webSite: this.props.job.company.webSite,
          logoUrl: this.props.job.company.logoUrl,
        },
      },
    };
    this.props.saveChanges('/job', updatedData, res => {
      console.log('response: ', res);
      this.props.getJobData();
      this.props.detailClose();
    });
  }

<<<<<<< HEAD
  handleChange(e) {
=======
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

  handleChange(e, callback) {
>>>>>>> added ability to process edit job app and create job app when pressing enter
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    const { classes } = this.props;
    const { company, contact, appliedDate, postDate, interviewDate, state } = this.props.job;
    if (this.state.view === 'detail') {
      return (
        <div>
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.open}
            onClose={this.handleClose}
          >
            <div style={getModalStyle()} className={classes.paper}>
              <Typography variant="title" id="modal-title">
                {company.name}
              </Typography>
              <Typography variant="subheading" id="simple-modal-description">
                {company.jobTitle}
              </Typography>
              <Typography variant="caption" id="simple-modal-description">
                <p> Entry Date: {moment(appliedDate.substring(0, 10).replace(/-/g, '')).fromNow()} </p>
                <p> Status: {state} </p>
                <p> Salary: {company.payRange} </p>
              </Typography>
              <Button
                className={classes.pallete}
                onClick={() => this.props.detailClose()}
                align="inherit"
                variant="subheading"
              >
                CLOSE
              </Button>
              <Button
                className={classes.pallete}
                onClick={() => this.setState({ view: 'edit' })}
                align="inherit"
                variant="subheading"
              >
                EDIT
              </Button>
            </div>
          </Modal>
        </div>
      );
    } else if (this.state.view === 'edit') {
      return (
        <div>
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.open}
            onClose={this.handleClose}
          >
            <div style={getModalStyle()} className={classes.paper}>
              <Typography variant="title" id="modal-title">
                {company.name}
              </Typography>
              <Typography variant="subheading" id="simple-modal-description">
                {company.jobTitle}
              </Typography>
              <form className={classes.container} noValidate autoComplete="off">
                <TextField
                  onChange={this.handleChange}
                  onKeyUp={e => this.handleEnter(e, this.update.bind(this))}
                  id="full-width"
                  name="appliedDate"
                  label="Date"
<<<<<<< HEAD
                  InputLabelProps={{
                    shrink: true,
                  }}
                  placeholder={moment(appliedDate.substring(0, 10).replace(/-/g, '')).fromNow()}
=======
                  InputLabelProps={{ shrink: true }}
                  placeholder={moment(appliedDate.substring(0, 10).replace(/-/g, '')).fromNow()}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  onChange={this.handleChange}
                  onKeyUp={e => this.handleEnter(e, this.update.bind(this))}
                  id="full-width"
                  name="state"
                  label="Status"
                  InputLabelProps={{ shrink: true }}
                  placeholder={state}
>>>>>>> added ability to process edit job app and create job app when pressing enter
                  fullWidth
                  margin="normal"
                />
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="state-helper">Status</InputLabel>
                  <Select
                    value={this.state.state}
                    onChange={this.handleChange}
                    input={<Input name="state" id="state-helper" />}
                  >
                    <MenuItem value="">
                      <em>Status</em>
                    </MenuItem>
                    <MenuItem value="interested">Interested</MenuItem>
                    <MenuItem value="pending">Pending/Applied</MenuItem>
                    <MenuItem value="interview">Interview</MenuItem>
                    <MenuItem value="offered">Offered</MenuItem>
                    <MenuItem value="rejected">Rejected</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  onChange={this.handleChange}
                  onKeyUp={e => this.handleEnter(e, this.update.bind(this))}
                  id="full-width"
                  name="payRange"
                  label="Salary"
                  InputLabelProps={{ shrink: true }}
                  placeholder={company.payRange}
                  fullWidth
                  margin="normal"
                />
              </form>
              <Button
                className={classes.pallete}
<<<<<<< HEAD
                onClick={() => this.setState({ view: 'detail' })}
=======
                onClick={() =>
                  this.setState({
                    view: 'detail',
                  })
                }
>>>>>>> added ability to process edit job app and create job app when pressing enter
                align="inherit"
                variant="subheading"
              >
                BACK
              </Button>
              <Button className={classes.pallete} onClick={this.update.bind(this)} align="inherit" variant="subheading">
                UPDATE
              </Button>
              <Button
                className={classes.pallete}
                onClick={() => this.props.detailClose()}
                align="inherit"
                variant="subheading"
              >
                CLOSE
              </Button>
            </div>
          </Modal>
        </div>
      );
    }
  }
}

JobDetail.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for hand`ling the recursive nesting.
const JobDetailWrapped = withStyles(styles)(JobDetail);

export default JobDetailWrapped;
