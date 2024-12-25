import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Navbar.css";
import { useContext } from "react";
import { AuthContext } from "../components/provider/AuthProvider";
const Navbar = () => {
  const {user,logOut} = useContext(AuthContext);
    return (
        <div>
           <div className="navbar  w-12/12 mx-auto text-white">
  <div className="navbar-start ">
    <div className="dropdown ">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu  font-bold bg-orange-400 menu-sm dropdown-content rounded-box z-50 mt-3 w-52 p-2 shadow">
        <li><NavLink to='/'>Home</NavLink></li>
      {/* <li><NavLink to='/createmerathon'>Create</NavLink></li> */}
      <li><NavLink to='/allmerathon'>Merathons</NavLink></li>
      {/* <li><NavLink to='/register'>My Apply</NavLink></li>
      <li><NavLink to='/mymerathon'>My Merathon</NavLink></li> */}
      {
      user && user?.email ? (
        <li><NavLink to='/dashboard'>Dashboard</NavLink></li>
      ) : ""
     }
      {/* <li><NavLink to='/dashboard'>Dashboard</NavLink></li> */}
      </ul>
    </div>
    <Link className="" to='/'><img className="h-20 w-20 rounded-full" src={logo} alt=""/></Link>
  </div>
<div className="navbar-end flex-grow hidden lg:flex">
    <ul className="menu menu-horizontal px-1 font-bold text-xl">
      <li><NavLink to='/'>Home</NavLink></li>
      {/* <li><NavLink to='/createmerathon'>Create</NavLink></li> */}
      <li><NavLink to='/allmerathon'>Merathons</NavLink></li>
      {/* <li><NavLink to='/register'>My Apply</NavLink></li>
      <li><NavLink to='/mymerathon'>My Merathon</NavLink></li> */}
      {
      user && user?.email ? (
        <li><NavLink to='/dashboard'>Dashboard</NavLink></li>
      ) : ""
     }
      {/* <li><NavLink to='/dashboard'>Dashboard</NavLink></li> */}
     
     
    </ul>
  

    <div>

     {
     user && user?.email ? (
     <div className="relative group">
      <img
        className="w-10 h-10 rounded-full mr-4"
        src={user?.photoURL}
        alt="User Profile"
      />
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 translate-y-2 bg-gray-700 text-white text-sm rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {user?.displayName || "User"}
      </div>
      </div>
      ) : (
     <NavLink className="p-2 rounded-lg font-bold text-xl" to="/auth/register">
      Register
     </NavLink>
     )
     }

     </div>
     {
      user && user?.email ? (
        <button className="font-bold text-xl pr-2" onClick={logOut}>Signout</button>
      ) : (
      <NavLink className="p-2 rounded-lg font-bold text-xl" to='/auth/login'>Login</NavLink>)
     }

     </div>

    </div>
</div>
    );
};

export default Navbar;