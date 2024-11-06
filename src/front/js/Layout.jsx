import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext from "./store/appContext"; // Para el contexto de tu aplicación
import ScrollToTop from "./component/ScrollToTop.jsx"; // Para desplazamiento suave
import { BackendURL } from "./component/BackendURL.jsx"; // Para verificar la URL del backend
import { Navbar } from "./component/Navbar.jsx"; // Componente de la barra de navegación
import { Footer } from "./component/Footer.jsx"; // Componente del pie de página
import LoginForm from "./component/LoginForm.jsx"; // Componente de formulario de inicio de sesión
import { Home } from "./pages/Home.jsx"; // Página de inicio
import { Demo } from "./pages/Demo.jsx"; // Página de demostración
import { Single } from "./pages/Single.jsx"; // Página de detalle
import Teams from "./component/Teams.jsx"; // Componente que muestra los equipos
import ball from '../img/basketball.jpg'; // Imagen de fondo
import { Stats } from "./pages/Stats.jsx"; // Página de estadísticas
import Favorites from "./component/FavoriteTeams.jsx";
import injectContext from "./store/appContext";
import ScrollToTop from "./component/ScrollToTop.jsx";
import { BackendURL } from "./component/BackendURL.jsx";
import { Navbar } from "./component/Navbar.jsx";
import { Footer } from "./component/Footer.jsx";
import LoginForm from "./component/LoginForm.jsx";
import { Home } from "./pages/Home.jsx";
import { Demo } from "./pages/Demo.jsx";
import { Single } from "./pages/Single.jsx";
import Teams from "./component/Teams.jsx";
import FavoritePlayers from "./component/FavoritePlayers.jsx";
import FavoriteTeams from "./component/ FavoriteTeams.jsx";
import ball from '../img/basketball.jpg';
import { Stats } from "./pages/Stats.jsx";


const Layout = () => {
    const basename = process.env.BASENAME || "";
    const [showLoginForm, setShowLoginForm] = useState(false);

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;

    return (
        <div style={{ backgroundImage: `url(${ball})`, backgroundRepeat: `no-repeat`, backgroundSize: 'cover', backgroundPosition: 'center' }} className="d-flex flex-column min-vh-100">
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<Teams />} path="/teams" />
                        <Route element={<LoginForm />} path="/login" />
                        <Route element={<Stats />} path="/stats" />
                        <Route element={<Favorites />} path="/favorites" />
                        <Route element={<Teams />} path="/teams" />
                        <Route element={<h1>Not found!</h1>} path="*" />
                        <Route element={<LoginForm />} path="/" />
                        <Route element={<FavoriteTeams />} path="/favorite-teams" />
                        <Route element={<FavoritePlayers />} path="/favorite-players" />
                        <Route element={<Teams />} path="/teams" /> 
                        <Route element={<LoginForm />} path="/login" /> {/* Cambié el path para no duplicar "/" */}
                        <Route element={<h1>Not found!</h1>} path="*" />
                        <Route element={<Stats />} path="/stats" />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
