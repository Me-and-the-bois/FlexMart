import React, { Fragment } from 'react';
import {connect} from 'react-redux';
import { createStore } from 'redux';
import {withRouter} from 'react-router-dom';
import rootReducer from '../../reducers/rootReducer';
import Axios from 'axios';
import Navbar from '../layout/navbar';
import './cart.css';

class Cart extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            productList: [],
            totalprice: 0
        };
        this.handleClick = this.handleClick.bind(this);
        this.buy = this.buy.bind(this);
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        if(this.props.productList.length) {
            document.getElementById('topcart').hidden = false;
        } else {
            document.getElementById('topcart').hidden = true;
        }
        let tempList = this.props.productList;
        let totalprice = 0;
        tempList = tempList.map((obj) => {
            obj.tprice = Number(obj.ppricenew) * Number(obj.pno);
            totalprice += obj.tprice;
            return obj;
        })
        this.setState({
            productList: tempList,
            totalprice: totalprice
        });
    }

    handleClick(obj) {
        console.log('Remove object', obj._id);
        this.props.removeFromCart(obj);
        const store = createStore(rootReducer);
        console.log('Central State', store.getState());
        if(store.getState().productList.length) {
            document.getElementById('topcart').hidden = false;
        } else {
            document.getElementById('topcart').hidden = true;
        }
        let tempList = store.getState().productList;
        let totalprice = 0;
        tempList = tempList.map((obj) => {
            obj.tprice = Number(obj.pprice) * Number(obj.pno);
            totalprice += obj.tprice;
            return obj;
        })
        this.setState({
            productList: tempList,
            totalprice: totalprice
        });
    }

    buy() {
        const edevice = [], food = [], clothes = [], furniture = [];
        this.state.productList.forEach(obj => {
            if(obj.ptype === 'e-device') {
                edevice.push(obj);
            } else if(obj.ptype === 'clothes') {
                clothes.push(obj);
            } else if(obj.ptype === 'furniture') {
                furniture.push(obj);
            } else if(obj.ptype === 'food') {
                food.push(obj);
            }
        });
        console.log('E-devices', edevice);
        console.log('Food', food);
        console.log('Furniture', furniture);
        console.log('Clothes', clothes);
        Axios.post("http://localhost:5000/delivery/add", {data: this.state.productList})
            .then((res) => {
                console.log(res.data.message);
                if(edevice) {
                    Axios.post("http://localhost:5000/customer/productList/edevice/update", edevice)
                        .then(res => {
                            console.log(res.data.message);
                        });
                }
                if(clothes) {
                    Axios.post("http://localhost:5000/customer/productList/clothes/update", clothes)
                        .then(res => {
                            console.log(res.data.message);
                        });
                }
                if(food) {
                    Axios.post("http://localhost:5000/customer/productList/food/update", food)
                        .then(res => {
                            console.log(res.data.message);
                        });
                }
                if(furniture) {
                    Axios.post("http://localhost:5000/customer/productList/furniture/update", furniture)
                        .then(res => {
                            console.log(res.data.message);
                        });
                }
                this.remove();
                this.props.history.push("/customer/dashboard");
            },
            (err) => {
                console.log(err);
            });
    }

    remove() {
        console.log('Cart reset!!');
        this.props.clearCart(this.state.productList);
        const store = createStore(rootReducer);
        console.log('Central State', store.getState());
        if(store.getState().productList.length) {
            document.getElementById('topcart').hidden = false;
        } else {
            document.getElementById('topcart').hidden = true;
        }
        this.setState({
            productList: store.getState().productList
        });
    }

    render() {
        return(
            <Fragment>
                <Navbar type='customer'/>
                <div className="topcart m-2" id="topcart" hidden>
                    <p>Total price: {this.state.totalprice}</p>
                    <button type="button" id="buy" className="btn btn-dark m-1" onClick={this.buy}>Buy</button>
                    <button type="button" id="reset" className="btn btn-dark m-1" onClick={this.remove}>Clear Cart</button>
                </div>
                <div>
                {
                    this.state.productList.map((obj) => {
                        return (
                            <div className="jumbotron" key={obj._id}>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm-4"><img src={obj.pimg} alt={obj.pname}/></div>
                                        <div className="col-sm-8">
                                            <p className="lead">Product Name: {obj.pname}</p>
                                            <p className="lead">Product Price: {obj.ppricenew}</p>
                                            <p className="lead">Number of items bought: {obj.pno}</p>
                                            <p className="lead">Price:</p>
                                            <input type="text" id={"price" + obj._id} name="price" value={obj.tprice} readOnly/><br/><br/>
                                            <button type="button" className="btn btn-danger" onClick={() => {this.handleClick(obj)}}>Remove</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                    
                }
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        productList: state.productList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      removeFromCart: (obj) => dispatch({type: 'REMOVE_FROM_CART', object: obj}),
      clearCart: (data) => dispatch({type: 'CLEAR_CART', data: data})
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart));