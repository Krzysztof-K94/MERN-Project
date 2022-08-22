import { useAppContext } from "../contex/appContext";
import { useEffect } from "react";
import Job from './Job.js';
import Loading from './Loading.js';
import Wrapper from '../assets/wrappers/JobsContainer.js';

const JobsContainer = () => {
  const {getAllJobs, isLoading, jobs, totalJobs, search, searchType, searchStatus, sort} = useAppContext();

  useEffect(() => {
    getAllJobs();
  }, [search, searchType, searchStatus, sort]);

  if(isLoading) return <Loading center/>;
  if(jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    )
  }
  return (
    <Wrapper>
      <h5>{totalJobs} job{totalJobs > 1 && 's'} found</h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job  key={job._id} {...job}/>;
        })}
      </div>
    </Wrapper>
  )
};
export default JobsContainer;