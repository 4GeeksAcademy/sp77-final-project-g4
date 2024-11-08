import React from "react";
import { StatsPoints } from "../component/StatsPoints.jsx"
import { StatsAssists } from "../component/StatsAssists.jsx"
import { StatsGames } from "../component/StatsGames.jsx"
import { StatsBlocks } from "../component/StatsBlocks.jsx"
import { StatsTurnovers } from "../component/StatsTurnovers.jsx"
import { StatsSteals} from "../component/StatsSteals.jsx"



export const Stats = () => {

	return (
		<div className="row">
            <div className="col-3">
                <StatsPoints />
            </div>
            <div className="col-3">
                <StatsAssists />
            </div>
            <div className="col-3">
                <StatsGames />
            </div>
            <div className="col-3">
                <StatsBlocks />
            </div>
            <div className="col-3">
                <StatsTurnovers />
            </div>
            <div className="col-3">
                <StatsSteals />
            </div>
		</div>
	);
};