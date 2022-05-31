import React from "react";
import { Routes, Route} from 'react-router-dom';

import Offre from "./offre/Offre";

function Layout() {

    return (
        <React.Fragment>

            <main id="main" className="mx-5">
                <Routes>
                    <Route path="/" element={<Offre />} />
                </Routes>
            </main>

        </React.Fragment>
    )
}

export default Layout;