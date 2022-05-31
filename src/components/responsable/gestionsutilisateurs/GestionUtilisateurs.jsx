import React, { useContext, useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import api from '../../../api';
import TokenContext from '../../context/TokenContext';
import AjouterUtilisateur from './AjouterUtilisateur';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

function Modifier({ item, charger }) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { token } = useContext(TokenContext);

    const onSubmit = (data) => {
        console.log(data);
        let donnee = null;
        if (String(item.role).toLocaleUpperCase() === "ADMINISTRATIF" || String(item.role).toLocaleUpperCase() === "CHEFDEPARTEMENT") {
            donnee = {
                "role": String(item.role).toLowerCase(),
                "user": {
                    "login": data.login,
                    "nom": data.nom,
                    "prenom": data.prenom,
                    "active": data.active
                }
            }
        }
        else if (String(item.role).toUpperCase() === "ENSEIGNANT") {
            donnee = {
                "role": String(item.role).toLowerCase(),
                "enseignant": {
                    "login": data.login,
                    "nom": data.nom,
                    "prenom": data.prenom,
                    "active": data.active,
                    "nomLab": data.nomLab
                }
            }
        }
        else {
            donnee = {
                "role": String(item.role).toLowerCase(),
                "user": {
                    "login": data.login,
                    "nom": data.nom,
                    "prenom": data.prenom,
                    "active": data.active
                }
            }
        }
        console.log(donnee);
        api.post("/userservice/updateuser", donnee, {
            headers: {
                'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token
            }
        }).then(res => {
            if (res.data.status === 200) {
                toast.success("L'utilisateur a été modifier avec succès. 🤗", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                    theme: "colored"
                });
                reset();
                charger();
            }
            else if (res.data.status === 201) {
                toast.error("Le login exist déjà 🤦🏿‍♂️ 🙆‍♀️, veuillez choisir un autre 🤷‍♂️!!!", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                    theme: "colored"
                })
            }
            else {
                toast.error("Une erreur sait produit 🙆‍♀️ !!!", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 5000,
                    theme: "colored"
                })
            }
        }).catch(function (error) {
            toast.error("Une erreur sait produit 🙆‍♀️ !!!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 5000,
                theme: "colored"
            })
        })
    }

    return (
        <>
            <button type="button" className="btn btn-outline-info" data-bs-toggle="modal" data-bs-target={"#modifierUser" + item.login}>modifier</button>
            <div className="modal fade" id={"modifierUser" + item.login} tabindex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form className="row g-3 w-75 mx-auto" onSubmit={handleSubmit(onSubmit)}>
                            <div className="modal-header">
                                <h5 className="modal-title">Modifier utilisateur</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="col-10">
                                    <label htmlFor="inputNanme4" className="form-label"><b>Login</b></label>
                                    <input disebled type="text" {...register("login", { required: true })} className="form-control" id="inputNanme4" defaultValue={item.login} />
                                </div>
                                <div className="col-10">
                                    <label htmlFor="inputNanme4" className="form-label"><b>Nom</b></label>
                                    <input type="text" {...register("nom", { required: true })} className="form-control" id="inputNanme4" defaultValue={item.nom} />
                                </div>
                                <div className="col-10">
                                    <label htmlFor="inputNanme4" className="form-label"><b>Prenom</b></label>
                                    <input type="text" {...register("prenom", { required: true })} className="form-control" id="inputNanme4" defaultValue={item.prenom} />
                                </div>

                                {
                                    item.role === "ENSEIGNANT" && 
                                    <div className="col-10">
                                        <label htmlFor="inputNanme4" className="form-label"><b>Laboratoire</b></label>
                                        <input type="text" {...register("nomLab", { required: false })} className="form-control" id="inputNanme4" defaultValue={item.nomLab} />
                                    </div>
                                }
                                <div className="col-10">
                                    <label htmlFor="inputNanme4" className="form-label"><b>Active</b></label>
                                    <select {...register("active", { required: true })} className="form-control" data-live-search="true">
                                        <option value="true" selected={item.active === true? "selected": ""}>Activer</option>
                                        <option value="false" selected={item.active === false? "selected": ""}>Désactiver</option>
                                    </select>
                                </div>
                                <br />
                            </div>
                            <div className="modal-footer ">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                                <button type="submit" className="btn btn-primary" >Modifier</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}

function TBody({ table, charger }) {
    const { token } = useContext(TokenContext);
    const supprimer = (login) => {
        console.log({ "code": login });
        if (window.confirm("Vous voulez supprimer cet utilisateur ?")) {
            api.post("/userservice/deleteuser", { "code": login }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(res => {
                if (res.status === 200) {
                    toast.success("L'utilisateur a été supprimer avec succes.", {
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
            <tbody>
                {
                    table.map(item => (

                        <tr>
                            <th key={item.login + "a"}>{item.nom}</th>
                            <th key={item.login + "b"}>{item.prenom}</th>
                            <th key={item.login + "d"}>{item.role}</th>
                            <th key={item.login + "e"}>{item.active === true ? 'Active' : 'Non Active'}</th>
                            <th key={item.login + "f"} className="w-25">
                                <div className="d-flex flex-row justify-content-between">
                                    <Modifier item={item} charger={charger}/>
                                    <button type="button" className="btn btn-outline-danger" onClick={(e) => { supprimer(item.login) }}>
                                        Supprimer
                                    </button>
                                </div>
                            </th>
                        </tr>
                    ))
                }

            </tbody>
        </>
    )
}

function GestionUtilisateurs() {
    const [data, setData] = useState([]);
    const { token } = useContext(TokenContext);
    const chargement = () => {
        api.get("/userservice/users", {
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
                console.log(error);
                // Navigate({to: ""})
            })
    }
    useEffect(() => {
        chargement();
    }, [])
    return (
        <>
            <div className="pagetitle">
                <h1>GESTION DES UTILISATEURS</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="#">Accueil</a></li>
                    </ol>
                </nav>
            </div>

            <section className="section">
            <div className='row'>
                    {/* <div className='col-1'></div> */}
                    <div className='col-10'></div>
                    <div className='col-2 d-flex justify-content-end'><button className='btn btn-primary' onClick={(e) => { chargement() }}>Actualiser</button></div>
                </div>
                <br />
                <div className="row">
                    <div className="col-lg-10 mx-auto">

                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Liste des utilisateurs</h5>
                                <div className='row col-3 mb-2'>

                                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#basicModal">
                                        Ajouter un compte
                                    </button>
                                    <div className="modal fade" id="basicModal" tabindex="-1">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title">Entrer les informations du compte</h5>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    <AjouterUtilisateur />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <table className="table datatable">
                                    <thead>
                                        <tr>
                                            <th >Nom</th>
                                            <th >Prénom</th>
                                            <th >Role</th>
                                            <th >Etat</th>
                                            <th className="w-25">Action</th>
                                        </tr>
                                    </thead>
                                    <TBody table={data} charger={chargement} />
                                </table>

                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default GestionUtilisateurs;