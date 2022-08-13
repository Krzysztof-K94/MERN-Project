import { NavLink } from "react-router-dom";
import links from "../utils/links";

const NavLinks = ({toggleSidebar}) => {
  return (
    <div className='nav-links'>
      {links.map((link) => {
        const {id, path, icon, text} = link;
        return (
          <NavLink 
            className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'} 
            key={id} 
            to={path}
            onClick={toggleSidebar}
          >
            <span className='icon'>{icon}</span>{text}
          </NavLink>
        )
      })}
    </div>
  )
}

export default NavLinks;