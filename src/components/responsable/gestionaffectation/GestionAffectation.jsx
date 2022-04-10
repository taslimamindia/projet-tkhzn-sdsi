import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom"
import api from '../../../api';
import TokenContext from '../../context/TokenContext';

function Supprimer({ id, type }) {
    
    return (
        <>
            <a type="button" className="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target={"#basicModal" + type + id}>
                Supprimer
            </a>
            <div className="modal fade" id={"basicModal" + type + id} tabindex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Le nom du ressouce ici</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p> Vous êtes sûres, vous voulez supprimer cette affectation ?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                            <button type="button" className="btn btn-primary">Confirmer</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function Modifier({ id, pers, dep, type, qtetotal }) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    let affectation = {}
    let qteTotal = qtetotal;
    let qteAff = 0;
    const onSubmit = (data) => {
        // console.log(data);
    }
    const modifier = (e) => {
        const value = e.target.value
        // console.log(affectation);
        // console.log(affectation[value]);
        document.querySelector("#courant" + id).value = value;
        document.querySelector("#qte" + id).value = affectation[value];
    }
    const affecter = () => {
        const courant = document.querySelector("#courant" + id)
        const qte = document.querySelector("#qte" + id)
        if (courant.value !== -1 && qte.value !== "") {
            const qteNew = parseInt(qte.value)
            const qteOld = parseInt(affectation[courant.value])
            if (qteNew >= 0) {
                if (qteNew < qteOld) {
                    qteAff = qteAff - (qteOld - qteNew)
                    document.querySelector("#qteAff" + id).value = qteAff
                    affectation[courant.value] = qteNew
                }
                else if ((qteNew > qteOld) && (qteTotal >= (qteAff + (qteNew - qteOld)))) {
                    qteAff = qteAff + (qteNew - qteOld)
                    document.querySelector("#qteAff" + id).value = qteAff
                    affectation[courant.value] = qteNew
                }
                else {
                    qte.value = affectation[courant.value]
                }
            }
            else {
                qte.value = affectation[courant.value]
            }
        }
        else {
            qte.value = affectation[courant.value]
        }
    }
    return (
        <>
            <a type="button" className="btn btn-outline-info" data-bs-toggle="modal" data-bs-target={"#basicModal" + type + id}>
                Modifier
            </a>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="modal fade" id={"basicModal" + type + id} tabindex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Le nom du ressouce ici</h5>
                                <button type="button" className="btn btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="row  my-2">
                                    <div className="col-6">
                                        <input type="hidden" id={"courant" + id} value="-1" />

                                        <label htmlFor={"qtetotal" + id} className="form-label"><b>Quantité Total</b></label>
                                        <input readOnly className="form-control" id={"qtetotal" + id} value={qteTotal} />
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor={"qteAff" + id} className="form-label"><b>Quantité Disponible</b></label>
                                        <input readOnly className="form-control" id={"qteAff" + id} value={qteAff} />
                                    </div>
                                </div>
                                <div className="row  my-2">
                                    <div className="col-6">
                                        <label htmlFor={"select" + id} className="form-label"><b>Personel</b></label>
                                        <select id={"select" + id} className="selectpicker" data-live-search="true" onChange={(e) => { modifier(e); }}>
                                            <option selected value="-1" >Choix</option>
                                            {
                                                dep.map(departement => {
                                                    var idp = departement.id;
                                                    affectation[idp] = 3;
                                                    qteAff = qteAff + parseInt(affectation[idp])
                                                    console.log(affectation)
                                                    return <option value={departement.id} >{departement.nom}</option>
                                                })
                                            }
                                            {
                                                pers.map(per => {
                                                    var idp = per.login;
                                                    affectation[idp] = 5;
                                                    qteAff = qteAff + parseInt(affectation[idp])
                                                    console.log(affectation);
                                                    return <option value={per.login} >{per.nom}</option>
                                                })
                                            }
                                        </select>


                                    </div>
                                    <div className="col-6">
                                        <label htmlFor={"qte" + id} className="form-label"><b>Quantité affectée</b></label>
                                        <input type="number" className="form-control" id={"qte" + id} onChange={(e) => { affecter(e) }} />
                                    </div>


                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Enregistrer</button>
                                {/* <button type="button" className="btn btn-secondary" >Close</button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </form>

        </>
    )
}

function PlusInfos({ id, cpu, ram }) {
    const color1 = { color: "rgb(75, 168, 164)" }
    const color2 = { color: "color: aqua" }
    return (
        <>
            <a href="voir plus" data-bs-toggle="modal" data-bs-target={"#basicModal" + id}>
                voir plus
            </a>
            <div className="modal fade" id={"basicModal" + id} tabindex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Le nom du ressouce ici</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p> <b style={color1}>CPU : {cpu}</b></p>
                            <p> <b style={color1}>RAM: {ram}</b></p>
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

function Tbody({ table }) {

    return (
        <tbody>
            {

                table.items.map(item => (

                    <tr>
                        <th key={item.code + "a"}>{item.code}</th>
                        <th key={item.code + "b"}>{"Ordinateur"}</th>
                        <th key={item.code + "c"}>
                            <PlusInfos cpu={"cpu"} ram={"ram"} id={item.code} />
                        </th>
                        <th key={item.code + "d"}>{item.fournisseur.nom}</th>
                        <th key={item.code + "e"}>{item.dateLiv}</th>
                        <th key={item.code + "f"}>
                            <Modifier id={item.code} type={"edit"} dep={item.affectation.departement} pers={item.affectation.personnel}
                                qtetotal={50}
                            />
                            <Supprimer id={item.code} type={"delete"} />
                        </th>
                    </tr>
                ))
            }
        </tbody>
    )
}


function GestionAffectation() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { token, updateToken } = useContext(TokenContext)
    const charger = () => {
        console.log("succes");
        let datah = `{
        "items": [
            {
                "code": 2,
                "dateLiv": 55,
                "dureeGarantie": 10,
                "estAffecter": true,
                "resolution": "32",
                "marque": "pg",
                "fournisseur": {
                    "login": "d",
                    "nom": "dijaaa",
                    "prenom": "jalili"
                },
                "responsable": {
                    "login": "tttt",
                    "nom": "taslima",
                    "prenom": "diallo"
                },
                "affectation": {
                    "departement": [
                        {
                            "id": "1",
                            "nom": "info"
                        },
                        {
                            "id": "2",
                            "nom": "math"
                        }
                    ],
    
                    "personnel": [
                        {
                            "login": "dd",
                            "nom": "info"
                        },
                        {
                            "login": "aa",
                            "nom": "math"
                        }
                    ]
                }
            }
        ]
        } `
        let table = JSON.parse(datah)
        console.log(table.items[0])
        return (
            <Tbody table={table} />
        )
        api.get("/userservice/userInfo", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        })
            .then(res => {

                if (res.status === 200) {
                    console.log("succes");
                    // console.log(JSON.parse(res.data));
                    const ob = JSON.parse("{\"diallo\": 1, \"merci\": \"merci\"}")
                    console.log(ob.diallo);
                    // console.log(JSON.parse("{ items: " + res.data + " }"));
                    // const data = {items : res.data}
                    // console.log(typeof(data))
                    // return(
                    //     <Tbody />
                    // )
                }
                else {
                    window.alert("Une erreur sait produit !!!");
                }
            })
            .catch(function (error) {
                console.log(error);
                Navigate({ to: "" })
            })
    }

    return (
        <React.Fragment>

            <div className="pagetitle">
                <h1>Data Tables</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                        <li className="breadcrumb-item">Tables</li>
                        <li className="breadcrumb-item active">Data</li>
                    </ol>
                </nav>
            </div>
            {/* <!-- End Page Title --> */}

            <section className="section">
                <div className="row">
                    <div className="col-lg-12">

                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Affectations effectuées</h5>

                                {/* <!-- Table with stripped rows --> */}
                                <table className="table datatable">
                                    <thead>
                                        <tr>
                                            <th>Numéro</th>
                                            <th>Nom du Ressource</th>
                                            <th>Plus d'informations</th>
                                            <th>Personel</th>
                                            <th>Date d'affectation</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    {charger()}
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

export default GestionAffectation;