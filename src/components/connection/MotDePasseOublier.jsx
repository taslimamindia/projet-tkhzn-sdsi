import React from 'react'
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';

function MotDePasseOublier() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(JSON.stringify(data));
        reset()
    }

    return (
        <>
            <main>
                <div class="container">

                    <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                        <div class="container">
                            <div class="row justify-content-center">
                                <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                                    <div class="d-flex justify-content-center py-4">
                                        <a href="index.html" class="logo d-flex align-items-center w-auto">
                                            <span class="d-none d-lg-block"><img src="assets/img/fst.png" width="400px" height="400px" alt="" /></span>
                                        </a>
                                    </div>

                                    <div class="card mb-3">

                                        <div class="card-body">

                                            <div class="pt-4 pb-2">
                                                <h5 class="card-title text-center pb-0 fs-4">Inisaliser mot de passe</h5>
                                                <p class="text-center small">Entrer votre nouvaeu mot de passe</p>
                                            </div>

                                            <form class="row g-3 needs-validation" novalidate>
                                                <div class="col-12">
                                                    <label for="yourPassword" class="form-label">nouveau mot de passe</label>
                                                    <input type="password" name="password" class="form-control" id="yourPassword" />
                                                        <div class="invalid-feedback">Veuillez entrer votre nouveau mot de passe!</div>
                                                </div>
                                                <div class="col-12">
                                                    <label for="yourPassword" class="form-label">Confirmer le nouveau mot de passe</label>
                                                    <input type="password" name="password" class="form-control" id="yourPassword" />
                                                        <div class="invalid-feedback">Veuillez entrer votre nouveau mot de passe!</div>
                                                </div>

                                                <div class="col-12">
                                                    <button class="btn btn-primary w-100" type="submit">Enregister</button>
                                                </div>
                                            </form>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </section>

                </div>
            </main>
            {/* <!-- End #main --> */}
        </>
    )
}

export default MotDePasseOublier;