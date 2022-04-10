{/* <section class="section">
    <div class="row">
      <div class="col-lg-12">

        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Affectations effectuées</h5>
            
            <!-- Table with stripped rows -->
            <table class="table datatable">
              <thead>
                <tr>
                  <th >Numéro</th>
                  <th >Nom du Ressource</th>
                  <th >Plus d'informations</th>
                  <th >Personel</th>
                  <th >Date d'affectation</th>
                  <th >Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">24</th>
                  <td>PC HP Elite Book</td>
                  <td><a href="voir plus" data-bs-toggle="modal" data-bs-target="#voirplus1">
                    voir plus
                  </a>
                  <div class="modal fade" id="voirplus1" tabindex="-1">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title">Le nom du ressouce ici</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                          <p> <b style="color: rgb(75, 168, 164);">CPU : </b></p>
                          <p> <b style="color: rgb(75, 168, 164);">RAM: </b></p>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                          
                        </div>
                      </div>
                    </div>
                  </div></td>

                  <td>A.Zahi</td>
                  <td>2016-05-25</td>
                  <td>
                  <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#supprimer1" >
                    Supprimer
                  </button>
                  <div class="modal fade" id="supprimer1" tabindex="-1">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title">Supprimer affectation</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p> Vous êtes sûres, vous voulez supprimer cette affectation ?</p>
                           
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                           <button type="button" class="btn btn-primary">Confirmer</button>
                        </div>
                      </div>
                    </div>
                  </div>
                                 
                  <button type="button" class="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#modifier1">modifier</button>
                  <div class="modal fade" id="modifier1" tabindex="-1">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title">Modifier affectation</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div class="modal-body">
                            <div class="col-12">
                              <label for="inputNanme4" class="form-label"><p> <b>Personel </b></p></label>
                           <br> 
                            
                            <select  class="selectpicker" multiple data-live-search="true">
                              <option selected>Departement info</option>
                              <option>Mr.Zahi &gt; labo.SIE</option>
                            </select>
                          
                            </div>  
                            <br>
                              <div class="col-6">
                                <label for="inputNanme4" class="form-label"><b>Quantité affectée</b></label>
                                <input type="text" class="form-control" id="inputNanme4"/>
                              </div>
                              
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                            
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">105</th>
                  <td>PC DELL XPS</td>
                  <td><a href="voir plus" data-bs-toggle="modal" data-bs-target="#voirplus2">
                    voir plus
                  </a>
                  <div class="modal fade" id="voirplus2" tabindex="-1">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title">Le nom du ressouce ici</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p> <b style="color: aqua">CPU : </b></p>
                            <p> <b style="color: rgb(75, 168, 164);">RAM: </b></p>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                          
                        </div>
                      </div>
                    </div>
                  </div></td>
                  <td>L.Lamrini</td>
                  <td>2019-11-15</td>
                  <td><button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#supprimer2" >
                    Supprimer
                  </button>
                  <div class="modal fade" id="supprimer2" tabindex="-1">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title">Supprimer affectation</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p> Vous êtes sûres, vous voulez supprimer cette affectation ?</p>
                           
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                           <button type="button" class="btn btn-primary">Confirmer</button>
                        </div>
                      </div>
                    </div>
                  </div>
                                 
                  <button type="button" class="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#modifier2">modifier</button>
                  <div class="modal fade" id="modifier2" tabindex="-1">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title">Modifier affectation</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div class="modal-body">
                              <p> <b>Personel </b></p>
                              <p><b>Quantité affectée</b></p>
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                            
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>  
                      </tr>
                
              </tbody>
            </table>
            <!-- End Table with stripped rows -->

          </div>
        </div>

      </div>
    </div>
  </section> */}