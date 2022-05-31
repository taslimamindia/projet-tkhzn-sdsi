import React, { useContext } from "react";
import Header from "../Header";
import { Leftside } from "./Leftside";
import { Layout } from "./Layout";
import { Footer } from "../Footer";
import TokenContext from "../context/TokenContext";
import Connection from "../connection/Connection";

function Enseignant() {
  const { token, role } = useContext(TokenContext);
  console.log(token)
  return (
    (token !== "" && (role === "CHEFDEPARTEMENT" || role === "ENSEIGNANT" || role === "ADMINISTRATIF")) ?
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

export default Enseignant;