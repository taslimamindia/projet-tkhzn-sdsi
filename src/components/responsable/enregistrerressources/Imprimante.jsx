import React from 'react'

function Imprimante({ register, errors }) {

    return (
        <React.Fragment>

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

                </div>
            </div>

        </React.Fragment>
    )
}

export default Imprimante;