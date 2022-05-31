import React, { useContext, useEffect, useState } from 'react'
import api from '../../api';
import TokenContext from '../context/TokenContext';
import "./AnnonceAppelDOffre.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
toast.configure();
function Imprimante({ item }) {
    const color2 = { color: "color: aqua" }
    return (
        <>
            <a className="text-warning" data-bs-toggle="modal" data-bs-target={"#basicModal" + item.code}>
                Imprimante
            </a>
            <div className="modal fade" id={"basicModal" + item.code} tabindex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Caractéristiques de L'imprimante</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body joli-modal d-flex flex-column align-items-center">
                            <p> <b style={color2}>RESOLUTION : {item.resolution} Pixels</b></p>
                            <p> <b style={color2}>VITESSE: {item.vitesse} Hz</b></p>
                            <p> <b style={color2}>MARQUE: {item.marque}</b></p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function Ordinateur({ item }) {
    const color1 = { color: "rgb(75, 168, 164)" }
    return (
        <>
            <a className='text-info' data-bs-toggle="modal" data-bs-target={"#ressource1" + item.code}>Ordinateur</a>
            <div className="modal fade" id={"ressource1" + item.code} tabindex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Caractéristiques du PC</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body joli-modal d-flex flex-column align-items-center">
                            <p><b style={color1}>CPU : </b>{item.cpu} Gh</p>
                            <p><b style={color1}>RAM : </b>{item.ram} Mo</p>
                            <p><b style={color1}>Disque : </b>{item.disque_d} Go</p>
                            <p><b style={color1}>Ecran : </b>{item.ecran} Pouces</p>
                            <p><b style={color1}>Marque : </b>{item.marque}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function AnnonceAppelDOffre() {
    const color = "color: cadetblue;";
    const { token } = useContext(TokenContext);
    const [data, setData] = useState([]);
    const loading = () => {
        api.get("/demandeservice/listerRessources", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        }).then(res => {
            if (res.status === 200) {
                // var dataset = new Map();
                // var keys = [];
                // for (var [cle, item] of Object.entries(res.data)) {
                //     if (dataset.has(item.dep) === false) {
                //         keys.push(item.dep);
                //         dataset.set(item.dep, []);
                //     }
                //     var d = dataset.get(item.dep);
                //     d.push(item);
                //     dataset.set(item.dep, d);
                // }
                setData(res.data);
                console.log(res.data);
                // setKey(keys);
            }
            else {
                toast.error("Une erreur sait produit 🤷‍♂️!!!", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 5000,
                    theme: "colored"
                })
            }
        }).catch(function (error) {
            toast.error("Une erreur sait produit 🤷‍♂️!!!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 5000,
                theme: "colored"
            })
        })
    }
    useEffect(() => {
        loading();
    }, [])
    return (
        <div className="gradient leading-relaxed tracking-wide flex flex-col">
            <nav id="header" className="w-full z-30 top-0 text-white py-1 lg:py-6">
                <div className="w-full container row mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-2 lg:py-6">
                    <div className="pl-4 flex items-center col-6 d-flex justify-content-center align-items-center">
                        <a className="text-white no-underline hover:no-underline font-weight-bold text-size text-2xl lg:text-4xl" href="#">
                            Faculté Des Sciences et Techniques
                        </a>
                    </div>

                    <div className=" d-flex justify-content-center w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block mt-2 lg:mt-0 text-black p-4 lg:p-0 z-20 col-6" id="nav-content">
                        <Link to={"/"} id="navAction" className="opacity-75 text-black seconnecter mb-100 px-5 border mx-auto lg:mx-0 hover:underline text-gray-800 font-extrabold rounded my-2 md:my-6 py-4 shadow-lg w-48">
                            Se connecter
                        </Link>
                    </div>
                </div>
            </nav>

            <div className="container mx-auto h-screen">
                <div className="text-center px-3 lg:px-0">
                    <h1
                        className="my-4 appel-offre-title text-2xl md:text-3xl lg:text-5xl font-black leading-tight"
                    >
                        Appel d'Offre
                    </h1>
                    <br />
                    <br />
                    <br />
                </div>

                <div className="flex items-center  row w-full mx-auto content-end">
                    <div className=" d-flex flex-row  col-12">
                        <div className="card mx-auto w-75">
                            <div className="card-body">
                                <table className="table datatable align-middle mb-6 bg-white">
                                    <thead >
                                        <tr>
                                            <th scope="col">Ressources Demandées</th>
                                            <th scope="col">Quantités Demandées</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data.map(item => {
                                                if (item.imp === null) {
                                                    return (
                                                        <tr>
                                                            <td>
                                                                <Ordinateur item={item.ord} />
                                                            </td>
                                                            <td>
                                                                <p className="fw-normal mb-1">{item.ord.qteD}</p>
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                                else {
                                                    return (
                                                        <tr>
                                                            <td>
                                                                <Imprimante item={item.imp} />
                                                            </td>
                                                            <td>
                                                                <p className="fw-normal mb-1">{item.imp.qteD}</p>
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                            })
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="soumettre container mx-auto h-screen">
                    <div className="text-center px-3 lg:px-0">
                        <br />
                        <br />
                        <Link to={"/"}
                            className="text-black seconnecter mb-100 px-5 border mx-auto lg:mx-0 hover:underline text-gray-800 font-extrabold rounded my-2 md:my-6 py-4 shadow-lg w-48"
                        >
                            Soumettre
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AnnonceAppelDOffre;