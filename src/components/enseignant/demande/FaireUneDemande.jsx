import React, { useState } from 'react';
import Imprimante from './Imprimante';
import Ordinateur from './Ordinateur';
import "./FaireUneDemande.css";
import { Link } from 'react-router-dom';

function FaireUneDemande() {
    
    const [checkedImp, setCheckedImp] = useState(true);
    const handleChangeImp = () => {
        setCheckedOrd(false);
        setCheckedImp(true);
    }
    const [checkedOrd, setCheckedOrd] = useState(false);
    const handleChangeOrd = () => {
        setCheckedImp(false);
        setCheckedOrd(true);
    }
    return (
        <>
            <div className="pagetitle">
                <h1>FAIRE UNE DEMANDE</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to={"/Enseignant"}>Accueil</Link>
                        </li>
                        <span>&nbsp; &gt; &nbsp;</span>
                        <li className="breadcrumb-item">
                            <Link to={"/Enseignant/FaireUneDemande"}>Faire Une Demande</Link>
                        </li>
                    </ol>
                </nav>
            </div>

            <div class="card shadow-lg py-3 bg-white rounded m_mainDem">
                <div className="card-header">
                    <div className="col-6 d-flex flex-row flex-nowrap justify-content-around">
                        <div className="form-check">
                            <input checked={checkedImp} onClick={handleChangeImp} className="form-check-input" type="radio" id="imprimante" value="imprimante" />
                            <label className="form-check-label" htmlFor="imprimante">Imprimante</label>
                        </div>
                        <div className="form-check">
                            <input checked={checkedOrd} onClick={handleChangeOrd} className="form-check-input" type="radio" id="ordinateur" value="ordinateur" />
                            <label className="form-check-label" htmlFor="ordinateur">Ordinateur</label>
                        </div>
                    </div>
                </div>
                <div class="card-body w-100 mx-auto pt-4">
                    {checkedImp && <Imprimante />}
                    {checkedOrd && <Ordinateur />}
                </div>
            </div>
        </>
    )
}

export default FaireUneDemande;
