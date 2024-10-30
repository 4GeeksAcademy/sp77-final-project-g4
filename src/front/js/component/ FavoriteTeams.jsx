import React, { useContext } from "react";
import { Context } from "../store/appContext";

const FavoriteTeams = () => {
    const { store, actions } = useContext(Context);

    return (
        <div>
            <h1>Your Favorite Teams</h1>
            <ul>
            {store.favoriteTeams.length > 0 ? (
    store.favoriteTeams.map(team => (
        <li key={team.id}>
            {team.name} 
            <button onClick={() => actions.removeFavoriteTeam(team.id)}>Remove</button>
        </li>
    ))
) : (
    <li>No favorite teams added yet.</li>
)}

            </ul>
        </div>
    );
};

export default FavoriteTeams;
