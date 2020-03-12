import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';

const login = ()  => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const history = useHistory();
    const handleClick = e => {
        e.preventDefault();
        console.log("Log In clicked!!");
        history.push('/customer/dashboard');
    }
    return(
        <Fragment>
            <p>Login Component!!</p>
            <p>The button below will route the user to the main dashboard for customer view</p>
            <button type="button" className="btn btn-dark" onClick={handleClick}>Login</button>
        </Fragment>
    );
}

export default login;