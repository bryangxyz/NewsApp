import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
  const userLogin = props.user.name !== undefined ? (
    <li className="nav-item text-white">
      <Link className="nav-link" to="/users/login" onClick={props.handleLogout}>Logout</Link>
    </li>
    ) : 
    (
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Account
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link className="dropdown-item" to="/users/login">Login</Link>
          <Link className="dropdown-item" to="/users/register">Register</Link>
        </div>
      </li>
    );

  const savedArticles = props.user.name !== undefined &&
    <li className="nav-item text-white">
      <Link className="nav-link" to="/articles">Saved News</Link>
    </li>;
  
  return (
    <div className="navbar navbar-expand-lg navbar-dark bg-dark box-shadow">
      <div className="container">
        <h3 className="navbar-brand">News App</h3>
       
        <ul className="navbar-nav ">
          <li className="nav-item text-white">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          {savedArticles}
          {userLogin}
        </ul>
        
      
      </div>
    </div>
  );
};

export default Navbar;