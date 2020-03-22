import React, { Fragment } from 'react';
import {connect} from 'react-redux';

class Product extends React.Component {
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
        console.log('Quantity:', document.getElementById('quantity' + this.props.id).value);
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.obj.pno = document.getElementById('quantity' + this.props.id).value;

    }

    handleClick() {
        if(document.getElementById('quantity' + this.props.id).value) {
            document.getElementById('reset' + this.props.id).click();
            this.props.addToCart(this.state.obj);
        } else {
            console.log("Enter the number of products you want to buy!!");
        }
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
                            <input type="number" id={"quantity" + this.props.id} name="quantity" min="1" max={this.props.dataObj.pno} onChange={this.handleChange}/>
                            <button type="button" className="btn btn-dark my-1" onClick={this.handleClick}>Add to cart</button>
                            <button type="reset" id={"reset" + this.props.id} hidden>Reset</button>
                        </div>
                    </div>
                </form>
            </Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      addToCart: (obj) => dispatch({type: 'ADD_TO_CART', object: obj})
    }
}

export default connect(null, mapDispatchToProps)(Product);