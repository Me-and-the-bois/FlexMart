import React, { Fragment } from 'react';
import Cart from './cart';

export default class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            obj: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            obj: nextProps.dataObj
        };
    }

    handleChange() {
        console.log('Quantity:', document.getElementById('quantity').value);
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.obj.pno = document.getElementById('quantity').value;
        console.log(this.state.obj);
    }

    handleClick() {
        console.log('Product added to cart:', this.state.obj);
    }

    render() {
        return(
            <Fragment>
                <form>
                    <div className="card m-2">
                        <h5 className="card-header align-content:center">Product id: {this.props.dataObj.pid}</h5>
                        <img className="card-img-top m-1" src={this.props.dataObj.pimg} alt={this.props.dataObj.pname}/>
                        <div className="card-body">
                            <h5 className="card-title">{this.props.dataObj.pname}</h5>
                            <p className="card-text">Price: {this.props.dataObj.pprice}</p>
                            <p className="card-text">Available: {this.props.dataObj.pno}</p>
                            <span>Number:</span>
                            <input type="number" id="quantity" name="quantity" min="1" max={this.props.dataObj.pno} onChange={this.handleChange}/>
                            <button type="button" className="btn btn-dark my-1" onClick={this.handleClick}>Add to cart</button>
                        </div>
                    </div>
                </form>
            </Fragment>
        );
    }
}