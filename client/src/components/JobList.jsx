import React from 'react';
import JobMin from './JobMin.jsx';
import Application from './Application.jsx';
import { GridList } from '@material-ui/core';
/**
 * @description This Component is responsible for rendering each job a user has created
 * Follows standard mapping procedure, with a twist when specific jobs need to be filtered.
 * There are some key props that get passed down through this component.
 * This component Utilizes material's GridList component.
 * @param { function } props.detailOpen function passed down to each JobMin component
 * @param { Array } props.jobData array of all the users current jobs
 * @param { String } props.filter string representing the current status selected in the SelectBar component
 */

// Material-ui often times allows rendering using a withStyles method. However, if you want specific styles to overwrite material
// and don't wish to worry about the css render stack passing styles inline is preferred.
// Below we use an object that follows JSS formatting ie: flex-flow becomes flexFlow background-color becomes backgroundColor
const styles = {
  root: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  gridList: {
    width: 500,
    height: 'auto',
    padding: 10,
  },
};

// The below function is used to map the data based on the state field on each job component
// the state field is a string that matches the SelectBar component's values ie: rejected, offered, pending
// when status is 'all' every job should be visible.
// const filteredJobs = jobData => {
//   if (status === 'all') {
//     return jobData.map((job, i) => <JobMin key={i} detailOpen={detailOpen} job={job} />);
//   }
// };

const JobList = props => (
  <div style={styles.root}>
    <GridList cols={3} cellHeight={180} style={styles.gridList}>
      {props.jobData.map((job, i) => <JobMin key={i} detailOpen={props.detailOpen} job={job} />)}
    </GridList>
  </div>
);

export default JobList;
