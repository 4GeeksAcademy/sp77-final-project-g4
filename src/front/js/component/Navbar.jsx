import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm.jsx";

export const Navbar = () => {
	const [showLoginForm, setShowLoginForm] = useState(false);

	const handleLoginClick = () => {
		setShowLoginForm(!showLoginForm);
	};

	const buttonStyle = {
		backgroundColor: "#007bff",
		color: "white",
		fontWeight: "bold",
		border: "none",
		padding: "10px 20px",
		borderRadius: "5px",
		cursor: "pointer",
		boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
		transition: "background-color 0.3s, transform 0.3s",
	};

	const buttonHoverStyle = {
		backgroundColor: "#0056b3",
		transform: "scale(1.05)", 
	};

	const [isHovered, setIsHovered] = useState(false);

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button style={buttonStyle}>Check the Context in action</button>
					</Link>
					<button
						style={{
							...buttonStyle,
							...(isHovered ? buttonHoverStyle : {}),
						}}
						onMouseEnter={() => setIsHovered(true)}
						onMouseLeave={() => setIsHovered(false)}
						onClick={handleLoginClick}
					>
						LogIn
					</button>
					{showLoginForm && <LoginForm onClose={() => setShowLoginForm(false)} />}
				</div>
			</div>
		</nav>
	);
};
