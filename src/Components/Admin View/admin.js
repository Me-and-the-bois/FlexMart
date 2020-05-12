import React, { Fragment } from 'react';
import Navbar from "../layout/navbar";
import axios from 'axios';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBCard, MDBCardBody, MDBCardHeader } from 'mdbreact';
import {storage} from '../firebase/index';

export default class admin extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }

    addNewEmployee() {
        console.log("Add button clicked!!");
        const etype = document.getElementById('etype').value;
        const ename = document.getElementById('ename').value;
        let eimg = document.getElementById('eimg').files[0];
        const email = document.getElementById('email').value;
        const epwd = document.getElementById('epwd').value;
        const esal = document.getElementById('esal').value;
        if(etype&&ename&&eimg&&email&&epwd&&esal) {
            console.log("New product added!!");
            //send to database
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
                        const empData = {eimg: url,etype,ename,email,epwd,esal};
                        axios.post("http://localhost:5000/admin/employee/add", empData)
                            .then(res => {
                                document.getElementById('reset').click();
                                console.log(res.data.message);
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
                <Navbar type='admin'/>
                <MDBContainer>
                    <div  className="my-5">
                    <MDBRow>
                        <MDBCol md="12">
                        <MDBCard>
                            <MDBCardHeader style={{backgroundColor: "black", color: "white"}}>
                                <p className="h4 text-center py-4">Add New Employee:</p>
                            </MDBCardHeader>
                            <MDBCardBody>
                            <div className="newEmployee">
                                <form>
                                    <div className="black-text">
                                        <label>Employee type:</label>
                                        <select id="etype" className="browser-default custom-select" onChange={this.handleChange}>
                                            <option value="admin" defaultValue>Admin</option>
                                            <option value="warehouse">Warehouse</option>
                                            <option value="delivery">Delivery</option>
                                        </select><br/>
                                        <MDBInput
                                            label="Employee name:"
                                            group
                                            type="text"
                                            id="ename"
                                            name="ename"
                                        />
                                        <label>
                                        Employee Image:
                                        </label>
                                        <div>
                                            <input
                                                type="file"
                                                id="eimg"
                                                name="eimg"
                                                accept="image/*"
                                                />
                                        </div>
                                        <MDBInput
                                            label="Employee mail id"
                                            group
                                            type="email"
                                            id="email"
                                            name="email"
                                        />
                                        <MDBInput
                                            label="Employee password"
                                            group
                                            type="text"
                                            id="epwd"
                                            name="epwd"
                                        />
                                        <MDBInput
                                            label="Employee salary:"
                                            group
                                            type="number"
                                            id="esal"
                                            name="esal"
                                        /><br/>
                                    </div>
                                    <div className="text-center py-4 mt-3">
                                        <button type="button" className="btn btn-dark mx-1" onClick={this.addNewEmployee}>Add</button>
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