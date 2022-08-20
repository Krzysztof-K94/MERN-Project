import { useAppContext } from "../../contex/appContext";
import Wrapper from '../../assets/wrappers/StatsContainer.js';
import {StatItem} from '../../components';
import { useEffect } from "react";

const Stats = () => {
  const {getStats} = useAppContext();

  

  return (
    <Wrapper>
      <StatItem />
      <button type="button" onClick={getStats}>Click</button>
    </Wrapper>
    
  )
};
export default Stats;