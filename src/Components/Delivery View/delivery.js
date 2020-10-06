import React, { Fragment } from 'react';
import axios from 'axios';
import Navbar from '../layout/navbar';
import './delivery.css';

export default class delivery extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            products: [],
            deliverymen: []
        };
        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        if(localStorage.getItem('token') === 'delivery') {
            this.getData();
        }
    }

    getData() {
        axios.get("http://localhost:5000/delivery/get")
            .then(res => {
                console.log('Data from backend', res.data);
                axios.get("http://localhost:5000/delivery/get/deliverymen")
                    .then(resp => {
                        console.log('Deliverymen data', resp.data);
                        this.setState({
                            products: res.data.data,
                            deliverymen: resp.data.data
                        });
                    })
            });
    }

    handleClickMan(obj) {
        const dname = document.getElementById('dname' + obj._id).value;
        axios.put("http://localhost:5000/delivery/update/man", {_id: obj._id, deliveryman: dname})
            .then(res => {
                console.log(res.data);
                this.getData();
            });
    }

    handleClickDelivery(obj) {
        axios.put("http://localhost:5000/delivery/update/delivery", {_id: obj._id})
            .then(res => {
                console.log(res.data);
                this.getData();
            });
    }

    handleClickRemove(obj) {
        axios.delete("http://localhost:5000/delivery/remove", {data: {_id: obj._id}})
            .then(res => {
                console.log(res.data);
                this.getData();
            });
    }

    render() {
        let elem = (<div style={{textAlign: "center"}}><h1>You need to login first...</h1></div>);
        if(localStorage.getItem('token') === 'delivery') {
            elem = (
                <div className="m-5">
                {
                    this.state.products.map((obj) => {
                        return (
                            <div className="jumbotron p-3" key={obj._id}>
                                <div className="row custdetails">
                                    <div className="col-sm-6">
                                        <div className="container">Delivered: {obj.delivered}</div>
                                        <div className="container">Delivery man assigned: {obj.deliveryman}</div>
                                    </div>
                                    <div className="col-sm-6">
                                        <p className="container">Customer Name: {obj.custdetail.name}</p>
                                        <p className="container">Email: {obj.custdetail.email}</p>
                                        <p className="container">Phone: {obj.custdetail.phone}</p>
                                    </div>
                                </div>
                                {
                                    obj.prodlist.map(elem => {
                                        return (
                                            <div className="container my-3" key={elem._id}>
                                                <div className="row">
                                                    <div className="col-sm-6"><img src={elem.pimg} alt={elem.pname} height="200" width="300"/></div>
                                                    <div className="col-sm-6">
                                                        <p className="container">Product Name: {elem.pname}</p>
                                                        <p className="container">Product Price: {elem.pprice}</p>
                                                        <p className="container">Number of items bought: {elem.pno}</p>
                                                        <p className="container">Total Price: {elem.tprice}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                                <div className="container p-0 m-0">
                                    <label className="lead">Assign delivery man:</label><br/>
                                    <select id={"dname" + obj._id} >
                                        {
                                            this.state.deliverymen.map(men => {
                                                return (
                                                    <option value={men} key={men}>{men}</option>
                                                );
                                            })
                                        }
                                    </select><br/>
                                    <button type="button" id="deliveryman" className="btn btn-danger m-0" onClick={() => {this.handleClickMan(obj)}}>Assign</button>
                                    <button type="button" id="delivered" className="btn btn-danger mx-1" onClick={() => {this.handleClickDelivery(obj)}}>Delivered</button>
                                    <button type="button" id="delivered" className="btn btn-danger mx-1" onClick={() => {this.handleClickRemove(obj)}}>Remove</button>
                                </div>
                            </div>
                        )
                    })
                    
                }
                </div>
            );
        }
        return(
            <Fragment>
                <Navbar type='delivery'/>
                {elem}
            </Fragment>
        );
    }
    
}