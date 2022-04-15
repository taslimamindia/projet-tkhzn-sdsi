import { React } from "react";
import { Routes, Route } from 'react-router-dom';
import Accueil from "./accueil/Accueil";
import FaireUneDemande from "./demande/FaireUneDemande";
import Navbarenseignant from "./Navbarenseignant";
import './Enseignant.css';

function Enseignant() {
    return (
      <div class="container mt-5 pt-1">
          <main class="card card-body">

            <Navbarenseignant />

            <Routes>
                <Route path="/" element={<Accueil />} />
                <Route path="/FaireUneDemande" element={<FaireUneDemande />} />
            </Routes>

          </main>
      </div>
    )
  }
  
  export default Enseignant;