import React from 'react';
import JobList from './JobList.jsx';

var Dashboard = props => {
  return (
    <div className="dashboard">
      <div className="latestjobs">
        <div className="dashboard-title">Latest Applications </div>
        <JobList detailOpen={props.detailOpen} jobData={props.jobData} />
      </div>
      <div className="stats">
        <div className="statstitle">Stats</div>
        <div className="activeapps">
          Applications
          <div>
            <h1>{props.appStats.total}</h1>
          </div>
        </div>
        <div className="callbackrate">
          Callback Rate
          <div>
            <h1>{Math.round(props.appStats.callback)}%</h1>
          </div>
        </div>
        <div className="interviewrate">
          Interview Rate
          <div>
            <h1>{Math.round(props.appStats.interview)}%</h1>
          </div>
        </div>
      </div>
      <div className="tasks">Fun list of todos</div>
    </div>
  );
};

export default Dashboard;
