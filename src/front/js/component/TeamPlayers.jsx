import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";

const TeamPlayers = () => {
    const { store, actions } = useContext(Context);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const params = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                await actions.getTeamPlayers(params.id); // Llama a la acción de Flux
            } catch (err) {
                setError("Error fetching players. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [params.id, actions]); // Solo se ejecuta cuando `params.id` cambia.

    if (loading) {
        return <div className="text-center my-4">Loading...</div>;
    }

    if (error) {
        return <div className="alert alert-danger text-center">{error}</div>;
    }

    if (!store.teamPlayers || store.teamPlayers.length === 0) {
        return <div className="text-center my-4">No players found for this team.</div>;
    }

    return (
        <div className="container my-4">
            <div className="d-flex justify-content-center">
                <h1 className="text-center text-white fw-bolder bg-danger p-3 rounded">Jugadores - {params.id}</h1>
            </div>
            <div className="container">
                <div className="d-flex">
                    <table className="table bg-white table-hover text-center border-danger">
                        <thead className="table-dark">
                            <tr>
                                <th scope="d-flex">#</th>
                                <th scope="d-flex">Jugadores</th>
                                <th scope="d-flex">Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {store.teamPlayers.map((player, index) => (
                                <tr key={player.api_player_id}>
                                    <td scope="d-flex">{index + 1}</td>
                                    <td className="text-start">{player.playerName}</td>
                                    <td className="text-center"><button onClick={() => navigate(`/players/${player.api_player_id}`)} className="btn btn-danger">Details</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TeamPlayers;
