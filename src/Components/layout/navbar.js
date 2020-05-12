import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';

class navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            custelem: ''
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let elem = '';
        if(nextProps.type === 'customer') {
            elem = (
                <span>
                    <Link to='/customer/dashboard'><button type="button" className="btn btn-outline-warning mx-1">Dashboard</button></Link>
                    <Link to='/customer/cart'><button type="button" className="btn btn-outline-warning mx-1">Cart</button></Link>
                </span>
            );
        } else if(nextProps.type === 'delivery') {
            
        } else if(nextProps.type === 'warehouse') {
            elem = (
                <span>
                    <Link to='/warehouse/record'><button type="button" className="btn btn-outline-warning">Record</button></Link>
                </span>
            );
        } else if(nextProps.type === 'warehouserecord') {
            elem = (
                <span>
                    <Link to='/warehouse/dashboard'><button type="button" className="btn btn-outline-warning">Warehouse</button></Link>
                </span>
            );
        }else if(nextProps.type === 'admin') {
            elem = (
                <span>
                    <Link to='/admin/dashboard/customerrecord'><button type="button" className="btn btn-outline-warning">Customer</button></Link>
                    <Link to='/admin/dashboard/adminrecord'><button type="button" className="btn btn-outline-warning">Admin</button></Link>
                    <Link to='/admin/dashboard/deliveryrecord'><button type="button" className="btn btn-outline-warning">Delivery</button></Link>
                    <Link to='/admin/dashboard/warehouserecord'><button type="button" className="btn btn-outline-warning">Warehouse</button></Link>
                </span>
            );
        } else if(nextProps.type === 'adminrecordadmin' || nextProps.type === 'adminrecordwarehouse' || nextProps.type === 'adminrecorddelivery' || nextProps.type === 'adminrecordcustomer') {
            elem = (
                <span>
                    <Link to='/admin/dashboard'><button type="button" className="btn btn-outline-warning">Dashboard</button></Link>
                </span>
            );
        }else if(nextProps.type === 'welcome') {
            elem = (
                <span>
                    <Link to='/'><button type="button" className="btn btn-outline-warning">Flex Mart</button></Link>
                </span>
            );
        } else if(nextProps.type === 'productdispedevice') {
            elem = (
                <span>
                    <Link to='/customer/dashboard/e-devices'><button type="button" className="btn btn-outline-warning">Products</button></Link>
                </span>
            );
        } else if(nextProps.type === 'productdispclothes') {
            elem = (
                <span>
                    <Link to='/customer/dashboard/clothes'><button type="button" className="btn btn-outline-warning">Products</button></Link>
                </span>
            );
        }
        else if(nextProps.type === 'productdispfurniture') {
            elem = (
                <span>
                    <Link to='/customer/dashboard/furniture'><button type="button" className="btn btn-outline-warning">Products</button></Link>
                </span>
            );
        } else if(nextProps.type === 'productdispfood') {
            elem = (
                <span>
                    <Link to='/customer/dashboard/food'><button type="button" className="btn btn-outline-warning">Products</button></Link>
                </span>
            );
        }       return {
            custelem: elem
        };
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
                    </div>
                </nav>
            </Fragment>
        );
    }
}

export default navbar;