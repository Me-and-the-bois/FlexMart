import React, { Component, Fragment } from "react";
import Navbar from "../../layout/navbar";
export default class CustomerSignUp extends Component {
  state = {
    Email: "",
    Name: "",
    Phone: "",
    Password: "",
    UserType: "Customer",
  };
  EmailHandler = (event) => {
    this.setState({ Email: event.target.value });
  };
  NameHandler = (event) => {
    this.setState({ Name: event.target.value });
  };
  PhoneHandler = (event) => {
    this.setState({ Phone: event.target.value });
  };
  PassHandler = (event) => {
    this.setState({ Password: event.target.value });
  };
  SignEvent = (e) => {
    e.preventDefault();

    console.log(this.state);
  };
  render() {
    return (
      <Fragment>
        <Navbar type="welcome" />
        <div className="limiter">
          <div className="container-login100">
            <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50">
              <form className="login100-form validate-form">
                <span className="login100-form-title p-b-33">
                  Customer SignUp
                </span>

                <div
                  className="wrap-input100 "
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
                <div className="wrap-input100 ">
                  <input
                    className="input100"
                    type="text"
                    name="Name"
                    placeholder="Name"
                    value={this.state.Name}
                    onChange={this.NameHandler}
                  />
                  <span className="focus-input100-1"></span>
                  <span className="focus-input100-2"></span>
                </div>
                <div className="wrap-input100 ">
                  <input
                    type="tel"
                    className="input100"
                    name="phone"
                    pattern="[0-9]{10}"
                    placeholder="Phone Number"
                    value={this.state.Phone}
                    onChange={this.PhoneHandler}
                  />
                  <span className="focus-input100-1"></span>
                  <span className="focus-input100-2"></span>
                </div>

                <div
                  className="wrap-input100 rs1 "
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
                    className="btn btn-dark mx-1"
                    onClick={this.SignEvent}
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
