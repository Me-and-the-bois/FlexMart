import React, { Fragment } from 'react';
import axios from 'axios';

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
        this.getData();
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

    handleClick(obj) {
        const dname = document.getElementById('dname' + obj._id).value;
        axios.put("http://localhost:5000/delivery/update", {_id: obj._id, deliveryman: dname})
            .then(res => {
                console.log(res.data);
                this.getData();
            });
    }

    render() {
        return(
            <Fragment>
                <div>
                {
                    this.state.products.map((obj) => {
                        return (
                            <div className="jumbotron" key={obj._id}>
                                <div className="container">Delivered: {obj.delivered}</div>
                                <div className="container">Delivery man assigned: {obj.deliveryman}</div>
                                {
                                    obj.list.map(elem => {
                                        return (
                                            <div className="container" key={elem._id}>
                                                <div className="row">
                                                    <div className="col-sm-4"><img src={elem.pimg} alt={elem.pname} height="100" width="100"/></div>
                                                    <div className="col-sm-8">
                                                        <p className="lead">Product Name: {elem.pname}</p>
                                                        <p className="lead">Product Price: {elem.pprice}</p>
                                                        <p className="lead">Number of items bought: {elem.pno}</p>
                                                        <p className="lead">Total Price: {elem.tprice}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                                <div className="container">
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
                                    <button type="button" className="btn btn-danger my-2" onClick={() => {this.handleClick(obj)}}>Assign delivery man</button>
                                </div>
                            </div>
                        )
                    })
                    
                }
                </div>
            </Fragment>
        );
    }
    
}