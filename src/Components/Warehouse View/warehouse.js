import React, { Fragment } from 'react';
import axios from 'axios';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBCard, MDBCardBody, MDBCardHeader } from 'mdbreact';
import Navbar from '../layout/navbar';
import './warehouse.css';
import {storage} from '../firebase/index';

export default class warehouse extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            productList: [],
            rowDetails: {},
            options: ["laptop", "desktop", "phone", "tablet", "tv"]
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        const nptype = document.getElementById('ptype').value;
        if(nptype === 'e-device') {
            const options = ["laptop", "desktop", "phone", "tablet", "tv"];
            this.setState({
                options: options
            });
        } else if(nptype === 'clothes') {
            const options = ["men", "women", "children"];
            this.setState({
                options: options
            });
        } else if(nptype === 'furniture') {
            const options = ["bed", "storage", "sofa", "tablechair"];
            this.setState({
                options: options
            });
        } else if(nptype === 'food') {
            const options = ["snacks", "liquid", "can", "packaged"];
            this.setState({
                options: options
            });
        }
    }

    addNewProduct = e => {
        e.preventDefault();
        console.log("Add button clicked!!");
        const ptype = document.getElementById('ptype').value;
        const pcategory = document.getElementById('pcategory').value;
        const pname = document.getElementById('pname').value;
        let pimg = document.getElementById('pimg').files[0];
        const pno = document.getElementById('pno').value;
        const pprice = document.getElementById('pprice').value;
        const pdiscount = document.getElementById('pdiscount').value;
        const pdesc = document.getElementById('pdesc').value;
        if(pname&&pimg&&pno&&pprice&&pdesc) {
            console.log("New product added!!");
            //send to database
            const uploadTask = storage.ref(`images/${pimg.name}`).put(pimg);
            uploadTask.on('state_changed', 
            (snapshot) => {},
            (error) => {
                console.log('Firebase image upload error', error);
                this.notifyB('Error');
            },
            () => {
                storage.ref('images').child(pimg.name).getDownloadURL()
                    .then(url => {
                        console.log('URL', url);
                        const productData = {pimg: url,ptype,pcategory,pname,pno,pprice,pdiscount,pdesc};
                        axios.post("http://localhost:5000/warehouse/productList/add", productData)
                            .then(res => {
                                console.log(res.data.message);
                                document.getElementById('reset').click();
                            });
                    })
            });
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
                            <MDBCardHeader style={{backgroundColor: "black", color: "white"}}>
                                <p className="h4 text-center py-4">Add New Product:</p>
                            </MDBCardHeader>
                            <MDBCardBody>
                            <div className="newProduct">
                                <form>
                                    <div className="black-text">
                                        <label>Product type:</label>
                                        <select id="ptype" className="browser-default custom-select" onChange={this.handleChange}>
                                            <option value="e-device" defaultValue>E-devices</option>
                                            <option value="clothes">Clothes</option>
                                            <option value="food">Food</option>
                                            <option value="furniture">Furniture</option>
                                        </select><br/><br/>
                                        <label>Product category:</label>
                                        <select id="pcategory" className="browser-default custom-select">
                                        {
                                            this.state.options.map(elem => {
                                                return (
                                                    <option value={elem} key={elem}>{elem}</option>
                                                )
                                            })
                                        }  
                                        </select>
                                        <MDBInput
                                            label="Product name:"
                                            group
                                            type="text"
                                            id="pname"
                                            name="pname"
                                        />
                                        <label>
                                        Product Image:
                                        </label>
                                        <div>
                                            <input
                                                type="file"
                                                id="pimg"
                                                name="pimg"
                                                accept="image/*"
                                                />
                                        </div>
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
                                        <MDBInput
                                            label="Product discount:"
                                            group
                                            type="number"
                                            id="pdiscount"
                                            name="pdiscount"
                                            min="1"
                                        /><br/>
                                        <label>
                                        Product description:
                                        </label>
                                        <textarea
                                        className="form-control"
                                        id="pdesc"
                                        rows="5"
                                        />
                                    </div>
                                    <div className="text-center py-4 mt-3">
                                        <button type="button" className="btn btn-dark mx-1" onClick={this.addNewProduct}>Add</button>
                                        <button type="reset" id="reset" className="btn btn-dark mx-1" onClick={() => {
                                            window.location.reload();
                                        }}>Reset</button>
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