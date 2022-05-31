import './App.css';
import React, {  useState } from 'react';
import Responsable from './components/responsable/Responsable';
import Connection from './components/connection/Connection';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inscription from './components/connection/Inscription';
import MotDePasseOublier from './components/connection/MotDePasseOublier';
import TokenContext from "./components/context/TokenContext";
import Enseignant from './components/enseignant/Enseignant';
import ChefDepartement from './components/chefDepartement/ChefDepartement'
import Fournisseur from './components/fournisseur/Fournisseur';
import Error404 from './components/errors/Error404';
import AnnonceAppelDOffre from './components/fournisseur/AnnonceAppelDOffre';
import Maintenance from './components/servicemaintenance/Maintenance';

// role: role, 
//     updateRole: setRole
function App() {
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [msg, setMsg] = useState(false);
  const [stompClient, setStompClient] = useState(null);
  const contextValue = {
    token: token,
    updateToken: setToken,
    username: username,
    updateUsername: setUsername,
    role: role,
    updateRole: setRole,
    nom: nom,
    updateNom: setNom,
    prenom: prenom,
    updatePrenom: setPrenom,
    msg: msg,
    updateMsg: setMsg,
    stompClient: stompClient,
    updateStompClient: setStompClient
  };

  return (
    <TokenContext.Provider value={contextValue}>
      <React.Fragment>
        <Router>
          <Routes>
            <Route path="/" element={<Connection />} />
            <Route path="/MotDePasseOublier" element={<MotDePasseOublier />} />
            <Route path='/Inscription' element={<Inscription />} />
            <Route path="/Responsable/*" element={<Responsable />} />
            <Route path="/Enseignant/*" element={<Enseignant />} />
            <Route path="/ChefDepartement/*" element={<ChefDepartement />}/>
            <Route path="/Fournisseur/*" element={<Fournisseur />} />
            <Route path="/FstFes" element={<AnnonceAppelDOffre />} />
            <Route path="/Maintenance/*" element={<Maintenance />} />
            <Route path="/*" element={<Error404 />} />

          </Routes>
        </Router>
      </React.Fragment>
    </TokenContext.Provider>
  );
}

export default App;
