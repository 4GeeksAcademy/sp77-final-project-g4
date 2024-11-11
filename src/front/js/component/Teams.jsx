import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Context } from "../store/appContext";
import TeamCard from "./TeamCard.jsx";

const Teams = () => {
    const { store } = useContext(Context);
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
                    setTeams(response.data.results.slice(0, 30));
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

    return (
        <div>
            {teams.map((team) => (
                <TeamCard key={team.id} team={team} />
            ))}
        </div>
    );
};

export default Teams;
