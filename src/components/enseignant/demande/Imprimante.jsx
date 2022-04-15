import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import TokenContext from '../../context/TokenContext';

function Imprimante() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { token, updateToken } = useContext(TokenContext);

    const onSubmit = (data) => {
        let imprimante;
        imprimante = {
            // "code": code,
            "vitesse": data.vitesse,
            "resolution": data.resolution,
            "marque": data.marque
        }
        console.log(imprimante);
        // const donnee = JSON.stringify(addressource);
        // console.log(donnee);
        // api.post("/ressourceservice/addRess", donnee, {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': 'Bearer ' + token,
        //     }
        // })
        // .then(res => {
        //     if (res.status === 200) {
        //         alert("Enregistrement effecteur avec succès");
        //         reset()
        //     }
        //     else {
        //         window.alert("Une erreur sait produit !!!");
        //     }
        // })
        // .catch(function (error) {
        //     console.log(error);
        //     // Navigate({to: ""})
        // })
    }
    return (
        <React.Fragment>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="card">
                    <div className="card-body">

                        <h5 className="card-title">Imprimante</h5>

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

                        <div className="row mb-3">
                            <div className="col-sm-10">
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