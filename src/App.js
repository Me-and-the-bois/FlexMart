import { Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Login from "../src/Components/auth/Login";
import welcomePage from "../src/Components/auth/welcomePage";
import warehouse from "./Components/Warehouse View/warehouse";
import delivery from "./Components/Delivery View/delivery";
import admin from "./Components/Admin View/admin";
import customer from "./Components/Customer View/customer";
import edevice from "./Components/Customer View/edevices";
import clothes from "./Components/Customer View/clothes";
import food from "./Components/Customer View/food";
import furniture from "./Components/Customer View/furniture";
import cart from "./Components/Customer View/cart";
import AdminLogin from "../src/Components/auth/Login/AdminLogin";
import CustomerLogin from "./Components/auth/Login/CustomerLogin";
import VendorLogin from "./Components/auth/Login/VendorLogin";
import CustomerSignUp from "./Components/auth/SignUp/CustomerSignUp";
import React, { Component } from "react";

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Fragment>
            <Route exact path="/" component={welcomePage} />
            <Route exact path="/Login" component={Login} />
            <Route exact path="/Login/Admin" component={AdminLogin} />
            <Route exact path="/Login/Customer" component={CustomerLogin} />
            <Route exact path="/Login/Vendor" component={VendorLogin} />
            <Route exact path="/SignUp/Customer" component={CustomerSignUp} />
            <section className="container"></section>
            <Route exact path="/customer/dashboard" component={customer} />
            <Route
              exact
              path="/customer/dashboard/e-devices"
              component={edevice}
            />
            <Route
              exact
              path="/customer/dashboard/clothes"
              component={clothes}
            />
            <Route exact path="/customer/dashboard/food" component={food} />
            <Route
              exact
              path="/customer/dashboard/furniture"
              component={furniture}
            />
            <Route exact path="/customer/cart" component={cart} />
            <Route exact path="/admin/dashboard" component={admin} />
            <Route exact path="/delivery/dashboard" component={delivery} />
            <Route exact path="/warehouse/dashboard" component={warehouse} />
          </Fragment>
        </Router>
      </div>
    );
  }
}
