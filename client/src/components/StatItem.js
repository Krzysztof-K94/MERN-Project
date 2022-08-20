import Wrapper from '../assets/wrappers/StatItem.js';
import { useAppContext } from '../contex/appContext.js';
import {FaLocationArrow} from 'react-icons/fa';
const StatItem = () => {
  return (
    <Wrapper>
      <header>
        <span className='count'>{2}</span>
        <span className='icon'>{<FaLocationArrow />}</span>
      </header>
      <h5>Panding Applications</h5>
    </Wrapper>
  )
};
export default StatItem;