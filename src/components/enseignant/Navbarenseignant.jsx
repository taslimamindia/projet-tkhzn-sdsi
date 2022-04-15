import React from 'react';
import imguser from '../enseignant/i1.png';
import './Navbarenseignant.css';

function Navbarenseignant() {
    return (
        <>
            <div className="d-flex flex-row flex-nowrap h-100 alert row m_div1 mt-3">

                <div className="col-4 rounded-pill m_div2 d-flex align-items-center justify-content-start">
                    <h5 className='m_h5'>GESTION_RESSOURCES_FST_FES </h5>
                </div>

                <div className='col-4 d-flex justify-content-center align-items-center'>
                    <h4 className="m_h4">
                        Faire une demande
                    </h4>
                </div>

                <div className='col-4 d-flex flex-row'>
                    <h5 className='w-75 d-flex justify-content-end align-items-center'> Nom Prenom</h5>

                    <div className="btn-group m-auto">
                        <a type="button" className="m_borderNone dropdown-toggle" data-toggle="dropdown">
                            <img src={imguser} alt="logo top" width="30" />
                        </a>

                        <div className="dropdown-menu dropdown-menu-right">

                            <a className="dropdown-item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                </svg> Profil
                            </a>

                            <a className="dropdown-item">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                                </svg> Modifier mot de passe </a>

                            <a className="dropdown-item m_link">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                                    <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                                </svg> Déconnection </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbarenseignant;