import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { useColorContext } from "../hooks/useColorContext"
// import logo from '../image/logo512.png'

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const { dispatch } = useColorContext()
  const navigate = useNavigate();

  const goToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
  };

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const handleColor = (theme) => {
    dispatch({type: theme})
  }

  return ( 
    <header>
      <div className="container">
        <Link to="/" onClick={goToTop}>
          <i className="logo bi bi-feather"></i>
          {/* <img className="logo" src={logo} alt="logo" /> */}
          {/* <span className='logo'>X</span> */}
        </Link>
        <nav>
          <NavLink to="/" onClick={goToTop}>
            <i className="bi bi-house-door"></i
            ><span>Home</span>
          </NavLink>
          <Link to="/">
            <i className="bi bi-search"></i>
            <span>Search</span>
          </Link>
          <NavLink to={user ? `user/${user.username}` : "/"}>
            <i className="bi bi-person"></i>
            <span>Profile</span>
          </NavLink>
          <NavLink to="/user/list">
            <i className="bi bi-person-gear"></i>
            <span>Users</span>
          </NavLink>
        </nav>
        <div className='themes'>
            <button data-theme="default" onClick={() => handleColor('default')}></button>
            <button data-theme="dim" onClick={() => handleColor('dim')}></button>
            <button data-theme="lights-out" onClick={() => handleColor('lights-out')}></button>
        </div>
        {user && (<div className='user'>
            <Link to={`user/${user.username}`}>@{user.username}</Link>
            <span className='logout'>
              <i onClick={handleLogout} className="bi bi-box-arrow-right"></i>
            </span>
          </div>)}
      </div>
    </header>
   );
}
 
export default Navbar;