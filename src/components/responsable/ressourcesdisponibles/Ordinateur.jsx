import React from 'react'
import { useForm } from "react-hook-form";

function Ordinateur({ register, errors } ) {

    return (
        <React.Fragment>

            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Ordinateur</h5>
                    
                    <div className="col-12">
                        <label htmlFor="marque" className="form-label">Marque</label>
                        <input
                            {...register("marqueordinateur", { required: true })}
                            type="text" className="form-control" id="marque"
                        />
                        {errors.marqueordinateur && <div className="text-danger text-center w-100">* Champ est obligatoire</div>}
                    </div>

                    <div className="col-12">
                        <label htmlFor="cpu" className="form-label">CPU</label>
                        <input
                            {...register("cpu", { required: true })}
                            type="text" className="form-control" id="cpu"
                        />
                        {errors.cpu && <div className="text-danger text-center w-100">* Champ est obligatoire</div>}
                    </div>

                    <div className="col-12">
                        <label htmlFor="ram" className="form-label">RAM</label>
                        <input
                            {...register("ram", { required: true })}
                            type="text" className="form-control" id="ram"
                        />
                        {errors.ram && <div className="text-danger text-center w-100">* Champ est obligatoire</div>}
                    </div>

                    <div className="col-12">
                        <label htmlFor="disquedur" className="form-label">Disque dure</label>
                        <input
                            {...register("disquedur", { required: true })}
                            type="text" className="form-control" id="disquedur"
                        />
                        {errors.disquedur && <div className="text-danger text-center w-100">* Champ est obligatoire</div>}
                    </div>

                    <div className="col-12">
                        <label htmlFor="ecran" className="form-label">Ecran</label>
                        <input
                            {...register("ecran", { required: true })}
                            type="text" className="form-control" id="ecran"
                        />
                        {errors.ecran && <div className="text-danger text-center w-100">* Champ est obligatoire</div>}
                    </div>

                </div>
            </div>

        </React.Fragment>
    )
}

export default Ordinateur;