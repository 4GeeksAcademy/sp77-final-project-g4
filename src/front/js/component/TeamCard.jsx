import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ATL, BOS, BKN, CHA, CHI, CLE, DAL, DEN, DET, GSW, HOU, IND, LAC, LAL, MEM, MIA, MIL, MIN, NOP, NYK, OKC, ORL, PHI, PHX, POR, SAC, SAS, TOR, UTA, WAS } from "react-nba-logos";
import axios from "axios";

const TeamCard = ({ team }) => {
    const { actions, store } = useContext(Context);
    const [players, setPlayers] = useState([]);
    const [expandedTeam, setExpandedTeam] = useState(null);

    const backendUrl = process.env.BACKEND_URL;

    // Función para obtener los jugadores desde una API externa (o diferente)
    const fetchPlayers = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/players`);
            setPlayers(response.data.results); // Aquí asumimos que `response.data.results` es una lista de jugadores
        } catch (error) {
            console.log("Error fetching players: ", error);
        }
    };

    const handleTeamClick = (teamId) => {
        if (expandedTeam === teamId) {
            setExpandedTeam(null); 
        } else {
            setExpandedTeam(teamId);
            fetchPlayers(); // Llamamos a la API para obtener los jugadores
        }
    };

    // Mapa de logos de los equipos
    const logoComponents = {
        1: <ATL size={50} />,
        2: <BOS size={50} />,
        3: <BKN size={50} />,
        4: <CHA size={50} />,
        5: <CHI size={50} />,
        6: <CLE size={50} />,
        7: <DAL size={50} />,
        8: <DEN size={50} />,
        9: <DET size={50} />,
        10: <GSW size={50} />,
        11: <HOU size={50} />,
        12: <IND size={50} />,
        13: <LAC size={50} />,
        14: <LAL size={50} />,
        15: <MEM size={50} />,
        16: <MIA size={50} />,
        17: <MIL size={50} />,
        18: <MIN size={50} />,
        19: <NOP size={50} />,
        20: <NYK size={50} />,
        21: <OKC size={50} />,
        22: <ORL size={50} />,
        23: <PHI size={50} />,
        24: <PHX size={50} />,
        25: <POR size={50} />,
        26: <SAC size={50} />,
        27: <SAS size={50} />,
        28: <TOR size={50} />,
        29: <UTA size={50} />,
        30: <WAS size={50} />
    };

    const isFavorite = store.favoriteTeams.some(fav => fav.id === team.id);

    return (
        <div key={team.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', margin: '10px', backgroundColor: '#222', padding: '15px', borderRadius: '8px' }}>
            
            <div onClick={() => handleTeamClick(team.id)} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {logoComponents[team.id]}
                <p style={{ color: "white", marginTop: '10px' }}>{team.full_name}</p>
            </div>

            <button onClick={() => actions.toggleFavoriteTeam(team)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <FontAwesomeIcon icon={isFavorite ? faTrash : faHeart} color="red" />
            </button>

            {expandedTeam === team.id && (
                <div style={{ marginTop: '10px' }}>
                    <h5 style={{ color: 'white' }}>Players:</h5>
                    <ul style={{ color: 'white', listStyleType: 'none', paddingLeft: '0' }}>
                        {players.map(player => (
                            <li key={player.id}>
                                {player.first_name} {player.last_name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default TeamCard;
