import moment from 'moment';
import { useAppContext } from '../contex/appContext';
import Wrapper from '../assets/wrappers/Job.js';
import {FaLocationArrow, FaBriefcase, FaCalculator} from 'react-icons/fa';

const Job = ({company, createdAt}) => {
  const {setEditJob, deleteJob} = useAppContext();

  let date = moment(createdAt);
  date = date.format('LL')

  return (
    <h1>{date}</h1>
  )
};
export default Job;