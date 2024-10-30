import React, { useContext } from "react";
import { Context } from "../store/appContext";

const FavoritePlayers = () => {
    const { store, actions } = useContext(Context);

    return (
        <div>
            <h1>Your Favorite Players</h1>
            <ul>
                {store.favoritePlayers.map(player => (
                    <li key={player.id}>
                        {player.name}
                        <button onClick={() => actions.removeFavoritePlayer(player.id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FavoritePlayers;
