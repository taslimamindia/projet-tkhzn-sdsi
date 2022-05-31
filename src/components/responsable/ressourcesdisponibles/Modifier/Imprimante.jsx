import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../../../api';
import TokenContext from '../../../context/TokenContext';
toast.configure();

function Imprimante({item, charger}) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { token } = useContext(TokenContext);
    const onSubmit = (data) => {
        const ressource = {
            "ordi": null,
            "imp": {
                "code": item.id,
                "vitesse": data.vitesse,
                "resolution": data.resolution,
                "marque": data.marque
            }
        }
        api.post("/ressourceservice/updateRess", ressource, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        }).then(res => {
            if(res.status === 200) {
                toast.success("L'imprimante a été modifier avec succes.", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                    theme: "colored"
                });
                charger();
            } else {
                toast.error("🤦🏿‍♂️ Une error est survenue dans la rêquete 🙆‍♀️!!!", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 10000,
                    theme: "colored"
                })
            }         
        })
        .catch(function (error) {
            toast.error("🤦🏿‍♂️ Une error est survenue côté server 🙆‍♀️!!!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 10000,
                theme: "colored"
            })
        })
    }
    
    return (
        <React.Fragment>

            <div className="card">
                <div className="card-body">

                    <h5 className="card-title">Imprimante</h5>

                    <form onSubmit={handleSubmit(onSubmit)} >
                    <div className="col-12">
                        <label htmlFor="vitesse" className="form-label">vitesse</label>
                        <input defaultValue={item.vitesse}
                            {...register("vitesse", { required: true })}
                            type="text" className="form-control" id="vitesse"
                        />
                        {errors.vitesse && <div className="text-danger text-center w-100">* Champ est obligatoire</div>}
                    </div>
                    <div className="col-12">
                        <label htmlFor="resolution" className="form-label">résolution</label>
                        <input defaultValue={item.resolution}
                            {...register("resolution", { required: true })}
                            type="text" className="form-control" id="resolution"
                        />
                        {errors.resolution && <div className="text-danger text-center w-100">* Champ est obligatoire</div>}
                    </div>
                    <div className="col-12">
                        <label htmlFor="marque" className="form-label">marque</label>
                        <input defaultValue={item.marque}
                            {...register("marque", { required: true })}
                            type="text" className="form-control" id="marque"
                        />
                        {errors.marque && <div className="text-danger text-center w-100">* Champ est obligatoire</div>}
                    </div>
                    <br/>
                    <div className="row mb-3">
                        <div className="col-sm-10">
                            <button type="submit" data-bs-dismiss="modal" className="btn btn-primary">Enregister</button>
                        </div>
                    </div>
                    </form>

                </div>
            </div>

        </React.Fragment>
    )
}

export default Imprimante;