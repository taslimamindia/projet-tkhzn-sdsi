import React, { useContext, useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import api from '../../../api';
import TokenContext from '../../context/TokenContext';

export function Affecter({code, aff, fetch}) {
    const { token, updateToken } = useContext(TokenContext);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        const type = data.aff.split('|')[1];
        console.log(code);
        api.post("/affectationservice/addAffe", code, {
            headers: {
                'Content-Type': 'application/text',
                'Authorization': 'Bearer ' + token,
            }
        })
        .then(res => {
            if (res.status === 200) {
                alert("Enregistrement effecteur avec succès");
                fetch();
            }
            else {
                window.alert("Une erreur sait produit !!!");
            }
        })
        .catch(function (error) {
            console.log(error);
            // Navigate({to: ""})
        })
    }
    
    let [datas, setDatas] = useState([]);
    useEffect(() => {
        // const fetchData = async (data) => {
        //     const res = await api.post("/affectationservice/", data.id, {
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': 'Bearer ' + token,
        //         }
        //     })
        //     if (res.status === 200) {
        //         console.log(res.data);
        //     }
        //     else {
        //         console.log("Une erreur sait produit !!!");
        //     }
        // }
        // const data = {
        //     "id":"1"
        // }
        // fetchData(data);
    }, [])

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row mb-3">
                    <label for="inputText" className="col-sm-10 col-form-label">
                        <span className="badge border-primary border-1 text-primary">Personnel/département</span>
                    </label>
                    <div className="col-sm-10">
                        { aff !== [] &&
                            <select {...register("aff")} className="form-select" data-live-search="true">
                                <option key={"choix"}>Choix</option>
                                {
                                    aff.dep.map(item => {
                                        return <option key={item.id} value={item.id + "|dep"}>{item.nomDep}</option>
                                    })
                                }
                                {
                                    aff.pers.map(item => {
                                        return <option key={item.login} value={item.login + "|pers"}>{item.nom}</option>
                                    }) 
                                }
                            </select>
                        }
                        <input type="hidden" {...register("code")} defaultValue={code}/>
                    </div>
                </div>
                <div className="row mb-3">
                    <label className="col-sm-10 col-form-label"><span className="badge border-primary border-1 text-primary">Quantité demandée:</span> 5 </label>
                </div>
                <div className="row mb-3">
                    <label className="col-sm-10 col-form-label"><span className="badge border-primary border-1 text-primary">Quantité livrée:</span> 20</label>
                </div>
                <div className="row mb-3">
                    <label for="inputNumber" className="col-sm-10 col-form-label"><span className="badge border-primary border-1 text-primary">Quantité à affecter</span></label>
                    <div className="col-sm-10">
                        <input type="number" className="form-control" />
                    </div>
                </div>
                <div className="row mb-3 d-f">
                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Affecter</button>
                </div>
            </form>
        </>
    )
}


function RessourcesLivrees() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const cadetblue = { color: "cadetblue" }

    const { token, updateToken } = useContext(TokenContext);
    const [data, setData] = useState([]);
    const [affectations, setAffectations] = useState([]);
    const fetchData = async () => {
        const aff = await api.get("/affectationservice/listaffectations", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        })
        if (aff.status === 200) {
            setAffectations(aff.data);
        } else {
            window.alert("Une erreur sait produit !!!");
        }

        const res = await api.get("/ressourceservice/ListLiv", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        })
        if (res.status === 200) {
            setData(res.data);
        }
        else {
            console.log("Une erreur sait produit !!!");
        }
    }
    useEffect(() => {
        fetchData();
    }, [])
    // const datat = {
    //     data: [
    //          {
    //            code: 20,
    //            type: "Ordinateur",
    //            personnels: [
    //                {
    //                    "login":"zahi",
    //                    "nom": "Zahi",
    //                    qte: 1
    //                },
    //                {
    //                    login: "diallo",
    //                    "nom": "Diallo",
    //                    qte: 2
    //                }
    //            ],
    //            departements: [
    //                {
    //                 id: 1,
    //                 nom: "Info",
    //                 qte: 2
    //                },
    //                {
    //                    id: 2,
    //                    nom: "Math",
    //                    qte: 3
    //                }
    //            ]
    //          }
    //      ]
    //  }
    return (
        <React.Fragment>
            <div className="pagetitle">
                <h1>Réssource livrer</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="index.html">Accueil</a></li>
                        <li className="breadcrumb-item">Ressources livrées</li>
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
                                            <th scope="col">Code</th>
                                            <th scope="col">Ressource</th>
                                            <th scope="col">action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            data.map(item => {
                                                let i = 0;
                                                return (
                                                    <tr>
                                                        <th key={item.code+"1"} scope="row">{item.code}</th>
                                                        <td key={item.code + "2"}>
                                                            {String(item.code).startsWith("I") ? "Imprimante": "Ordinateur"}
                                                        </td>
                                                        <td key={item.code + "6"}>
                                                            <button type="button" className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target={"#aff1" + item.code}>Affecter</button>
                                                            <div className="modal fade" id={"aff1" + item.code} tabindex="-1">
                                                                <div className="modal-dialog">
                                                                    <div className="modal-content">
                                                                        <div className="modal-header">
                                                                            <h5 className="modal-title">Demandé par :</h5>
                                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                        </div>
                                                                        <div className="modal-body">
                                                                            <Affecter code={item.code} aff={affectations} fetch={fetchData} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
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