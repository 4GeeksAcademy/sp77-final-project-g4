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

    // Verificar si los datos están disponibles
    const { playerName, stats } = store.playerStats || {};
    if (!stats || stats.length === 0) {
        return <div className="text-center my-4">No stats found for this player.</div>;
    }

    return (
        <div className="container my-5">
            <h2 className="text-center text-dark mb-4">Stats de {playerName}</h2>
            <div className="container">
                <table className="table bg-white table-hover text-center border-danger">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col" className="text-start">Estadísticas</th>
                            <th scope="col">Valores</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stats.map((stat, index) => (
                            <React.Fragment key={stat.id}>
                                <tr>
                                    <td className="text-start"><strong>Puntos</strong></td>
                                    <td>{stat.points}</td>
                                </tr>
                                <tr>
                                    <td className="text-start"><strong>Asistencias</strong></td>
                                    <td>{stat.assists}</td>
                                </tr>
                                <tr>
                                    <td className="text-start"><strong>Rebotes Totales</strong></td>
                                    <td>{stat.total_rb}</td>
                                </tr>
                                <tr>
                                    <td className="text-start"><strong>Rebotes Ofensivos</strong></td>
                                    <td>{stat.offensive_rb}</td>
                                </tr>
                                <tr>
                                    <td className="text-start"><strong>Rebotes Defensivos</strong></td>
                                    <td>{stat.defensive_rb}</td>
                                </tr>
                                <tr>
                                    <td className="text-start"><strong>Tiros de Campo</strong></td>
                                    <td>{stat.field_goals}</td>
                                </tr>
                                <tr>
                                    <td className="text-start"><strong>Tiros Intentados</strong></td>
                                    <td>{stat.field_attempts}</td>
                                </tr>
                                <tr>
                                    <td className="text-start"><strong>% Tiros de Campo</strong></td>
                                    <td>{stat.field_percent}</td>
                                </tr>
                                <tr>
                                    <td className="text-start"><strong>Tiros de 3</strong></td>
                                    <td>{stat.three_fg}</td>
                                </tr>
                                <tr>
                                    <td className="text-start"><strong>Tiros de 3 Intentados</strong></td>
                                    <td>{stat.three_attempts}</td>
                                </tr>
                                <tr>
                                    <td className="text-start"><strong>% Tiros de 3</strong></td>
                                    <td>{stat.three_percent}</td>
                                </tr>
                                <tr>
                                    <td className="text-start"><strong>Tiros de 2</strong></td>
                                    <td>{stat.two_fg}</td>
                                </tr>
                                <tr>
                                    <td className="text-start"><strong>Tiros de 2 Intentados</strong></td>
                                    <td>{stat.two_attempts}</td>
                                </tr>
                                <tr>
                                    <td className="text-start"><strong>% Tiros de 2</strong></td>
                                    <td>{stat.two_percent}</td>
                                </tr>
                                <tr>
                                    <td className="text-start"><strong>% Eficiencia Tiros de Campo</strong></td>
                                    <td>{stat.effect_fg_percent}</td>
                                </tr>
                                <tr>
                                    <td className="text-start"><strong>Tiros Libres</strong></td>
                                    <td>{stat.ft}</td>
                                </tr>
                                <tr>
                                    <td className="text-start"><strong>Tiros Libres Intentados</strong></td>
                                    <td>{stat.ft_attempts}</td>
                                </tr>
                                <tr>
                                    <td className="text-start"><strong>% Tiros Libres</strong></td>
                                    <td>{stat.ft_percent}</td>
                                </tr>
                                <tr>
                                    <td className="text-start"><strong>Turnovers</strong></td>
                                    <td>{stat.turnovers}</td>
                                </tr>
                                <tr>
                                    <td className="text-start"><strong>Faltas Personales</strong></td>
                                    <td>{stat.personal_fouls}</td>
                                </tr>
                                <tr>
                                    <td className="text-start"><strong>Juegos Iniciados</strong></td>
                                    <td>{stat.games_started}</td>
                                </tr>
                                <tr>
                                    <td className="text-start"><strong>Minutos por Juego</strong></td>
                                    <td>{stat.minutes_pg}</td>
                                </tr>
                                <tr>
                                    <td colSpan="2" className="table-dark"></td> {/* Separador visual entre jugadores */}
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PlayerStats;
