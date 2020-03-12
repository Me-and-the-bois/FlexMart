import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';

const navbar = ()  => {
    return(
        <Fragment>
            <nav className="navbar navbar-dark navbar-inverse bg-dark">
                <div className="container-fluid">
                    <ul className="nav navbar-nav">
                        <li>
                            <Link to='/'><button type="button" className="btn btn-outline-warning">Flex Mart</button></Link>
                        </li>
                    </ul>
                    <ul className="nav navbar-nav ml-auto">
                        <li>
                            <Link to='/login'><button type="button" className="btn btn-light mx-1">Login</button></Link>
                            <Link to='/register'><button type="button" className="btn btn-light mx-1">Signup</button></Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </Fragment>
    );
}

export default navbar;