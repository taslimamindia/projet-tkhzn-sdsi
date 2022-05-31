import React, { useContext, useEffect, useState } from 'react';
import api from '../../../api';
import TokenContext from '../../context/TokenContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

function Imprimante({ item, idc }) {
    const color2 = { color: "color: aqua" };
    return (
        <>
            <a className="text-warning" data-bs-toggle="modal" data-bs-target={"#basicModal" + item.id + idc}>
                Voir Plus
            </a>
            <div className="modal fade" id={"basicModal" + item.id + idc} tabindex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Caractéristiques de L'imprimante</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p> <b style={color2}>RESOLUTION {item.id} : {item.resolution}</b></p>
                            <p> <b style={color2}>VITESSE: {item.vitesse}</b></p>
                            <p> <b style={color2}>MARQUE: {item.marque}</b></p>
                            {/* <!-- if Ressource est affecté afficher la date d'affectation */}
                            {/* <p><b style={color2}>Date d'affectation : </b>13-04-2022</p> */}
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

function Ordinateur({ item, idc }) {
    const color1 = { color: "rgb(75, 168, 164)" }
    return (
        <>
            <a className='text-info' data-bs-toggle="modal" data-bs-target={"#ordinateur" + item.id + idc}>Voir Plus</a>
            <div className="modal fade" id={"ordinateur" + item.id + idc} tabindex="-1">
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
                            {/* &lt;!&ndash; if Ressource est affecté afficher la date d'affectation&ndash;&gt; */}
                            {/* <p><b style={color1}>Date d'affectation : </b>13-04-2022</p> */}
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

function Panne({ item, type }) {
    return (
        <>
            <a href="voir-plus" data-bs-toggle="modal" data-bs-target={"#panne" + item.idC}>Détails</a>
            <div className="modal fade" id={"panne" + item.idC} tabindex="-1">
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

function Constat({ item }) {
    return (
        <>
            <a href="voir-plus" data-bs-toggle="modal" data-bs-target={"#constat" + item.idC}>Constat</a>
            <div className="modal fade" id={"constat" + item.idC} tabindex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Information du constat</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <div className="col-10">
                                <label for="description" className="form-label"><b>Constat</b></label>
                                <p>{item.constat}</p>
                            </div>
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

function ListerConstat() {
    const { token, username, stompClient } = useContext(TokenContext);
    const [data, setData] = useState([]);

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
    const sendMail = (code) => {
        api.post("/panneservice/sendMail", { "code": code }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        }).then(res => {
            if (res.status === 200) {
                toast.success("Le mail est envoyé avec succès", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                    theme: "colored"
                });
                loading();
            }
            else {
                toast.error("🤦🏿‍♂️ Une error est survenue 8 🙆‍♀️!!!", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 10000,
                    theme: "colored"
                })
            }
        }).catch(function (error) {
            toast.error("🤦🏿‍♂️ Une error est survenue côté server 9 🙆‍♀️!!!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 10000,
                theme: "colored"
            })
        })
    }
    const reparerEtat = (code) => {
        api.post("/panneservice/reparer", { "code": code }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        }).then(res => {
            if (res.status === 200) {
                toast.success("La notification a été envoyer avec succès", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                    theme: "colored"
                });
                loading();
            }
            else {
                toast.error("🤦🏿‍♂️ Une error est survenue 5 🙆‍♀️!!!", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 10000,
                    theme: "colored"
                })
            }
        }).catch(function (error) {
            toast.error("🤦🏿‍♂️ Une error est survenue 6 🙆‍♀️!!!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 10000,
                theme: "colored"
            })
        })
    }
    const reparer = (idC) => {
        console.log("reparer", idC);
        api.get("/userservice/users", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        }).then(res => {
            if (res.status === 200) {
                let vrai = false;
                for (let [k, v] of Object.entries(res.data)) {
                    if (v.role === "MAINTENANCE" && v.active === true) {

                        let msg = {
                            sendername: username,
                            receivername: v.login,
                            message: "Bonjour, veuillez réparez la panne qui à le constat numéro " + idC + ".",
                            status: "MESSAGE"
                        }
                        console.log(msg);
                        vrai = sendPrivateMessage(msg);
                    }
                }
                if (vrai) {
                    reparerEtat(idC);
                    loading();
                } else {
                    toast.error("🤦🏿‍♂️ Une error est survenue la notification n'a pas été envoyé 2 🙆‍♀️!!!", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 10000,
                        theme: "colored"
                    })
                }
            }
            else {
                toast.error("🤦🏿‍♂️ Une error est survenue dans la rêquete 🙆‍♀️!!!", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 10000,
                    theme: "colored"
                })
            }
        }).catch(function (error) {
            console.log(error);
            // Navigate({to: ""})
        })
    }

    const loading = () => {
        api.get("/panneservice/getConstats", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        }).then(res => {
            if (res.status === 200) {
                // console.log();
                if(res.data !== [] && res.data !==undefined)
                    {
                        let dt = []
                        const d = res.data;
                        for(let [k, v] of Object.entries(d)) {
                            dt.push(v)
                            console.log("idallfd", v.imp, v.ord);
                        }
                        setData(dt);
                    }
                    
                else setData([]);
            }
            else {
                toast.error("🤦🏿‍♂️ Une error est survenue côté server 1 🙆‍♀️!!!", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 10000,
                    theme: "colored"
                })
            }
        }).catch(function (error) {
            toast.error("🤦🏿‍♂️ Une error est survenue côté server 10 🙆‍♀️!!!", {
                position: toast.POSITION.TOP_RIGHT,
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
                <h1>Lister Constats</h1>
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
                                    <table className="table datatable">
                                        <thead>
                                            <tr>
                                                <th>Constat</th>{/* <!-- id--> */}
                                                <th >Ressource</th>
                                                <th >Panne</th>
                                                <th>Date de la panne</th>
                                                <th >Décision</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                data.map(it => {
                                                    console.log(it);
                                                    return (
                                                        <tr>
                                                            <td>
                                                                <Constat item={it} />
                                                            </td>
                                                            <td>
                                                                
                                                                {it.type === "imprimante" ?
                                                                    <Imprimante item={it.imp} idc={it.idC} />
                                                                    :
                                                                    <Ordinateur item={it.ord} idc={it.idC} />
                                                                }
                                                            </td>

                                                            <td>
                                                                {it.type === "imprimante"?
                                                                    <Panne item={it} type={"imprimante"} />
                                                                    :
                                                                    <Panne item={it} type={"ordinateur"} />
                                                                }
                                                            </td>

                                                            <td>
                                                                {it.dateApp}
                                                            </td>

                                                            <td>
                                                                {
                                                                    it.traiter === false &&
                                                                    <button type="button" className="btn btn-outline-primary btn-sm" onClick={(e) => { reparer(it.idC) }}>Réparer</button>
                                                                }

                                                                {
                                                                    it.traiter === false && 
                                                                    <button type="button" className="btn btn-outline-warning btn-sm" onClick={(e) => { sendMail(it.idC) }}>Changer</button>
                                                                }

                                                                {it.traiter === true ?
                                                                    <span className="badge border-success border-1 text-success">Traitée</span>
                                                                    :
                                                                    <span className="badge border-danger border-1 text-danger">Non traitée</span>
                                                                }
                                                            </td>

                                                        </tr>
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

export default ListerConstat;
