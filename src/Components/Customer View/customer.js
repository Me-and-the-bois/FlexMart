import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';

const customer = ()  => {
    return(
        <Fragment>
            <Link to='/customer/dashboard/e-devices'><button type="button" className="btn btn-light mx-1">E-devices</button></Link>
            <Link to='/customer/dashboard/food'><button type="button" className="btn btn-light mx-1">Food</button></Link>
            <Link to='/customer/dashboard/furniture'><button type="button" className="btn btn-light mx-1">Furniture</button></Link>
            <Link to='/customer/dashboard/clothes'><button type="button" className="btn btn-light mx-1">Clothes</button></Link>
        </Fragment>
    );
}

export default customer;