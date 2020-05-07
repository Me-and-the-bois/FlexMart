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
            
        } else if(nextProps.type === 'welcome') {
            elem = (
                <span>
                    <Link to='/'><button type="button" className="btn btn-outline-warning">Flex Mart</button></Link>
                </span>
            );
        }
        return {
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