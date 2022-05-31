import React from "react";
import { Routes, Route} from 'react-router-dom';
import ListerPanne from "./accueil/ListerPanne";

function Layout() {

    return (
        <React.Fragment>

            <main id="main">
                <Routes>
                    <Route path='/' element={<ListerPanne />} />
                </Routes>
            </main>

        </React.Fragment>
    )
}

export default Layout;