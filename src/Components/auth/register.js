import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';

const register = ()  => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const history = useHistory();
    const handleClick = e => {
        e.preventDefault();
        console.log("Sign Up clicked!!");
        history.push('/login');
    }
    return(
        <Fragment>
            <p>Register Component!!</p>
            <p>The button below will route the user to the login page after successful registration of the user.</p>
            <button type="button" className="btn btn-dark" onClick={handleClick}>Sign Up</button>
        </Fragment>
    );
}

export default register;