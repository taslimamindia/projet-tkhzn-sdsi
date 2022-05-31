import React, { useContext } from "react";
import { Link } from "react-router-dom";
import TokenContext from "../context/TokenContext";

export class Leftside extends React.Component {
    render() {
        return (
            <React.Fragment>
                {/* <!-- ======= Sidebar ======= --> */}
                <aside id="sidebar" className="sidebar">

                    <ul className="sidebar-nav" id="sidebar-nav">
                        {/* <!-- End Dashboard Nav --> */}

                        <li className="nav-item">
                            <Link class="nav-link collapsed" to={"/Responsable/GestionDesDemandes"}>
                                <i className="bi bi-card-list"></i><span>Gestion des demandes</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link class="nav-link collapsed" to={"/Responsable/Offre"}>
                                <i className="bi bi-card-list"></i><span>Offre</span>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link class="nav-link collapsed" to={"/Responsable/RessourcesLivrees"}>
                                <i className="bi bi-menu-button-wide"></i><span>Ressources livrées</span>
                            </Link>
                        </li>
                        {/* <!-- End Components Nav --> */}

                        <li className="nav-item">
                            <Link class="nav-link collapsed" to={"/Responsable/RessourcesDisponible"}>
                                <i className="bi bi-journal-text"></i><span>Ressources disponibles</span>
                            </Link>
                        </li>
                        {/* <!-- End Forms Nav --> */}

                        <li className="nav-item">
                            <Link class="nav-link collapsed" to={"/Responsable/GestionAffectation"}>
                                <i className="bi bi-layout-text-window-reverse"></i><span>Gestion des affectations</span>
                            </Link>
                        </li>
                        {/* <!-- End Tables Nav --> */}

                        <li className="nav-item">
                            <Link class="nav-link collapsed" to={"/Responsable/EnregistrerRessources"}>
                                <i className="bi bi-card-list"></i><span>Enregister ressources</span>
                            </Link>
                        </li>

                       
                        <li className="nav-item">
                            <Link class="nav-link collapsed" to={"/Responsable/GestionUtilisateurs"}>
                                <i className="bi bi-card-list"></i><span>Gestion des Utilisateurs</span>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link class="nav-link collapsed" to={"/Responsable/Evaluer"}>
                                <i className="bi bi-card-list"></i><span>Evaluer Founisseur</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link class="nav-link collapsed" to={"/Responsable/ListerConstat"}>
                                <i className="bi bi-card-list"></i><span>Lister Constats</span>
                            </Link>
                        </li>
                    </ul>

                </aside>
                {/* <!-- End Sidebar--> */}
            </React.Fragment>
        )
    }
} 