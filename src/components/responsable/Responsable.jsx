import React from 'react'

import Header from '../Header';
import { Footer } from '../Footer';

import { Leftside } from './Leftside';
import { Layout } from './Layout';

function Responsable() {
  return (
    <div>
        <Header/>
        <Leftside/>
        <Layout/>
        <Footer/>
    </div>
  )
}

export default Responsable;