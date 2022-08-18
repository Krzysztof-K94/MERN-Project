import {useAppContext} from '../../contex/appContext.js';
import {SearchContainer, JobsContainer} from '../../components';


const AllJobs = () => {
  const {getAllJobs, jobs} = useAppContext();
  return (
    <div>
      <div>
        <SearchContainer />
        <JobsContainer />
      </div>
    </div>

  )
};
export default AllJobs;