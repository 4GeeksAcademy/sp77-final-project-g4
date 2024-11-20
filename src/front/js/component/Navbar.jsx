import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import nbaLogoTransparentUrl from "../../img/nba-logo-transparent.png";

export const Navbar = () => {
    const { store } = useContext(Context);
    const [showLoginForm, setShowLoginForm] = useState(false);

    const buttonStyle = {
        backgroundColor: "red",
        color: "white",
        fontWeight: "bold",
        padding: "10px 20px",
        borderRadius: "5px",
        cursor: "pointer",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        transition: "background-color 0.3s, transform 0.3s",
        margin: "0 5px",
    };

    const buttonHoverStyle = {
        backgroundColor: "#b30000",
        transform: "scale(1.05)",
    };

    const [hoveredButton, setHoveredButton] = useState(null);

    const handleMouseEnter = (button) => setHoveredButton(button);
    const handleMouseLeave = () => setHoveredButton(null);

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <Link to="/">
                    <img src={nbaLogoTransparentUrl} alt="nbaLogoTransparentUrl" style={{ width: '25px', height: 'auto' }} />
                </Link>
                <div className="ml-auto">
                    {/* Botón para Teams */}
                    <Link to="/teams">
                        <button
                            style={hoveredButton === "teams" ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle}
                            onMouseEnter={() => handleMouseEnter("teams")}
                            onMouseLeave={handleMouseLeave}
                        >
                            Teams
                        </button>
                    </Link>

                    {/* Botón para Favorites */}
                    <Link to="/favorites">
                        <button
                            style={hoveredButton === "favorites" ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle}
                            onMouseEnter={() => handleMouseEnter("favorites")}
                            onMouseLeave={handleMouseLeave}
                        >
                            Favorites {store.favoriteTeams.length > 0 && `(${store.favoriteTeams.length})`}
                        </button>
                    </Link>

                    {/* Botón para Players */}
                    <Link to="/players">
                        <button
                            style={hoveredButton === "players" ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle}
                            onMouseEnter={() => handleMouseEnter("players")}
                            onMouseLeave={handleMouseLeave}
                        >
                            Players
                        </button>
                    </Link>

                    {/* Botón de Log In */}
                    <button
                        style={hoveredButton === "login" ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle}
                        onMouseEnter={() => handleMouseEnter("login")}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => setShowLoginForm(!showLoginForm)}
                    >
                        Log In
                    </button>
                    {showLoginForm && <LoginForm onClose={() => setShowLoginForm(false)} />}
                </div>
            </div>
        </nav>
    );
};
