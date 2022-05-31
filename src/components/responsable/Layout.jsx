import React from "react";
import { Routes, Route} from 'react-router-dom';
// import Profil from "../Profil";
import Accueil from "./accueil/Accueil";

import Ressource from "./enregistrerressources/Ressource";
import GestionAffectation from "./gestionaffectation/GestionAffectation";
import RessourcesDisponible from "./ressourcesdisponibles/RessourcesDisponible";
import RessourcesLivrees from "./ressourceslivrees/RessourcesLivrees";
import GestionUtilisateurs from "./gestionsutilisateurs/GestionUtilisateurs";
import AppelDoffre from "./appeldoffre/AppelDoffre";
import Messagerie from "./messagerie/Messagerie";
import Offre from "./offre/Offre";
import Evaluer from "./fournisseur/Evaluer"
import ListerConstat from "./constat/ListerConstat";

function Layout() {

    return (
        <React.Fragment>

            <main id="main">
                <Routes>
                    <Route path="/Accueil" element={<Accueil />} />
                    <Route path="/RessourcesLivrees" element={<RessourcesLivrees />} />
                    <Route path="/RessourcesDisponible" element={<RessourcesDisponible />} />
                    <Route path="/GestionAffectation" element={<GestionAffectation />} />
                    <Route path="/EnregistrerRessources" element={<Ressource />} />
                    <Route path="/GestionDesDemandes" element={<AppelDoffre />} />
                    <Route path='/gestionUtilisateurs' element={<GestionUtilisateurs />} />
                    <Route path='/Offre' element={<Offre />} />
                    <Route path='/Messagerie' element={<Messagerie />} />
                    <Route path='/Evaluer' element={<Evaluer />} />
                    <Route path='/ListerConstat' element={<ListerConstat />} />
                </Routes>
            </main>

        </React.Fragment>
    )
}

export default Layout;