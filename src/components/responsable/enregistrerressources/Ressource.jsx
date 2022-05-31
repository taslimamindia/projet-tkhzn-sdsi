import React, { useContext, useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import api from '../../../api';
import TokenContext from '../../context/TokenContext';
import Fournisseur from './Fournisseur';
import Imprimante from './Imprimante';
import Ordinateur from './Ordinateur';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

function Ressource() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { token } = useContext(TokenContext);
    const [checked, setChecked] = useState(false);

    const handleChange = () => { setChecked(!checked); }
    
    const [checkedImp, setCheckedImp] = useState(false);
    const handleChangeImp = () => {
        setCheckedOrd(false);
        setCheckedImp(true);
    }

    const [checkedOrd, setCheckedOrd] = useState(false);
    const handleChangeOrd = () => {
        setCheckedImp(false);
        setCheckedOrd(true);
    }

    const onSubmit = (data) => {
        let fournisseur;
        let ordinateur;
        let imprimante;
        let newFournisseur;

        if (checked === true) {
            fournisseur = {
                "login": data.login,
                "nomSocite": data.nomSociete,
                "lieu": data.lieu,
                "gerant": data.gerant
            }
            newFournisseur = true;
        }
        else {
            fournisseur = {
                "login": data.login
            };
            newFournisseur = false;
        }

        if (data.type === "imprimante") {
            imprimante = {
                "dureeGarantie": data.garantie,
                "dateLiv": data.datelivraison,
                "vitesse": data.vitesse,
                "resolution": data.resolution,
                "marque": data.marque
            }
            ordinateur = {};
        }
        else {
            ordinateur = {
                "dureeGarantie": data.garantie,
                "dateLiv": data.datelivraison,
                "marque": data.marqueordinateur,
                "cpu": data.cpu,
                "ram": data.ram,
                "dd": data.disquedur,
                "ecran": data.ecran,
                "estAffecter": false
            };
            imprimante = {};
        }

        const addressource = {
            "type": data.type,
            "ordi": ordinateur,
            "imp": imprimante,
            "fournisseur": fournisseur,
            "nouv": newFournisseur,
            "qte": data.quantite
        }

        const donnee = JSON.stringify(addressource);
        
        api.post("/ressourceservice/addRess", donnee, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        })
            .then(res => {
                if (res.status === 200) {
                    toast.success("La ressource a été ajouter avec succes.", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 5000,
                        theme: "colored"
                    });
                    reset();
                }
                else {
                    toast.error("🤦🏿‍♂️ Une error est survenue dans la rêquete 🙆‍♀️!!!", {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 10000,
                        theme: "colored"
                    })
                }
            })
            .catch(function (error) {
                toast.error("🤦🏿‍♂️ Une error est survenue dans la rêquete 🙆‍♀️!!!", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 10000,
                    theme: "colored"
                })
            })
    }

    let [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const res = await api.get("/userservice/fournisseurs", {
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
        <React.Fragment>
            <div className="pagetitle">
                <h1>ENREGISTREMENT DES RESSOURCES</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to={"/Responsable"}>Accueil</Link>
                        </li>
                        <span>&nbsp; &gt; &nbsp;</span>
                        <li className="breadcrumb-item">
                            <Link to={"/Responsable/EnregistrerRessources"}>Enregistrer Ressources</Link>
                        </li>
                    </ol>
                </nav>
            </div>
            {/* <!-- End Page Title -->  */}

            <section className="section">
                
                <div className="row">
                    <div className="col-lg-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Ressources</h5>

                                {/* <!-- General Form Elements --> */}
                                <form onSubmit={handleSubmit(onSubmit)}>

                                    <div className="row mb-3">

                                        <label htmlFor="login" className="col-sm-10 col-form-label">Fournisseur</label>

                                        <div className="col-sm-10">
                                            <select {...register("login")} className="form-select" data-live-search="true" id="login">
                                                {data.map(item => {
                                                    return <option key={item.login} value={item.login}>{item.nom}</option>
                                                })}
                                            </select>
                                            {errors.login && <div className="text-danger text-center w-100">* Champ est obligatoire</div>}
                                        </div>
                                    </div>
                                    <div className="col-12" >
                                        <div className="form-check">
                                            <input
                                                checked={checked} onChange={handleChange}
                                                className="form-check-input" type="checkbox" id="nouveaufournisseur" name="nouveaufournisseur"
                                            />
                                            <label className="form-check-label" htmlFor="nouveaufournisseur">
                                                Nouveau Fournisseur
                                            </label>
                                        </div>

                                        {checked && <Fournisseur register={register} errors={errors} />}

                                        <div className="row mb-3">
                                            <label htmlFor="garantie" className="col-sm-10 col-form-label">Durée de garantie</label>
                                            <div className="col-sm-10">
                                                <input
                                                    {...register("garantie", { required: true })}
                                                    type="number" className="form-control" id='garantie'
                                                />
                                                {errors.garantie && <div className="text-danger text-center w-100">* Champ est obligatoire</div>}
                                            </div>
                                        </div>

                                        <div className="row mb-3">
                                            <label htmlFor="inputDate" className="col-sm-10 col-form-label">Date de livraison</label>
                                            <div className="col-sm-10">
                                                <input {...register("datelivraison", { required: true })} type="date" className="form-control" />
                                                {errors.datelivraison && <div className="text-danger text-center w-100">* Champ est obligatoire</div>}
                                            </div>
                                        </div>

                                        <fieldset className="row mb-3">
                                            <legend className="col-form-label col-sm-10 pt-0">Type</legend>
                                            <div className="col-sm-10">
                                                <div className="form-check">
                                                    <input
                                                        {...register("type", { required: true })}
                                                        className="form-check-input" type="radio" id="Ordinateur" value="ordinateur"
                                                        checked={checkedOrd} onClick={handleChangeOrd}
                                                    />
                                                    <label className="form-check-label" htmlFor="Ordinateur">
                                                        Ordinateur
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input
                                                        {...register("type", { required: true })}
                                                        className="form-check-input" type="radio" id="Imprimante" value="imprimante"
                                                        checked={checkedImp} onClick={handleChangeImp}
                                                    />
                                                    <label className="form-check-label" htmlFor="Imprimante">
                                                        Imprimante
                                                    </label>
                                                </div>
                                                {errors.type && <div className="text-danger text-center w-100">* Choix du type de ressource est obligatoire</div>}
                                            </div>
                                        </fieldset>

                                        {checkedImp && <Imprimante register={register} errors={errors} />}

                                        {checkedOrd && <Ordinateur register={register} errors={errors} />}
                                        <div className="row mb-3">
                                            <label htmlFor="quantite" className="col-sm-10 col-form-label">Quantité Livrée</label>
                                            <div className="col-sm-10">
                                                <input
                                                    {...register("quantite", { required: true })}
                                                    type="txt" className="form-control" id='quantite'
                                                />
                                                {errors.quantite && <div className="text-danger text-center w-100">* Champ est obligatoire</div>}
                                            </div>
                                        </div>

                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-sm-10">
                                            <button type="submit" className="btn btn-primary">Enregister</button>
                                        </div>
                                    </div>
                                </form>
                                {/* <!-- End General Form Elements --> */}
                            </div>
                        </div>

                    </div>

                </div>
            </section>

        </React.Fragment>
    )
}

export default Ressource;