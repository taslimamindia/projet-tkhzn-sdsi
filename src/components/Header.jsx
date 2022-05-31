import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TokenContext from './context/TokenContext';
import api from "../api";
import "./Header.css";
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

const toggle = () => {
    const body = document.querySelector('body')
    if (body.classList.contains("toggle-sidebar")) {
        body.classList.remove("toggle-sidebar")
    }
    else {
        body.classList.add("toggle-sidebar")
    }
}

function Message({ title, className, message, timeAgo }) {
    const toTimeStamp = (strDate) => {
        const date = Math.round(new Date().getTime() / 1000);
        let temps = date - strDate

        if (Math.round(temps / 32140800) > 0) return "Il y'a " + Math.round(temps / 32140800) + " ans.";
        else if (Math.round(temps / 2678400) > 0) return "Il y'a " + Math.round(temps / 2678400) + " mois.";
        else if (Math.round(temps / 86400) > 0) return "Il y'a " + Math.round(temps / 86400) + " jours.";
        else if (Math.round(temps / 3600) > 0) return "Il y'a " + Math.round(temps / 3600) + " heures.";
        else if (Math.round(temps / 60) > 0) return "Il y'a " + Math.round(temps / 60) + " minutes.";
        else if (Math.round(temps) > 0) return "Il y'a " + Math.round(temps) + " secondes.";
        else return "Réçu à l'instant.";
    }

    return (
        <>
            <li>
                <hr className="dropdown-divider" />
            </li>
            <li className={className}>
                <div>
                    <h4>{title}</h4>
                    <p>{message}</p>
                    <p>{toTimeStamp(timeAgo)}</p>
                </div>
            </li>
        </>
    )
}

function Messagerie() {
    const {token, updateStompClient, msg, updateMsg } = useContext(TokenContext);
    const [data, setData] = useState([]);
    const [totalrecu, setTotalrecu] = useState(0);

    const marquerLu = () => {
        api.get("/messageservice/marquerlu",  {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        })
    };

    const chargement = (value) => {
        if(value === true) {
            console.log(value);
            marquerLu();
            try {
                let input = document.getElementById("marqueLu");
                input.hidden = true;
            } catch (error) {
                
            }
        }
        api.get("/messageservice/messagerecu", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        })
            .then(res => {
                if (res.status === 200) {
                    let total = 0;
                    res.data.map(item => {
                        if (item.nouvelle === true) total = total + 1;
                    })
                    setTotalrecu(total);
                    setData(res.data);
                    console.log(res.data);
                }
            })
            .catch(function (error) {
                toast.error("🤦🏿‍♂️ Une error est survenue côté server 🙆‍♀️!!!", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 10000,
                    theme: "colored"
                })
            })
    };

    useEffect(() => {
        chargement(false);
    }, [msg]);

    return (
        <li className="nav-item dropdown" onClick={(e) => { chargement(true) }}>

            <a className="nav-link nav-icon" type='button' data-bs-toggle="dropdown">
                <i className="bi bi-bell"></i>
                {totalrecu !== 0 && <span id="marqueLu" className="badge bg-primary badge-number">{totalrecu}</span>}
            </a>
            {/* <!-- End Notification Icon --> */}

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications _notification">
                <li className="dropdown-header">
                    Vous avez {totalrecu} nouvelles notifications
                </li>

                {data != [] &&
                    data.slice(0, 5).map(item => {
                        return <>
                            {item.nouvelle === true ?
                                <Message className={"notification-item"} title={item.sendername} message={item.message} timeAgo={item.date} /> : <></>
                            }
                        </>
                    })
                }

                <li>
                    <hr className="dropdown-divider" />
                </li>


            </ul>
            {/* <!-- End Notification Dropdown Items --> */}

        </li>
    )
}

function Notifier({stompClient}) {
    const { token, username } = useContext(TokenContext);
    const notifier = (e) => {
        api.get("/userservice/usersbydepartements", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        }).then(res => {
            if (res.status === 200) {
                console.log(res.data);
                let envoyer = 0;
                for (let [cle, valeur] of Object.entries(res.data)) {
                    console.log(stompClient, username);
                    if (stompClient) {
                        var chatMessage = {
                            sendername: username,
                            receivername: valeur.userName,
                            message: "Veuillez formuler vos besoins matériels et les envoyés à votre chef departément.",
                            status: "MESSAGE"
                        };
                        stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
                        envoyer = envoyer + 1;
                    }
                }
                if (Object.entries(res.data).length === envoyer) {
                    toast.success("Les notifications a été envoyer avec succès.", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 2000,
                        theme: "colored"
                    });
                }
                else {
                    toast.warning("Tous les notifications non pas été envoyer.", {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 5000,
                        theme: "colored"
                    });
                }
            }
            else {
                toast.error("Une erreur sait produit 🤷‍♂️!!!", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 5000,
                    theme: "colored"
                })
            }
        }).catch(function (error) {
            toast.error("Une erreur sait produit 🤷‍♂️!!!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 5000,
                theme: "colored"
            })
        })
    }
    return (
        <button className="btn btn-info submit-btn" type="button" onClick={(e) => notifier(e)}>
            Notifier Personnel
        </button>
    )
}

function Header() {
    const { token, role, nom, username, prenom, stompClient, updateStompClient, msg, updateMsg } = useContext(TokenContext);
    const [stmp, setStmp]=useState(null);
    const onMessageReceivedPublic = (payload) => {
        var payloadData = JSON.parse(payload.body);
        if (payloadData.status === 'MESSAGE') {
            updateMsg(!msg);
        } else if (payloadData.status === 'JOIN') {

        }
        console.log("rec public");
    }
    const onMessageReceivedPrivate = (payload) => {
        var payloadData = JSON.parse(payload.body);
        if (payloadData.status === 'MESSAGE') {
            updateMsg(!msg);
        } else if (payloadData.status === 'JOIN') {

        }
        console.log("rec private");
    }
    const createConnexion = () => {
        if (stompClient === null) {
            let Sock = new SockJS('http://localhost:8088/ws', null, { headers: { 'Authorization': 'Bearer ' + token } });
            let _stompClient = over(Sock);
            updateStompClient(_stompClient);
            setStmp(_stompClient);
            console.log("create");
        }
    }
    const connect = () => {
        if (stompClient !== null) {
            stompClient.connect({}, onConnected, onError);
            console.log("connect");
        }
        else {
            console.log("non definie");
        }
    }
    const onConnected = () => {
        stompClient.subscribe('/chatroom/public', onMessageReceivedPublic);
        stompClient.subscribe('/user/' + username + '/private', onMessageReceivedPrivate);
        userJoin();
        console.log("connected");
    }
    const onError = (err) => {
        console.log(err);
        updateStompClient(null);
    }
    const userJoin = () => {
        var chatMessage = {
            sendername: username,
            status: "JOIN"
        };
        stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
        console.log("userjoin");
    }

    useEffect(() => {
        console.log(username + " USERNAME");
        if (stompClient === null && username !== "") createConnexion();
        else connect();
    }, [stompClient]);

    return (
        <React.Fragment>
            <header id="header" className={role === "ENSEIGNANT" ? "header fixed-top d-flex align-items-center sbEnseignant" : "header fixed-top d-flex align-items-center"}>

                <div className="d-flex align-items-center justify-content-between">
                    <a href="index.html" className="logo d-flex align-items-center">
                        <img src="assets/img/logo.png" alt="" />
                        <span className="d-none d-lg-block">Gestion Ressources</span>
                    </a>
                    {role === "FOURNISSEUR" ? <></> : <i className="bi bi-list toggle-sidebar-btn" onClick={toggle}></i>}
                </div>

                <nav className="header-nav ms-auto">
                    <ul className="d-flex align-items-center">
                        {role === "CHEFDEPARTEMENT"?
                            <li className="nav-item dropdown">
                                <Notifier stompClient={stmp} />
                            </li>
                            :
                            <></>
                        }

                        <Messagerie />

                        <li className="nav-item dropdown pe-3">

                            <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                                <img src="/assets/img/profile-img.jpg" alt="Profile" className="rounded-circle" />
                                <span className="d-none d-md-block dropdown-toggle ps-2">{String(nom).toUpperCase()}</span>
                            </a>
                            {/* <!-- End Profile Iamge Icon --> */}

                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                                <li className="dropdown-header">
                                    <h6>{String(nom).toUpperCase()} &nbsp; {String(prenom).toUpperCase()}</h6>
                                    <span>{String(role).toUpperCase()}</span>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li>
                                    <a className="dropdown-item d-flex align-items-center" >
                                        <i className="bi bi-person"></i>
                                        <span>Mon Profil</span>
                                    </a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider"></hr>
                                </li>

                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li>
                                    <a className="dropdown-item d-flex align-items-center" href="#">
                                        <i className="bi bi-box-arrow-right"></i>
                                        <span><Link to={"/"}>Déconnection</Link></span>
                                    </a>
                                </li>

                            </ul>
                            {/* <!-- End Profile Dropdown Items --> */}
                        </li>

                    </ul>
                </nav>

            </header>
        </React.Fragment>
    )
}

export default Header