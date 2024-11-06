import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import { ATL, BOS, BKN, CHA, CHI, CLE, DAL, DEN, DET, GSW, HOU, IND, LAC, LAL, MEM, MIA, MIL, MIN, NOP, NYK, OKC, ORL, PHI, PHX, POR, SAC, SAS, TOR, UTA, WAS } from "react-nba-logos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios'; // Asegúrate de importar axios

const Teams = () => {
    const { actions, store } = useContext(Context);
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const backendUrl = process.env.BACKEND_URL;

    useEffect(() => {
        let isMounted = true;

        const fetchTeams = async () => {
            try {
                const response = await axios.get(`${backendUrl}api/teams`);
                if (isMounted) {
                    setTeams(response.data.results.slice(0, 30)); // Limitar a los primeros 30 equipos
                }
            } catch (error) {
                if (isMounted) {
                    setError(error.message);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };
        fetchTeams();

        return () => {
            isMounted = false;
        };
    }, [backendUrl]);

    if (loading) {
        return <div>Loading teams...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const logoComponents = {
        1: ATL, 2: BOS, 3: BKN, 4: CHA, 5: CHI, 6: CLE, 7: DAL, 8: DEN,
        9: DET, 10: GSW, 11: HOU, 12: IND, 13: LAC, 14: LAL, 15: MEM, 
        16: MIA, 17: MIL, 18: MIN, 19: NOP, 20: NYK, 21: OKC, 22: ORL,
        23: PHI, 24: PHX, 25: POR, 26: SAC, 27: SAS, 28: TOR, 29: UTA, 
        30: WAS,
    };

    const handleAddFavorite = (team) => {
        actions.addFavoriteTeam(team);
    };

    return (
        <div>
            <h2>NBA Teams</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {teams.map((team) => {
                    const LogoComponent = logoComponents[team.id];
                    const isFavorite = store.favoriteTeams.some(fav => fav.id === team.id);
                    
                    return (
                        <div key={team.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
                            <LogoComponent size={50} />
                            <p style={{ color: "white" }}>{team.full_name}</p>
                            <button 
                                onClick={() => handleAddFavorite(team)} 
                                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                            >
                                <FontAwesomeIcon 
                                    icon={isFavorite ? faTrash : faHeart} 
                                    color={isFavorite ? 'gray' : 'red'} 
                                    size="lg" 
                                />
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Teams;
