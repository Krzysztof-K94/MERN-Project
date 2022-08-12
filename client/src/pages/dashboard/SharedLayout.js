import {Link, Outlet} from 'react-router-dom';
import Wrapper from '../../assets/wrappers/SharedLayout';

const SharedLayout = () => {
  return (
    <Wrapper>
      <h1>SharedLayout</h1>
      <nav>
        <Link to='alljobs'>AllJobs</Link>
        <Link to='addjob'>Add Job</Link>
      </nav>
      <Outlet/>
    </Wrapper>

  )
};
export default SharedLayout;