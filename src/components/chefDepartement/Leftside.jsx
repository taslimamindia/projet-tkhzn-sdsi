import React from "react";
import { Link } from "react-router-dom";

export class Leftside extends React.Component {
    render() {
        return (
            <React.Fragment>
                <aside id="sidebar" className="sidebar">

                    <ul className="sidebar-nav" id="sidebar-nav">

                        <li className="nav-item">
                            <Link class="nav-link " to={"/ChefDepartement/Listesdesdemandes"}>
                                <i className="bi bi-grid"></i><span>Listes des demandes</span>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link class="nav-link " to={"/ChefDepartement/MesDemandes"}>
                                <i className="bi bi-grid"></i><span>Mes Demandes</span>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link class="nav-link" to={"/ChefDepartement/FaireUneDemande"}>
                                <i className="bi bi-menu-button-wide"></i><span>Faire Une Demande</span>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link class="nav-link" to={"/ChefDepartement/SignalerUnePanne"}>
                                <i className="bi bi-menu-button-wide"></i><span>Signaler Une Panne</span>
                            </Link>
                        </li>

                    </ul>

                </aside>
            </React.Fragment>
        )
    }
} 