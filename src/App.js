import { Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Login from "../src/Components/auth/Login";
import welcomePage from "../src/Components/auth/welcomePage";
import warehouse from "./Components/Warehouse View/warehouse";
import record from "./Components/Warehouse View/record";
import delivery from "./Components/Delivery View/delivery";
import admin from "./Components/Admin View/admin";
import empadmin from "./Components/Admin View/empadmin";
import empdelivery from "./Components/Admin View/empdelivery";
import empwarehouse from "./Components/Admin View/empwarehouse";
import customerrecord from "./Components/Admin View/customerrecord";
import customer from "./Components/Customer View/customer/customer";
import edevice from "./Components/Customer View/customer/edevices";
import clothes from "./Components/Customer View/customer/clothes";
import food from "./Components/Customer View/customer/food";
import furniture from "./Components/Customer View/customer/furniture";
import cart from "./Components/Customer View/cart/cart";
import recom from "./Components/Customer View/customer/recom";
import AdminLogin from "../src/Components/auth/Login/AdminLogin";
import CustomerLogin from "./Components/auth/Login/CustomerLogin";
import DeliveryLogin from "./Components/auth/Login/DeliveryLogin";
import WarehouseLogin from "./Components/auth/Login/WarehouseLogin";
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
            <Route exact path="/Login/Delivery" component={DeliveryLogin} />
            <Route exact path="/Login/Warehouse" component={WarehouseLogin} />
            <Route exact path="/SignUp/Customer" component={CustomerSignUp} />
            <section className="container"></section>
            <Route exact path="/customer/dashboard" component={customer} />
            <Route exact path="/customer/recom" component={recom} />
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
            <Route 
            exact 
            path="/admin/dashboard/customerrecord" 
            component={customerrecord} />
            <Route exact path="/admin/dashboard/adminrecord" component={empadmin} />
            <Route exact path="/admin/dashboard/deliveryrecord" component={empdelivery} />
            <Route exact path="/admin/dashboard/warehouserecord" component={empwarehouse} />
            <Route exact path="/delivery/dashboard" component={delivery} />
            <Route exact path="/warehouse/dashboard" component={warehouse} />
            <Route exact path="/warehouse/record" component={record} />
          </Fragment>
        </Router>
      </div>
    );
  }
}
