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
            <a href="voir plus" data-bs-toggle="modal" data-bs-target={"#basicModal" + item.code}>
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
                            <p> <b style={color1}>RESOLUTION : {item.resolution}</b></p>
                            <p> <b style={color1}>VITESSE: {item.vitesse}</b></p>
                            <p> <b style={color1}>MARQUE: {item.marque}</b></p>
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
    const color2 = { color: "color: aqua" }
    return (
        <>
            <a href="voir plus" data-bs-toggle="modal" data-bs-target={"#ressource1" + item.code}>Ordinateur</a>
            <div className="modal fade" id={"ressource1" + item.code} tabindex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Caractéristiques du PC</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p><b className="">CPU : </b>{item.cpu}</p>
                            <p><b className="">RAM : </b>{item.ram}</p>
                            <p><b className="">Disque : </b>{item.disque_d}</p>
                            <p><b className="">Ecran : </b>{item.ecran}</p>
                            <p><b className="">Marque : </b>{item.marque}</p>
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

function Tr({ data, supprimer, checker, checks }) {
    const color1 = "color: cadetblue;";
    const [check, setCheck] = useState(checks[data.code]);

    const checkerlocal = (e) => {
        setCheck(!check);
        checker(e);
    }

    return (
        <>
            <tr>
                <td>
                    <input type="checkbox" checked={check} name={"check" + data.code} onClick={(e) => { checkerlocal(data.code) }} />
                </td>
                <td>{data.personnel}</td>
                <td>
                    {data.type === "ordinateur" ? <Ordinateur item={data.ord} /> : <Imprimante item={data.imp} />}
                </td>

                <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {data.type === "ordinateur" ? data.ord.qteD : data.imp.qteD}
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

function Listesdesdemandes({ recharge }) {
    const { token } = useContext(TokenContext);
    const [data, setData] = useState();
    let checks = {};

    const checker = (e) => {
        checks[e] = !checks[e];
    }

    const envoidemande = () => {
        let donnee = []
        Object.keys(checks).map(item => {
            donnee.push({ "code": item, "check": checks[item] })
        })
        console.log(donnee);
        api.post("/demandeservice/envoiDemande", donnee, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        })
            .then(res => {
                if (res.status === 200) {
                    toast.success("Votre demande a été envoyer avec succès.", {
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

    const loading = () => {
        api.get("/demandeservice/listerBesoins", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        })
            .then(res => {
                if (res.status === 200) {
                    setData(res.data);
                    console.log(res.data);
                }
                else {
                    window.alert("Utilisateur ou mot de passe incorrect !!!");
                }
            })
            .catch(function (error) {

            })
    }

    const supprimer = (e, code) => {
        console.log(code);
        api.post("/demandeservice/supprimeDemande/", String(code), {
            headers: {
                'Content-Type': "text/plain",
                'Authorization': 'Bearer ' + token,
            }
        })
            .then(res => {
                if (res.status === 200) {
                    window.alert("La suppression a été effectuer avec succès.")
                    loading();
                }
                else {
                    window.alert("Utilisateur ou mot de passe incorrect !!!");
                }
            })
            .catch(function (error) {

            })
    }

    useEffect(() => {
        loading();
        // console.log(data);
    }, [])

    return (
        <>
            <div className="pagetitle">
                <h1>LISTE DES DEMANDES</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to={"/ChefDepartement/"}>Listes des demandes</Link>
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
                                <br />
                                <div className="row">
                                    <div className="col-md-4"></div>
                                    <div className="col-md-8">
                                        <Link className="btn btn-primary submit-btn col-md-3" to={"/ChefDepartement/AjouterDemande"}>Ajouter une Demande</Link>
                                        <br /> <br />
                                    </div>
                                </div>
                                {data !== undefined && (Object.entries(data).length === 0) ?
                                    <div className='p-5 d-flex justify-content-center'>
                                        Aucune demande n'est effectuée.
                                    </div>
                                    :
                                    <>
                                        <table className="table datatable">
                                            <thead>
                                                <tr>
                                                    <th scope="col">  &nbsp;&nbsp;</th>
                                                    <th scope="col">Personne de Departement</th>
                                                    <th scope="col">Ressource  &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;</th>
                                                    <th scope="col">Quantite Demandée &nbsp;&nbsp;</th>
                                                    <th scope="col">Options</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data !== undefined &&
                                                    data.map(item => {
                                                        if (checks[item.code] === undefined) checks[item.code] = true;
                                                        return (<Tr data={item} recharge={loading} supprimer={supprimer} checker={checker} checks={checks} />)
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                        <div className="row">
                                            <div className="col-12">
                                                <button className="btn btn-primary submit-btn" type="button" onClick={(e) => { envoidemande(e) }}  >Envoyer</button>
                                            </div>
                                        </div>
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

export default Listesdesdemandes;