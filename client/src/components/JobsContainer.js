import { useAppContext } from "../contex/appContext";
import { useEffect } from "react";
import Job from './Job.js';
import {PageBtnContainer} from './index.js';
import Loading from './Loading.js';
import Wrapper from '../assets/wrappers/JobsContainer.js';

const JobsContainer = () => {
  const {getAllJobs, isLoading, jobs, totalJobs, search, searchType, searchStatus, sort, numOfPages, page} = useAppContext();

  useEffect(() => {
    getAllJobs();
  }, [search, searchType, searchStatus, sort, page]);

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
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  )
};
export default JobsContainer;