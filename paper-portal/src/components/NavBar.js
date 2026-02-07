"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./NavBar.css";
import { CodeIcon, HamburgetMenuClose, HamburgetMenuOpen } from "./Icons";

function NavBar() {
  const [click, setClick] = useState(false);
  const pathname = usePathname();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const isActive = (path) => pathname === path;

  return (
    <nav className="navbar">
      <div className="nav-container">

        <Link href="/" className="nav-logo" onClick={closeMobileMenu}>
          <span>PaperHub</span>
          <span className="icon">
            <CodeIcon />
          </span>
        </Link>

        <ul className={click ? "nav-menu active" : "nav-menu"}>

          <li className="nav-item">
            <Link
              href="/"
              className={isActive("/") ? "nav-links active" : "nav-links"}
              onClick={closeMobileMenu}
            >
              Home
            </Link>
          </li>

          <li className="nav-item">
            <Link
              href="/about"
              className={isActive("/about") ? "nav-links active" : "nav-links"}
              onClick={closeMobileMenu}
            >
              About
            </Link>
          </li>

          <li className="nav-item">
            <Link
              href="/blog"
              className={isActive("/blog") ? "nav-links active" : "nav-links"}
              onClick={closeMobileMenu}
            >
              Blog
            </Link>
          </li>

          <li className="nav-item">
            <Link
              href="/contact"
              className={isActive("/contact") ? "nav-links active" : "nav-links"}
              onClick={closeMobileMenu}
            >
              Contact Us
            </Link>
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
