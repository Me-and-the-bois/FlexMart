import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import "./customer.css";
import Navbar from "../layout/navbar";

class customer extends React.Component {
  render() {
    return (
      <div className="wholebody">
        <Fragment>
          <Navbar type="customer" />

          <div className="container">
            <div className="row m-3">
              <div className="col-sm-6">
                {/* <Link to='/customer/dashboard/e-devices'> */}
                <div
                  className="card edevice"
                  onClick={() => {
                    this.props.history.push("/customer/dashboard/e-devices");
                  }}
                >
                  <div className="card-body">
                    <h5 className="card-title">E-devices</h5>
                    <p className="card-text" style={{ color: "white" }}>
                      Click here to enter into a world of gadgets
                    </p>
                  </div>
                </div>
                {/* </Link> */}
              </div>
              <div className="col-sm-6">
                {/* <Link to='/customer/dashboard/food'> */}
                <div
                  className="card food"
                  onClick={() => {
                    this.props.history.push("/customer/dashboard/food");
                  }}
                >
                  <div className="card-body">
                    <h5 className="card-title">Food</h5>
                    <p className="card-text" style={{ color: "white" }}>
                      Click here to enter into a world of snacks for your tummy
                    </p>
                  </div>
                </div>
                {/* </Link> */}
              </div>
            </div>
            <div className="row m-3">
              <div className="col-sm-6">
                {/* <Link to='/customer/dashboard/furniture'> */}
                <div
                  className="card furniture"
                  onClick={() => {
                    this.props.history.push("/customer/dashboard/furniture");
                  }}
                >
                  <div className="card-body">
                    <h5 className="card-title">Furnitures</h5>
                    <p className="card-text" style={{ color: "white" }}>
                      Click here to enter into a world of furnitures and home
                      decors
                    </p>
                  </div>
                </div>
                {/* </Link> */}
              </div>
              <div className="col-sm-6">
                {/* <Link to='/customer/dashboard/clothes'> */}
                <div
                  className="card clothes"
                  onClick={() => {
                    this.props.history.push("/customer/dashboard/clothes");
                  }}
                >
                  <div className="card-body">
                    <h5 className="card-title">Clothes</h5>
                    <p className="card-text" style={{ color: "white" }}>
                      Click here to enter into a world of new fashion trends
                    </p>
                  </div>
                </div>
                {/* </Link> */}
              </div>
            </div>
          </div>
        </Fragment>
      </div>
    );
  }
}

export default withRouter(customer);
