import React from "react";
import { Link } from "react-router-dom";
import "./Leftside.css";

export class Leftside extends React.Component {
    
    render() {
        return (
            <React.Fragment>
                <aside id="sidebar" className="sidebar sidebarColor" >

                    <ul className="sidebar-nav" id="sidebar-nav">

                        <li className="nav-item">
                            <Link class="nav-link active sidebarColor" to={"/Enseignant"}>
                                <i className="bi bi-grid"></i><span>Mes demandes</span>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link class="nav-link collapsed sidebarColor" to={"/Enseignant/FaireUneDemande"}>
                                <i className="bi bi-menu-button-wide"></i><span>Faire une demande</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link class="nav-link collapsed sidebarColor" to={"/Enseignant/SignalerUnePanne"}>
                                <i className="bi bi-menu-button-wide"></i><span>Signaler Une Panne</span>
                            </Link>
                        </li>
                    </ul>
                    
                </aside>
            </React.Fragment>
        )
    }
} 