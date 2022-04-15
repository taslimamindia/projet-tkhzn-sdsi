import React from "react";
import { Routes, Route } from 'react-router-dom';
import Profil from "../Profil";
import Accueil from "./accueil/Accueil";

import Fournisseur from "./enregistrerressources/Fournisseur";
import Imprimante from "./enregistrerressources/Imprimante";
import Ordinateur from "./enregistrerressources/Ordinateur";
import Ressource from "./enregistrerressources/Ressource";

import GestionAffectation from "./gestionaffectation/GestionAffectation";
import GestionRessource from "./gestionressource/GestionRessource";
import RessourcesDisponible from "./ressourcesdisponibles/RessourcesDisponible";
import RessourcesLivrees from "./ressourceslivrees/RessourcesLivrees";
import GestionUtilisateurs from "./GestionUtilisateurs";

export class Layout extends React.Component {
    render() {
        return(
            <React.Fragment>

                <main id="main">
                    <Routes>
                        <Route path="/Accueil" element={<Accueil />} />
                        <Route path="/RessourcesLivrees" element={<RessourcesLivrees />} />
                        <Route path="/RessourcesDisponible" element={<RessourcesDisponible />} />
                        <Route path="/GestionAffectation" element={<GestionAffectation />} />
                        <Route path="/EnregistrerRessources" element={<Ressource />} />
                        <Route path="/EnregistrerRessources/Ordinateur" element={<Ordinateur />} />
                        <Route path="/EnregistrerRessources/Fournisseur" element={<Fournisseur />} />
                        <Route path="/EnregistrerRessources/Imprimante" element={<Imprimante />} />
                        <Route path="/GestionRessource" element={<GestionRessource />} />
                        <Route path="/Profil" element={<Profil home={"/Responsable/Accueil"} />} />
                        <Route path='/gestionUtilisateurs' element={<GestionUtilisateurs />} />
                    </Routes>
                </main>
                {/* <!-- End #main --> */}

            </React.Fragment>
        )
    }
}