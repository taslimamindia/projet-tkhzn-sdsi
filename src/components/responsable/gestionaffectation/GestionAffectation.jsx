import React, { useContext, useEffect, useState } from 'react';
import { Link, Navigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../../api';
import TokenContext from '../../context/TokenContext';
toast.configure();

function Imprimante({ item }) {
    const color1 = { color: "rgb(75, 168, 164)" }
    
    return (
        <>
            <a className="text-warning" data-bs-toggle="modal" data-bs-target={"#basicModal" + item.id}>
                Voir Plus
            </a>
            <div className="modal fade" id={"basicModal" + item.id} tabindex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Caractéristiques de L'imprimante</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body joli-modal d-flex flex-column align-items-center">
                            <p> <b style={color1}>RESOLUTION : {item.resolution} Pixels</b></p>
                            <p> <b style={color1}>VITESSE: {item.vitesse} Go</b></p>
                            <p> <b style={color1}>MARQUE: {item.marqueI} </b></p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function Ordinateur({ item }) {
    const color2 = { color: "color: aqua" }
    return (
        <>
            <a className='text-info' data-bs-toggle="modal" data-bs-target={"#ressource1" + item.id}>Voir Plus</a>
            <div className="modal fade" id={"ressource1" + item.id} tabindex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Caractéristiques du PC</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body joli-modal d-flex flex-column align-items-center">
                            <p><b style={color2}>CPU : </b>{item.cpu} GH</p>
                            <p><b style={color2}>RAM : </b>{item.ram} Mo</p>
                            <p><b style={color2}>Disque : </b>{item.dd} Go</p>
                            <p><b style={color2}>Ecran : </b>{item.ecran} puces</p>
                            <p><b style={color2}>Marque : </b>{item.marqueO}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function Tr({ item, supprimer }) {

    return (
        <tr>
            <th key={item.id + "c"}>{item.marqueO === null ? "Imprimante" : "Ordinateur"}</th>
            <th key={item.id + "b"}>{item.marqueO === null ? <Imprimante item={item} /> : <Ordinateur item={item} />}</th>
            <th key={item.id + "z"}>{item.personne === null ? item.departement : item.personne}</th>
            <th key={item.id + "e"}>{item.date_affectation}</th>
            <th key={item.id + "f"}>
                <a type="button" className="btn btn-outline-danger" onClick={(e) => { supprimer(item.id, item.personne, item.departement) }}>
                    Supprimer
                </a>
            </th>
        </tr>
    )
}

function GestionAffectation() {
    const { token } = useContext(TokenContext);
    const [data, setData] = useState([]);

    const supprimer = (id, personne, departement) => {
        let message = "";
        if (personne == null) {
            message = "Vous voulez désaffecter cette ressouce affecter au département " + departement + " ?";
        }
        else {
            message = "Vous voulez désaffecter cette ressouce affecter à Monsieur " + personne + " ?";
        }

        if (window.confirm(message)) {
            const data = { "id": id };
            console.log(data);
            api.post("/affectationservice/deleteAffec", data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            }).then(res => {
                if (res.status === 200) {
                    toast.success("La ressource a été désaffecter avec succes.", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 5000,
                        theme: "colored"
                    });
                    charger();
                } else {
                    toast.error("🤦🏿‍♂️ Une error est survenue dans la rêquete 🙆‍♀️!!!", {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 10000,
                        theme: "colored"
                    })
                }
            }).catch(function (error) {
                toast.error("🤦🏿‍♂️ Une error est survenue côté server 🙆‍♀️!!!", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 10000,
                    theme: "colored"
                })
            })
        }
    }
    const charger = () => {
        api.get("/affectationservice/ListAffectations", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        })
            .then(res => {
                if (res.status === 200) {
                    setData(res.data);
                }
                else {
                    toast.error("🤦🏿‍♂️ Une error est survenue dans la rêquete 🙆‍♀️!!!", {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 10000,
                        theme: "colored"
                    })
                }
            })
            .catch(function (error) {
                Navigate({ to: "" })
            })
    }
    useEffect(() => {
        charger();
    }, [])
    return (
        <React.Fragment>

            <div className="pagetitle">
                <h1>GESTION DES AFFECTATIONS</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to={"/Responsable"}>Accueil</Link>
                        </li>
                        <span>&nbsp; &gt; &nbsp;</span>
                        <li className="breadcrumb-item">
                            <Link to={"/Responsable/GestionAffectation"}>Gestion des affectation</Link>
                        </li>
                    </ol>
                </nav>
            </div>
            {/* <!-- End Page Title --> */}

            <section className="section">
            <div className='row'>
                    {/* <div className='col-1'></div> */}
                    <div className='col-10'></div>
                    <div className='col-2 d-flex justify-content-end'><button className='btn btn-primary' onClick={(e) => { charger() }}>Actualiser</button></div>
                </div>
                <br />
                <div className="row">
                    <div className="col-lg-12">

                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Affectations effectuées</h5>

                                {/* <!-- Table with stripped rows --> */}
                                <table className="table datatable">
                                    <thead>
                                        <tr>
                                            <th>Ressource</th>
                                            <th>Plus d'informations</th>
                                            <th>Personel</th>
                                            <th>Date d'affectation</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data.map(item => {
                                                return (
                                                    <Tr item={item} supprimer={supprimer} />
                                                )
                                            })
                                        }
                                    </tbody>


                                </table>
                                {/* <!-- End Table with stripped rows --> */}

                            </div>
                        </div>

                    </div>
                </div>
            </section>

        </React.Fragment>
    )
}

export default GestionAffectation;