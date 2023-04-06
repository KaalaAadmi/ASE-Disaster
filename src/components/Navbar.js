import React from "react";
import "./styles.css";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

export default function Navbar() {
  window.onload = function () {
    let hamburger = document.querySelector(".hamburger");
    let navBar = document.querySelector(".nav-bar");
    let cross1 = document.querySelector(".cross");

    hamburger.onclick = function () {
      navBar.classList.toggle("active");
      cross1.classList.toggle("hide");
      hamburger.classList.toggle('hide');
    };

    cross1.onclick = function () {
      navBar.classList.toggle("active");
      cross1.classList.toggle("hide");
      hamburger.classList.toggle('hide');
    };
  };


  const isLoggedIn = true;
  return (
    <header>
      <div className="logo">DISASTRO</div>
      <div className="hamburger ">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <div className="cross hide">X</div>
      <nav className="nav-bar">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/maps">
              Map
            </Link>

          </li>
          <li>
            <Link to="/">
              Bulletin
            </Link>

          </li>
          <li>
            <Link to="/faq">FAQ</Link>
          </li>
          <li>
            <Link to="/report-disaster">Report Disaster</Link>
          </li>
          <li>
            <Link to="">View Reports</Link>
          </li>
          {isLoggedIn&& <li>
            <Link to="/">Message HQ</Link>
          </li>}
          <li>
            <Link to="/">Disaster Information</Link>
          </li>
          {isLoggedIn && <li>
            <Link to="/">Send Resources</Link>
          </li>}
          {isLoggedIn && <li>
            <Link to="/create-disaster">Create Disaster</Link>
          </li>}
        </ul>
      </nav>
    </header>
  );
}

// function CustomLink({ to, children, ...props }) {
//   // const path = window.location.pathname;
//   const resolvedPath = useResolvedPath(to);
//   const isActive = useMatch({ path: resolvedPath.pathname, end: true });
//   return (
//     <li className={isActive ? "active" : ""}>
//       <Link to={to} {...props}>
//         {children}
//       </Link>
//     </li>
//   );
