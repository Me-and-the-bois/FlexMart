import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import Navbar from "../../layout/navbar";
import Axios from 'axios';
import '../Login/Login.css';
class CustomerSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: "",
      Name: "",
      Phone: "",
      Password: "",
      UserType: "Customer",
    };
  }
  
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
    if(this.state.Email.length>0 && this.state.Name.length>0 && this.state.Password && this.state.Phone.length>0 && this.state.UserType.length>0) {
      Axios.post("http://localhost:5000/auth/customer/signup", {email: this.state.Email, name: this.state.Name, password: this.state.Password, phone: this.state.Phone, type: this.state.UserType})
        .then(res => {
          console.log(res.data.message);
          this.props.history.push('/Login/Customer');
        })
        .catch(err => {
          console.log("User id already exists!!");
        })
    } else {
      console.log("Enter all fields correctly!!");
    }
  };
  render() {
    return (
      <Fragment>
        <Navbar type="welcome" />
        <div class="wrapper">
          <form class="form-signin">       
            <h2 class="form-signin-heading">Signup</h2>
            <input type="text" class="form-control" name="name" placeholder="Name" required="true" autofocus="" value={this.state.Name}
                    onChange={this.NameHandler} />
            <input type="text" class="form-control" name="phone" placeholder="Phone" required="true" autofocus="" value={this.state.Phone}
                    onChange={this.PhoneHandler} />
            <input type="text" class="form-control" name="username" placeholder="Email Address" required="true" autofocus="" value={this.state.Email}
                    onChange={this.EmailHandler} />
            <input type="password" class="form-control" name="password" placeholder="Password" required="true"  value={this.state.Password}
                    onChange={this.PassHandler}/>      
            <button class="btn btn-dark btn-sm">Login</button>   
          </form>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(CustomerSignUp);
