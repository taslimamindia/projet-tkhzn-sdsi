import React from 'react'

function Fournisseur({ register, errors }) {

    return (
        <React.Fragment>

            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Fournisseur</h5>

                    <div className="col-12">
                        <label htmlFor="nomsociete" class="form-label">Nom de la société</label>
                        <input
                            {...register("nomsociete", { required: true })}
                            type="text" className="form-control" id="nomsociete"
                        />
                        {errors.nomsociete && <div className="text-danger text-center w-100">* Champ est obligatoire</div>}
                    </div>

                    <div className="col-12">
                        <label htmlFor="lieu" className="form-label">Lieu</label>
                        <input
                            {...register("lieu", { required: true })}
                            type="text" className="form-control" id="lieu"
                        />
                        {errors.lieu && <div className="text-danger text-center w-100">* Champ est obligatoire</div>}
                    </div>

                    <div className="col-12">
                        <label htmlFor="gerant" className="form-label">Gérant</label>
                        <input
                            {...register("gerant", { required: true })}
                            type="text" className="form-control" id="gerant"
                        />
                        {errors.gerant && <div className="text-danger text-center w-100">* Champ est obligatoire</div>}
                    </div>

                </div>
            </div>

        </React.Fragment>
    )
}

export default Fournisseur;