import React, { useContext, useEffect, useState } from 'react'
import api from '../../../api'
import TokenContext from '../../context/TokenContext'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

function Imprimante({ item }) {
    const color2 = { color: "color: aqua" }
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
                        <div className="modal-body joli-modal d-flex flex-column align-items-center">
                            <p> <b style={color2}>RESOLUTION : {item.resolution}</b></p>
                            <p> <b style={color2}>VITESSE: {item.vitesse}</b></p>
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
            <a className='text-info' data-bs-toggle="modal" data-bs-target={"#ressource1" + item.code}>Voir Plus</a>
            <div className="modal fade" id={"ressource1" + item.code} tabindex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Caractéristiques du PC</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body joli-modal d-flex flex-column align-items-center">
                            <p><b style={color1}>CPU : </b>{item.cpu}</p>
                            <p><b style={color1}>RAM : </b>{item.ram}</p>
                            <p><b style={color1}>Disque : </b>{item.disque_d}</p>
                            <p><b style={color1}>Ecran : </b>{item.ecran}</p>
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

function Tr({ data }) {

    return (
        <>
            <tr className='text-alig'>
                <td>{data.type === "ordinateur" ? "Ordinateur" : "Imprimante"}</td>
                <td>
                    {data.type === "ordinateur" ? <Ordinateur item={data.ord} /> : <Imprimante item={data.imp} />}
                </td>
                <td>
                    {data.type === "ordinateur" ? data.ord.qteD : data.imp.qteD}
                </td>
            </tr>
        </>
    )
}

function Table({ data }) {
    return (
        <table className="table datatable">
            <thead>
                <tr>
                    <th scope="col">Type Ressource</th>
                    <th scope="col">Détails</th>
                    <th scope="col">Quantité demandée</th>
                </tr>
            </thead>
            <tbody>
                {Object.entries(data).length !== 0 &&
                    data.map(item => {
                        return (<Tr data={item} />)
                    })
                }
            </tbody>
        </table>
    )
}

function AppelDoffre() {
    const { token } = useContext(TokenContext);
    const [data, setData] = useState(new Map());
    const [key, setKey] = useState([]);
    const lancerOffre = () => {
        api.get("/demandeservice/addAppel", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        }).then(res => {
            if (res.status === 200) {
                toast.success("L'appel d'offre est lancé avec succès.", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                    theme: "colored"
                });
                let n = new Map();
                let v = [];
                setData(n);
                setKey(v);
                loading();
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
    const loading = () => {
        api.get("/demandeservice/listerDemandes", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        }).then(res => {
            if (res.status === 200) {
                console.log(res.data);
                if (res.data === []) {
                    console.log("null");
                }
                else {
                    console.log("not null");
                    var dataset = new Map();
                    var keys = [];
                    for (var [cle, item] of Object.entries(res.data)) {
                        if (dataset.has(item.dep) === false) {
                            keys.push(item.dep);
                            dataset.set(item.dep, []);
                        }
                        var d = dataset.get(item.dep);
                        d.push(item);
                        dataset.set(item.dep, d);
                    }
                    setData(dataset);
                    setKey(keys);
                }
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
    const supprimer = (e, code) => {
        api.post("/demandeservice/supprimeDemande/", String(code), {
            headers: {
                'Content-Type': "text/plain",
                'Authorization': 'Bearer ' + token,
            }
        }).then(res => {
            if (res.status === 200) {
                toast.success("La suppréssion à été éffectuer avec succès.", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                    theme: "colored"
                });
                loading();
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
    }, []);

    return (
        <>
            <div className="pagetitle">
                <h1>Liste des Demandes</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">Liste des Demandes</li>
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
                        <div className="card mx-2 text-center">
                            <div className="card-body">
                                {
                                    key.map(k => {
                                        return (
                                            <div className="row">
                                                <div className='h2 text-start'>Département {k}</div>
                                                {data.get(k) != undefined && <Table data={data.get(k)} />}
                                            </div>
                                        )
                                    })
                                }
                                {Object.entries(key).length === 0 ?
                                    <div className="row col-12 font-italic font-weight-bold text-size justify-content-center">
                                        Aucun besoin n'est formulé.
                                    </div>
                                    :
                                    <div className="row">
                                        <div className="col-md-6"></div>
                                        <div className="col-md-6">
                                            <button className="btn btn-primary submit-btn" type="button" onClick={(e) => { lancerOffre(); }}>Lancer l'appel</button>
                                        </div>
                                    </div>
                                }

                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default AppelDoffre;