const express = require('express');
const db = require('../db/index.js');
// const util = require('./helpers/utilities.js');

let router = express.Router();

/**
 * @description This utilizes db function to search for jobs. Client side has user id as the request query to search for.
 **/
const jobHelperQuery = (req, res) => {
  db.getJobs(req.query, (err, jobs) => {
    if (err) {
      console.log(err);
      return res.sendStatus(404);
    }
    res.json(jobs);
  });
};

//* @description This is utilized when a request is received from client to add a job entry to db. In case user left some fields in the form blank we have the fieldInfo object with default values to ensure the entry still gets saved. */
const jobPoster = (req, res) => {
  let fieldInfo = {
    userId: req.body.userId || '66666666',
    name: req.body.name || 'none',
    jobTitle: req.body.title || 'none',
    webSite: req.body.website || 'none',
    email: req.body.email || 'none',
    phone: req.body.phone || 'none',
    recruiter: req.body.recruiter || 'none',
    postDate: req.body.postDate || new Date(),
    appliedDate: req.body.appliedDate || new Date(),
    interviewedDate: req.body.interviewedDate || new Date(),
    coverLetterUrl: req.body.coverLetterUrl || 'none',
    state: req.body.state || 'none',
    payRange: req.body.payRange || '',
    logoUrl: 'https://i.imgur.com/usLTbBq.png',
    analytics: req.body.analytics,
  };

  // util.logoGo(fieldInfo.webSite, (error, logoUrl) => {
  //   //If error is received (404)
  //   if(error) console.log('404, no image:', error)
  //   //If !logoUrl, set to default https://imgur.com/a/C9WPyup
  //   if(!logoUrl) fieldInfo['logoUrl'] =  'https://imgur.com/a/C9WPyup'
  //   //Else set key on fieldInfo object with current logoUrl
  //   else {
  //   fieldInfo['logoUrl'] = logoUrl;
  //   }
  //   //send req.miscFields to DB for new instance
  // });

  db.createJob(fieldInfo, (err, data) => {
    if (err) {
      console.log('Job Saver Error: ', err);
      res.sendStatus(500);
    } else {
      res.send('job saved!');
    }
  });
};

const sampleData = (req, res) => {
  let arr = [];
  let i = 1000;
  while (i--) {
    arr.push(i);
  }
  Promise.all(
      arr.map(() =>
        jobPoster({
          body: {
            userId: '66666666',
            name: 'none',
            jobTitle: 'none',
            webSite: 'none',
            email: 'none',
            phone: 'none',
            recruiter: 'none',
            postDate: new Date(),
            appliedDate: new Date(),
            interviewedDate: new Date(),
            coverLetterUrl: 'none',
            state: 'none',
            payRange: '',
            logoUrl: 'https://i.imgur.com/usLTbBq.png',
            analytics: {
              customizedFull: Math.random() < 0.7,
              customizedPersonal: Math.random() < 0.65,
              customizedSotwareEngineeringProjects: Math.random() < 0.6,
              customizedCoverLetter: Math.random() < 0.7,
              mentionedNonTechnicalExperience: Math.random() < 0.4,
              codeLinks: Math.random() < 0.55,
              deployedLinks: Math.random() < 0.5,
              referral: Math.random() < 0.6,
              usedARecruiter: Math.random() < 0.75,
              networked: Math.random() < 0.8,
              inCompanyConnection: Math.random() < 0.7,
              callback: Math.random() < 0.12,
              interview: Math.random() < 0.03,
            },
          },
        }, {
          sendStatus: () => {},
          send: () => {}
        })
      )
    )
    .then(() => res.sendStatus(201))
    .catch(err => res.status(400).send(err));
};

router.get('/jobs/sampleData', sampleData);

router.post('/jobs', jobPoster);

router.get(jobHelperQuery);

module.exports = router;