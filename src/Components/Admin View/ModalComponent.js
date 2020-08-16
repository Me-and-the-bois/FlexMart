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
        if(this.props.token !== 'customer') {
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
        } else {
            const id = document.getElementById('empeditid').value;
            const type = document.getElementById('empedittype').value;
            const name = document.getElementById('empeditname').value;
            const email = document.getElementById('empeditmail').value;
            const pwd = document.getElementById('empeditpwd').value;
            const phone = document.getElementById('empeditphone').value;
            const empData = {id,type,name,email,pwd,phone};
            axios.put("http://localhost:5000/admin/customerList/update",  empData)
                .then(res => {
                    console.log(res.data.message);
                    this.props.get();
                    document.getElementById('close').click();
                });
        }
    }

    componentDidUpdate() {
        const row = this.props.row;
        const id = document.getElementById('empeditid');
        const type = document.getElementById('empedittype');
        const name = document.getElementById('empeditname');
        const mail = document.getElementById('empeditmail');
        const pwd = document.getElementById('empeditpwd');
        let sal=null,phone=null;
        if(this.props.token !== 'customer') {
            sal = document.getElementById('empeditsalary');
        } else {
            phone = document.getElementById('empeditphone');
        }
        if(row) {
            id.value = row._id;
            mail.value = row.email;
            pwd.value = row.pwd;
            if(this.props.token !== 'customer') {
                type.value = row.etype;
                name.value = row.ename;
                sal.value = row.esal;
            } else {
                type.value = row.type;
                name.value = row.name;
                phone.value = row.phone;
            }
        }
    }

    render(){
        let image = null, salary = null,heading = <h3>Edit Customer</h3>, 
        phone = (
            <span>
                <label>Phone:</label>
                <input type="text" id="empeditphone" name="empeditphone"/><br/>
            </span>
        );
        if(this.props.token !== 'customer') {
            image = (
                <span>
                    <label>Image:</label>
                    <img src={this.props.row.eimg} alt={this.props.row.ename} className="m-1" width="100" height="100"/><br/>
                    <label>New image:</label>
                    <input type="file" id="empeditimg" name="empeditimg" accept="image/*"/><br/>
                </span>
            );
            salary = (
                <span>
                    <label>Salary:</label>
                    <input type="number" id="empeditsalary" name="empeditsalary"/><br/>
                </span>
            );
            heading = <h3>Edit Customer</h3>;
            phone = null;
        }
        return(
            <Fragment>
                    <button id="empadminBtn" onClick={this.handleShow} hidden>Open Modal</button>
                    

                    <div id="myModal" className="modal">
                        <div className="modal-content">
                            <div className="closecontainer">
                                <div className="heading">{heading}</div>
                                <div id="close" className="close" onClick={this.handleClose}>&times;</div>
                            </div>
                            <form>
                                <label>Id:</label>
                                <input type="text" id="empeditid" disabled/><br/>
                                <label>Type:</label>
                                <input type="text" id="empedittype" disabled/><br/>
                                <label>Name:</label>
                                <input type="text" id="empeditname"/><br/>
                                {image}
                                <label>Email:</label>
                                <input type="email" id="empeditmail" name="empeditmail"/><br/>
                                <label>Password:</label>
                                <input type="text" id="empeditpwd" name="empeditpwd"/><br/>
                                {salary}
                                {phone}
                                <button type="button" className="btn btn-dark mx-1" onClick={this.updateEmployee}>Update</button>
                            </form>
                        </div>
                    </div>
            </Fragment>
            
        );
    }
}