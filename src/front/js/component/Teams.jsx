import React, { useEffect, useState } from "react";
// Importar los logos de los equipos específicos
import { ATL, BKN, BOS, CHA, CHI, CLE, DAL, DEN, DET, GSW, HOU, IND, LAC, LAL, MEM, MIA, MIL, MIN, NOP, NYK, OKC, ORL, PHI, PHX, POR, SAC, SAS, TOR, UTA, WAS } from "react-nba-logos";

const Teams = () => {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [players, setPlayers] = useState({});
    const [expandedTeam, setExpandedTeam] = useState(null); 


    const AUTH_TOKEN = "d51f0c54-d27d-4844-a944-92f1e747c09d"; 

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await fetch("https://api.balldontlie.io/v1/teams", {
                    method: "GET",
                    headers: {
                        'Authorization': AUTH_TOKEN, 
                    },
                });
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setTeams(data.data.slice(0, 30)); 
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTeams();
    }, []);

    const fetchPlayers = async (teamId) => {
        if (players[teamId]) {
            setExpandedTeam(expandedTeam === teamId ? null : teamId); 
            return;
        }

        try {
            const response = await fetch(`https://api.balldontlie.io/v1/players?team_ids[]=${teamId}`, {
                method: "GET",
                headers: {
                    'Authorization': AUTH_TOKEN, // 
                },
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setPlayers((prevPlayers) => ({ ...prevPlayers, [teamId]: data.data })); 
            setExpandedTeam(teamId); 
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) {
        return <div>Loading teams...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }


    const logoComponents = {
        1: ATL,
        2: BKN,
        3: BOS,
        4: CHA,
        5: CHI,
        6: CLE,
        7: DAL,
        8: DEN,
        9: DET,
        10: GSW,
        11: HOU,
        12: IND,
        13: LAC,
        14: LAL,
        15: MEM,
        16: MIA,
        17: MIL,
        18: MIN,
        19: NOP,
        20: NYK,
        21: OKC,
        22: ORL,
        23: PHI,
        24: PHX,
        25: POR,
        26: SAC,
        27: SAS,
        28: TOR,
        29: UTA,
        30: WAS,
    };

    const playerIconUrl = "data:image/jpeg;base64,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";

    return (
        <div>
            <h2>NBA Teams</h2>
            <ul>
                {teams.map((team) => {
                    const Logo = logoComponents[team.id]; 
                    const teamPlayers = players[team.id] || []; 
                    const isExpanded = expandedTeam === team.id; 

                    return (
                        <li
                            key={team.id}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                backgroundColor: "#f8f9fa",
                                margin: "5px",
                                padding: "10px",
                                borderRadius: "5px",
                                flexDirection: "column", 
                            }}
                        >
                            {Logo ? <Logo style={{ width: "30px", height: "30px", marginRight: "10px" }} /> : null}
                            <div onClick={() => fetchPlayers(team.id)} style={{ cursor: "pointer", fontWeight: "bold" }}>
                                {team.full_name} {isExpanded ? "▲" : "▼"}
                            </div>
                            {isExpanded && teamPlayers.length > 0 && (
                                <ul style={{ marginTop: "5px", paddingLeft: "20px" }}>
                                    {teamPlayers.map((player) => (
                                        <li key={player.id} style={{ display: "flex", alignItems: "center" }}>
                                            <img 
                                                src={playerIconUrl} 
                                                alt="Player Icon" 
                                                style={{ width: "20px", height: "20px", marginRight: "10px" }} 
                                            />
                                            {player.first_name} {player.last_name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Teams;
