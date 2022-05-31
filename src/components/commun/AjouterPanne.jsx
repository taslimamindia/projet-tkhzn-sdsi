import React, { useContext, useEffect, useState } from 'react'
import api from '../../api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import TokenContext from '../context/TokenContext';

toast.configure();

function AjouterPanne() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { token } = useContext(TokenContext);
    const [active, setActive] = useState(false);
    let [data, setData] = useState([]);
    let [current, setCurrent] = useState("");
    let [o, setO] = useState(false);
    let [i, setI] = useState(false);

    const changer = (e) => {
        let v = e.target.value
        if(v !== current) {
            setCurrent(v)
            if(v !== "") {
                if(String(v).startsWith("I")) {
                    setI(true);
                    setO(false);
                    setActive(false)
                }
                else {
                    setI(false);
                    setO(true);
                    setActive(true)
                }
            }
            else {
                setI(false);
                setO(false);
            }
        }
        console.log(v);
    }
    const onSubmit = (data) => {
        console.log(data);
        api.post("/panneservice/addPanne", data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(res => {
            if (res.status === 200) {
                toast.success("La panne a été signaler avec succès", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                    theme: "colored"
                });
                reset();
            }
            else {
                toast.error("🤦🏿‍♂️ Une error est survenue côté server 🙆‍♀️!!!", {
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
    useEffect(() => {
        const fetchData = async () => {
            const res = await api.get("/ressourceservice/getAllIdRessources", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })
            if (res.status === 200) {
                setData(res.data);
            }
            else {
                console.log("Une erreur sait produit !!!");
            }
        }
        fetchData();
    }, [])

    return (
        <>
            <div className="pagetitle">
                <h1>Ajouter panne</h1>
            </div>

            <section className="section">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Panne</h5>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="row mb-3">
                                        <label className="col-sm-10 col-form-label">Code ressource</label>
                                        
                                        <div className="col-sm-10" >
                                            
                                            <select onClick={(e) => {changer(e)}} {...register("codeRess", { required: true })} className="form-select" data-live-search="true" id="login">
                                                <option selected value=""></option>
                                                {data.map(item => {
                                                    console.log(item);
                                                    return <option key={item.code} value={item.code}>{item.code}</option>
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <fieldset className="row mb-3">
                                        <legend className="col-form-label col-sm-10 pt-0">Type de ressource</legend>
                                        <div className="form-check">
                                                <input {...register("typeRess", { required: true })}
                                                    checked={i}
                                                    className="form-check-input" type="radio" id="Imprimante" value="imprimante"
                                                    />
                                                <label className="form-check-label" htmlFor='Imprimante'>
                                                    Imprimante
                                                </label>
                                            </div>
                                        <div className="col-sm-10">
                                            <div className="form-check">
                                                <input {...register("typeRess", { required: true })} 
                                                    checked={o}
                                                    className="form-check-input" type="radio" id="ord" value="ordinateur"
                                                />
                                                <label className="form-check-label" htmlFor='ord'>
                                                    Ordinateur
                                                </label>
                                            </div>
                                            {active &&
                                                <>
                                                    <label className="col-sm-10 col-form-label">Ordre de la panne</label>
                                                    <div className="form-check">
                                                        <input {...register("ordre")} className="form-check-input" id='materiel' type="radio" value="materiel"/>
                                                        <label className="form-check-label" htmlFor='materiel'>
                                                            Materiel 
                                                        </label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input {...register("ordre")} className="form-check-input" id='logiciel' type="radio" value="logiciel" />
                                                        <label className="form-check-label" htmlFor='logiciel'>
                                                            Logiciel
                                                        </label>
                                                    </div>
                                                </>
                                            }
                                        </div>
                                    </fieldset>

                                    <div className="row mb-3">
                                        <div className="form-floating">
                                            <textarea {...register("explication", { required: true })} className="form-control" placeholder="Description"
                                                ></textarea>
                                            <label>Description</label>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="form-floating mb-3">
                                            <select {...register("frequence", { required: true })} className="form-select" id="floatingSelect" aria-label="fréquence">
                                                <option value={"Fréquente"} selected>Fréquente</option>
                                                <option value={"Rare"}>Rare</option>
                                                <option value={"Permanente"}>Permanente</option>
                                            </select>
                                            <label htmlFor='floatingSelect'>Fréquence</label>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <label className="col-sm-10 col-form-label" htmlFor='date'>Date d'apparition</label>
                                        <div className="col-sm-10">
                                            <input {...register("dateApp", { required: true })} type="date" id='date' className="form-control" />
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-sm-10">
                                            <button type="submit" className="btn btn-primary">Enregister</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AjouterPanne;
