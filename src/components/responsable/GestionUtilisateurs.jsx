import React from 'react'

function Supprimer() {
    return (
        <>
            <button type="button" className="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#supprimer2" >
                Supprimer
            </button>
            <div className="modal fade" id="supprimer2" tabindex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Supprimer affectation</h5>
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

function Modifier() {
    return (
        <>
            <button type="button" className="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#modifier1">modifier</button>
            <div className="modal fade" id="modifier1" tabindex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Modifier utilisateur</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="col-10">
                                {/* <label for="inputNanme4" className="form-label"><b>Login</b></label> */}
                                <input type="hidden" className="form-control" id="inputNanme4" />
                            </div>
                            <div className="col-10">
                                <label for="inputNanme4" className="form-label"><b>Nom</b></label>
                                <input type="text" className="form-control" id="inputNanme4" />
                            </div>
                            <div className="col-10">
                                <label for="inputNanme4" className="form-label"><b>Prenom</b></label>
                                <input type="text" className="form-control" id="inputNanme4" />
                            </div>
                            <div className="col-10">
                                {/* <label for="inputNanme4" className="form-label"><b>mot de passe</b></label> */}
                                <input type="hidden" className="form-control" id="inputNanme4" />
                            </div>
                            <div className="col-10">
                                <label for="inputNanme4" className="form-label"><b>Active</b></label>
                                <input type="number" className="form-control" id="inputNanme4" />
                            </div>
                            <div className="col-12">
                                <label for="inputNanme4" className="form-label"><p> <b>Role </b></p></label>
                                <br />
                                <select className="selectpicker" data-live-search="true">
                                    <option selected>Administratif</option>
                                    <option>Enseignant</option>
                                </select>
                            </div>
                            <br />
                        </div>
                        <div className="modal-footer ">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                            <button type="button" className="btn btn-primary">Modifier</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function TBody() {
    let table = {
        items: [
            {
                "code":"1",
                "nom": "zahi",
                "prenom": "Azzidine",
                "fonction":"Administratif",
                "active": 1
            },
            {
                "code":"2",
                "nom": "zahi",
                "prenom": "Azzidine",
                "fonction":"Administratif",
                "active": 0
            }
        ]
    }
    return (
        <>
            <tbody>
                {
                    table.items.map(item => (
                        <tr>
                            <th key={item.code + "a"}>{item.nom}</th>
                            <th key={item.code + "b"}>{item.prenom}</th>
                            <th key={item.code + "d"}>{item.fonction}</th>
                            <th key={item.code + "e"}>{item.active}</th>
                            <th key={item.code + "f"} className="w-25">
                                {/* <Modifier id={item.code} type={"edit"} dep={item.affectation.departement} pers={item.affectation.personnel}
                                    qtetotal={50}
                                />
                                <Supprimer id={item.code} type={"delete"} /> */}
                                <div className="d-flex flex-row justify-content-between">
                                    <Modifier />
                                    <Supprimer />
                                </div>
                            </th>
                        </tr>
                    ))
                }

            </tbody>
        </>
    )
}

function GestionUtilisateurs() {
    return (
        <>
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

            <section className="section">
                <div className="row">
                    <div className="col-lg-10 mx-auto">

                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Affectations effectuées</h5>

                                <table className="table datatable">
                                    <thead>
                                        <tr>
                                            <th >Nom</th>
                                            <th >Prenom</th>
                                            <th >Role</th>
                                            <th >Active</th>
                                            <th className="w-25">Action</th>
                                        </tr>
                                    </thead>
                                    <TBody />
                                </table>

                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default GestionUtilisateurs;