import React, { Fragment } from 'react';
import Navbar from "../layout/navbar";

const admin = ()  => {
    return(
        <Fragment>
            <Navbar type='admin'/>
            <p>Admin Component!!</p>
        </Fragment>
    );
}

export default admin;