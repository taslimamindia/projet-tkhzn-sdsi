import React, { useContext } from 'react'
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../../../api';
import TokenContext from '../../../context/TokenContext';
toast.configure();

function Ordinateur({ item, charger }) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { token } = useContext(TokenContext);
    const onSubmit = (data) => {
        const ressource = {
            "ordi": {
                "code": item.id,
                "marque": data.marqueordinateur,
                "cpu": data.cpu,
                "ram": data.ram,
                "dd": data.disquedur,
                "ecran": data.ecran
            },
            "imp":null
        } 
        api.post("/ressourceservice/updateRess", ressource, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        }).then(res => {
            if (res.status === 200) {
                toast.success("L'ordinateur a été modifier avec succes.", {
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
                    <h5 className="card-title">Ordinateur</h5>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="col-12">
                            <label htmlFor="marque" className="form-label">Marque</label>
                            <input defaultValue={item.marque}
                                {...register("marqueordinateur", { required: true })}
                                type="text" className="form-control" id="marque"
                            />
                            {errors.marqueordinateur && <div className="text-danger text-center w-100">* Champ est obligatoire</div>}
                        </div>

                        <div className="col-12">
                            <label htmlFor="cpu" className="form-label">CPU</label>
                            <input defaultValue={item.cpu}
                                {...register("cpu", { required: true })}
                                type="text" className="form-control" id="cpu"
                            />
                            {errors.cpu && <div className="text-danger text-center w-100">* Champ est obligatoire</div>}
                        </div>

                        <div className="col-12">
                            <label htmlFor="ram" className="form-label">RAM</label>
                            <input defaultValue={item.ram}
                                {...register("ram", { required: true })}
                                type="text" className="form-control" id="ram"
                            />
                            {errors.ram && <div className="text-danger text-center w-100">* Champ est obligatoire</div>}
                        </div>

                        <div className="col-12">
                            <label htmlFor="disquedur" className="form-label">Disque dure</label>
                            <input defaultValue={item.disque_d}
                                {...register("disquedur", { required: true })}
                                type="text" className="form-control" id="disquedur"
                            />
                            {errors.disquedur && <div className="text-danger text-center w-100">* Champ est obligatoire</div>}
                        </div>

                        <div className="col-12">
                            <label htmlFor="ecran" className="form-label">Ecran</label>
                            <input defaultValue={item.ecran}
                                {...register("ecran", { required: true })}
                                type="text" className="form-control" id="ecran"
                            />
                            {errors.ecran && <div className="text-danger text-center w-100">* Champ est obligatoire</div>}
                        </div>
                        <br />
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

export default Ordinateur;