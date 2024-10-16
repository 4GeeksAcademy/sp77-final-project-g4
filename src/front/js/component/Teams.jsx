import React, { useEffect, useState } from "react";
// Importar los logos de los equipos específicos
import { ATL, BKN, BOS, CHA, CHI, CLE, DAL, DEN, DET, GSW, HOU, IND, LAC, LAL, MEM, MIA, MIL, MIN, NOP, NYK, OKC, ORL, PHI, PHX, POR, SAC, SAS, TOR, UTA, WAS } from "react-nba-logos";

const Teams = () => {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await fetch("https://api.balldontlie.io/v1/teams", {
                    method: "GET",
                    headers: {
                        'Authorization': `d51f0c54-d27d-4844-a944-92f1e747c09d` 
                    }
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

    return (
        <div>
            <h2>NBA Teams</h2>
            <ul>
                {teams.map((team) => {
                    const Logo = logoComponents[team.id];
                    return (
                        <li
                            key={team.id}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                backgroundColor: "#f8f9fa",
                                margin: "5px",
                                padding: "10px",
                                borderRadius: "5px"
                            }}
                        >
                            {Logo ? <Logo style={{ width: "30px", height: "30px", marginRight: "10px" }} /> : null}
                            {team.full_name}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Teams;
