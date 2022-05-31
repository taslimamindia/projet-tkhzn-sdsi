import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../../api';
import TokenContext from '../../context/TokenContext';
toast.configure();

function Tr({ item, charger }) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { token } = useContext(TokenContext);
    const onSubmit = (data) => {
        console.log(data);
        const evaluation = {
            "login": item.login,
            "evaluation": data.evaluation,
            "motifEval": data.motifEval
        }
        api.post("/fournisseurservice/addEval", evaluation, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        }).then(res => {
            if (res.status === 200) {
                toast.success("L'évalution a été enregistrer avec succès.", {
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
        }).catch(function (error) {
            toast.error("🤦🏿‍♂️ Une error est survenue côté server 🙆‍♀️!!!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 10000,
                theme: "colored"
            })
        })
    }

    return (
        <tr>
            <th scope="row">{String(item.login).toLocaleUpperCase()} &nbsp; {item.nom_socite != null ? "(" + item.nom_socite + ")" : ""}</th>
            <td>{item.gerant != null ? item.gerant : "Inconnu"}</td>
            <td>{item.lieu != null ? item.lieu : "Inconnu"}</td>
            <td>
                {item.evaluation === 0 && <span className="badge bg-secondary">Sans évaluation</span>}
                {item.evaluation === 1 && <span className="badge bg-danger">Mauvais</span>}
                {item.evaluation === 2 && <span className="badge bg-success">Très bon</span>}
            </td>
            <td>
                <button type="button" className="btn btn-outline-info" data-bs-toggle="modal"
                    data-bs-target={"#modifier1" + item.login}>evaluer</button>
                <div className="modal fade" id={"modifier1" + item.login} tabindex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <form onSubmit={handleSubmit(onSubmit)}>

                                <div className="modal-header">
                                    <h5 className="modal-title">Evaluer fournisseur</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div className="modal-body">

                                    <br />
                                    <div className="col-12">
                                        <label className="form-label">
                                            <p><b>Evaluer</b></p>
                                        </label>

                                        <br />

                                        <select {...register("evaluation")} className="form-select" data-live-search="true">
                                            <option value={2} selected>Très Bon</option>
                                            <option value={1}>Mauvais</option>
                                        </select>

                                    </div>
                                    <div className="col-6">
                                        <label className="form-label"><b> Pourquoi</b></label>
                                        <textarea {...register("motifEval")} rows="4" cols="35"></textarea>

                                    </div>


                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary"
                                        data-bs-dismiss="modal">Fermer</button>
                                    <button type="submit"
                                        className="btn btn-primary">Enregistrer</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    )
}

function Evaluer() {
    const { token } = useContext(TokenContext);
    const [data, setData] = useState([]);
    const charger = () => {
        api.get("/fournisseurservice/getFournisseurs", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        }).then(res => {
            if (res.status === 200) {
                console.log(res.data);
                setData(res.data);
            } else {
                toast.error("🤦🏿‍♂️ Une error est survenue dans la rêquete 🙆‍♀️!!!", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 5000,
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
    useEffect(() => {
        charger();
    }, [])
    return (
        <>
            <div className="pagetitle">
                <h1>Evaluer fournisseur</h1>

            </div>

            <section className="section">
            <div className='row'>
                    {/* <div className='col-1'></div> */}
                    <div className='col-10'></div>
                    <div className='col-2 d-flex justify-content-end'><button className='btn btn-primary' onClick={(e) => { charger() }}>Actualiser</button></div>
                </div>
                <br />
                <div className="row">
                    <div className="col-lg-12">

                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title"></h5>
                                <table className="table datatable">
                                    <thead>
                                        <tr>
                                            <th>Fournisseur</th>
                                            <th>Gérant</th>
                                            <th>Lieu</th>
                                            <th>Status</th>
                                            <th>Evaluation</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data.map(item => {
                                                return (
                                                    <Tr item={item} charger={charger} />
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>

                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default Evaluer;