import Wrapper from '../assets/wrappers/Navbar';
import {FaAlignLeft, FaUserCircle, FaCaretDown} from 'react-icons/fa';
import {useState} from 'react';
import { useAppContext } from '../contex/appContext';
import Logo from './Logo';

const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const {user, toggleSidebar, logOutUser} = useAppContext();
  
  return (
    <Wrapper>
      <div className='nav-center'>
        <button type='button' className='toggle-btn' onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className='logo-text'>Dashboard</h3>
        </div>
        <div className='btn-container'>
          <button className='btn' type='button' onClick={() => setShowLogout(!showLogout)}>
            <FaCaretDown/>
            {user.name}
            <FaUserCircle/>
          </button>
          <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
            <button type='button' className='dropdown-btn' onClick={logOutUser}>Logout</button>
          </div>
        </div>
      </div>
    </Wrapper>
  )
};
export default Navbar;