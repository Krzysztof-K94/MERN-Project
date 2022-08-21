import { useState } from 'react';
import Wrapper from '../assets/wrappers/ChartsContainer.js';
import {BarChartComponent, AreaChartComponent} from './index.js';
import { useAppContext } from '../contex/appContext.js';

const ChartsContainer = () => {
  const [barChart, setBarChart] = useState(true);
  const {monthlyApplications: data} = useAppContext();
  console.log(data)
  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type='button' onClick={() => setBarChart(!barChart)}>{barChart ? 'Bar Chart' : 'Area Chart'}</button>
      {barChart ? <BarChartComponent data={data}/> :  <AreaChartComponent data={data}/>}
     
    </Wrapper>
  )
};
export default ChartsContainer;