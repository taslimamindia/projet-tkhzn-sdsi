import React, { useContext, useEffect, useState } from 'react'
import api from '../../../api'
import TokenContext from '../../context/TokenContext'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
toast.configure();

function Details({ data }) {
    return (
        <>
            <a href="#" data-bs-toggle="modal" data-bs-target={"#detail" + data.groupe}>
                Voir plus
            </a>
            <div className="modal fade" id={"detail" + data.groupe} tabindex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Offre</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">Ressource</th>
                                            <th scope="col">Prix Unitaire (Dirhams)</th>
                                            <th scope="col">Duréé de Garantie (ans)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data.map(item => {
                                                return (
                                                    <tr>
                                                        <td>
                                                            {item.type === 'ordinateur' ?
                                                                // <div class="btn-group">
                                                                //     <button type="button" class="btn btn-info">Ordinateur</button>
                                                                //     <button type="button" class="btn btn-info dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                //         <span class="sr-only">Toggle Dropdown</span>
                                                                //     </button>
                                                                //     <div class="dropdown-menu">
                                                                //         <div class="dropdown-item" href="#">Action</div>
                                                                        
                                                                //     </div>
                                                                // </div>
                                                                <button type="button" className="btn btn-info" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="right" data-bs-content="Right popover">
                                                                    {item.type}
                                                                </button>
                                                                :
                                                                <button type="button" className="btn btn-info" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="right" data-bs-content="Right popover">
                                                                    {item.type}
                                                                </button>
                                                            }
                                                        </td>
                                                        <td>{item.prix_unit}</td>
                                                        <td>{item.duree_garantie}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
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

function Tr({ item }) {
    const { token, stompClient, username } = useContext(TokenContext);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const sendPrivateMessage = (data) => {
        console.log("send private");
        if (stompClient) {
            var chatMessage = {
                sendername: username,
                receivername: data.receivername,
                message: data.message,
                status: "MESSAGE"
            };
            stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
        }
    }
    const choisir = (code) => {
        api.post("/demandeservice/choixOffre", { "fournisseur": code }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        }).then(res => {
            if (res.status === 200) {
                sendPrivateMessage({ "receivername": code, "message": "Vous avez été selectionner pour l'offre auquel vous avez soumis, merci de respecter la livraison à temps." });
                toast.success("Le choix a été éffectuer avec succès.", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                    theme: "colored"
                });
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
    const onSubmit = (data) => {
        sendPrivateMessage({ "receivername": data.login, "message": data.message });
        toast.success("Le fournisseur a été notifier avec succès.", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
            theme: "colored"
        });
        reset();
    }
    return (
        <tr>
            <td>{String(item.fournisseur.login).toUpperCase()}</td>
            <td>{item.prix_total}</td>
            <td>
                <Details data={item.offreResponses} />
            </td>
            <td>
                {item.fournisseur.evaluation === 2 ?
                    <span className="badge bg-success">Trés Bon Service</span>
                    :
                    <>
                        {item.fournisseur.evaluation === 1 ?
                            <span className="badge bg-danger">Mauvais Service</span>
                            :
                            <span className="badge bg-info">Aucune évaluation</span>
                        }
                    </>
                }
            </td>
            <td>
                <button type="button" className="btn btn-outline-success btn-sm" onClick={(e) => {
                    if (window.confirm("Vous confirmez le choix de cette offre ?")) {
                        choisir(item.fournisseur.login)
                    }
                }}>
                    Accepter
                </button>
                <button type="button" className="btn btn-outline-danger btn-sm" data-toggle="modal" data-target={"#reject" + item.fournisseur.login}>
                    Refuser
                </button>
                <div className="modal fade" id={"reject" + item.fournisseur.login} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header float-right">
                                    <h5>Notification sur les motifs d'élimination</h5>
                                    <div className="text-right"> <i data-dismiss="modal" aria-label="Close" className="fa fa-close"></i> </div>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <input type="hidden" {...register("login")} defaultValue={item.fournisseur.login} />
                                        <label for="message-text" className="col-form-label">Motif d'élimination:</label>
                                        <textarea {...register("message")} className="form-control" id="message-text"></textarea>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-primary" >Envoyer</button>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </td>
        </tr>
    )
}

function Offre() {
    const { token } = useContext(TokenContext);
    const [data, setData] = useState([]);

    const loading = () => {
        api.get("/demandeservice/listerOffres", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        }).then(res => {
            if (res.status === 200) {
                setData(res.data);
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
                <h1>Liste des Offres</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">Liste des Offres</li>
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
                                <table className="table datatable">
                                    <thead>
                                        <tr>
                                            <th scope="col">Fournisseur</th>
                                            <th scope="col">Prix Total</th>
                                            <th scope="col">Details Offre</th>
                                            <th scope="col">Evaluation</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data.map(item => {
                                                return (
                                                    <Tr item={item} />
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

export default Offre;