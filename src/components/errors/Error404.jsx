import React from 'react';
import { Link } from 'react-router-dom';
import imageError from "./not-found.svg";

function Error404() {
    return (
        <>
            <main>
                <div className="container">

                    <section className="section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center">
                        <h1>404</h1>
                        <h2>La page que vous recherchez n'existe pas.</h2>
                        <Link className="btn" to={"/"}>Révenir à l'Accueil</Link>
                        <img src={imageError} className="img-fluid py-5" alt="Page Not Found" />
                    </section>

                </div>
            </main>
        </>
    )
}

export default Error404;
