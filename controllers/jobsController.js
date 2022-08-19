import Job from '../models/Job.js';
import { StatusCodes } from "http-status-codes";
import {BadRequestError, NotFoundError, UnauthenticatedError} from '../errors/index.js';
import checkPermissions from '../utils/checkPermissions.js';

const createJob = async(req, res) => {
  const {position, company} = req.body;

  if(!position || !company) throw new BadRequestError('Please provide all values');

  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json({job});
};

const deleteJob = async(req, res) => {
  const {id : jobId} = req.params;
  const job = await Job.find({jobId});

  if(!job) throw new NotFoundError('Job not found')

  checkPermissions(req.user, job.jobId);
  await job.remove();

  res.status(StatusCodes.OK).json({msg: 'Success! Job removed'})
};

const getAllJobs = async(req, res) => {
  const jobs = await Job.find({createdBy: req.user.userId});
  res.status(StatusCodes.OK).json({jobs, totalJobs: jobs.length, numOfPages: 1});
};

const updateJob = async(req, res) => {
  const {id : jobId} = req.params;
  const {position, company, jobLocation, jobType, status} = req.body;
  if(!position || !company || !jobLocation) throw new BadRequestError('Please provide all values');

  const job = await Job.find({_id:jobId});
  checkPermissions(req.user, job.createdBy);

  if(!job) throw new NotFoundError('Job not found');

  job.position = position;
  job.company = company;
  job.jobType = jobType;
  job.jobLocation = jobLocation;
  job.status = status;

  await job.save();

  res.status(StatusCodes.OK).json({job});
};
const showStats = (req, res) => {
  res.send('show stats');
};

export {createJob, deleteJob, getAllJobs, updateJob, showStats};