import React, { Fragment } from 'react';
import axios from 'axios';
import './ModalComponent.css';

export default class Table extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            show: false
        };
    }

    handleClose = () => {
        const modal = document.getElementById("myModal");
        modal.style.display = "none";
    }
    handleShow = () => {
        const modal = document.getElementById("myModal");
        modal.style.display = "block";
    }

    updateProduct = e => {
        e.preventDefault();
        console.log("Update button clicked!!");
        const ptype = document.getElementById('mptype').value;
        const pid = document.getElementById('mpid').value;
        const pname = document.getElementById('mpname').value;
        let pimg = document.getElementById('mpimg').files[0];
        const pno = document.getElementById('mpno').value;
        const pprice = document.getElementById('mpprice').value;
        if(pid&&pname&&pno&&pprice) {
            console.log("New product added!!");
            //send to database
            if(pimg) {
                const reader = new FileReader();
                reader.readAsDataURL(pimg);
                reader.onloadend = () => {
                    pimg = reader.result;
                    const productData = {pimg,ptype,pid,pname,pno,pprice};
                    axios.put("http://localhost:5000/warehouse/productList/update", {data: {data: productData}})
                        .then(res => {
                            console.log(res.data.message);
                            this.props.get();
                            document.getElementById('close').click();
                        });
                }
            } else {
                pimg = this.props.row.pimg;
                const productData = {pimg,ptype,pid,pname,pno,pprice};
                    axios.put("http://localhost:5000/warehouse/productList/update", {data: {data: productData}})
                        .then(res => {
                            console.log(res.data.message);
                            this.props.get();
                            document.getElementById('close').click();
                        });
            }
        } else {
            console.log("Form not full!!");
        }
    }

    componentDidUpdate() {
        const row = this.props.row;
        const ptype = document.getElementById('mptype');
        const pid = document.getElementById('mpid');
        const pname = document.getElementById('mpname');
        //const pimg = document.getElementById('mpimg');
        const pno = document.getElementById('mpno');
        const pprice = document.getElementById('mpprice');
        if(row) {
            ptype.value = row.ptype;
            pid.value = row.pid;
            pname.value = row.pname;
            pno.value = row.pno;
            pprice.value = row.pprice;
        }
    }

    render(){
        return(
            <Fragment>
                    <button id="myBtn" onClick={this.handleShow} hidden>Open Modal</button>

                    <div id="myModal" className="modal">
                        <div className="modal-content">
                            <div className="closecontainer">
                                <div className="heading"><h3>Edit Product</h3></div>
                                <div id="close" className="close" onClick={this.handleClose}>&times;</div>
                            </div>
                            <form>
                                <label>Product type:</label>
                                <select id="mptype" disabled>
                                <option value="e-device">E-devices</option>
                                <option value="clothes">Clothes</option>
                                <option value="food">Food</option>
                                <option value="furniture">Furniture</option>
                                </select><br/>
                                <label>Product id:</label>
                                <input type="text" id="mpid" name="mpid" disabled/><br/>
                                <label>Product name:</label>
                                <input type="text" id="mpname" name="mpname" disabled/><br/>
                                <label>Product image:</label>
                                <img src={this.props.row.pimg} alt={this.props.row.pname} className="m-1" width="100" height="100"/><br/>
                                <label>New product image:</label>
                                <input type="file" id="mpimg" name="mpimg" accept="image/*"/><br/>
                                <label>Product quantity:</label>
                                <input type="number" id="mpno" name="mpno" defaultValue="0"/><br/>
                                <label>Product price:</label>
                                <input type="number" id="mpprice" name="mpprice" defaultValue="0"/><br/>
                                <button type="button" className="btn btn-dark mx-1" onClick={this.updateProduct}>Update</button>
                            </form>
                        </div>
                    </div>
            </Fragment>
            
        );
    }
}