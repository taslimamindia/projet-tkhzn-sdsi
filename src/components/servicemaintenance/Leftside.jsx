import React from "react";
import { Link } from "react-router-dom";

export class Leftside extends React.Component {
    render() {
        return (
            <React.Fragment>
                {/* <!-- ======= Sidebar ======= --> */}
                <aside id="sidebar" className="sidebar">

                    <ul className="sidebar-nav" id="sidebar-nav">
                        {/* <!-- End Dashboard Nav --> */}

                        <li className="nav-item">
                            <Link class="nav-link collapsed" to={"/Maintenance/"}>
                                <i className="bi bi-card-list"></i><span>Liste des Pannes</span>
                            </Link>
                        </li>
                    </ul>

                </aside>
                {/* <!-- End Sidebar--> */}
            </React.Fragment>
        )
    }
} 