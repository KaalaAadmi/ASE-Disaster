// import React,{useCallback} from "react";
// import "./styles.css";
// import { Link, useMatch, useNavigate, useResolvedPath } from "react-router-dom";

// const Navbar = () => {
//   window.onload = function() {
//     let hamburger = document.querySelector('.hamburger');
//     let navBar = document.querySelector('.nav-bar');
//     let cross1 = document.querySelector('.cross');

//     hamburger.onclick = function() {
//       navBar.classList.toggle('active');
//       console.log('click');
//       hamburger.classList.toggle('hide');
//       cross1.classList.toggle('hide');
//     }

//     cross1.onclick = function() {
//       navBar.classList.toggle('active');
//       hamburger.classList.toggle('hide');
//       cross1.classList.toggle('hide');
//     }
//   }

//   const navigate = useNavigate();
//   const handleNavigation = (path) => () => {
//     console.log(path);
//     navigate(path);
//   };


//   const isLoggedIn = true;

//   return (
//     <header>
//       <div className="logo">DISASTRO</div>
//       <div className="hamburger ">
//         <div className="line"></div>
//         <div className="line"></div>
//         <div className="line"></div>
//       </div>
//       <div className="cross hide">X</div>
//       <nav className="nav-bar">
//         <ul>
//           <li>
//             <button onClick={handleNavigation("/")}>Home</button>
//           </li>
//           <li>
//             <Link to="/">Home</Link>
//           </li>
//           <li>
//             <button onClick={handleNavigation("/login")}>Login</button>
//           </li>
//           <li>
//             <button onClick={handleNavigation("/maps")}>
//               Map
//             </button>

//           </li>
//           <li>
//             <button onClick={handleNavigation("/")}>
//               Bulletin
//             </button>

//           </li>
//           <li>
//             <button onClick={handleNavigation("/faq")}>FAQ</button>
//           </li>
//           <li>
//             <button onClick={handleNavigation("/report-disaster")}>Report Disaster</button>
//           </li>
//           <li>
//             <button onClick={handleNavigation("")}>View Reports</button>
//           </li>
//           {isLoggedIn&& <li>
//             <button onClick={handleNavigation("/")}>Message HQ</button>
//           </li>}
//           <li>
//             <button onClick={handleNavigation("/")}>Disaster Information</button>
//           </li>
//           {isLoggedIn && <li>
//             <button onClick={handleNavigation("/")}>Send Resources</button>
//           </li>}
//           {isLoggedIn && <li>
//             <button onClick={handleNavigation("/create-disaster")}>Create Disaster</button>
//           </li>}
//         </ul>
//       </nav>
//     </header>
//   );
// }


// export default Navbar;

// // function CustomLink({ to, children, ...props }) {
// //   // const path = window.location.pathname;
// //   const resolvedPath = useResolvedPath(to);
// //   const isActive = useMatch({ path: resolvedPath.pathname, end: true });
// //   return (
// //     <li className={isActive ? "active" : ""}>
// //       <button to={to} {...props}>
// //         {children}
// //       </Link>
// //     </li>
// //   );


import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./styles.css";

function Navbar() {
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};

	return (
		<header>
			<h3>LOGO</h3>
			<nav ref={navRef}>
				<a href="/#" className="active">Home</a>
				<a href="/login">Login</a>
				<a href="/maps">Map</a>
				<a href="/bulletin">Bulletin</a>
				<a href="/faq">FAQ</a>
				<a href="/report-disaster">Report Disaster</a>
				<a href="/view-reports">View Reports</a>
				<a href="/message-hq">Message HQ</a>
				<a href="/disaster-information">Disaster Information</a>
				<a href="/send-resources">Send Resources</a>
				<a href="/create-disaster">Create Disaster</a>
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button>
			</nav>
			<button
				className="nav-btn"
				onClick={showNavbar}>
				<FaBars />
			</button>
		</header>
	);
}

export default Navbar;