import React, { Fragment } from "react";
import Navbar from '../layout/navbar';
import { Link } from "react-router-dom";
import "./welcomePage.css";
import './Login/Login.css';

function Login() {
  return (
    <Fragment>
      <Navbar type='welcome'/>
      <div className="wrapper">
        <form className="form-signin">       
          <h2 className="form-signin-heading">Login</h2>
          <Link className="welcome-x" to="/Login/Admin">
          <button type="button" className="btn btn-dark mx-1 login">Admin</button>
          </Link>
          <Link className="welcome-x" to="/Login/Customer">
          <button type="button" className="btn btn-dark mx-1 login">Customer</button>
          </Link>
          <Link className="welcome-x" to="/Login/Delivery">
          <button type="button" className="btn btn-dark mx-1 login">Delivery</button>
          </Link>
          <Link className="welcome-x" to="/Login/Warehouse">
          <button type="button" className="btn btn-dark mx-1 login">Warehouse</button>
          </Link> 
        </form>
      </div>
    </Fragment>
  );
}

export default Login;
