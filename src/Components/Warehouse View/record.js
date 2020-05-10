import React, { Fragment } from 'react';
import Table from './Table';
import axios from 'axios';
import ModalComponent from './ModalComponent';
import Navbar from '../layout/navbar';
import './warehouse.css';

export default class warehouse extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            columns: ["PID","PIMAGE","PTYPE","PCATEGORY","PNAME","PNO","PPRICE","PDISCOUNT","PDESC","DELETE","EDIT"],
            productList: [],
            rowDetails: {}
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.getData = this.getData.bind(this);
        this.get = this.get.bind(this);
    }

    componentDidMount() {
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

    get() {
        this.getData();
    }

    getData() {
        axios.get("http://localhost:5000/warehouse")
            .then(res => {
                console.log('Data from backend', res.data);
                const tempList = res.data.data.map(obj => {
                    delete obj.__v;
                    return obj;
                })
                tempList.sort((a,b) => (a.ptype > b.ptype) ? 1 : ((b.ptype > a.ptype) ? -1 : 0));
                this.setState({
                    productList: tempList
                });
            });
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
        axios.delete("http://localhost:5000/warehouse/productList/delete", {data: {id: row._id}})
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
                <Navbar type='warehouserecord'/>
                <div className="productList">
                    <Table columns={this.state.columns} data={this.state.productList} delete={this.handleDelete} edit={this.handleEdit} hidden/><br/>
                    <div className="addbutton">
                        <button type="button" id="addProduct" className="btn btn-dark mx-1" onClick={this.addProduct} hidden>Add</button>
                    </div>
                </div>
            <ModalComponent row={this.state.rowDetails} get={this.get} />
            </Fragment>
        );
    }
    
}