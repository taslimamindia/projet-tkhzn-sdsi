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
                            <Link class="nav-link " to={"/Fournisseur/"}>
                                <i className="bi bi-grid"></i><span>Acceuil</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link class="nav-link collapsed" to={"/Fournisseur/AppelDOffre"}>
                                <i className="bi bi-menu-button-wide"></i><span>Appel d'offre</span>
                            </Link>
                        </li>
                    </ul>
                </aside>
                {/* <!-- End Sidebar--> */}
            </React.Fragment>
        )
    }
} 