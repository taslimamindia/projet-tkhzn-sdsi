import React from 'react';

export default React.createContext({
    token:"",
    updateToken: name => {}    ,
    username:"",
    updateUsername: name => {},
    role:"",
    updateRole: name => {},
    nom:"",
    updateNom: name => {},
    prenom:"",
    updatePrenom: name => {},
    msg:false,
    updateMsg: name => {},
    stompClient:null,
    updateStompClient: name => {}
}) 


