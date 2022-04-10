import React, { useContext, useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import {Link, Navigate, useNavigate,  } from 'react-router-dom';
import api from '../../api';
import TokenContext from '../context/TokenContext';

function FormLogin() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    let navigate = useNavigate();
    const {token, updateToken} = useContext(TokenContext);
    const onSubmit = (data) => {
        console.log(JSON.stringify(data));
        api.post("/auth/login", JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(res => {
            if(res.status === 200) {
                const value = res.data.token;
                updateToken(value);
                console.log(res);
                console.log(typeof(value));
                navigate("/Responsable/Accueil");
            }  
            else {
                window.alert("Utilisateur ou mot de passe incorrect !!!");
            }          
        })
        .catch(function (error) {
            Navigate({to: ""})
        })

        
    }
    useEffect(() => {
        const data = {
            "login": "diallo",
            "password": "0000"
        }
        api.post("/auth/login", JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(res => {
            if(res.status === 200) {
                const value = res.data.token;
                updateToken(value);
                console.log(res);
                console.log(typeof(value));
                navigate("/Responsable/Accueil");
            }  
            else {
                window.alert("Utilisateur ou mot de passe incorrect !!!");
            }          
        })
        .catch(function (error) {
            Navigate({to: ""})
        })   
    }, [])
    return (
        <React.Fragment>

            <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
        
                <div className="col-12">
                    <label htmlFor="username" className="form-label">Nom d'utilisateur</label>
                    <div className="input-group">
                        <span className="input-group-text" id="inputGroupPrepend">@</span>
                        <input autoComplete='login'
                            {...register("login", { required: true })} 
                            className="form-control" id="username" type="text"
                        />
                        {errors.login && <div className="text-danger text-center w-100">Veuillez entrer votre nom d'utilisateur!</div>}
                    </div>
                </div>

                <div className="col-12">
                    <label htmlFor="password" className="form-label">Mot de passe</label>
                    <input 
                        {...register("password", { required: true })} 
                        className="form-control" id="password" type="password"
                    />
                    {errors.password && <div className="text-danger text-center w-100">Veuillez entrer votre mot de passe!</div>}
                </div>

                <div className="col-12">
                    <div className="form-check">
                        <Link to={"/MotDePasseOublier"} class="form-check-label">Mot de passe oublié ?</Link>
                    </div>
                </div>

                <div className="col-12">
                    <button className="btn btn-primary w-100" type="submit">Se connecter</button>
                </div>

                <div className="col-12">
                    <p className="small mb-0">
                        <Link to={"/Inscription"}>Créer un compte</Link>
                    </p>
                </div>
            </form>

        </React.Fragment>
    )
}

export default FormLogin;