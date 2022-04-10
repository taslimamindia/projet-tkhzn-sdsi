import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import TokenContext from './context/TokenContext'

function Profil({ home }) {
  const { token, updateToken } = useContext(TokenContext)

  const charge = () => {
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
    <>
      <div className="pagetitle">
        <h1>Profil</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to={home} >Accueil</Link></li>
            <li className="breadcrumb-item">Utilisateur</li>
            <li className="breadcrumb-item active">Profil</li>
          </ol>
        </nav>
      </div>

      <section className="section profile">
        <div className="row">
          <div className="col-xl-4">

            <div className="card">
              <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">

                <img src="assets/img/profile-img.jpg" alt="Profile" className="rounded-circle" />
                <h2>Mr.Alaoui</h2>
                <h3>Responsable</h3>
              </div>
            </div>

          </div>

          <div className="col-xl-8">

            <div className="card">
              <div className="card-body pt-3">
                <ul className="nav nav-tabs nav-tabs-bordered">

                  <li className="nav-item">
                    <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview">Aperçu</button>
                  </li>

                  <li className="nav-item">
                    <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit">Modifier Profil</button>
                  </li>

                  <li className="nav-item">
                    <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-change-password">Changer Mot de passe</button>
                  </li>

                </ul>
                <div className="tab-content pt-2">

                  <div className="tab-pane fade show active profile-overview" id="profile-overview">
                    <div className="row">
                      <div className="col-lg-3 col-md-4 label ">Nom Prénom</div>
                      <div className="col-lg-9 col-md-8">Alaoui Mohammed</div>
                    </div>

                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">Fonctionne</div>
                      <div className="col-lg-9 col-md-8">Responsable</div>
                    </div>

                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">Email</div>
                      <div className="col-lg-9 col-md-8">A.mohammed@gmail.com</div>
                    </div>

                  </div>

                  <div className="tab-pane fade profile-edit pt-3" id="profile-edit">

                    <form>
                      <div className="row mb-3">
                        <label for="fullName" className="col-md-4 col-lg-3 col-form-label">Nom</label>
                        <div className="col-md-8 col-lg-9">
                          <input name="fullName" type="text" className="form-control" id="Nom" value="Alaoui" />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label for="fullName" className="col-md-4 col-lg-3 col-form-label">Prénom</label>
                        <div className="col-md-8 col-lg-9">
                          <input name="fullName" type="text" className="form-control" id="prenom" value="Mohammed" />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label for="fullName" className="col-md-4 col-lg-3 col-form-label">Email</label>
                        <div className="col-md-8 col-lg-9">
                          <input name="fullName" type="email" className="form-control" id="email" value="A.mohammed@gmail.com" />
                        </div>
                      </div>

                      <div className="text-center">
                        <button type="submit" className="btn btn-primary">Enregistrer</button>
                      </div>
                    </form>

                  </div>

                  <div className="tab-pane fade pt-3" id="profile-change-password">
                    <form>

                      <div className="row mb-3">
                        <label for="currentPassword" className="col-md-4 col-lg-3 col-form-label">Mot de passe actuel</label>
                        <div className="col-md-8 col-lg-9">
                          <input name="password" type="password" className="form-control" id="currentPassword" />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label for="newPassword" className="col-md-4 col-lg-3 col-form-label">Nouveau mot de passe</label>
                        <div className="col-md-8 col-lg-9">
                          <input name="newpassword" type="password" className="form-control" id="newPassword" />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label for="renewPassword" className="col-md-4 col-lg-3 col-form-label">Rentrer Mot de passe</label>
                        <div className="col-md-8 col-lg-9">
                          <input name="renewpassword" type="password" className="form-control" id="renewPassword" />
                        </div>
                      </div>

                      <div className="text-center">
                        <button type="submit" className="btn btn-primary">Changer Mot de passe</button>
                      </div>
                    </form>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

    </>
  )
}

export default Profil;
