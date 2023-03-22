import React from "react";
import "./styles.css";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

export default function Navbar() {
  window.onload = function () {
    let hamburger = document.querySelector(".hamburger");
    let navBar = document.querySelector(".nav-bar");
    let cross1 = document.querySelector(".cross");

    hamburger.onclick = function() {
      navBar.classList.toggle("active");
      cross1.classList.toggle("hide");
      hamburger.classList.toggle('hide');
    };
    
    cross1.onclick = function() {
      navBar.classList.toggle("active");
      cross1.classList.toggle("hide");
      hamburger.classList.toggle('hide');
    };
  };



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
            <a href="">Login</a>
          </li>
          <li>
            <a href="" className="active">
              Map
            </a>
          </li>
          <li>
            <a href="">Bulletin</a>
          </li>
          <li>
            <a href="">FAQ</a>
          </li>
          <li>
            <a href="">Report Disaster</a>
          </li>
          <li>
            <a href="">View Reports</a>
          </li>
          <li>
            <a href="">Message HQ</a>
          </li>
          <li>
            <a href="">Disaster Information</a>
          </li>
          <li>
            <a href="">Send Resources</a>
          </li>
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
