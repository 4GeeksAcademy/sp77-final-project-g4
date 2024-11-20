import React from "react";
import { StatsPoints } from "../component/StatsPoints.jsx"
import { StatsAssists } from "../component/StatsAssists.jsx"
import { StatsGames } from "../component/StatsGames.jsx"
import { StatsBlocks } from "../component/StatsBlocks.jsx"
import { StatsTurnovers } from "../component/StatsTurnovers.jsx"
import { StatsSteals } from "../component/StatsSteals.jsx"



export const Stats = () => {

    return (
        <div className="">
            <div className="container d-flex justify-content-center">
                <h1 className="text-center text-white fw-bolder bg-primary p-3 rounded">STATS</h1>
            </div>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
                <div className="col">
                    <StatsPoints />
                </div>
                <div className="col">
                    <StatsAssists />
                </div>
                <div className="col">
                    <StatsGames />
                </div>
                <div className="col">
                    <StatsBlocks />
                </div>
                <div className="col">
                    <StatsTurnovers />
                </div>
                <div className="col">
                    <StatsSteals />
                </div>
            </div>
        </div>
    );
};