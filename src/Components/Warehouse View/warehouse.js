import React, { Fragment } from 'react';
import axios from 'axios';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBCard, MDBCardBody, MDBCardHeader } from 'mdbreact';
import Navbar from '../layout/navbar';
import './warehouse.css';

export default class warehouse extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            productList: [],
            rowDetails: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.get = this.get.bind(this);
        this.getData();
    }

    componentDidUpdate() {
        const cpid = document.getElementById('pid');
        if(this.state.productList.length > 0) {
            this.handleChange();
        } else {
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

    render() {
        return(
            <Fragment>
                <Navbar type='warehouse'/>
                <MDBContainer>
                    <div  className="my-5">
                    <MDBRow>
                        <MDBCol md="12">
                        <MDBCard>
                            <MDBCardHeader style={{backgroundColor: "black", color: "yellow"}}>
                                <p className="h4 text-center py-4">Add New Product:</p>
                            </MDBCardHeader>
                            <MDBCardBody>
                            <div className="newProduct">
                                <form>
                                    <div className="black-text">
                                        <label>Product type:</label>
                                        <select id="ptype" className="browser-default custom-select" onChange={this.handleChange} >
                                            <option value="e-device">E-devices</option>
                                            <option value="clothes">Clothes</option>
                                            <option value="food">Food</option>
                                            <option value="furniture">Furniture</option>
                                        </select><br/><br/>
                                        <label>
                                        Product Id:
                                        </label>
                                        <textarea
                                        className="form-control"
                                        id="pid"
                                        name="pid"
                                        rows="1"
                                        disabled
                                        />
                                        <MDBInput
                                            label="Product Name:"
                                            group
                                            type="text"
                                            id="pname"
                                            name="pname"
                                        />
                                        <label>
                                        Product Image:
                                        </label>
                                        <MDBInput
                                            group
                                            type="file"
                                            id="pimg"
                                            name="pimg"
                                            accept="image/*"
                                        />
                                        <MDBInput
                                            label="Product quantity:"
                                            group
                                            type="number"
                                            id="pno"
                                            name="pno"
                                            min="1"
                                        />
                                        <MDBInput
                                            label="Product price:"
                                            group
                                            type="number"
                                            id="pprice"
                                            name="pprice"
                                            min="1"
                                        />
                                    </div>
                                    <div className="text-center py-4 mt-3">
                                        <button type="button" className="btn btn-dark mx-1" onClick={this.addNewProduct}>Add</button>
                                        <button type="reset" id="reset" className="btn btn-dark mx-1" onClick={this.get}>Reset</button>
                                    </div>
                                </form>
                            </div>
                            </MDBCardBody>
                        </MDBCard>
                        </MDBCol>
                    </MDBRow>
                    </div>
                </MDBContainer>
            </Fragment>
        );
    }
    
}