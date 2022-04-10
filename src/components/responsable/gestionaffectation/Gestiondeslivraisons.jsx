import React from 'react';
import { useForm } from "react-hook-form";
import {Link} from "react-router-dom"
import api from '../../../api';

function Affecter({ id, type, value}) {
    return (
        <>
            <a type="button" data-bs-toggle="modal" data-bs-target={"#basicModalaff" + type + id}>
                Affecter
            </a>
            <div className="modal fade" id={"basicModalaff" + type + id} tabindex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Le nom du ressouce ici</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            
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

function Tbody() {
    let table = {
        items : [
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
                }
            },
            {
                "code": 1,
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
                }
            }
        ]
    }

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
                            <Affecter id={item.code} type={"affecter"} value={item.code} />
                        </th>
                    </tr>
                ))
            }
        </tbody>
    )
}


function GestionAffectation() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(JSON.stringify(data));
        reset()
    }
    return (
        <React.Fragment>

            <div className="pagetitle">
                <h1>Gestion des Affectations</h1>
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
                                    <Tbody />
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