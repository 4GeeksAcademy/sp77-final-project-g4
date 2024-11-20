import React, { useContext } from "react";
import { Context } from "../store/appContext";

const Players = () => {
    const {store} = useContext(Context);

  
    return (
        <div>
            <h1>Lista de Jugadores</h1>
            <ul>
                {store.players && store.players.length > 0 ? (
                    store.players.map((player) => (
                        <li key={player.id}>{player.playerName}</li>
                    ))
                ) : (
                    <p>No hay jugadores disponibles</p>
                )}
            </ul>
        </div>
    );
};

export default Players;
