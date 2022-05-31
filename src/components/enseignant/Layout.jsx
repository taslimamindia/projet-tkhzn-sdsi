import React from "react";
import { Routes, Route } from 'react-router-dom';
import AjouterPanne from "../commun/AjouterPanne";
import Accueil from "../enseignant/accueil/Accueil";
import FaireUneDemande from "../enseignant/demande/FaireUneDemande";

export class Layout extends React.Component {
    render() {
        return (
            <React.Fragment>

                <main id="main">
                    <Routes>
                        <Route path="/" element={<Accueil />} />
                        <Route path="/FaireUneDemande" element={<FaireUneDemande />} />
                        <Route path="/SignalerUnePanne" element = {<AjouterPanne />} />
                    </Routes>
                </main>
                {/* <!-- End #main --> */}

            </React.Fragment>
        )
    }
}