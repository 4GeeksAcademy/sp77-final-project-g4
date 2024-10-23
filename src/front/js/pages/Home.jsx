import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import nbaLogoTransparentUrl from "../../img/nba-logo-transparent.png";
/*import "../../styles/home.css";*/
import basketballUrl from "../../img/basketball.jpg";


export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-7">
			<div className="home-background">
				{/*<img src={basketballUrl} alt="basketballUrl"/>
					<img src={nbaLogoTransparentUrl}  alt="nbaLogoTransparentUrl" style={{ width: '50px', height: 'auto'}}/>  */}
				<div className="alert alert-info">
					{store.message || "Loading message from the backend (make sure your python backend is running)..."}
				</div>
					<p>
						This boilerplate comes with lots of documentation:{" "}
						<a href="https://start.4geeksacademy.com/starters/react-flask">
							Read documentation
						</a>
					</p>
			</div>
		</div>
	);
};
