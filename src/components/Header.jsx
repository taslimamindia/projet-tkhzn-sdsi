import React, { Component } from 'react'  

const toggle = () => {
    const body = document.querySelector('body')
    if(body.classList.contains("toggle-sidebar")) {
        body.classList.remove("toggle-sidebar")
    }
    else {
        body.classList.add("toggle-sidebar")
    }
}

function Message({title, className, message, timeAgo}) {
    return(
        <li className={className}>
            <div>
                <h4>{title}</h4>
                <p>{message}</p>
                <p>{timeAgo}</p>
            </div>
        </li>
    )
}

export class Header extends Component {  
    render() {  
        return (
            <React.Fragment>
                {/* <!-- ======= Header ======= --> */}
                <header id="header" className="header fixed-top d-flex align-items-center">
            
                    <div className="d-flex align-items-center justify-content-between">
                        <a href="index.html" className="logo d-flex align-items-center">
                        <img src="assets/img/logo.png" alt=""/>
                        <span className="d-none d-lg-block">Gestion Ressources</span>
                        </a>
                        <i className="bi bi-list toggle-sidebar-btn" onClick={toggle}></i>
                    </div>
                    {/* <!-- End Logo --> */}
            
                    <nav className="header-nav ms-auto">
                        <ul className="d-flex align-items-center">
                            <li className="nav-item dropdown">
                    
                                <a className="nav-link nav-icon" type='button' data-bs-toggle="dropdown">
                                    <i className="bi bi-bell"></i>
                                    <span className="badge bg-primary badge-number">4</span>
                                </a>
                                {/* <!-- End Notification Icon --> */}
                    
                                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
                                    <li className="dropdown-header">
                                        Vous avez 4 nouvelles notifications
                                        <a href="#"><span className="badge rounded-pill bg-primary p-2 ms-2">Voir tous</span></a>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider"/>
                                    </li>

                                    <Message className="notification-item" title="Lorem Ipsum" message="Quae dolorem earum veritatis oditseno" timeAgo="30 min. ago"/>
            
                                    {/* <li className="notification-item">
                                        <div>
                                            <h4>Lorem Ipsum</h4>
                                            <p>Quae dolorem earum veritatis oditseno</p>
                                            <p>30 min. ago</p>
                                        </div>
                                    </li> */}
                        
                                    <li>
                                        <hr className="dropdown-divider"/>
                                    </li>
                    
                    
                                </ul>
                                {/* <!-- End Notification Dropdown Items --> */}
                    
                            </li>
                            {/* <!-- End Notification Nav --> */}
                    
                            <li className="nav-item dropdown pe-3">
                    
                                <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                                <img src="/assets/img/profile-img.jpg" alt="Profile" className="rounded-circle"/>
                                <span className="d-none d-md-block dropdown-toggle ps-2">Diallo</span>
                                </a>
                                {/* <!-- End Profile Iamge Icon --> */}
                    
                                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                                <li className="dropdown-header">
                                    <h6>Diallo Mamadou</h6>
                                    <span>Responsable</span>
                                </li>
                                <li>
                                    <hr className="dropdown-divider"/>
                                </li>
                    
                                <li>
                                    <a className="dropdown-item d-flex align-items-center" href="users-profile.html">
                                    <i className="bi bi-person"></i>
                                    <span>Mon Profil</span>
                                    </a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider"></hr>
                                </li>
                    
                                <li>
                                    <a className="dropdown-item d-flex align-items-center" href="users-profile.html">
                                    <i className="bi bi-gear"></i>
                                    <span>Paramètres du compte</span>
                                    </a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider"/>
                                </li>
                                <li>
                                    <hr className="dropdown-divider"/>
                                </li>
                    
                                <li>
                                    <a className="dropdown-item d-flex align-items-center" href="#">
                                    <i className="bi bi-box-arrow-right"></i>
                                    <span>Déconnection</span>
                                    </a>
                                </li>
                    
                                </ul>
                                {/* <!-- End Profile Dropdown Items --> */}
                            </li>
                            {/* <!-- End Profile Nav --> */}
                
                        </ul>
                    </nav>
                    {/* <!-- End Icons Navigation --> */}
            
                </header>
                {/* <!-- End Header --> */}
            </React.Fragment>
        )  
    }  
}  
  
export default Header