import React, { useContext, useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import api from '../../../api';
import TokenContext from '../../context/TokenContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrdinateurModif from './Modifier/Ordinateur';
import ImprimanteModif from './Modifier/Imprimante';
toast.configure();

function Affecter({actualiser, code, users}) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { token } = useContext(TokenContext);
    const onSubmit = (data) => {
        const donnees = {"ressource": code, "pers_dep": data.choix, "dep": null, "qte": 1}
        api.post("/affectationservice/ajouterAff", donnees, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        })
        .then(res => {
            if (res.status === 200) {
                toast.success("Les affectations on été effecteur avec succès. ✌️👍🏿", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 5000,
                    theme: "colored"
                });
                reset();
                actualiser();
            }
            else {
                toast.error("Une error est survenue, l'affectation n'a pas aboutie !!!", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 10000,
                    theme: "colored"
                });
            }
        })
        .catch(function (error) {
        })
    }
    return (
        <>
            <button type="button"  data-bs-toggle="modal" data-bs-target={"#aff" + code} className="btn btn-outline-primary btn-sm" >Affecter</button>
            <div className="modal fade" id={"aff" + code} tabindex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Affectation :</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="row mb-3">
                                    <label for="inputText" className="col-sm-10 col-form-label">
                                        <span className="badge border-primary border-1 text-primary">Personnel: </span>
                                    </label>
                                    <div className="col-sm-10">
                                        <select {...register("choix", { required: true })} className="form-select">
                                            {
                                                users.map(item => {
                                                    return <option value={item.login}>{item.nom} &nbsp; {item.prenom}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="row mb-3 d-f">
                                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Affecter</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function Ordinateur({ data }) {
    const cadetblue = { color: "cadetblue" }
    return (
        <>
            <a href="voir plus" data-bs-toggle="modal" data-bs-target={"#ressourceImp" + data.id}>Ordinateur</a>
            <div className="modal fade" id={"ressourceImp" + data.id} tabindex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Caractéristiques: {data.marque}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body joli-modal d-flex flex-column align-items-center">
                            <p><b style={cadetblue}>CPU : </b> {data.cpu} Gh</p>
                            <p><b style={cadetblue}>RAM : </b> {data.ram} Mo</p>
                            <p><b style={cadetblue}>Disque : </b>{data.disque_d} Go</p>
                            <p><b style={cadetblue}>Ecran : </b>{data.ecran} Pouces</p>
                            <p><b style={cadetblue}>Marque : </b>{data.marque}</p>
                            {/* if Ressource est affecté afficher la date d'affectation */}
                            {/* <p><b style={cadetblue}>Date d'affectation : </b>13-04-2022</p> */}
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

function Imprimante({ data }) {
    const cadetblue = { color: "cadetblue" }
    console.log(data.code);
    return (
        <>
            <a href="voir plus" data-bs-toggle="modal" data-bs-target={"#ressourceOrd" + data.id}>Imprimante</a>
            <div className="modal fade" id={"ressourceOrd" + data.id} tabindex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Caractéristiques: {data.marque}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body joli-modal d-flex flex-column align-items-center">
                            <p><b style={cadetblue}>Marque : </b> {data.marque} </p>
                            <p><b style={cadetblue}>Résolution : </b> {data.resolution} pixels</p>
                            <p><b style={cadetblue}>Vitesse : </b>{data.vitesse} hz</p>
                            {/* if Ressource est affecté afficher la date d'affectation */}
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

function Modifier({ item, type, charger }) {
    return (
        <>
            <button type="button" className="btn btn-outline-warning btn-sm" data-toggle="modal" data-target={"#modifier" + item.id}>Modifier</button>
            <div className="modal fade" id={"modifier" + item.id} tabindex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Modification d'{type}:</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {type === "Ordinateur" ?
                                <OrdinateurModif charger={charger} item={item} />
                                :
                                <ImprimanteModif charger={charger} item={item} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function Tr({ Users, item, type, charger }) {
    const { token } = useContext(TokenContext);
    const supprimer = (code) => {
        if (window.confirm("Vous voulez supprimer cette ressource ?")) {
            api.post("/ressourceservice/deleteRess", { "code": code }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            }).then(res => {
                if (res.status === 200) {
                    toast.success("La ressource a été supprimer avec succes.", {
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
            })
                .catch(function (error) {
                    toast.error("🤦🏿‍♂️ Une error est survenue côté server 🙆‍♀️!!!", {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 10000,
                        theme: "colored"
                    })
                })
        }
    }
    return (
        <>
            <tr>
                <td key={item.id + "1"}>{item.id}</td>
                <td key={item.id + "3"}>{item.dateLiv}</td>
                <td key={item.id + "4"}>{item.dureeGarantie}</td>
                <td key={item.id + "5"}>
                    {item.id.startsWith('I') && <Imprimante data={item} />}
                    {item.id.startsWith('O') && <Ordinateur data={item} />}
                </td>
                <td key={item.id + "6"}>
                    {item.estAffecter === true ? <span className="badge bg-warning">Non Affecté</span> : <span className="badge bg-success">Affectée</span>}
                </td>
                <td key={item.id + "7"}>
                    {item.estAffecter === false ? <></> : <Affecter actualiser={charger} code={item.id} users={Users} />}
                    <Modifier charger={charger} item={item} type={type} />
                    <button type="button" onClick={(e) => { supprimer(item.id) }} className="btn btn-outline-danger btn-sm" >Supprimer</button>
                </td>
            </tr>
        </>
    )
}

function RessourcesDisponible() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const cadetblue = { color: "cadetblue" }
    const { token } = useContext(TokenContext);
    const [data, setData] = useState([]);
    const [users, setUsers] = useState([]);

    const charger = () => {
        api.get("/ressourceservice/ListDisp", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        }).then(res => {
            if (res.status === 200) {
                setData(res.data);
                
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

        api.get("/userservice/users", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        }).then(res => {
            if (res.status === 200) {
                setUsers(res.data);
            }
            else {
                toast.error("🤦🏿‍♂️ Une error est survenue dans la rêquete 🙆‍♀️!!!", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 10000,
                    theme: "colored"
                })
            }
        }).catch(function (error) {
            toast.error("🤦🏿‍♂️ Une error est survenue dans la rêquete 🙆‍♀️!!!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 10000,
                theme: "colored"
            })
        })
    }
    useEffect(() => {
        charger();
    }, [])
    return (
        <>
            <div className="pagetitle">
                <h1>RESSOURCES</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to={"/Responsable"}>Accueil</Link>
                        </li>
                        <span>&nbsp; &gt; &nbsp;</span>
                        <li className="breadcrumb-item">
                            <Link to={"/Responsable/RessourcesDisponible"}>Réssources</Link>
                        </li>
                    </ol>
                </nav>
            </div>

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

                                <table className="table datatable">
                                    <thead>
                                        <tr>
                                            <th scope="col">Code</th>
                                            <th scope='col'>Date de livraison</th>
                                            <th scope="col">Durée garantie</th>
                                            <th scope="col">Type</th>
                                            <th scope="col">Etat</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data.map(item => {
                                                return (
                                                    <>
                                                        {item.ord === null ? <Tr Users={users} item={item.imp} charger={charger} type={"Imprimante"} /> : <Tr charger={charger} Users={users} item={item.ord} type={"Ordinateur"} />}
                                                    </>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>

                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default RessourcesDisponible;