import React, { Fragment } from 'react';
import Table from './Table';

export default class warehouse extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            columns: [],
            productList: []
        };
    }
    componentDidUpdate() {
        const addProductButton = document.getElementById('addProduct');
        if(this.state.productList) {
            addProductButton.hidden = false;
        } else {
            addProductButton.hidden = true;
        }
    }
    addNewProduct = e => {
        e.preventDefault();
        console.log("Add button clicked!!");
        const ptype = document.getElementById('ptype').value;
        const pid = document.getElementById('pid').value;
        const pname = document.getElementById('pname').value;
        let pimg = document.getElementById('pimg').files[0];
        const pno = document.getElementById('pno').value;
        const pprice = document.getElementById('pprice').value;
        if(pid&&pname&&pimg&&pno&&pprice) {
            console.log("New product added!!");
            //send to database
            pimg = URL.createObjectURL(pimg);
            const productData = {ptype,pid,pname,pimg,pno,pprice};
            this.tempList = [...this.state.productList];
            this.tempList.push(productData);
            console.log(this.tempList);
            this.setState({
                productList: this.tempList,
                columns: ["PTYPE","PID","PNAME","PIMAGE","PNO","PPRICE"]
            }, () => {
                console.log('Updated Product List', this.state.productList);
            });
        } else {
            console.log("Form empty!!");
        }
    }

    addProduct = e => {
        console.log("Add list of products to customer view table!!");
    }
    
    render() {
        return(
            <Fragment>
                <header><h1>FlexMart Online Store</h1></header>
                <div className="newProduct">
                    {
                    //to add new products to database
                    }
                    <p>Add new product:</p>
                    <form>
                        <label>Product type:</label>
                        <select id="ptype">
                        <option value="e-device">E-devices</option>
                        <option value="clothes">Clothes</option>
                        <option value="food">Food</option>
                        <option value="furniture">Furniture</option>
                        </select><br/>
                        <label>Product id:</label>
                        <input type="text" id="pid" name="pid" required/><br/>
                        <label>Product name:</label>
                        <input type="text" id="pname" name="pname"/><br/>
                        <label>Product image:</label>
                        <input type="file" id="pimg" name="pimg" accept="image/*"/><br/>
                        <label>Product quantity:</label>
                        <input type="number" id="pno" name="pno" defaultValue="0"/><br/>
                        <label>Product price:</label>
                        <input type="number" id="pprice" name="pprice" defaultValue="0"/><br/>
                        <button type="button" className="btn btn-dark mx-1" onClick={this.addNewProduct}>Add</button>
                        <button type="reset" className="btn btn-dark mx-1">Reset</button>
                    </form>
                </div>
                <div className="producList">
                    {
                    //shows list of products to be sold
                    }
                    <p>List of products:</p>
                    <Table columns={this.state.columns} data={this.state.productList}/><br/>
                    <button type="button" id="addProduct" className="btn btn-dark mx-1" onClick={this.addProduct} hidden>Add</button>
                </div>
            </Fragment>
        );
    }
    
}