import React, { Fragment } from 'react';
import Table from './Table';
import axios from 'axios';
import ModalComponent from './ModalComponent';

export default class warehouse extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            columns: ["PIMAGE","PTYPE","PID","PNAME","PNO","PPRICE"],
            productList: [],
            rowDetails: {}
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.get = this.get.bind(this);
        this.getData();
    }

    componentDidUpdate() {
        const cpid = document.getElementById('pid');
        const addProductButton = document.getElementById('addProduct');
        if(this.state.productList.length > 0) {
            addProductButton.hidden = false;
            this.handleChange();
        } else {
            addProductButton.hidden = true;
            cpid.value = 'e' + 1;
        }
    }

    handleChange() {
        const nptype = document.getElementById('ptype');
        const npid = document.getElementById('pid');
        let type = '';
        if(nptype.value === 'e-device') {
            type = 'e';
        } else if(nptype.value === 'clothes') {
            type = 'c';
        } else if(nptype.value === 'furniture') {
            type = 'h';
        } else if(nptype.value === 'food') {
            type = 'f';
        }
        let max = 0;
        for(let i = 0;i<this.state.productList.length;i++) {
            if(this.state.productList[i].pid.charAt(0) === type){
                let num = this.state.productList[i].pid.slice(1,this.state.productList[i].pid.length);
                if(Number(num) > max){
                    max = Number(num);
                }
            }
        }
        max++;
        npid.value = type + max;
    }

    getData() {
        axios.get("http://localhost:5000/warehouse")
            .then(res => {
                console.log('Data from backend', res.data);
                const tempList = res.data.data.map(obj => {
                    delete obj._id;
                    delete obj.__v;
                    return obj;
                })
                tempList.sort((a,b) => (a.ptype > b.ptype) ? 1 : ((b.ptype > a.ptype) ? -1 : 0));
                this.setState({
                    productList: tempList
                });
            });
    }

    get() {
        this.getData();
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
                axios.post("http://localhost:5000/warehouse/productList/add", productData)
                    .then(res => {
                        console.log(res.data.message);
                        document.getElementById('reset').click();
                        this.getData();
                    });
            }
        } else {
            console.log("Form empty!!");
        }
    }

    addProduct = e => {
        console.log("Add list of products to customer view table!!");
        const edeviceList = [], clothList = [], furnitureList = [], foodList = [];
        for(let i=0;i<this.state.productList.length;i++) {
            if(this.state.productList[i].ptype === 'e-device') {
                edeviceList.push(this.state.productList[i]);
            }
            if(this.state.productList[i].ptype === 'clothes') {
                clothList.push(this.state.productList[i]);
            }
            if(this.state.productList[i].ptype === 'furniture') {
                furnitureList.push(this.state.productList[i]);
            }
            if(this.state.productList[i].ptype === 'food') {
                foodList.push(this.state.productList[i]);
            }
        }
        console.log('E-device', edeviceList);
        console.log('Clothes', clothList);
        console.log('Food', foodList);
        console.log('Furniture', furnitureList);
        axios.post("http://localhost:5000/customer/productList/edevice/add", edeviceList)
                    .then(res => {
                        console.log(res.data.message);
                    });
        axios.post("http://localhost:5000/customer/productList/clothes/add", clothList)
                    .then(res => {
                        console.log(res.data.message);
                    });
        axios.post("http://localhost:5000/customer/productList/food/add", foodList)
                    .then(res => {
                        console.log(res.data.message);
                    });
        axios.post("http://localhost:5000/customer/productList/furniture/add", furnitureList)
                    .then(res => {
                        console.log(res.data.message);
                    });
    }
    
    handleDelete(row) {
        console.log("Delete!!", row);
        axios.delete("http://localhost:5000/warehouse/productList/delete", {data: {id: row.pid}})
            .then(res => {
                console.log(res.data.message);
                this.getData();
            })
    }

    handleEdit(row) {
        console.log("Edit!!", row);
        this.setState({
            rowDetails: row
        });
        document.getElementById('myBtn').click();
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
                        <select id="ptype" onChange={this.handleChange} >
                        <option value="e-device">E-devices</option>
                        <option value="clothes">Clothes</option>
                        <option value="food">Food</option>
                        <option value="furniture">Furniture</option>
                        </select><br/>
                        <label>Product id:</label>
                        <input type="text" id="pid" name="pid" disabled/><br/>
                        <label>Product name:</label>
                        <input type="text" id="pname" name="pname"/><br/>
                        <label>Product image:</label>
                        <input type="file" id="pimg" name="pimg" accept="image/*"/><br/>
                        <label>Product quantity:</label>
                        <input type="number" id="pno" name="pno" defaultValue="0"/><br/>
                        <label>Product price(each):</label>
                        <input type="number" id="pprice" name="pprice" defaultValue="0"/><br/>
                        <button type="button" className="btn btn-dark mx-1" onClick={this.addNewProduct}>Add</button>
                        <button type="reset" id="reset" className="btn btn-dark mx-1" onClick={this.get}>Reset</button>
                    </form>
                </div>
                <div className="producList">
                    {
                    //shows list of products to be sold
                    }
                    <p>List of products:</p>
                    <Table columns={this.state.columns} data={this.state.productList} delete={this.handleDelete} edit={this.handleEdit} hidden/><br/>
                    <button type="button" id="addProduct" className="btn btn-dark mx-1" onClick={this.addProduct} hidden>Add</button>
                </div>
                {
                    //Modal
                }
            <ModalComponent row={this.state.rowDetails} get={this.get} />
            </Fragment>
        );
    }
    
}