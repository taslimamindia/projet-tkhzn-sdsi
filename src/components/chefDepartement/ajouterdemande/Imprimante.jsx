import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import api from '../../../api';
import TokenContext from '../../context/TokenContext';

function Imprimante() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { token } = useContext(TokenContext);

    const onSubmit = (data) => {
        let ressource = {
            "type": "imprimante",
            "imprimante_d": {
                "qteD": data.quantite,
                "vitesse": data.vitesse,
                "resolution": data.resolution,
                "marque": data.marque
            },
            "ordinateur_d": {}
        }

        api.post("/demandeservice/ajouterDemande", ressource, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        }).then(res => {
            if (res.status === 200) {
                alert("Enregistrement effecteur avec succès");
                reset();
            }
            else {
                window.alert("Une erreur sait produit !!!");
            }
        }).catch(function (error) {
            console.log(error);
            // Navigate({to: ""})
        })
    }
    return (
        <React.Fragment>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="card">
                    <div className="card-header">
                        <h5 className="card-title">Imprimante</h5>
                    </div>

                    <div className="card-body mb-0">
                        <div className="col-12">
                            <label htmlFor="vitesse" className="form-label">vitesse</label>
                            <input
                                {...register("vitesse", { required: true })}
                                type="text" className="form-control" id="vitesse"
                            />
                            {errors.vitesse && <div className="text-danger text-center w-100">* Champ est obligatoire</div>}
                        </div>
                        <div className="col-12">
                            <label htmlFor="resolution" className="form-label">résolution</label>
                            <input
                                {...register("resolution", { required: true })}
                                type="text" className="form-control" id="resolution"
                            />
                            {errors.resolution && <div className="text-danger text-center w-100">* Champ est obligatoire</div>}
                        </div>
                        <div className="col-12">
                            <label htmlFor="marque" className="form-label">marque</label>
                            <input
                                {...register("marque", { required: true })}
                                type="text" className="form-control" id="marque"
                            />
                            {errors.marque && <div className="text-danger text-center w-100">* Champ est obligatoire</div>}
                        </div>
                        <div className="col-12">
                            <label htmlFor="quantite" className="form-label">Quantité Demandée</label>
                            <input
                                {...register("quantite", { required: true, min: 1 })}
                                type="number" className="form-control" id="quantite"
                            />
                            {errors.quantite && <div className="text-danger text-center w-100">* Au minimun</div>}
                        </div>
                    </div>

                    <div className='card-footer'>
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

export default Imprimante;