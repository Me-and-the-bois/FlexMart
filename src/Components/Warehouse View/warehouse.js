import React, { Fragment } from 'react';
import Table from './Table';
import axios from 'axios';

export default class warehouse extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            columns: ["PIMAGE","PTYPE","PID","PNAME","PNO","PPRICE"],
            productList: []
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.getData();
    }
    componentDidUpdate() {
        const addProductButton = document.getElementById('addProduct');
        if(this.state.productList.length > 0) {
            addProductButton.hidden = false;
        } else {
            addProductButton.hidden = true;
        }
    }

    getData() {
        axios.get("http://localhost:5000")
            .then(res => {
                console.log('Data from backend', res.data);
                const tempList = res.data.data.map(obj => {
                    delete obj._id;
                    delete obj.__v;
                    return obj;
                })
                this.setState({
                    productList: tempList
                });
            });
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
            const reader = new FileReader();
            reader.readAsDataURL(pimg);
            reader.onloadend = () => {
                pimg = reader.result;
                const productData = {pimg,ptype,pid,pname,pno,pprice};
                axios.post("http://localhost:5000/productList", productData)
                    .then(res => {
                        console.log(res.data.message);
                        this.getData();
                    });
            }
        } else {
            console.log("Form empty!!");
        }
    }

    addProduct = e => {
        console.log("Add list of products to customer view table!!");
    }
    
    handleDelete(row) {
        console.log("Delete!!", row);
        axios.delete("http://localhost:5000/productList", {data: {id: row.pid}})
            .then(res => {
                console.log(res.data.message);
                this.getData();
            })
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
                    <Table columns={this.state.columns} data={this.state.productList} delete={this.handleDelete} hidden/><br/>
                    <button type="button" id="addProduct" className="btn btn-dark mx-1" onClick={this.addProduct} hidden>Add</button>
                </div>
            </Fragment>
        );
    }
    
}