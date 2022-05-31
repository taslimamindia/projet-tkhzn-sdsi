import React, { useContext, useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import api from '../../../api';
import TokenContext from '../../context/TokenContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

function Affecter({ actualiser, id, nomdep, deps, qtedispo, code, qteDep }) {
    const { token } = useContext(TokenContext);
    let qteAffecter = 0;
    let pers_qte = {};
    let pers_qte_current = {}; 

    const initialise = () => {
        if(isNaN(pers_qte[id])) {
            pers_qte[id] = qteDep; 
            pers_qte_current[id] = 0;
        }
        deps[id].map(item => {
            if(isNaN(pers_qte[item.login])) {
                pers_qte[item.login] = item.qte;
                pers_qte_current[item.login] = 0;
            }
            return <option key={item.login} value={item.login}>{item.nom}</option>
        })
    }

    const charger_value = (e) => {
        const v = e.target.value
        var affecter = document.querySelector("#affecter")
        var qte = document.querySelector("#qte" + code + "" +id)
        var qtedemander = document.getElementById('qtedemander' + code + "" + id)
        if(v === "choix") {
            qtedemander.textContent  = "aucun"
            qte.hidden = true;
        }
        else {
            qtedemander.textContent  = pers_qte[v]
            affecter.value = v;
            qte.value = pers_qte_current[v];
            qte.hidden = false;
        }
    }

    const calculer = (e) => {
        var affecter = document.querySelector("#affecter")
        var qte = document.querySelector("#qte"+code+id)
        if (affecter.value !==  "choix") {
            const qteNew = parseInt(qte.value)
            const qteOld = parseInt(pers_qte_current[affecter.value])
            if (qteNew >= 0) {
                if (qteNew < qteOld) {
                    qteAffecter = qteAffecter - (qteOld - qteNew);
                    pers_qte_current[affecter.value] = qteNew;
                }
                else if ((qteNew > qteOld) && (qtedispo >= (qteAffecter + (qteNew - qteOld)))) {
                    qteAffecter = qteAffecter + (qteNew - qteOld);
                    pers_qte_current[affecter.value] = qteNew;
                }
                else {
                    qte.value = pers_qte_current[affecter.value]
                }
            }
            else {
                qte.value = pers_qte_current[affecter.value]
            }
        }
        else {
            qte.value = pers_qte_current[affecter.value]
        }
    }

    const valider = (e) => {
        let donnees = [];
        Object.keys(pers_qte_current).map(item => {
            if(pers_qte_current[item] !== 0) {
                if(String(item) === String(id)) {
                    donnees.push({"ressource": code, "pers_dep": null, "dep": id, "qte": pers_qte_current[id]});
                    return null
                }
                else {
                    donnees.push({"ressource": code, "pers_dep": item, "dep": null, "qte": pers_qte_current[item]});
                    return null
                }
            }            
        })
        api.post("/affectationservice/addAffe", donnees, {
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
            toast.error("Une error est survenue, l'affectation n'a pas aboutie !!!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 10000,
                theme: "colored"
            });
        })
    }
    
    useEffect(() => {
        initialise();    
    }, [])

    return (
        <>
            <button id={"btn" + code + "" + id} hidden={true} type="button" className="btn btn-outline-primary btn-sm" data-toggle="modal" data-target={"#aff1" + code + "" + id}>Affecter</button>
            <div className="modal fade" id={"aff1" + code + "" + id} tabindex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Département {nomdep} :</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="row mb-3">
                                    <label for="inputText" className="col-sm-10 col-form-label">
                                        <span className="badge border-primary border-1 text-primary">Personnel/département</span>
                                    </label>
                                    <div className="col-sm-10">
                                        <select className="form-select" onChange={(e) => { charger_value(e) }}>
                                            <option selected value={"choix"}>Choix</option>
                                            {qteDep !== 0 && <option value={id}> Département {nomdep}</option>}
                                            {
                                                deps[id].map(item => {
                                                    return <option value={item.login}>{item.nom}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-sm-10 col-form-label"><span className="badge border-primary border-1 text-primary">Quantité demandée:</span> <span id={'qtedemander' + code + "" + id}>aucun</span> </label>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-sm-10 col-form-label"><span className="badge border-primary border-1 text-primary">Quantité livrée:</span> {qtedispo} </label>
                                </div>
                                <div className="row mb-3">
                                    <label for="inputNumber" className="col-sm-10 col-form-label"><span className="badge border-primary border-1 text-primary">Quantité à affecter</span></label>
                                    <div className="col-sm-10">
                                        <input hidden={true} type="number" id={"qte" + code + "" + id} className="form-control" onChange={(e) => { calculer(e); }} />
                                    </div>
                                </div>
                                <div className="row mb-3 d-f">
                                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={(e) => { valider(e); }} >Affecter</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function Tr({ item, actualiser }) {
    let deps = { "choix": [] }

    const changer = (e) => {
        const value = e.target.value
        const btns = document.querySelectorAll("#td" + item.code + " > button")
        btns.forEach(function(item) { item.hidden = true })
        if (value !== "choix") {
            document.getElementById("btn" + value).hidden = false
        }
    }

    return (
        <>
            <tr>
                <th key={item.code + "1"} scope="row">{item.type}</th>
                <th key={item.code + "2"} scope="row">{item.nom}</th>
                <th key={item.code + "3"} scope="row">{item.qte}</th>
                <th key={item.code + "4"} scope="row">
                    {item.departements !== [] &&
                        <select className="form-select" data-live-search="true" onChange={(e) => { changer(e); }}>
                            <option key={"choix"} value={"choix"}>Choix</option>
                            {
                                item.departements.map(it => {
                                    deps[it.id] = it.personnels;
                                    return <option key={item.code + "" + it.id} value={item.code + "" + it.id}>{it.nom}</option>
                                })
                            }
                        </select>
                    }
                </th>
                <td id={"td" + item.code}>
                    {
                        item.departements.map(it => {
                            return <Affecter actualiser={actualiser} id={it.id} nomdep={it.nom} deps={deps} qteDep={it.qte} qtedispo={item.qte} code={item.code} />
                        })
                    }

                </td>
            </tr>
        </>
    )
}

function RessourcesLivrees() {
    const { token } = useContext(TokenContext);
    const [data, setData] = useState([]);

    const fetchData = async () => {

        const res = await api.get("/ressourceservice/ListLiv", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        })
        if (res.status === 200) {
            setData(res.data);
        }
        else if(res.status >= 500) {
            toast.error("Une erreur sait produit au niveau du soeur !!!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 10000,
                theme: "colored"
            });
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <React.Fragment>
            <input type="hidden" id={"affecter"} value="-1" />
            <div className="pagetitle">
                <h1>RESSOURCES LIVRER</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to={"/Responsable"}>Accueil</Link>
                        </li>
                             <span>&nbsp; &gt; &nbsp;</span>
                             <li className="breadcrumb-item">
                            <Link to={"/Responsable/RessourcesLivrees"}>Ressources livrées</Link>
                        </li>
                    </ol>
                </nav>
            </div>
            {/* <!-- End Page Title --> */}

            <section className="section">
            <div className='row'>
                    {/* <div className='col-1'></div> */}
                    <div className='col-10'></div>
                    <div className='col-2 d-flex justify-content-end'><button className='btn btn-primary' onClick={(e) => { fetchData() }}>Actualiser</button></div>
                </div>
                <br />
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">

                                {/* <!-- Table with stripped rows --> */}
                                <table className="table datatable">
                                    <thead>
                                        <tr>
                                            <th scope="col">Type de ressource</th>
                                            <th scope="col">Nom</th>
                                            <th scope="col">Quantité Livré</th>
                                            <th scope="col">Département</th>
                                            <th scope="col">action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            data.map(item => {
                                                let i = 0;
                                                return (
                                                    <Tr item={item} actualiser={fetchData} />
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

        </React.Fragment>
    )
}

export default RessourcesLivrees;