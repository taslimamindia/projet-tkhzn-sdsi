import React, { useContext, useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import api from '../../../api';
import TokenContext from '../../context/TokenContext';


function Affecter({ id, dep, deps, qtedispo, code }) {
    // const { token, updateToken } = useContext(TokenContext);
    // const { register, handleSubmit, reset, formState: { errors } } = useForm();
    let qteAffecter = 0;
    let pers_qte = {};
    let pers_qte_current = {};

    const initialise = () => {
        deps[dep].map(item => {
            if(isNaN(pers_qte[item.login])) {
                pers_qte[item.login] = item.qte;
                if (isNaN(pers_qte[dep])) {
                    pers_qte[dep] = 0
                    pers_qte_current[dep] = 0
                }
                pers_qte[dep] = parseInt(pers_qte[dep]) + parseInt(item.qte);
                pers_qte_current[item.login] = 0;
            }
            return <option key={item.login} value={item.login}>{item.nom}</option>
        })
    }

    const charger_value = (e) => {
        const v = e.target.value
        var affecter = document.querySelector("#affecter")
        var qte = document.querySelector("#qte"+code+id)
        var qtedemander = document.getElementById('qtedemander' + code + id)
        // console.log(document.getElementById('qtedemander' + code + id));
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
        // const value = parseInt(e.target.value);
        // const different = value - pers_qte_current[currentSelect];
        // console.log(value, different);

        // if(different >= 0) {
        //     if(qteAffecter + different <= qtedispo) {
        //         setQteCurrent(value);
        //         pers_qte_current[currentSelect] = value;
        //         qteAffecter = qteAffecter + different
        //         console.log("diallo", pers_qte_current);
        //     }
        // }
        // else {
        //     if(qteAffecter + different >= 0) {
        //         setQteCurrent(value);
        //         pers_qte_current[currentSelect] = value;
        //         qteAffecter = qteAffecter + different
        //         console.log("bah", pers_qte_current);
        //     }
        // }
        // console.log("total affecter: ", qteAffecter);
    }

    // const onSubmit = (data) => {
    //     const type = data.aff.split('|')[1];
    //     console.log(code);
    //     api.post("/affectationservice/addAffe", code, {
    //         headers: {
    //             'Content-Type': 'application/text',
    //             'Authorization': 'Bearer ' + token,
    //         }
    //     })
    //         .then(res => {
    //             if (res.status === 200) {
    //                 alert("Enregistrement effecteur avec succès");
    //                 fetch();
    //             }
    //             else {
    //                 window.alert("Une erreur sait produit !!!");
    //             }
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //             // Navigate({to: ""})
    //         })
    // }

    // let [datas, setDatas] = useState([]);
    
    useEffect(() => {
        initialise();
        // const fetchData = async (data) => {
        //     //     const res = await api.post("/affectationservice/", data.id, {
        //     //         headers: {
        //     //             'Content-Type': 'application/json',
        //     //             'Authorization': 'Bearer ' + token,
        //     //         }
        //     //     })
        //     //     if (res.status === 200) {
        //     //         console.log(res.data);
        //     //     }
        //     //     else {
        //     //         console.log("Une erreur sait produit !!!");
        //     //     }
        //     // }
        //     // const data = {
        //     //     "id":"1"
        // }
        // fetchData(data);
    }, [])

    return (
        <>
            <button id={"btn" + id} hidden={true} type="button" className="btn btn-outline-primary btn-sm" data-toggle="modal" data-target={"#aff1" + id}>Affecter</button>
            <div className="modal fade" id={"aff1" + id} tabindex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Département {dep} :</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form >
                                <div className="row mb-3">
                                    <label for="inputText" className="col-sm-10 col-form-label">
                                        <span className="badge border-primary border-1 text-primary">Personnel/département</span>
                                    </label>
                                    <div className="col-sm-10">
                                        <select className="form-select" onChange={(e) => { charger_value(e) }}>
                                            <option selected value={"choix"}>Choix</option>
                                            <option value={dep}> Département {dep}</option>
                                            {
                                                deps[dep].map(item => {
                                                    return <option value={item.login}>{item.nom}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-sm-10 col-form-label"><span className="badge border-primary border-1 text-primary">Quantité demandée:</span> <span id={'qtedemander' + code + id}>aucun</span> </label>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-sm-10 col-form-label"><span className="badge border-primary border-1 text-primary">Quantité livrée:</span> {qtedispo} </label>
                                </div>
                                <div className="row mb-3">
                                    <label for="inputNumber" className="col-sm-10 col-form-label"><span className="badge border-primary border-1 text-primary">Quantité à affecter</span></label>
                                    <div className="col-sm-10">
                                        <input hidden={true} type="number" id={"qte" + code + id} className="form-control" onChange={(e) => { calculer(e); }} />
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
            {/* onSubmit={handleSubmit(onSubmit)} */}
        </>
    )
}

function Tr({ item }) {
    let deps = { "choix": [] };
    const changer = (e) => {
        const value = e.target.value
        const btns = document.querySelectorAll("#td" + item.code + " > button")
        btns.forEach(function(item) { item.hidden = true })
        if (value !== "choix") {
            document.getElementById("btn" + value).hidden = false
        }
    }
    // useEffect(() => {
    //     const fetchData = () => {
    //         item.departements.map(item => {
    //             console.log(item.nom);

    //         })
    //         console.log(deps);
    //     }
    //     fetchData();
    // }, [])
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
                                    deps[it.nom] = it.personnels;
                                    return <option key={it.id} value={it.nom}>{it.nom}</option>
                                })
                            }
                        </select>
                    }
                </th>
                <td id={"td" + item.code}>
                    {
                        item.departements.map(it => {
                            return <Affecter id={it.nom} dep={it.nom} deps={deps} qtedispo={item.qte} code={item.code} />
                        })
                    }

                </td>
            </tr>
        </>
    )
}

function RessourcesLivrees() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const cadetblue = { color: "cadetblue" }
    const datat = {
        data: [
            {
                nom: "hp 8g",
                code: 20,
                type: "Ordinateur",
                qte: 50,
                departements: [
                    {
                        id: 1,
                        nom: "Info",
                        qte: 2,
                        personnels: [
                            {
                                "login": "zahi",
                                "nom": "Zahi",
                                "qte": 1
                            },
                            {
                                "login": "diallo",
                                "nom": "Diallo",
                                "qte": 2
                            }
                        ]
                    },
                    {
                        id: 2,
                        nom: "Math",
                        qte: 3,
                        personnels: [
                            {
                                "login": "bah",
                                "nom": "bah",
                                "qte": 5
                            },
                            {
                                "login": "sylla",
                                "nom": "Sylla",
                                "qte": 4
                            }
                        ]
                    }
                ]
            }
        ]
    }

    const { token, updateToken } = useContext(TokenContext);
    const [data, setData] = useState([]);
    const [affectations, setAffectations] = useState([]);

    const fetchData = async () => {
        // const aff = await api.get("/affectationservice/listaffectations", {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': 'Bearer ' + token,
        //     }
        // })
        // if (aff.status === 200) {
        //     setAffectations(aff.data);
        // } else {
        //     window.alert("Une erreur sait produit !!!");
        // }

        // const res = await api.get("/ressourceservice/ListLiv", {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': 'Bearer ' + token,
        //     }
        // })
        // if (res.status === 200) {
        //     setData(res.data);
        // }
        // else {
        //     console.log("Une erreur sait produit !!!");
        // }
    }

    // useEffect(() => {
    //     setData(datat);
    //     fetchData();
    // }, [])

    return (
        <React.Fragment>
            <div className="pagetitle">
                <h1>Réssource livrer</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="index.html">Accueil</a></li>
                        <li className="breadcrumb-item">Ressources livrées</li>
                        <li className="breadcrumb-item"><input type="hidden" id={"affecter"} value="-1" /></li>
                    </ol>
                </nav>
            </div>
            {/* <!-- End Page Title --> */}

            <section className="section">
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
                                            datat.data.map(item => {
                                                let i = 0;
                                                return (
                                                    <Tr item={item} />
                                                )
                                            })
                                        }

                                    </tbody>
                                </table>
                                {/* <!-- End Table with stripped rows --> */}

                            </div>
                        </div>

                    </div>
                </div>
            </section>

        </React.Fragment>
    )
}

export default RessourcesLivrees;