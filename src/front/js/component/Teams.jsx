import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import { ATL, BOS, BKN, CHA, CHI, CLE, DAL, DEN, DET, GSW, HOU, IND, LAC, LAL, MEM, MIA, MIL, MIN, NOP, NYK, OKC, ORL, PHI, PHX, POR, SAC, SAS, TOR, UTA, WAS } from "react-nba-logos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

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
                const response = await axios.get(`${backendUrl}api/teams_list`);
                if (isMounted) {
                    setTeams(response.data.filter(team => team.id !== 31));
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
        <div className="container text-center my-4">
            <div className="container d-flex justify-content-center">
                <h1 className="text-center text-white fw-bolder bg-danger p-3 rounded">/TEAMS</h1>
            </div>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 m-2">
                {teams.map((team) => {
                    const LogoComponent = logoComponents[team.id];
                    const isFavorite = store.favoriteTeams.some(fav => fav.id === team.id);

                    return (
                        <div key={team.id} className="col bg-secondary rounded mx-2">
                            {LogoComponent && <LogoComponent size={150} />}
                            <p className="text-white fs-4">{team.full_name}</p>
                            <button
                                onClick={() => handleAddFavorite(team)}
                                className="btn btn-outline-light mb-2"
                            >
                                <FontAwesomeIcon
                                    icon={isFavorite ? faTrash : faHeart}
                                    color={isFavorite ? 'gray' : 'red'}
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
