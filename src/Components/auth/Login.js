import React, { Fragment } from "react";
import Navbar from '../layout/navbar';
import { Link } from "react-router-dom";
import "./welcomePage.css";

function Login() {
  return (
    <Fragment>
      <Navbar type='welcome'/>
      <div className="welcome-page">
        <div className="welcome-head">
          <h1>Login</h1>
        </div>
        <div className="welcome-components">
          <Link className="welcome-x" to="/Login/Admin">
          <button type="button" className="btn btn-dark mx-1">Admin</button>
          </Link>
          <Link className="welcome-x" to="/Login/Customer">
          <button type="button" className="btn btn-dark mx-1">Customer</button>
          </Link>
          <Link className="welcome-x" to="/Login/Vendor">
          <button type="button" className="btn btn-dark mx-1">Vendor</button>
          </Link>
        </div>
      </div>
    </Fragment>
  );
}

export default Login;
