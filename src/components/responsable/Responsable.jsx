import React, { useContext, useEffect, useState } from 'react'

import Header from '../Header';
import { Footer } from '../Footer';

import { Leftside } from './Leftside';
import Layout from './Layout';
import TokenContext from '../context/TokenContext';
import Connection from '../connection/Connection';

function Responsable() {
  const {role, token} = useContext(TokenContext)

  return (
    (token !== "" && (role === "RESPONSABLE" || role === "ADMIN")) ?
      <>
        <Header />
        <Leftside />
        <Layout />
        <Footer />
      </>
      :
      <Connection />
  )
}

export default Responsable;