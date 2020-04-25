import React, { Fragment } from 'react';
import axios from 'axios';

export default class delivery extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            products: []
        };
    }

    componentDidMount() {
        axios.get("http://localhost:5000/delivery/get")
            .then(res => {
                console.log('Data from backend', res.data);
                this.setState({
                    products: res.data.data
                });
            });
    }

    render() {
        return(
            <Fragment>
                <div>
                {
                    this.state.products.map((obj) => {
                        return (
                            <div className="jumbotron" key={Math.random()*10000}>
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
                                                        <button type="button" className="btn btn-danger" onClick={() => {this.handleClick(obj)}}>Assign delivery man</button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        );
                    })
                    
                }
                </div>
            </Fragment>
        );
    }
    
}