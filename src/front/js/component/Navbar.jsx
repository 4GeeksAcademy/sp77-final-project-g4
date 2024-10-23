import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm.jsx";
import nbaLogoTransparentUrl from "../../img/nba-logo-transparent.png";

export const Navbar = () => {
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const loginButtonStyle = {
        backgroundColor: "#007bff", // Azul
        color: "white",
        fontWeight: "bold",
        border: "none",
        padding: "10px 20px",
        borderRadius: "5px",
        cursor: "pointer",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        transition: "background-color 0.3s, transform 0.3s",
    };

    const loginButtonHoverStyle = {
        backgroundColor: "#0056b3", 
        transform: "scale(1.05)", 
    };

    const teamsButtonStyle = {
        backgroundColor: "red",
        color: "white",
        fontWeight: "bold",
        border: "none",
        padding: "10px 20px",
        borderRadius: "5px",
        cursor: "pointer",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        transition: "background-color 0.3s, transform 0.3s",
    };

    const teamsButtonHoverStyle = {
        backgroundColor: "#b30000", 
        transform: "scale(1.05)", 
    };

    const handleLoginClick = () => {
        setShowLoginForm(!showLoginForm);
    };

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <Link to="/">
                    {/*<span className="navbar-brand mb-0 h1"></span>*/}
                    <img src={nbaLogoTransparentUrl}  alt="nbaLogoTransparentUrl" style={{ width: '25px', height: 'auto'}}/>
                </Link>
                <div className="ml-auto">
                    <Link to="/demo">
                        <button style={loginButtonStyle}>Check the Context in action</button>
                    </Link>
                    <Link to="/teams">
                        <button
                            style={{
                                ...teamsButtonStyle,
                                ...(isHovered ? teamsButtonHoverStyle : {}),
                            }}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            Teams
                        </button>
                    </Link>
                    <button
                        style={{
                            ...loginButtonStyle,
                            ...(isHovered ? loginButtonHoverStyle : {}),
                        }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={handleLoginClick}
                    >
                        Log In
                    </button>
                    {showLoginForm && <LoginForm onClose={() => setShowLoginForm(false)} />}
                </div>
            </div>
        </nav>
    );
};
