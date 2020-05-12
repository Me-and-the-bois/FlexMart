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

    updateEmployee = e => {
        e.preventDefault();
        console.log("Update button clicked!!");
        const eid = document.getElementById('empeditid').value;
        const etype = document.getElementById('empedittype').value;
        const ename = document.getElementById('empeditname').value;
        let eimg = document.getElementById('empeditimg').files[0];
        const email = document.getElementById('empeditmail').value;
        const epwd = document.getElementById('empeditpwd').value;
        const esal = document.getElementById('empeditsalary').value;
        if(etype&&ename&&email&&epwd&&esal) {
            console.log("New product added!!");
            let route = '';
            if(this.props.token === 'admin') {
                route = "http://localhost:5000/admin/adminList/update";
            } else if (this.props.token === 'delivery') {
                route = "http://localhost:5000/admin/deliveryList/update";
            } else if (this.props.token === 'warehouse') {
                route = "http://localhost:5000/admin/warehouseList/update";
            }
            //send to database
            if(eimg) {
                const uploadTask = storage.ref(`emp/${eimg.name}`).put(eimg);
                uploadTask.on('state_changed', 
                (snapshot) => {},
                (error) => {
                    console.log('Firebase image upload error', error);
                    this.notifyB('Error');
                },
                () => {
                    storage.ref('emp').child(eimg.name).getDownloadURL()
                        .then(url => {
                            console.log('URL', url);
                            const empData = {eid,eimg: url,etype,ename,email,epwd,esal};
                            axios.put(route, empData)
                            .then(res => {
                                console.log(res.data.message);
                                this.props.get();
                                document.getElementById('close').click();
                            });
                        })
                    });
            } else {
                eimg = this.props.row.eimg;
                const empData = {eid,eimg,etype,ename,email,epwd,esal};
                    axios.put(route,  empData)
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
        const id = document.getElementById('empeditid');
        const type = document.getElementById('empedittype');
        const name = document.getElementById('empeditname');
        const mail = document.getElementById('empeditmail');
        const pwd = document.getElementById('empeditpwd');
        const sal = document.getElementById('empeditsalary');
        if(row) {
            id.value = row._id;
            type.value = row.etype;
            name.value = row.ename;
            mail.value = row.email;
            pwd.value = row.epwd;
            sal.value = row.esal;
        }
    }

    render(){
        return(
            <Fragment>
                    <button id="empadminBtn" onClick={this.handleShow} hidden>Open Modal</button>
                    

                    <div id="myModal" className="modal">
                        <div className="modal-content">
                            <div className="closecontainer">
                                <div className="heading"><h3>Edit Employee</h3></div>
                                <div id="close" className="close" onClick={this.handleClose}>&times;</div>
                            </div>
                            <form>
                                <label>Employee Id:</label>
                                <input type="text" id="empeditid" disabled/><br/>
                                <label>Employee type:</label>
                                <input type="text" id="empedittype" disabled/><br/>
                                <label>Employee name:</label>
                                <input type="text" id="empeditname"/><br/>
                                <label>Product image:</label>
                                <img src={this.props.row.eimg} alt={this.props.row.ename} className="m-1" width="100" height="100"/><br/>
                                <label>New employee image:</label>
                                <input type="file" id="empeditimg" name="empeditimg" accept="image/*"/><br/>
                                <label>Employee email:</label>
                                <input type="email" id="empeditmail" name="empeditmail"/><br/>
                                <label>Employee password:</label>
                                <input type="text" id="empeditpwd" name="empeditpwd"/><br/>
                                <label>Employee salary:</label>
                                <input type="number" id="empeditsalary" name="empeditsalary"/><br/>
                                <button type="button" className="btn btn-dark mx-1" onClick={this.updateEmployee}>Update</button>
                            </form>
                        </div>
                    </div>
            </Fragment>
            
        );
    }
}