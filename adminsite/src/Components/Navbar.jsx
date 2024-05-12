import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext}  from '../context/authcontext'
// import Logo from "../img/logo.png";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          {/* <Link to="/">
          <img src={Logo} alt="" />
          </Link> */}
        </div>
        <div className="links">
          <Link className="link" to="/">
            <h6>HOME</h6>
          </Link>
          <Link className="link" to="#about">
            <h6>ABOUT</h6>
          </Link>
          <Link className="link" to="/our-work">
            <h6>OUR WORK</h6>
          </Link>
          <Link className="link" to="/blog">
            <h6>BLOG</h6>
          </Link>
          <Link className="link" to="/get-involved">
            <h6>GET INVOLVED</h6>
          </Link>
          <Link className="link" to="/contact-us">
            <h6>CONTACT US</h6>
          </Link>
          <span>{currentUser?.username}</span>
          {currentUser ? (
            <span onClick={logout}>Logout</span>
          ) : (
            <Link className="link" to="/login">
              Login
            </Link>
          )}
          <span className="write">
            <Link className="link" to="/write">
              Create Work 
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;