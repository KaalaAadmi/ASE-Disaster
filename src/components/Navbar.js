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