import React from 'react';
import Imprimante from './Imprimante';
import Ordinateur from './Ordinateur';
import "./FaireUneDemande.css";

export default function FaireUneDemande() {
    return (
        <>
            <div class="card shadow-lg p-3 mb-5 bg-white rounded m_mainDem">
                <div class="card-body w-100 mx-auto pt-4">
                    <Ordinateur />
                     <br />
                    <Imprimante />
                </div>
            </div>

        </>

        // <div className="card shadow-lg p-3 mb-5 bg-white rounded" style="width: 90%;margin-left: 5%; font-size: large;font-family: 'Times New Roman', Times, serif;">
        //     <div className="card-body" style="width: 90% ;margin-left: 5%;">

        //         <form className="form-wrapper">

        //             <div className="row col-md-5 rounded " style="background: #d1e0e0;">

        //                 <div className="form-check col-md-6" style="position: relative;left:5%;">
        //                     <input className="form-check-input" type="radio" name="isAdmin" id="isAdmin1"/>
        //                     <label className="form-check-label" for="exampleRadios1">
        //                         Ordinateur :
        //                     </label>
        //                 </div>

        //                 <div className="form-check  col-md-6" style="position: relative;left:5%;">
        //                     <input className="form-check-input" type="radio" name="isAdmin" id="isAdmin2"/>
        //                     <label className="form-check-label" for="bib">
        //                         Imprimante :
        //                     </label>
        //                 </div>

        //             </div>

        //             <div className="form-row">
        //                 <div className="form-group col-md-4">
        //                     <label for="Etablissement" className="form-label">CIN :</label>
        //                     <input className="form-control" type="text" name="CIN" id="CIN"/>

        //                 </div>

        //                 <div className="form-group col-md-4">
        //                     <label for="annee" className="form-label"> Nom :</label>
        //                     <input className="form-control" type="text" name="nom"id="nom" />

        //                 </div>

        //                 <div className="form-group col-md-4">
        //                     <label for="etudiant" className="form-label">Prenom :</label>
        //                     <input className="form-control" type="text" name="prenom" id="prenom" />
        //                 </div>

        //             </div>


        //             <div className="form-row">

        //                 <div className="form-group col-md-4 " style="position: relative;">
        //                     <label for="Etablissement" className="form-label">Email Académique :</label>
        //                     <input className="form-control" type="text" name="emailAcademique" id="emailAcademique" />
        //                 </div>

        //                 <div className="form-group col-md-4" style="position: relative;">
        //                     <label for="annee" className="form-label">Numero telephone :</label>
        //                     <input className="form-control" type="text" name="numTel" id="numTel" />
        //                 </div>

        //                 <div className="form-group col-md-4" style="position: relative">
        //                     <label for="annee" className="form-label">Password :</label>
        //                     <input className="form-control" type="text" name="password" id="password" />
        //                 </div>

        //             </div>

        //             <br/>

        //             <div className="row">
        //                 <div className="form-group col-lg-2" style="margin-top: 2%;position: relative;left: 90%;">
        //                     <input type="submit" value="Envoyer" className="form-control btn btn-outline-primary"/>
        //                 </div>
        //             </div>

        //         </form>

        //     </div>
        // </div>
    )
}
