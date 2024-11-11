import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import nbaLogoTransparentUrl from "../../img/nba-logo-transparent.png";
import "../../styles/home.css";
import basketballUrl from "../../img/basketball.jpg";
import TEAMS from "../../img/TEAMS.png";
import STATS from "../../img/STATS.png";


export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center">
			<div className="container bg-warning rounded py-2 mt-4">
				<h1 className="text-center text-black">
					Bienvenido a la web de estadisticas de la NBA
				</h1>
			</div>
			<div className="container mt-5">
				<div className="row justify-content-around">
					<div className="col-5">
						<Link to="/TEAMS">
							<div className="card">
								<img src={TEAMS} className="card-img-top rounded" alt="Card Image" />
							</div>
						</Link>
					</div>
					<div className="col-5">
						<Link to="/STATS">
							<div className="card">
								<img src={STATS} className="card-img-top rounded" alt="Card Image" />
							</div>
						</Link>
					</div>
				</div>
				{/* <Link to="/teams">
					<button className="btn btn-danger border-white btn-lg">
						TEAMS
					</button>
				</Link>
				<Link to="/stats">
					<button className="btn btn-primary border-white btn-lg ms-4">
						STATS
					</button>
				</Link> */}

			</div>
		</div>
	);
};
