import React, { Fragment } from 'react';
import Navbar from '../../layout/navbar';

const recom = ()  => {
    return(
        <Fragment>
            <Navbar type='recom'/>
            <p>
                Your recommendations will be displayed here!!
            </p>
        </Fragment>
    );
}

export default recom;