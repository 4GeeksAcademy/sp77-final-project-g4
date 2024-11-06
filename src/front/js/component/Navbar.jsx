import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import nbaLogoTransparentUrl from "../../img/nba-logo-transparent.png";

export const Navbar = () => {
    const { store } = useContext(Context);
    const [showLoginForm, setShowLoginForm] = useState(false);

    const buttonStyle = {
        backgroundColor: "#007bff",
        color: "white",
        fontWeight: "bold",
        padding: "10px 20px",
        borderRadius: "5px",
        cursor: "pointer",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        transition: "background-color 0.3s, transform 0.3s",
    };

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <Link to="/">
                    <img src={nbaLogoTransparentUrl} alt="NBA Logo" style={{ width: '25px', height: 'auto' }} />
                </Link>
                <div className="ml-auto">
                    <Link to="/teams">
                        <button style={buttonStyle}>Teams</button>
                    </Link>
                    
                    <Link to="/favorites">
                        <button style={buttonStyle}>
                            Favorites {store.favoriteTeams.length > 0 && `(${store.favoriteTeams.length})`}
                        </button>
                    </Link>
                    
                    {/* Botón de Log In */}
                    <button style={buttonStyle} onClick={() => setShowLoginForm(!showLoginForm)}>
                        Log In
                    </button>
                    {showLoginForm && <LoginForm onClose={() => setShowLoginForm(false)} />}
                </div>
            </div>
        </nav>
    );
};
