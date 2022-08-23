import { useAppContext } from "../../contex/appContext";
import {StatsContainer, ChartsContainer, Loading} from '../../components';
import { useEffect } from "react";

const Stats = () => {
  const {getStats, isLoading} = useAppContext();

  useEffect(()=> {
    getStats();
    //eslint-disable-next-line
  }, []);

  if(isLoading) {
    return <Loading center />;
  };

  return (
    <div>
      <StatsContainer />
      <ChartsContainer />
    </div>
  )
};
export default Stats;