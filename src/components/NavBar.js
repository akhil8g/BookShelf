import React from "react";
import { Link } from "react-router-dom";
import Toggle from "./Toggle";

const NavBar = ({ toggleTheme, isDarkMode }) => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/wishlist">Favourites</Link>
        </li>
        <li>
          <Link to="/myBooks">My Books</Link>
        </li>
        
      </ul>
      <Toggle toggleTheme={toggleTheme} isDarkMode={isDarkMode}/>
    </nav>
  );
};

export default NavBar;
