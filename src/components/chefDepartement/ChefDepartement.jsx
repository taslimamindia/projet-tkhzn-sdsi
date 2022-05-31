import React, { useContext, useEffect } from 'react'


import TokenContext from '../context/TokenContext';
import Connection from '../connection/Connection';
import Header from '../Header';
import { Leftside } from './Leftside';
import Layout from './Layout';
import { Footer } from '../Footer';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';

function ChefDepartement() {
  const {token, role, stompClient, updateStompClient, msg, updateMsg, username } = useContext(TokenContext);

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
    if(stompClient === null && username !== "") createConnexion();
    else connect();
  }, [stompClient]);

  return (
    (token !== "" && (role === "CHEFDEPARTEMENT" || role === "ADMIN")) ?
      <div>
        <Header />
        <Leftside />
        <Layout />
        <Footer />
      </div>
      :
      <Connection />
  )
}

export default ChefDepartement;