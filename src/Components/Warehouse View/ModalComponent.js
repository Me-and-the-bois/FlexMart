import React, { Fragment } from 'react';
import axios from 'axios';
import './ModalComponent.css';
import {storage} from '../firebase/index';
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
        const pcategory = document.getElementById('mpcategory').value;
        const pname = document.getElementById('mpname').value;
        let pimg = document.getElementById('mpimg').files[0];
        const pno = document.getElementById('mpno').value;
        const pprice = document.getElementById('mpprice').value;
        const pdiscount = document.getElementById('mpdiscount').value;
        const pdesc = document.getElementById('mpdesc').value;
        if(pname&&pno&&pprice&&pdiscount) {
            console.log("New product added!!");
            //send to database
            if(pimg) {
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
                        const productData = {pid:this.props.row._id,pimg: url,ptype,pcategory,pname,pno,pprice,pdiscount,pdesc};
                        axios.put("http://localhost:5000/warehouse/productList/update", {data: {data: productData}})
                        .then(res => {
                            console.log(res.data.message);
                            this.props.get();
                            document.getElementById('close').click();
                        });
                    })
                });
            } else {
                pimg = this.props.row.pimg;
                const productData = {pid:this.props.row._id,pimg,ptype,pcategory,pname,pno,pprice,pdiscount,pdesc};
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
        const pcategory = document.getElementById('mpcategory');
        const pname = document.getElementById('mpname');
        //const pimg = document.getElementById('mpimg');
        const pno = document.getElementById('mpno');
        const pprice = document.getElementById('mpprice');
        const pdiscount = document.getElementById('mpdiscount');
        const pdesc = document.getElementById('mpdesc');
        if(row) {
            ptype.value = row.ptype;
            pcategory.value = row.pcategory;
            pname.value = row.pname;
            pno.value = row.pno;
            pprice.value = row.pprice;
            pdiscount.value = row.pdiscount;
            pdesc.value = row.pdesc;
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
                                <input type="text" id="mptype" disabled/><br/>
                                <label>Product category:</label>
                                <input type="text" id="mpcategory" disabled/><br/>
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
                                <label>Product discount:</label>
                                <input type="number" id="mpdiscount" name="mpdiscount" defaultValue="0"/><br/>
                                <label>Product description:</label>
                                <input type="text" id="mpdesc" name="mpdesc" defaultValue="0"/><br/>
                                <button type="button" className="btn btn-dark mx-1" onClick={this.updateProduct}>Update</button>
                            </form>
                        </div>
                    </div>
            </Fragment>
            
        );
    }
}