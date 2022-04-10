import React, { useContext, useState } from 'react'
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import api from '../../api';
import TokenContext from '../context/TokenContext';

function Inscription() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    let navigate = useNavigate();
    // const {token, updateToken} = useContext(TokenContext);
    const {error, setError} = useState(false);
    const {crach, setCrach} = useState(false);
    const {success, setSuccess} = useState(true);
    const onSubmit = (data) => {
        console.log(JSON.stringify(data));
        setError(true);
        // api.post("/auth/inscription", JSON.stringify(data), { headers: { 'Content-Type': 'application/json'} })
        // .then(res => {
        //     if(res.status === 200) {
        //         const value = res.data.token;
        //         console.log(value);
        //         setCrach(false); setError(false); 
        //         reset(); setSuccess(true);
        //     } 
        //     if(res.status === 600) {
        //         setError(true);
        //     } 
        //     else {
        //         setCrach(true)
        //     }          
        // })
        // .catch(function (error) {
        //     setCrach(true);
        //     Navigate({to: ""});
            
        // })
    }

    return (

        <React.Fragment>
        <form className="row g-3 w-25 mx-auto" onSubmit={handleSubmit(onSubmit)}>
            { error || crach &&
                <div className="pt-4 pb-2">
                    {error && <div className='text-danger text-center'>Utilisateur/Mot de passe incorrect !!!</div>}
                    {crach && <div className='text-danger text-center'>Une erreur sait produit !!!</div>}
                </div>
            }
            { success &&
                <div className="pt-2 pb-2">
                    {crach && <div className='text-success text-center'>Vous ête enregister, connectez-vous.</div>}
                </div>
            }
            <div className="d-flex justify-content-center py-4">
                <a href="index.html" className="logo d-flex align-items-center w-auto">
                    <span className="d-none d-lg-block">
                        <img src="assets/img/fst.png" width="400px" height="400px" alt=""/>
                    </span>
                </a>
            </div>
            {/* <!-- End Logo --> */}

            <div className="pt-3 pb-2">
                <h5 className="card-title text-center pb-0 fs-4">Créer compte</h5>
                <p className="text-center small">Entrer vos informations</p>
            </div>
            
            <div className="col-12">
                <label for="nom" className="form-label">Nom</label>
                <input 
                    {...register("nom", { required: true })} 
                    type="text" name="nom" className="form-control" id="nom"
                />
                { errors.nom && <div className="text-danger">Veuillez entrer votre nom!</div> }
            </div>


            <div className="col-12">
                <label for="login" className="form-label">Adresse Email</label>
                <div className="input-group has-validation">
                    <span className="input-group-text" id="inputGroupPrepend">@</span>
                    <input 
                        {...register("login", { required: true })} 
                        type="text" name="login" className="form-control" id="login"/>
                    {errors.login && <div className="text-danger">Veuillez entrer votre adresse Email!</div>}
                </div>
            </div>

            <div className="col-12">
                <label for="password" className="form-label">Mot de passe</label>
                <input 
                    {...register("password", { required: true })}
                    type="password" name="password" className="form-control" id="password"/>
                { errors.password && <div className="text-danger">Veuillez entrer votre mot de passe!</div> }
            </div>


            <div className="col-12">
                <button className="btn btn-primary w-100" type="submit">Créer compte</button>
            </div>

            <div className="col-12">
                <p className="small mb-0 text-center">Vous avez déjà un compte ? <Link to={"/"}>Se connecter</Link></p>
            </div>
               
        </form>

        </React.Fragment>
    )
}

export default Inscription;