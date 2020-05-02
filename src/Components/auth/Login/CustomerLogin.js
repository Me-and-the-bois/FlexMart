import React, { Component, Fragment } from "react";
import Navbar from '../../layout/navbar';
export default class AdminLogin extends Component {
  state = {
    Email: "",
    Password: "",
    UserType: "",
    IsLogged: false,
  };
  EmailHandler = (event) => {
    this.setState({ Email: event.target.value });
  };
  PassHandler = (event) => {
    this.setState({ Password: event.target.value });
  };

  LogEvent(e) {
    e.preventDefault();
    console.log(e);
  }
  render() {
    return (
      <Fragment>
        <Navbar type='welcome'/>
        <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50">
            <form className="login100-form validate-form">
              <span className="login100-form-title p-b-33">Customer Login</span>

              <div
                className="wrap-input100 validate-input"
                data-validate="Valid email is required: ex@abc.xyz"
              >
                <input
                  className="input100"
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={this.state.Email}
                  onChange={this.EmailHandler}
                />
                <span className="focus-input100-1"></span>
                <span className="focus-input100-2"></span>
              </div>
              <span className="focus-input100-1"></span>
              <span className="focus-input100-2"></span>

              <div
                className="wrap-input100 rs1 validate-input"
                data-validate="Password is required"
              >
                <input
                  className="input100"
                  type="password"
                  name="pass"
                  placeholder="Password"
                  value={this.state.Password}
                  onChange={this.PassHandler}
                />
                <span className="focus-input100-1"></span>
                <span className="focus-input100-2"></span>
              </div>

              <div className="container-login100-form-btn m-t-20">
                <button
                  className="login100-form-btn"
                  onClick={(e) => this.LogEvent(e)}
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      </Fragment>
    );
  }
}
