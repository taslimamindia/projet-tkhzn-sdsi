import React from 'react'
import { useForm } from "react-hook-form";
import api from '../../../api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

function AjouterUtilisateur() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(JSON.stringify(data));
        let donnee = null;
        if (String(data.role).toLocaleUpperCase() === "ADMINISTRATIF" || String(data.role).toLocaleUpperCase() === "CHEFDEPARTEMENT") {
            donnee = {
                "role": String(data.role).toLowerCase(),
                "user": {
                    "login": data.login,
                    "nom": data.nom,
                    "prenom": data.prenom,
                    "pwd": data.password,
                    "role": String(data.role).toUpperCase(),
                }
            }
        }
        else if (String(data.role).toUpperCase() === "ENSEIGNANT") {
            donnee = {
                "role": String(data.role).toLowerCase(),
                "enseignant": {
                    "login": data.login,
                    "nom": data.nom,
                    "prenom": data.prenom,
                    "pwd": data.password,
                    "role": String(data.role).toUpperCase(),
                    "nomLab": data.nomLab
                }
            }
        }
        else {
            donnee = {
                "role": String(data.role).toLowerCase(),
                "user": {
                    "login": data.login,
                    "nom": data.nom,
                    "prenom": data.prenom,
                    "pwd": data.password,
                    "role": String(data.role).toUpperCase(),
                }
            }
        }
        console.log(donnee);
        api.post("/userservice/adduser", donnee, { headers: { 'Content-Type': 'application/json' } })
            .then(res => {
                if (res.data.status === 200) {
                    toast.success("Enregistrement effectué avec succès. 🤗", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 5000,
                        theme: "colored"
                    });
                    reset();
                }
                else if (res.data.status === 201) {
                    toast.error("Le login exist déjà 🤦🏿‍♂️ 🙆‍♀️, veuillez choisir un autre 🤷‍♂️!!!", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 5000,
                        theme: "colored"
                    })
                }
                else {
                    toast.error("Une erreur sait produit 🙆‍♀️ !!!", {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 5000,
                        theme: "colored"
                    })
                }
            })
            .catch(function (error) {
                toast.error("Une erreur sait produit 🙆‍♀️ !!!", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 5000,
                    theme: "colored"
                })
            })
    }

    return (
        <>
            <form className="row g-3 w-75 mx-auto" onSubmit={handleSubmit(onSubmit)}>

                <div className="col-12">
                    <label for="login" className="form-label">Votre login</label>
                    <input
                        {...register("login", { required: true })}
                        type="text" name="login" className="form-control" id="login"
                    />
                    {errors.login && <div className="text-danger">Veuillez entrer votre login!</div>}
                </div>

                <div className="col-12">
                    <label for="nom" className="form-label">Votre nom</label>
                    <input
                        {...register("nom", { required: true })}
                        type="text" name="nom" className="form-control" id="nom"
                    />
                    {errors.nom && <div className="text-danger">Veuillez entrer votre nom!</div>}
                </div>

                <div className="col-12">
                    <label for="prenom" className="form-label">Votre prénom</label>
                    <input
                        {...register("prenom", { required: true })}
                        type="text" name="prenom" className="form-control" id="prenom"
                    />
                    {errors.prenom && <div className="text-danger">Veuillez entrer votre prenom!</div>}
                </div>

                <div className="col-12">
                    <label for="password" className="form-label">Mot de passe</label>
                    <input
                        {...register("password", { required: true })}
                        type="password" name="password" className="form-control" id="password" />
                    {errors.password && <div className="text-danger">Veuillez entrer votre mot de passe!</div>}
                </div>

                <div className="col-12">
                    <label for="passwordConfirm" className="form-label">Confirmer votre mot de passe</label>
                    <input
                        {...register("passwordConfirm", { required: true })}
                        type="password" name="passwordConfirm" className="form-control" id="passwordConfirm" />
                    {errors.passwordConfirm && <div className="text-danger">Veuillez confirmer votre mot de passee!</div>}
                </div>

                <div className="col-12">
                    <select className='form-control' {...register("role", { required: true })}>
                        <option value="choix">Choisir le role</option>
                        <option value="ENSEIGNANT">Enseignant</option>
                        <option value="CHEFDEPARTEMENT">Chef de département</option>
                        <option value="ADMINISTRATIF">Administratif</option>
                        <option value="MAINTENANCE">Personnel de Maintenance</option>
                    </select>
                </div>

                <div className="col-12">
                    <button type='submit' className='btn btn-primary'>Enregistrer</button>
                </div>
            </form>

        </>
    )
}

export default AjouterUtilisateur;