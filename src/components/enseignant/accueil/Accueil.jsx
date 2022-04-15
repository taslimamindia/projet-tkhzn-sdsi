import React from 'react'
import { Link } from 'react-router-dom'

export default function Accueil() {
  return (
    <div>
        Accueil
        <Link to={"/Enseignant/FaireUneDemande"}>Faire Une Demande</Link>
    </div>
  )
}
