import React, { Fragment } from 'react';
import './product.css';

class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            obj: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleModal = this.handleModal.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const disc = Number(nextProps.dataObj.pdiscount);
        const price = Number(nextProps.dataObj.pprice);
        let newprice = Math.floor(price - (price * disc)/100);
        let tempobj = nextProps.dataObj;
        tempobj.ppricenew = newprice;
        return {
            obj: tempobj
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

    handleModal() {
        this.props.modalview(this.state.obj);
    }

    render() {
        return(
            <Fragment>
                <div className="container m-1 body p-2" onClick={this.handleModal}>
                    <form>
                        <img src={this.state.obj.pimg} alt={this.state.obj.pname} className="img-responsive p-0 m-0"/>
                        <div className="px-0 detail">
                            <p className="name">{this.state.obj.pname} </p>
                            <label className="number px-1">Available: {this.state.obj.pno} </label><br/>
                            <label className="discprice px-1">Rs.{this.state.obj.ppricenew} </label>
                            <label className="discount px-1">{this.state.obj.pdiscount}% </label>
                            <label className="price">{this.state.obj.pprice} </label>
                        </div>
                    </form>
                        
                </div> 
            </Fragment>
        );
    }
}

export default Product;