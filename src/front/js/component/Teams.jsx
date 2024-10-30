import React, { useEffect, useState } from "react";
import axios from 'axios';
import { ATL, BKN, BOS, CHA, CHI, CLE, DAL, DEN, DET, GSW, HOU, IND, LAC, LAL, MEM, MIA, MIL, MIN, NOP, NYK, OKC, ORL, PHI, PHX, POR, SAC, SAS, TOR, UTA, WAS } from "react-nba-logos";
const Teams = () => {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const backendUrl = process.env.BACKEND_URL;
    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await axios.get(`${backendUrl}api/teams`);
                setTeams(response.data.results.slice(0, 30));
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchTeams();
    }, [backendUrl]);
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
            {teams.map((team) => {
                const LogoComponent = logoComponents[team.id];
                return (
                    <div key={team.id}>
                        <LogoComponent size={50} />
                        <p>{team.full_name}</p>
                    </div>
                );
            })}
        </div>
    );
};
export default Teams;