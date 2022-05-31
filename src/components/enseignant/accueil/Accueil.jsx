import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import api from '../../../api';
import TokenContext from '../../context/TokenContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

function Imprimante({ item }) {
    const color1 = { color: "rgb(75, 168, 164)" }
    return (
        <>
            <a className="text-warning" data-bs-toggle="modal" data-bs-target={"#basicModal" + item.code}>
                Voir Plus
            </a>
            <div className="modal fade" id={"basicModal" + item.code} tabindex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Caractéristiques de L'imprimante</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p> <b style={color1}>RESOLUTION : {item.resolution}</b></p>
                            <p> <b style={color1}>VITESSE: {item.vitesse}</b></p>
                            <p> <b style={color1}>MARQUE: {item.marque}</b></p>
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
            <a className='text-info' data-bs-toggle="modal" data-bs-target={"#ressource1" + item.code}>Voir Plus</a>
            <div className="modal fade" id={"ressource1" + item.code} tabindex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Caractéristiques du PC</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p><b style={color2}>CPU : </b>{item.cpu}</p>
                            <p><b style={color2}>RAM : </b>{item.ram}</p>
                            <p><b style={color2}>Disque : </b>{item.disque_d}</p>
                            <p><b style={color2}>Ecran : </b>{item.ecran}</p>
                            <p><b style={color2}>Marque : </b>{item.marque}</p>
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

function Tr({ data, supprimer }) {
    return (
        <>
            <tr>
                <td>{data.type === "ordinateur" ? "Ordinateur" : "Imprimante"}</td>
                <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {data.type === "ordinateur" ? data.ord.qteD : data.imp.qteD}
                </td>
                <td>
                    {data.type === "ordinateur" ? <Ordinateur item={data.ord} /> : <Imprimante item={data.imp} />}
                </td>
                <td className="row">
                    <form>
                        <button type="button" className="btn btn-outline-danger" onClick={(e) => { supprimer(e, data.code) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                            </svg> supprimer
                        </button>
                    </form>
                </td>
            </tr>
        </>
    )
}

function Listesdesdemandes() {
    const { token } = useContext(TokenContext);
    const [data, setData] = useState({});

    const loading = () => {
        api.get("/demandeservice/listerMesDemandes", {
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
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 10000,
                        theme: "colored"
                    })
                }
            })
            .catch(function (error) {

            })
    }
    const supprimer = (e, code) => {
        api.post("/demandeservice/supprimeDemande/", String(code), {
            headers: {
                'Content-Type': "text/plain",
                'Authorization': 'Bearer ' + token,
            }
        })
            .then(res => {
                if (res.status === 200) {
                    toast.success("La suppression a été effectuer avec succès.", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 10000,
                        theme: "colored"
                    })
                    loading();
                }
                else {
                    toast.error("🤦🏿‍♂️ Une error est survenue dans la rêquete 🙆‍♀️!!!", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 10000,
                        theme: "colored"
                    })
                }
            })
            .catch(function (error) {

            })
    }
    useEffect(() => {
        loading();
    }, []);

    return (
        <>
            <div className="pagetitle">
                <h1>Accueil</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to={"/Enseignant"}>Mes Demandes</Link>
                        </li>
                    </ol>
                </nav>
            </div>

            <section className="section">
                <div className='row'>
                    {/* <div className='col-1'></div> */}
                    <div className='col-10'></div>
                    <div className='col-2 d-flex justify-content-end'><button className='btn btn-primary' onClick={(e) => { loading() }}>Actualiser</button></div>
                </div>
                <br />
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                {(Object.entries(data).length === 0) ?
                                    <div className='p-5 d-flex justify-content-center'>
                                        Vous n'avez pas aucune demande.
                                    </div>
                                    :
                                    <table className="table datatable">
                                        <thead>
                                            <tr>
                                                <th scope="col">Ressource  &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;</th>
                                                <th scope="col">Quantite Demandée &nbsp;&nbsp;</th>
                                                <th scope="col">Détails  &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;</th>
                                                <th scope="col">Options</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data !== undefined &&
                                                data.map(item => {
                                                    return (<Tr data={item} supprimer={supprimer} />)
                                                })
                                            }
                                        </tbody>
                                    </table>
                                }
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default Listesdesdemandes;