import React, { useState, useEffect } from "react";
import axios from 'axios';


export const StatsGames = () => {
    const [players, setPlayers] = useState([]);
    const backendUrl = process.env.BACKEND_URL;

    useEffect(() => {
        // Llamada a la API para obtener los jugadores con más puntos
        const fetchTopPlayers = async () => {
            try {
                const response = await axios.get(`${backendUrl}api/top-players-games`);
                setPlayers(response.data);
            } catch (error) {
                console.error("Error fetching top players data:", error);
            }
        };

        fetchTopPlayers();
    }, []);


    return (
        <div className="container my-5">
            <h2 className="text-center text-dark mb-4">Partidos</h2>

            <table className="table bg-white table-hover text-center border-danger">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Jugador</th>
                        <th scope="col">Partidos</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map((player, index) => (
                        <tr key={player.id}>
                            <th scope="row">{index + 1}</th>
                            <td className="text-start">{player.player_to}</td>
                            <td>{player.games}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};