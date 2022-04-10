import './App.css';
import React, { useState } from 'react';
import Responsable from './components/responsable/Responsable';
import Connection from './components/connection/Connection';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inscription from './components/connection/Inscription';
import MotDePasseOublier from './components/connection/MotDePasseOublier';
import TokenContext from "./components/context/TokenContext";


function App() {
  const [token, setToken] = useState();
  const contextValue = {
    token: token,
    updateToken: setToken
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
          </Routes>
      </Router>
    </React.Fragment>
    </TokenContext.Provider>
  );
}

export default App;
