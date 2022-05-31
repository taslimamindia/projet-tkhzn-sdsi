import React, { useContext, useEffect } from 'react';
import { useForm } from "react-hook-form";
import TokenContext from '../../context/TokenContext';
import api from "../../../api";

function Ordinateur() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const {token} = useContext(TokenContext);
    const onSubmit = (data) => {
        let ressource = {
            "type": "ordinateur",
            "ordinateur_d": {
                "qteD": data.quantite,
                "marque": data.marqueordinateur,
                "cpu": data.cpu,
                "ram": data.ram,
                "disque_d": data.disquedur,
                "ecran": data.ecran
            },
            "imprimante_d": {}
        }
        
        api.post("/demandeservice/ajouterDemande", ressource, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        })
        .then(res => {
            if (res.status === 200) {
                alert("Enregistrement effecteur avec succès");
                reset()
            }
            else {
                window.alert("Une erreur sait produit !!!");
            }
        })
        .catch(function (error) {
            console.log(error);
            // Navigate({to: ""})
        })

    };

    return (
        <React.Fragment>

            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="card">
                    <div className="card-header">
                        <h5 className="card-title">Ordinateur</h5>
                    </div>

                    <div className="card-body">
                        <div className="row">
                            <div className="col-6">
                                <label htmlFor="marque" className="form-label">Marque</label>
                                <input
                                    {...register("marqueordinateur", { required: true })}
                                    type="text" className="form-control" id="marque"
                                />
                                {errors.marqueordinateur && <div className="text-danger text-center w-100">* Champ est obligatoire</div>}
                            </div>

                            <div className="col-6">
                                <label htmlFor="cpu" className="form-label">CPU</label>
                                <input
                                    {...register("cpu", { required: true })}
                                    type="text" className="form-control" id="cpu"
                                />
                                {errors.cpu && <div className="text-danger text-center w-100">* Champ est obligatoire</div>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <label htmlFor="ram" className="form-label">RAM</label>
                                <input
                                    {...register("ram", { required: true })}
                                    type="text" className="form-control" id="ram"
                                />
                                {errors.ram && <div className="text-danger text-center w-100">* Champ est obligatoire</div>}
                            </div>

                            <div className="col-6">
                                <label htmlFor="disquedur" className="form-label">Disque dure</label>
                                <input
                                    {...register("disquedur", { required: true })}
                                    type="text" className="form-control" id="disquedur"
                                />
                                {errors.disquedur && <div className="text-danger text-center w-100">* Champ est obligatoire</div>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <label htmlFor="ecran" className="form-label">Ecran</label>
                                <input
                                    {...register("ecran", { required: true })}
                                    type="text" className="form-control" id="ecran"
                                />
                                {errors.ecran && <div className="text-danger text-center w-100">* Champ est obligatoire</div>}
                            </div>
                            <div className="col-6">
                                <label htmlFor="quantite" className="form-label">Quantité</label>
                                <input
                                    {...register("quantite", { required: true, min: 1 })}
                                    type="number" className="form-control" id="quantite"
                                />
                                {errors.quantite && <div className="text-danger text-center w-100">* </div>}
                            </div>
                        </div>
                    </div>

                    <div className="card-footer">
                        <div className="row">
                            <div className="col-12 text-end">
                                <button type="submit" className="btn btn-primary">Enregister</button>
                            </div>
                        </div>
                    </div>
                </div>

            </form>

        </React.Fragment>
    )
}

export default Ordinateur;