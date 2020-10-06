import React, { Fragment } from 'react';
import {Link, withRouter} from 'react-router-dom';

class navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            custelem: '',
            custelemrev: ''
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let elem = '', revelem='', logoutbtn = '',signinbtn = '';
        if(localStorage.getItem('token')) {
            logoutbtn = (
                <Link to='/Login'>
                    <button type="button" className="btn btn-outline-danger mx-1" onClick={navbar.handleLogOut}><i className="fa fa-power-off" aria-hidden="true"></i></button>
                </Link>
            );
        } else {
            signinbtn = (
                <Link to='/Login'>
                    <button type="button" className="btn btn-outline-success mx-1" onClick={navbar.handleSignIn}><i className="fa fa-sign-in" aria-hidden="true"></i></button>
                </Link>
            );
        }
        if(nextProps.type === 'customer') {
            elem = (
                <span>
                    <Link to='/customer/dashboard'><button type="button" className="btn btn-outline-warning mx-1">Dashboard</button></Link>
                    {signinbtn}
                    <Link to='/customer/recom'><button type="button" className="btn btn-outline-warning mx-1">Recommendations</button></Link>
                </span>
            );
            revelem = (
                <span>
                    <Link to='/customer/cart'><button type="button" className="btn btn-outline-warning mx-1">Cart</button></Link>
                    {logoutbtn}
                </span>
            );
        } else if(nextProps.type === 'recom') {
            elem = (
                <span>
                    <Link to='/customer/dashboard'><button type="button" className="btn btn-outline-warning mx-1">Dashboard</button></Link>
                </span>
            );
            revelem = (
                <span>
                    <Link to='/customer/cart'><button type="button" className="btn btn-outline-warning mx-1">Cart</button></Link>
                    {logoutbtn}
                </span>
            );
        }else if(nextProps.type === 'delivery') {
            revelem = (
                <span>
                    {logoutbtn}
                </span>
            );
        } else if(nextProps.type === 'warehouse') {
            elem = (
                <span>
                    <Link to='/warehouse/record'><button type="button" className="btn btn-outline-warning">Record</button></Link>
                    {signinbtn}
                </span>
            );
            revelem = (
                <span>
                    {logoutbtn}
                </span>
            );
        } else if(nextProps.type === 'warehouserecord') {
            elem = (
                <span>
                    <Link to='/warehouse/dashboard'><button type="button" className="btn btn-outline-warning">Warehouse</button></Link>
                    {signinbtn}
                </span>
            );
            revelem = (
                <span>
                    {logoutbtn}
                </span>
            );
        }else if(nextProps.type === 'admin') {
            elem = (
                <span>
                    <Link to='/admin/dashboard/customerrecord'><button type="button" className="btn btn-outline-warning">Customer</button></Link>
                    <Link to='/admin/dashboard/adminrecord'><button type="button" className="btn btn-outline-warning">Admin</button></Link>
                    <Link to='/admin/dashboard/deliveryrecord'><button type="button" className="btn btn-outline-warning">Delivery</button></Link>
                    <Link to='/admin/dashboard/warehouserecord'><button type="button" className="btn btn-outline-warning">Warehouse</button></Link>
                    {signinbtn}
                </span>
            );
            revelem = (
                <span>
                    {logoutbtn}
                </span>
            );
        } else if(nextProps.type === 'adminrecordadmin' || nextProps.type === 'adminrecordwarehouse' || nextProps.type === 'adminrecorddelivery' || nextProps.type === 'adminrecordcustomer') {
            elem = (
                <span>
                    <Link to='/admin/dashboard'><button type="button" className="btn btn-outline-warning">Dashboard</button></Link>
                    {signinbtn}
                </span>
            );
            revelem = (
                <span>
                    {logoutbtn}
                </span>
            );
        }else if(nextProps.type === 'welcome') {
            elem = (
                <span>
                    <Link to='/'><button type="button" className="btn btn-outline-warning">Flex Mart</button></Link>
                    <Link to='/customer/dashboard'><button type="button" className="btn btn-outline-warning">Dashboard</button></Link>
                </span>

            );
        } else if(nextProps.type === 'productdispedevice') {
            elem = (
                <span>
                    <Link to='/customer/dashboard/e-devices'><button type="button" className="btn btn-outline-warning">Products</button></Link>
                    {signinbtn}
                </span>
            );
            revelem = (
                <span>
                    {logoutbtn}
                </span>
            );
        } else if(nextProps.type === 'productdispclothes') {
            elem = (
                <span>
                    <Link to='/customer/dashboard/clothes'><button type="button" className="btn btn-outline-warning">Products</button></Link>
                    {signinbtn}
                </span>
            );
            revelem = (
                <span>
                    {logoutbtn}
                </span>
            );
        }
        else if(nextProps.type === 'productdispfurniture') {
            elem = (
                <span>
                    <Link to='/customer/dashboard/furniture'><button type="button" className="btn btn-outline-warning">Products</button></Link>
                    {signinbtn}
                </span>
            );
            revelem = (
                <span>
                    {logoutbtn}
                </span>
            );
        } else if(nextProps.type === 'productdispfood') {
            elem = (
                <span>
                    <Link to='/customer/dashboard/food'><button type="button" className="btn btn-outline-warning">Products</button></Link>
                    {signinbtn}
                </span>
            );
            revelem = (
                <span>
                    {logoutbtn}
                </span>
            );
        }      return {
            custelem: elem,
            custelemrev: revelem
        };
    }


    static handleLogOut = () => {
        localStorage.removeItem('token');
        console.log("Successfully logged out!!");
    }


    render() {
        return(
            <Fragment>
                <nav className="navbar navbar-dark navbar-inverse bg-dark">
                    <div className="container-fluid">
                        <ul className="nav navbar-nav">
                            <li>
                                {
                                    this.state.custelem
                                }
                            </li>
                        </ul>
                        <ul className="nav navbar-nav ml-auto">
                            <li>
                                {
                                    this.state.custelemrev
                                }
                            </li>
                        </ul>
                    </div>
                </nav>
            </Fragment>
        );
    }
}
export default withRouter(navbar);