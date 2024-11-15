import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import axios from "axios";
import Players from "./Players.jsx";

const Teams = () => {
    const { actions, store } = useContext(Context);
    const [players, setPlayers] = useState([]); // Estado para jugadores
    const [loading, setLoading] = useState(true); // Estado para la carga
    const [error, setError] = useState(null); // Estado para errores

    const backendUrl = process.env.BACKEND_URL?.endsWith("/")
        ? process.env.BACKEND_URL
        : `${process.env.BACKEND_URL}/`;

    // Fetch de jugadores
    useEffect(() => {
        let isMounted = true;

        const fetchPlayers = async () => {
            try {
                const response = await axios.get(`${backendUrl}api/players_list`);
                if (isMounted) {
                    setPlayers(response.data); // Asigna jugadores a players
                }
            } catch (err) {
                if (isMounted) {
                    setError(`Error al cargar jugadores: ${err.message}`);
                }
            } finally {
                if (isMounted) {
                    setLoading(false); // Detener el loading
                }
            }
        };

        fetchPlayers();

        return () => {
            isMounted = false; // Evita actualizaciones de estado tras desmontar
        };
    }, [backendUrl]);

    // Manejando los diferentes estados
    if (loading) return <div>Loading players...</div>;
    if (error) return <div className="text-danger">Error: {error}</div>;

    // Renderizado del componente
    return (
        <div className="container text-center my-4">
            <h1 className="text-white fw-bold bg-primary p-3 rounded">Players List</h1>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {players.map((player) => (
                    <div key={player.id} className="col">
                        <div className="card bg-dark text-white">
                            <div className="card-body">
                                <h5 className="card-title">{player.full_name}</h5>
                                <p className="card-text">Position: {player.position}</p>
                                <p className="card-text">
                                    Height: {player.height_feet || "N/A"}' {player.height_inches || "N/A"}"
                                </p>
                                <p className="card-text">Weight: {player.weight_pounds || "N/A"} lbs</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Teams;
