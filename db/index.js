// This is the main file to host mongoose, we are using bcrypt-nodejs middleware
// to hash the password
const mongoose = require('mongoose');
const hash = require('./helper.js');
const bcrypt = require('bcrypt-nodejs');

const DB = process.env.MONGODB_URI || 'mongodb://localhost/dinasour';

// Connect with Mongo DB
mongoose.connect(DB);

const db = mongoose.connection;

db.on('error', function() {
  console.log('Error connecting to Mongoose');
});

db.once('open', function() {
  console.log('Mongoose connected');
});

//ADD USER SCHEMA
let userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  userName: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
});

//ADD USER MODEL for user db
let User = mongoose.model('User', userSchema);

let createUser = (user, callback) => {
  User.findOne({ email: user.email }, (err, existingUser) => {
    if (err) {
      callback(err, null);
    }
    if (existingUser) {
      console.log('existing', existingUser);
      if (existingUser.email === user.email) {
        callback(null, { messageCode: 101, message: 'User email already exists' });
      } else if (existingUser.userName === user.userName) {
        callback(null, { messageCode: 102, message: 'User name already exists' });
      }
    } else {
      hash.hashPass(user, (err, userResult) => {
        let newUser = new User(userResult);
        newUser
          .save()
          .then(data => {
            callback(null, data);
          })
          .catch(error => {
            callback(error, null);
          });
      });
    }
  });
};

// Logic to take care of user login, first check if the login user is an existing user or not
// secondly, check if the user password is valid.
let login = (query, callback) => {
  User.findOne({ email: query.email }, (err, user) => {
    if (err) {
      callback(err, null);
    }

    if (!user) {
      callback(null, { messageCode: 103, message: 'User does not exist' });
    } else {
      bcrypt.compare(query.password, user.password, function(err, res) {
        if (res === true) {
          callback(null, user);
        } else {
          callback(null, { messageCode: 104, message: 'Wrong password' });
        }
      });
    }
  });
};

// ADD JOB SCHEMA
let jobSchema = mongoose.Schema({
  userId: String,
  company: {
    name: String,
    jobTitle: String,
    webSite: String,
    logoUrl: String,
    payRange: String,
  },
  contact: {
    email: String,
    phone: String,
    recruiter: String,
  },
  postDate: Date,
  appliedDate: Date,
  interviewedDate: Date,
  coverLetterUrl: String,
  state: String,
});

// ADD JOB MODEL
let Job = mongoose.model('Job', jobSchema);

let createJob = (fieldInfo, callback) => {
  console.log('fieldInfo', fieldInfo);

  let jobOpportunity = new Job({
    userId: fieldInfo.userId,
    company: {
      name: fieldInfo.name,
      jobTitle: fieldInfo.jobTitle,
      webSite: fieldInfo.webSite,
      logoUrl: fieldInfo.logoUrl, //* add to field info
      payRange: fieldInfo.payRange, //* add to feild info
    },
    contact: {
      email: fieldInfo.email,
      phone: fieldInfo.phone,
      recruiter: fieldInfo.recruiter,
    },
    postDate: fieldInfo.postDate,
    appliedDate: fieldInfo.appliedDate,
    interviewedDate: fieldInfo.interviewedDate,
    coverLetterUrl: fieldInfo.coverLetterUrl,
    state: fieldInfo.state,
  });

  jobOpportunity.save(function(error, savedJob) {
    if (error) {
      console.log('could not save job to db', error);
      callback(error, null);
    } else {
      console.log('saved job to db', savedJob);
      callback(null, savedJob);
    }
  });
};

// Fetch all of the jobs belong to the login user and send back to UI
const getJobs = (query, callback) => {
  console.log(query);
  Job.find(query)
    .sort({ postDate: 'desc' })
    .then(jobs => callback(null, jobs))
    .catch(err => callback(err, null));
};

// Update a particular job
const updateJob = (update, callback) => {
  // take info from update job except job id
  // use job id to search for specific job by id
  console.log('update: ', update);
  Job.findByIdAndUpdate(update.id, update.edits)
    .then(result => callback(null, result))
    .catch(err => callback(err, null));
};

// Delete a particular job
const removeJob = (remove, callback) => {
  // just pass the _.id through.
  Job.findByIdAndDelete(remove._id)
    .then(result => callback(null, result))
    .catch(err => callback(err, null));
};

const applicationSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  customizedFull: Boolean,
  customizedPersonal: Boolean,
  customizedSotwareEngineeringProjects: Boolean,
  customizedCoverLetter: Boolean,
  mentionedNonTechnicalExperience: Boolean,
  codeLinks: Boolean,
  deployedLinks: Boolean,
  referral: Boolean,
  usedARecruiter: Boolean,
  networked: Boolean,
  inCompanyConnection: Boolean,
  callback: { type: Boolean, default: false },
  interview: { type: Boolean, default: false },
});

const Application = mongoose.model('Application', applicationSchema);

const addApplication = appData =>
  User.find({ userName: appData.userName }).then(user =>
    Application.create(delete appData.userName && (appData.userId = user[0]._id) && appData)
  );

const getMyApps = ({ userName }) =>
  User.find({ userName: userName }).then(user => Application.find({ userId: user[0]._id }));

const gotCallback = ({ id }) => Application.findByIdAndUpdate(id, { callback: true });

const gotInterview = ({ id }) => Application.findByIdAndUpdate(id, { interview: true });

const _analytics = data =>
  Object.keys(data).forEach(key => {
    if (key !== 'totalApps') {
      data[key].callback *= 100 / data[key].total;
      data[key].interview *= 100 / data[key].total;
      data[key].total *= 100 / data.totalApps;
    }
  }) || data;

const _generateStats = data =>
  _analytics(
    data.reduce(
      (response, attributes) =>
        Object.keys(attributes.toJSON()).forEach(
          (key, resKey) =>
            !['_id', 'userId', 'callback', 'interview', '__v'].includes(key) &&
            (response[(resKey = key + ' ' + attributes[key])] = {
              callback: +attributes.callback + ((response[resKey] && response[resKey].callback) || 0),
              interview: +attributes.interview + ((response[resKey] && response[resKey].interview) || 0),
              total: 1 + ((response[resKey] && response[resKey].total) || 0),
            })
        ) || response,
      { totalApps: data.length }
    )
  );

const getMyStats = user => getMyApps(user).then(_generateStats);

const getAllStats = () => Application.find().then(_generateStats);

// module.exports.db = db;
module.exports.updateJob = updateJob;
module.exports.removeJob = removeJob;
module.exports.createUser = createUser;
module.exports.login = login;
module.exports.createJob = createJob;
module.exports.getJobs = getJobs;
exports.addApplication = addApplication;
exports.getMyApps = getMyApps;
exports.gotCallback = gotCallback;
exports.gotInterview = gotInterview;
exports.getMyStats = getMyStats;
exports.getAllStats = getAllStats;
