import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Paper, Tabs, Tab } from '@material-ui/core';

const styles = {
  root: {
    flexGrow: 1,
  },
};

/**
 * @description This sends info of which button was clicked back to App component so its filter state can be updated for the JobList to show the jobs of that status.
 **/
class SelectBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, value) {
    this.setState({ value });
  }

  render() {
    const { classes } = this.props;

    return (
      <Paper style={styles.root}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Dashboard" onClick={() => this.props.changeTab('all')} />
          <Tab label="Tracker" onClick={() => this.props.changeTab('tracker')} />
          <Tab label="Tasks" onClick={() => this.props.changeTab('tasks')} />
          <Tab label="Analytics" onClick={() => this.props.changeTab('analytics')} />
        </Tabs>
      </Paper>
    );
  }
}

export default SelectBar;
