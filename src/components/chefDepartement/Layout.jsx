import React from "react";
import { Route, Routes } from "react-router-dom";
import Listesdesdemandes from "./listeunedemande/Listesdesdemandes";
import FaireUneDemande from "../enseignant/demande/FaireUneDemande";
import AjouterDemande from "./ajouterdemande/AjouterDemande";
import Accueil from "../enseignant/accueil/Accueil";
import AjouterPanne from "../commun/AjouterPanne";

function Layout() {

    return (
        <React.Fragment>
            <main id="main">
                <Routes>                        
                    <Route path="/" element = {<Listesdesdemandes />} />
                    <Route path="/Listesdesdemandes" element = {<Listesdesdemandes />} />
                    <Route path="/MesDemandes" element = {<Accueil />} />
                    <Route path="/AjouterDemande" element = {<AjouterDemande />} />
                    <Route path="/FaireUneDemande" element = {<FaireUneDemande />} />
                    <Route path="/SignalerUnePanne" element = {<AjouterPanne />} />
                </Routes>
            </main>
        </React.Fragment>
    )
}

export default Layout;