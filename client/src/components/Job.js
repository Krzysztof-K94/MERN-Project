import moment from 'moment';
import { useAppContext } from '../contex/appContext';
import Wrapper from '../assets/wrappers/Job.js';
import {FaLocationArrow, FaBriefcase,FaCalendar} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import JobInfo from './JobInfo.js';

const Job = ({_id, position, company,jobLocation, jobType,  status, createdAt}) => {
  const {setEditJob, deleteJob} = useAppContext();

  let date = moment(createdAt);
  date = date.format('LL')

  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{company.charAt(0)}</div>
        <div className='info'>
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <JobInfo icon={<FaLocationArrow />} text={jobLocation}/>
          <JobInfo icon={<FaBriefcase />} text={jobType}/>
          <JobInfo icon={<FaCalendar />} text={date}/>
          <div className={`status ${status}`}>{status}</div> 
        </div>
        <footer>
          <div className='actions'>
            <Link 
              to={'/addjob'}
              onClick={() => setEditJob(_id)}
              className='btn edit-btn'
            >
              edit
            </Link>
            <button 
              type='button' 
              onClick={() => deleteJob(_id)}
              className='btn delete-btn'
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  )
};
export default Job;