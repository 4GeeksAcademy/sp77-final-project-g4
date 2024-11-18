import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";

const PlayerStats = () => {
    const { store, actions } = useContext(Context);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const params = useParams(); // Obtiene el id del jugador desde la URL

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                await actions.getPlayerStats(params.id); // Llama a la acción para obtener las estadísticas del jugador
            } catch (err) {
                setError("Error fetching player stats. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchData(); // Llamada a la API para obtener las estadísticas del jugador

    }, [params.id, actions]); // Se ejecuta cuando cambia el id del jugador

    if (loading) {
        return <div className="text-center my-4">Loading...</div>;
    }

    if (error) {
        return <div className="alert alert-danger text-center">{error}</div>;
    }

    if (!store.playerStats || store.playerStats.length === 0) {
        return <div className="text-center my-4">No stats found for this player.</div>;
    }

    // Extrae las estadísticas del jugador
    const playerStats = store.playerStats;

    return (
        <div className="container my-5">
            <h2 className="text-center text-dark mb-4">Player Stats for {params.id}</h2>

            <table className="table bg-white table-hover text-center border-danger">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Jugador</th>
                        <th scope="col">Puntos</th>
                        <th scope="col">Asistencias</th>
                        <th scope="col">Rebotes Totales</th>
                        <th scope="col">Rebotes Ofensivos</th>
                        <th scope="col">Rebotes Defensivos</th>
                        <th scope="col">Tiros de Campo</th>
                        <th scope="col">Tiros Intentados</th>
                        <th scope="col">% Tiros de Campo</th>
                        <th scope="col">Tiros de 3</th>
                        <th scope="col">Tiros de 3 Intentados</th>
                        <th scope="col">% Tiros de 3</th>
                        <th scope="col">Tiros de 2</th>
                        <th scope="col">Tiros de 2 Intentados</th>
                        <th scope="col">% Tiros de 2</th>
                        <th scope="col">% Eficiencia Tiros de Campo</th>
                        <th scope="col">Tiros Libres</th>
                        <th scope="col">Tiros Libres Intentados</th>
                        <th scope="col">% Tiros Libres</th>
                        <th scope="col">Turnovers</th>
                        <th scope="col">Faltas Personales</th>
                        <th scope="col">Juegos Iniciados</th>
                        <th scope="col">Minutos por Juego</th>
                    </tr>
                </thead>
                <tbody>
                    {playerStats.map((stats, index) => (
                        <tr key={stats.id}>
                            <th scope="row">{index + 1}</th>
                            <td className="text-start">{stats.player_id}</td> {/* O el nombre del jugador si está disponible */}
                            <td>{stats.points}</td>
                            <td>{stats.assists}</td>
                            <td>{stats.total_rb}</td>
                            <td>{stats.offensive_rb}</td>
                            <td>{stats.defensive_rb}</td>
                            <td>{stats.field_goals}</td>
                            <td>{stats.field_attempts}</td>
                            <td>{stats.field_percent}</td>
                            <td>{stats.three_fg}</td>
                            <td>{stats.three_attempts}</td>
                            <td>{stats.three_percent}</td>
                            <td>{stats.two_fg}</td>
                            <td>{stats.two_attempts}</td>
                            <td>{stats.two_percent}</td>
                            <td>{stats.effect_fg_percent}</td>
                            <td>{stats.ft}</td>
                            <td>{stats.ft_attempts}</td>
                            <td>{stats.ft_percent}</td>
                            <td>{stats.turnovers}</td>
                            <td>{stats.personal_fouls}</td>
                            <td>{stats.games_started}</td>
                            <td>{stats.minutes_pg}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PlayerStats;
