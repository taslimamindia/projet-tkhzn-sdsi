import React, { useContext, useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import api from '../../../api';
import TokenContext from '../../context/TokenContext';

export function Ordinateur({ data }) {
    const cadetblue = { color: "cadetblue" }
    return (
        <>
            <a href="voir plus" data-bs-toggle="modal" data-bs-target={"#ressourceImp" + data.code}>Imprimante</a>
            <div className="modal fade" id={"ressourceImp" + data.code} tabindex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Caractéristiques: {data.marque}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p><b style={cadetblue}>CPU : </b> {data.cpu}</p>
                            <p><b style={cadetblue}>RAM : </b>{data.ram}</p>
                            <p><b style={cadetblue}>Disque : </b>{data.dd}</p>
                            <p><b style={cadetblue}>Ecran : </b>{data.ecran}</p>
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

export function Imprimante({ data }) {
    const cadetblue = { color: "cadetblue" }
    console.log(data.code);
    return (
        <>
            <a href="voir plus" data-bs-toggle="modal" data-bs-target={"#ressourceOrd" + data.code}>Ordinateur</a>
            <div className="modal fade" id={"ressourceOrd" + data.code} tabindex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Caractéristiques: {data.marque}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p><b style={cadetblue}>Marque : </b> {data.marque} </p>
                            <p><b style={cadetblue}>Résolution : </b> {data.resolution} </p>
                            <p><b style={cadetblue}>Vitesse : </b>{data.vitesse}</p>
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

function RessourcesDisponible() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const cadetblue = { color: "cadetblue" }
    // let table = {
    //     items : [
    //         {
    //             "code": "I2000",
    //             "dateLiv": "2022-04-19T15:43:31.000+00:00",
    //             "dureeGarantie": 2,
    //             "estAffecter": true,
    //             "personnels": [],
    //             "fournisseur": {
    //                 "login": "diallo",
    //                 "nom": "diallo",
    //                 "prenom": "mamadou",
    //                 "pwd": "$2a$10$yu.xsuqfE6IlN9tx4hw3Y.BvJLeZ8BjkPXFGs327Sk75OPm9zehGm",
    //                 "active": true,
    //                 "role": "ADMIN",
    //                 "ressetPasswordToken": null,
    //                 "departement": {
    //                     "id": 1,
    //                     "nomDep": "Info"
    //                 },
    //                 "mail": "ma@fes.fst",
    //                 "gerant": "Mdou",
    //                 "lieu": "fes",
    //                 "nomSocite": "fst",
    //                 "enabled": true,
    //                 "accountNonExpired": true,
    //                 "credentialsNonExpired": true,
    //                 "accountNonLocked": true,
    //                 "username": "diallo",
    //                 "password": "$2a$10$yu.xsuqfE6IlN9tx4hw3Y.BvJLeZ8BjkPXFGs327Sk75OPm9zehGm",
    //                 "authorities": [
    //                     {
    //                         "role": "ADMIN",
    //                         "authority": "ADMIN"
    //                     }
    //                 ]
    //             },
    //             "marque": "lenovo",
    //             "resolution": 1024.0,
    //             "vitesse": 50.0
    //         },
    //         {
    //             "code": "O2001",
    //             "dateLiv": "2022-04-06T15:43:31.000+00:00",
    //             "dureeGarantie": 3,
    //             "estAffecter": true,
    //             "cpu": "Amd",
    //             "dd": 500,
    //             "ecran": 1024.0,
    //             "marque": "hp",
    //             "ram": 24,
    //             "personnels": [],
    //             "fournisseur": {
    //                 "login": "Khadi",
    //                 "nom": "Jallili",
    //                 "prenom": "Khadija",
    //                 "pwd": "$2a$10$sU.9IK78EnSTG1GOxPxkXO.9GDo.FRZuku63c6dfGceOKS0rr5RXO",
    //                 "active": true,
    //                 "role": "ADMIN",
    //                 "ressetPasswordToken": null,
    //                 "departement": {
    //                     "id": 1,
    //                     "nomDep": "Info"
    //                 },
    //                 "mail": "ma@khadij.fst",
    //                 "gerant": "Khadi",
    //                 "lieu": "fes",
    //                 "nomSocite": "fst",
    //                 "enabled": true,
    //                 "accountNonExpired": true,
    //                 "credentialsNonExpired": true,
    //                 "accountNonLocked": true,
    //                 "username": "Khadi",
    //                 "password": "$2a$10$sU.9IK78EnSTG1GOxPxkXO.9GDo.FRZuku63c6dfGceOKS0rr5RXO",
    //                 "authorities": [
    //                     {
    //                         "role": "ADMIN",
    //                         "authority": "ADMIN"
    //                     }
    //                 ]
    //             }
    //         }
    //     ]
    // }

    // const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { token, updateToken } = useContext(TokenContext);
    const [data, setData] = useState([]);
    useEffect(() => {

        const fetchData = async () => {
            console.log("monté");
            const res = await api.get("/ressourceservice/ListDisp", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })
            if (res.status === 200) {
                console.log("first");
                setData(res.data);
                console.log(data);
                console.log("first");
            }
            else {
                console.log("Une erreur sait produit !!!");
            }
        }
        fetchData();


    }, [])
    return (
        <>
            <div className="pagetitle">
                <h1>Réssource Disponible</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="index.html">Accueil</a></li>
                        <li className="breadcrumb-item">Ressources disponibles</li>
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
                                            <th scope="col">Date livraison</th>
                                            <th scope="col">Durée garantie</th>
                                            <th scope="col">Type</th>
                                            <th scope="col">Etat</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data.map(item => {
                                                return(
                                                    <tr>
                                                        <td key={item.code + "1"}>{item.code}</td>
                                                        <td key={item.code + "2"}>{item.marque}</td>
                                                        <td key={item.code + "3"}>{item.dateLiv}</td>
                                                        <td key={item.code + "4"}>{item.dureeGarantie}</td>
                                                        <td key={item.code + "5"}>
                                                            {item.code.startsWith('I') && <Imprimante data={item} />}
                                                            {item.code.startsWith('O') && <Ordinateur data={item} />}
                                                        </td>
                                                        <td key={item.code + "6"}>
                                                            {item.estAffecter === true ? <span className="badge bg-success">Affectée</span> : <span className="badge bg-warning">Non Affecté</span>}
                                                        </td>
                                                        <td key={item.code + "7"}>
                                                            {item.estAffecter === true ? <></> : <button type="button" className="btn btn-outline-primary btn-sm" >Affecter</button>}
                                                            <button type="button" className="btn btn-outline-warning btn-sm" >Modifier</button>
                                                            <button type="button" className="btn btn-outline-danger btn-sm" >Supprimer</button>
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
        </>
    )
}

export default RessourcesDisponible;