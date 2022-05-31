import React, { useContext, useEffect, useState } from 'react'
import api from '../../../api';
import TokenContext from '../../context/TokenContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

function Imprimante({ item, id }) {
    const color1 = { color: "rgb(75, 168, 164)" }
    return (
        <>
            <a className="text-warning" data-bs-toggle="modal" data-bs-target={"#basicModal" + item.id +id}>
                Voir Plus
            </a>
            <div className="modal fade" id={"basicModal" + item.id +id} tabindex="-1">
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

function Ordinateur({ item, id }) {
    const color2 = { color: "color: aqua" }
    return (
        <>
            <a className='text-info' data-bs-toggle="modal" data-bs-target={"#ressource1" + item.id +id}>Voir Plus</a>
            <div className="modal fade" id={"ressource1" + item.id +id} tabindex="-1">
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

function Panne({ item, type }) {
    
    return (
        <>
            <a href="voir-plus" data-bs-toggle="modal" data-bs-target={"#panne" + item.id}>Détails</a>
            <div className="modal fade" id={"panne" + item.id} tabindex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Information de la panne</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <div className="col-10">
                                <label for="description" className="form-label"><b>Description</b></label>
                                <p>{item.explication}</p>
                            </div>
                            <div className="col-10">
                                <label for="frequence" className="form-label"><b>Fréquence</b></label>
                                <p>{item.frequence}</p>
                            </div>
                            {type === "ordinateur" ?
                                <div className="col-10">
                                    <label for="ordre" className="form-label"><b>Ordre</b></label>
                                    <p>{item.ordre}</p>
                                </div>
                                :
                                <></>
                            }

                            <br />
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

function Tr({ item, loading }) {
    const { token, stompClient } = useContext(TokenContext);

    const sendPrivateMessage = (data) => {
        console.log("send private");
        if (stompClient) {
            var chatMessage = {
                sendername: data.username,
                receivername: data.receivername,
                message: data.message,
                status: "MESSAGE"
            };
            stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
            return true
        } else {
            return false;
        }
    }
    const envoiConstat = (code) => {
        console.log(code);
        api.post("/panneservice/envConstat", { "code": code }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        }).then(res => {
            if (res.status === 200) {
                var chatMessage = {
                    sendername: "karim",
                    receivername: "khadija",
                    message: "Constat provenant des services de maintance. Consultez vos les constats",
                    status: "MESSAGE"
                };
                if(sendPrivateMessage(chatMessage)) {
                    toast.success("Le constat est envoyé avec nofification", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 5000,
                        theme: "colored"
                    });
                }
                else {
                    toast.warning("Le constat est envoyé sans notification, erreur de reseau.", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 5000,
                        theme: "colored"
                    });
                }
                loading();
            }
            else {
                toast.error("🤦🏿‍♂️ Une error est survenue 🙆‍♀️!!!", {
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

    return (
        <>
            <tr>
                <td>{item.uti.nom} &nbsp; {item.uti.prenom}</td>
                <td>{item.dep.nomDep}</td>
                <td>
                    {item.ord === null ?
                        <Imprimante item={item.imp} id={item.panne.id} />
                        :
                        <Ordinateur item={item.ord} id={item.panne.id} />
                    }
                </td>

                <td>
                    {item.ord === null ?
                        <Panne item={item.panne} type={"imprimante"} />
                        :
                        <Panne item={item.panne} type={"ordinateur"} />
                    }
                </td>
                <td>{item.panne.dateApp}</td>
                <td> 
                    {item.panne.traiter === true? <span class="badge border-success border-1 text-success">Traitée</span>: <button type="button" className="btn btn-outline-info" onClick={(e) =>{envoiConstat(item.panne.id)}}>Envoyer</button>}
                </td>
            </tr>
        </>
    )
}

function ListerPanne() {
    const { token } = useContext(TokenContext);
    const [data, setData] = useState([]);

    const loading = () => {
        api.get("/panneservice/getPanne", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        }).then(res => {
            if (res.status === 200) {
                setData(res.data);
                console.log(res.data);
            }
            else {
                toast.error("🤦🏿‍♂️ Une error est survenue côté server 🙆‍♀️!!!", {
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
    useEffect(() => {
        loading();
    }, []);

    return (
        <>
            <div className="pagetitle">
                <h1>Lister Pannes</h1>
            </div>
            
            <section className="section">
                <div className='row'>
                    {/* <div className='col-1'></div> */}
                    <div className='col-10'></div>
                    <div className='col-2 d-flex justify-content-end'><button className='btn btn-primary' onClick={(e) => {loading()}}>Actualiser</button></div>
                </div>
                <br />
                <div className="row">
                    <div className="col-lg-12">

                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Envoyer Constat</h5>
                                <table className="table datatable">
                                    <thead>
                                        <tr>
                                            <th>Personne du département</th>
                                            <th>Département</th>
                                            <th>Ressource</th>
                                            <th>Panne</th>
                                            <th>Date de la panne</th>
                                            <th>Constat</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data.map(item => {
                                                return(
                                                    <Tr item={item} loading={loading} />
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

export default ListerPanne;