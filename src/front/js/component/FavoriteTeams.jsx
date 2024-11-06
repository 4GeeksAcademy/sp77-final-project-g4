import React, { useContext } from "react";
import { Context } from "../store/appContext";

const Favorites = () => {
    const { store } = useContext(Context);
    
    return (
        <div>
            <h1>Favoritos</h1>
            {store.favoriteTeams.length === 0 ? (
                <p>No hay equipos favoritos.</p>
            ) : (
                <ul>
                    {store.favoriteTeams.map((team) => (
                        <li key={team.id}>{team.full_name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Favorites;
