import React, { Component, Fragment } from "react";
import Navbar from '../../layout/navbar';
import Axios from 'axios';
import './Login.css';
export default class AdminLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: "",
      Password: ""
    };
  }
  EmailHandler = (event) => {
    this.setState({ Email: event.target.value });
  };
  PassHandler = (event) => {
    this.setState({ Password: event.target.value });
  };

  SignIn = (e) => {
    e.preventDefault();
    console.log(this.state);
    if(this.state.Email.length>0 && this.state.Password) {
      Axios.post("http://localhost:5000/auth/admin/signin", {email: this.state.Email, password: this.state.Password})
        .then(res => {
          console.log(res.data.message, res.data.token);
          localStorage.setItem('token', res.data.token);
          this.props.history.push('/admin/dashboard');
        })
        .catch(err => {
          console.log("User id or password is not valid!!");
        })
    } else {
      console.log("Enter all fields correctly!!");
    }
  }
  render() {
    return (
      <Fragment>
        <Navbar type='welcome'/>   
        <div class="wrapper">
          <form class="form-signin">       
            <h2 class="form-signin-heading">Login</h2>
            <input type="text" class="form-control" name="username" placeholder="Email Address" required="true" autofocus="" value={this.state.Email}
                    onChange={this.EmailHandler} />
            <input type="password" class="form-control" name="password" placeholder="Password" required="true"  value={this.state.Password}
                    onChange={this.PassHandler}/>      
            <button class="btn btn-dark btn-sm" onClick={this.SignIn}>Login</button>   
          </form>
        </div>
      </Fragment>
    );
  }
}
