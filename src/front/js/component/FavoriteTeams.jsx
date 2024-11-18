import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ATL, BOS, BKN, CHA, CHI, CLE, DAL, DEN, DET, GSW, HOU, IND, LAC, LAL, MEM, MIA, MIL, MIN, NOP, NYK, OKC, ORL, PHI, PHX, POR, SAC, SAS, TOR, UTA, WAS } from "react-nba-logos";

const Favorites = () => {
    const { actions, store } = useContext(Context);

    const logoComponents = {
        1: ATL, 2: BOS, 3: BKN, 4: CHA, 5: CHI, 6: CLE, 7: DAL, 8: DEN,
        9: DET, 10: GSW, 11: HOU, 12: IND, 13: LAC, 14: LAL, 15: MEM,
        16: MIA, 17: MIL, 18: MIN, 19: NOP, 20: NYK, 21: OKC, 22: ORL,
        23: PHI, 24: PHX, 25: POR, 26: SAC, 27: SAS, 28: TOR, 29: UTA,
        30: WAS,
    };

    return (
        <div className="container text-center my-5">
            <div className="d-flex justify-content-center">
                <h1 className="text-center text-white fw-bolder bg-danger p-3 rounded">FAVORITOS</h1>
            </div>
            {store.favoriteTeams.length === 0 ? (
                <div className="alert alert-warning mt-4" role="alert">
                    No hay equipos favoritos.
                </div>
            ) : (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 mt-4">
                    {store.favoriteTeams.map((team) => {
                        const LogoComponent = logoComponents[team.id];
                        return (
                            <div key={team.id} className="col">
                                <div className="card bg-secondary text-white text-center p-3 rounded">
                                    <div className="d-flex justify-content-center">
                                        {LogoComponent && <LogoComponent size={100} />}
                                    </div>
                                    <h5 className="mt-3">{team.full_name}</h5>
                                    <div className="d-flex justify-content-center">
                                        <button
                                            className="btn btn-outline-light mb-2"
                                            onClick={() => actions.removeFavorite(team)}
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>
                                </div>

                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Favorites;
