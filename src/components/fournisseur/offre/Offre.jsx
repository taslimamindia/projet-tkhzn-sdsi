import React, { useContext, useEffect, useState } from 'react'
import api from '../../../api';
import TokenContext from '../../context/TokenContext';
import "./Offre.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
                        <div className="modal-body">
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
            <a className='text-info' data-bs-toggle="modal" data-bs-target={"#ressource1" + item.code}>Ordinateur</a>
            <div className="modal fade" id={"ressource1" + item.code} tabindex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Caractéristiques du PC</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
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

function Offre() {
    const { token, username } = useContext(TokenContext);
    const [data, setData] = useState([]);
    const [donnee, setDonnee] = useState(new Map());
    const [code, setCode] = useState(0);
    const loading = () => {
        api.get("/demandeservice/listerRessources", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        }).then(res => {
            if (res.status === 200) {
                console.log(username);
                var dataset = new Map();
                var keys = [];
                for (var [cle, item] of Object.entries(res.data)) {
                    if (item.ord === null) {
                        var valeur = new Map();
                        valeur.set("prix_unit", 0);
                        valeur.set("duree_garantie", 0);
                        valeur.set("groupe", item.imp.groupe);
                        dataset.set(item.imp.groupe, valeur);
                    }
                    else {
                        var valeur = new Map();
                        valeur.set("prix_unit", 0);
                        valeur.set("duree_garantie", 0);
                        valeur.set("groupe", item.ord.groupe);
                        dataset.set(item.ord.groupe, valeur);
                    }
                }
                setData(res.data);
                setDonnee(dataset);
                console.log(res.data);
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
    const changer = (e, type, groupe) => {
        const input = e.target;
        input.value = input.value;
        var valeur = donnee.get(groupe);
        if (type === "prix") valeur.set("prix_unit", input.value);
        else valeur.set("duree_garantie", input.value);
    }
    const onSubmit = (e) => {
        let envoi = true;
        console.log(donnee);
        let donnees = [];
        for (let [cle, valeur] of donnee) {
            donnees.push({ "prix_unit": valeur.get('prix_unit'), "groupe": cle, "duree_garantie": valeur.get('duree_garantie') })
            if (valeur.get("prix_unit") === 0) {
                envoi = false;
            }
        }

        if (envoi === true) {
            api.post("/demandeservice/saveOffre", donnees, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            }).then(res => {
                if (res.status === 200) {
                    toast.success("L'offre a été soumit avec succès.", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 2000,
                        theme: "colored"
                    })
                    entry();
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
        else {
            toast.error("Tous les prix unitaires doivent être renseigner 🙆‍♀️!!!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
                theme: "colored"
            })
        }
    }
    const entry = () => {
        api.get("/demandeservice/checkEligibilitie", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        }).then(res => {
            if (res.status === 200) {
                const c = res.data.status;
                setCode(c);
                if (c === 0) {
                    loading();
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
    useEffect(() => {
        entry();
    }, [])
    return (
        <>

            <div className="pagetitle">
                <h1>Mon offre</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">Soumettre mon Offre</li>
                    </ol>
                </nav>
            </div>

            <section className="section">
                <div className='row'>
                    {/* <div className='col-1'></div> */}
                    <div className='col-10'></div>
                    <div className='col-2 d-flex justify-content-end'><button className='btn btn-primary' onClick={(e) => { entry() }}>Actualiser</button></div>
                </div>
                <br />

                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                {code === 0 ?
                                    <>
                                        <table className="table datatable">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Ressource</th>
                                                    <th scope="col">Quantité demandée</th>
                                                    <th scope="col">Prix Unitaire (Dirhams)</th>
                                                    <th scope="col">Durée de garantie (ans)</th>
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
                                                                    <td >
                                                                        <input type="number" defaultValue={0} onChange={(e) => { changer(e, "prix", item.ord.groupe) }} />
                                                                    </td>
                                                                    <td>
                                                                        <input type="number" defaultValue={0} onChange={(e) => { changer(e, "duree", item.ord.groupe) }} />
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
                                                                    <td >
                                                                        <input type="number" defaultValue={0} onChange={(e) => { changer(e, "prix", item.imp.groupe) }} />
                                                                    </td>
                                                                    <td>
                                                                        <input type="number" defaultValue={0} onChange={(e) => { changer(e, "duree", item.imp.groupe) }} />
                                                                    </td>
                                                                </tr>
                                                            )
                                                        }
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                        <button onClick={(e) => onSubmit(e)} className="btn btn-primary submit-btn btn-offre" type="button">Soumettre</button>
                                    </>
                                    :
                                    <>
                                        {code === 1 ?
                                            <div className="row col-12 font-italic font-weight-bold text-size justify-content-center">
                                                Désolé vous n'êtes pas autoriser à soumettre à cette offre, pour des raisons de non respect des précédents engagements.
                                            </div>
                                            :
                                            <div className="row col-12 font-italic font-weight-bold text-size justify-content-center">
                                                Vous avez déjà soumis à cette appel d'offre.
                                            </div>
                                        }
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Offre;