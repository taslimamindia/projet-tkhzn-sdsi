import React, { useContext, useEffect, useState } from 'react'

import Header from '../Header';
import { Footer } from '../Footer';

import { Leftside } from './Leftside';
import Layout from './Layout';
import TokenContext from '../context/TokenContext';
import Connection from '../connection/Connection';

function Maintenance() {
  const {role, token} = useContext(TokenContext)

  return (
    (token !== "" && (role === "MAINTENANCE" || role === "ADMIN")) ?
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

export default Maintenance;