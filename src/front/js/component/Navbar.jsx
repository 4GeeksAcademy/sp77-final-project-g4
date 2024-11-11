import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import nbaLogoTransparentUrl from "../../img/nba-logo-transparent.png";

export const Navbar = () => {
    const { store } = useContext(Context);
    const [showLoginForm, setShowLoginForm] = useState(false);

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
                <Link to="/favorite-teams">Favorite Teams</Link>
                <Link to="/favorite-players">Favorite Players</Link>

                <Link to="/">
                    <img src={nbaLogoTransparentUrl} alt="nbaLogoTransparentUrl" style={{ width: '25px', height: 'auto' }} />
                </Link>
                <div className="ml-auto">
                    <Link to="/teams">
                        <button style={teamsButtonStyle}>Teams</button>
                    </Link>
                    
                    <Link to="/favorites">
                        <button style={teamsButtonStyle}>
                            Favorites {store.favoriteTeams.length > 0 && `(${store.favoriteTeams.length})`}
                        </button>
                    </Link>
                    
                    {/* Botón de Log In */}
                    <button style={loginButtonStyle} onClick={() => setShowLoginForm(!showLoginForm)}>
                        Log In
                    </button>
                    {showLoginForm && <LoginForm onClose={() => setShowLoginForm(false)} />}
                </div>
            </div>
        </nav>
    );
};
