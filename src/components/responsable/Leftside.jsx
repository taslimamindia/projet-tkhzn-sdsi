import React from "react";
import { Link } from "react-router-dom";

export class Leftside extends React.Component {
    render() {
        return (
            <React.Fragment>
                {/* <!-- ======= Sidebar ======= --> */}
                <aside id="sidebar" className="sidebar">

                    <ul className="sidebar-nav" id="sidebar-nav">

                        <li className="nav-item">
                            <Link class="nav-link " to={"/Responsable/Accueil"}>
                                <i className="bi bi-grid"></i><span>Acceuil</span>
                            </Link>
                        </li>
                        {/* <!-- End Dashboard Nav --> */}

                        <li className="nav-item">
                            
                            <Link class="nav-link collapsed" to={"/Responsable/RessourcesLivrees"}>
                                <i className="bi bi-menu-button-wide"></i><span>Ressources livrées</span>
                            </Link>

                            {/* <i className="bi bi-chevron-down ms-auto"></i> */}

                        </li>
                        {/* <!-- End Components Nav --> */}

                        <li className="nav-item">

                            <Link class="nav-link collapsed" to={"/Responsable/RessourcesDisponible"}>
                                <i className="bi bi-journal-text"></i><span>Ressources disponibles</span>
                            </Link>

                            {/* <a className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" href="#">
                                <i className="bi bi-journal-text"></i><span>Ressources disponibles</span><i className="bi bi-chevron-down ms-auto"></i>
                            </a> */}

                        </li>
                        {/* <!-- End Forms Nav --> */}

                        <li className="nav-item">

                            <Link class="nav-link collapsed" to={"/Responsable/GestionAffectation"}>
                                <i className="bi bi-layout-text-window-reverse"></i><span>Gestion des affectations</span>
                            </Link>

                        </li>
                        {/* <!-- End Tables Nav --> */}

                        <li className="nav-item">
                            {/* <a class="nav-link collapsed" data-bs-target="#tables-nav" data-bs-toggle="collapse" href="#">
                                <i class="bi bi-menu-button-wide"></i><span>Enregister ressources</span><i class="bi bi-chevron-down ms-auto"></i>
                            </a> */}
                            <Link class="nav-link collapsed" to={"/Responsable/EnregistrerRessources"}>
                                <i className="bi bi-card-list"></i><span>Enregister ressources</span>
                            </Link>
                            
                            {/* <ul id="tables-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                                <li>
                                    <Link to={"/Responsable/EnregistrerRessources"}>
                                        <i className="bi bi-circle"></i><span>Ressource</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/Responsable/EnregistrerRessources/Imprimante"}>
                                        <i className="bi bi-circle"></i><span>Imprimante</span>
                                    </Link>
                                </li>
                                <li>

                                    <Link to={"/Responsable/EnregistrerRessources/Ordinateur"}>
                                        <i className="bi bi-circle"></i><span>Ordinateur</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/Responsable/EnregistrerRessources/Fournisseur"}>
                                        <i className="bi bi-circle"></i><span>Fournisseur</span>
                                    </Link>
                                     <a href="tables-data.html">
                                        <i className="bi bi-circle"></i><span>Supprimer</span>
                                    </a> 
                                </li> 
                            </ul>*/}
                        </li>
                        <li className="nav-itemé">
                            <Link class="nav-link collapsed" to={"/Responsable/GestionUtilisateurs"}>
                                <i className="bi bi-card-list"></i><span>Gestion des Utilisateurs</span>
                            </Link>
                        </li>
                        {/* <!-- End Register Page Nav --> */}
                    </ul>

                </aside>
                {/* <!-- End Sidebar--> */}
            </React.Fragment>
        )
    }
} 