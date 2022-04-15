import './App.css';
import React, { useState } from 'react';
import Responsable from './components/responsable/Responsable';
import Connection from './components/connection/Connection';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inscription from './components/connection/Inscription';
import MotDePasseOublier from './components/connection/MotDePasseOublier';
import TokenContext from "./components/context/TokenContext";
import Enseignant from './components/enseignant/Enseignant';


function App() {
  const [token, setToken] = useState();
  const [user, setUser] = useState();
  const [role, setRole] = useState();
  const contextValue = {
    token: token,
    updateToken: setToken,
    user: user,
    updateUser: setUser,
    role: role, 
    updateRole: setRole
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
          </Routes>
      </Router>
    </React.Fragment>
    </TokenContext.Provider>
  );
}

export default App;
