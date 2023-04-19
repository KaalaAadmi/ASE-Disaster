import { useRef, useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./styles.css";
const storageEvent = new Event("storageEvent");

function Navbar() {
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};

	const [isAuthenticated, setIsAuthenticated] = useState(
		localStorage.getItem("token") !== null
	  ); // check if the user is authenticated on page load
	const [isCoordinator, setIsCoordinator] = useState(
		localStorage.getItem("isAdmin") === "true"
	); // check if the user is a coordinator on page load

	useEffect(() => {
		const updateIsAuth = () => {
			setIsAuthenticated(localStorage.getItem("token") !== null);
			setIsCoordinator(localStorage.getItem("isAdmin") === "true");
		};
	  
		window.addEventListener("storageEvent", updateIsAuth);
	  
		return () => {
		  window.removeEventListener("storageEvent", updateIsAuth);
		};
	  }, []);
	  

	if (isAuthenticated) {
		if (isCoordinator) {
			console.log("COOORDINATOR");
			return (
				<header>
					<h3>DISASTRO</h3>
					<nav ref={navRef}>
						<a href="/#" className="active">Home</a>
						<a href="/login">Logout</a>
						<a href="/maps">Map</a>
						<a href="/faq">FAQ</a>
						<a href="/report-disaster">Report Disaster</a>
						<a href="/view-reports">View Reports</a>
						<a href="/disaster-information">Disaster Information</a>
						<a href="/activate-response">Activate Response</a>
						<a href="/send-resources">Send Resources</a>
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
		else{
			console.log("RESPONDER");
			return (
				<header>
					<h3>DISASTRO</h3>
					<nav ref={navRef}>
						<a href="/#" className="active">Home</a>
						<a href="/login">Logout</a>
						<a href="/maps">Map</a>
						<a href="/faq">FAQ</a>
						<a href="/report-disaster">Report Disaster</a>
						<a href="/view-reports">View Reports</a>
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
	} 
	else{
		console.log("PUBLIC");
		return (
			<header>
				<h3>DISASTRO</h3>
				<nav ref={navRef}>
					<a href="/#" className="active">Home</a>
					<a href="/login">Login</a>
					<a href="/maps">Map</a>
					<a href="/faq">FAQ</a>
					<a href="/report-disaster">Report Disaster</a>
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
}

export default Navbar;