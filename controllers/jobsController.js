/* eslint-disable import/extensions */
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import moment from 'moment';
import checkPermissions from '../utils/checkPermissions.js';
import Job from '../models/Job.js';
import { BadRequestError, NotFoundError } from '../errors/index.js';
// UnAuthenticatedError
const createJob = async (req, res) => {
  const { position, company } = req.body;
  if (!position || !company) {
    throw new BadRequestError('Please provide all values');
  }
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

const deleteJob = async (req, res) => {
  const { id: jobId } = req.params;

  const job = await Job.findOne({ _id: jobId });

  if (!job) {
    throw new NotFoundError(`No job with id: ${jobId}`);
  }

  checkPermissions(req.user, job.createdBy);

  await job.remove();
  res.status(StatusCodes.OK).json({ msg: 'Success! Job deleted' });
};

const getAllJobs = async (req, res) => {
  const {
    search, status, jobType, sort,
  } = req.query;

  const queryObject = { createdBy: req.user.userId };

  // Add stuff based on condition

  if (status !== 'all') {
    queryObject.status = status;
  }

  if (jobType !== 'all') {
    queryObject.jobType = jobType;
  }

  if (search) {
    queryObject.position = { $regex: search, $options: 'i' }; // i = case insensitive
  }

  // No Await
  // eslint-disable-next-line prefer-const
  let result = Job.find(queryObject);

  // chain sort conditions
  const jobs = await result;
  // Get me all jobs in which status matches to the status query param
  res
    .status(StatusCodes.OK)
    .json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
};

const updateJob = async (req, res) => {
  const { id: jobId } = req.params;
  const { company, position } = req.body;

  if (!position || !company) {
    throw new BadRequestError('Please provide all values');
  }

  const job = await Job.findOne({ _id: jobId });

  if (!job) {
    throw new NotFoundError(`No job with id: ${jobId}`);
  }

  // check permission
  // We pass the req.user instead of req.user.userId because we also want to check for the user role
  checkPermissions(req.user, job.createdBy);

  const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
    new: true,
    runValidators: true,
  });

  // Alternative approach
  // job.position = position;
  // job.company = company;
  // await job.save();
  res.status(StatusCodes.OK).json({ updatedJob });
};

const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    // Only show jobs created by the user
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    // Group by userId and count the number of jobs
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((total, status) => {
    const { _id: title, count } = status;
    // eslint-disable-next-line no-param-reassign
    total[title] = count;
    return total;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  // eslint-disable-next-line prefer-const
  let monthlyApplications = await Job.aggregate([
    // Only show jobs created by the user
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    // Group by year and month and count the number of jobs
    {
      $group: {
        _id: {
          year: {
            $year: '$createdAt',
          },
          month: {
            $month: '$createdAt',
          },
        },
        count: { $sum: 1 },
      },
    },
    // Sort by year and month (most recent job applications first)
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 },
  ]);

  monthlyApplications = monthlyApplications.map((item) => {
    const { _id: { year, month }, count } = item;
    const date = moment()
      .month(month - 1)
      .year(year)
      .format('MMM YYYY');

    return { date, count };
  }).reverse(); // Reverse the array so the most recent job applications are first

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};

export {
  createJob, deleteJob, getAllJobs, updateJob, showStats,
};
