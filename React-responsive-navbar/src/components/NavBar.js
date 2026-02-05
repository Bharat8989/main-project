import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import { CodeIcon, HamburgetMenuClose, HamburgetMenuOpen } from "./Icons";

function NavBar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <nav className="navbar">
      <div className="nav-container">

        <NavLink to="/" className="nav-logo" onClick={closeMobileMenu}>
          <span>CodeBucks</span>
          <span className="icon">
            <CodeIcon />
          </span>
        </NavLink>

        <ul className={click ? "nav-menu active" : "nav-menu"}>

          <li className="nav-item">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-links active" : "nav-links"
              }
              onClick={closeMobileMenu}
            >
              Home
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "nav-links active" : "nav-links"
              }
              onClick={closeMobileMenu}
            >
              About
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                isActive ? "nav-links active" : "nav-links"
              }
              onClick={closeMobileMenu}
            >
              Blog
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "nav-links active" : "nav-links"
              }
              onClick={closeMobileMenu}
            >
              Contact Us
            </NavLink>
          </li>

        </ul>

        <div className="nav-icon" onClick={handleClick}>
          {click ? (
            <span className="icon">
              <HamburgetMenuClose />
            </span>
          ) : (
            <span className="icon">
              <HamburgetMenuOpen />
            </span>
          )}
        </div>

      </div>
    </nav>
  );
}

export default NavBar;
