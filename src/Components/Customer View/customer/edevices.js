import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import Product from './product';
import Navbar from '../../layout/navbar';
import './searchbox.css';
import './sidebar.css';
import './product.css';
import { createStore } from 'redux';
import rootReducer from '../../../reducers/rootReducer';
class edevices extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
            pnamelist: [],
            pdesclist: [],
            suggestions: [],
            modalobj: {}
        };
        this.filter = this.filter.bind(this);
        this.sortData = this.sortData.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.search = this.search.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.productmodal = this.productmodal.bind(this);
        this.handleNumberChange = this.handleNumberChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        Axios.get("http://localhost:5000/customer/edevices/data")
            .then((res) => {
                console.log('Data from backend', res.data);
                this.setState({
                    dataList: res.data.data
                });
                this.sortData();
                this.displaydata();
            })
    }

    sortData() {
        const temp = this.state.dataList;
        const tempname = [];
        const tempdesc = [];
        temp.forEach(obj => {
            tempname.push(obj.pname);
            tempdesc.push(obj.pdesc);
        });
        this.setState({
            pnamelist: tempname,
            pdesclist: tempdesc
        });
    }

    displaydata() {
        const n = this.state.dataList.length;
        let count = 0;
        const rowElem = document.createElement('div');
        rowElem.setAttribute('class', 'row my-1');
        for(let i=0;i<n ;i++){
            const colElem = document.createElement('div');
            colElem.setAttribute('class', 'col-3');
            colElem.setAttribute('id', 'prod'+count);
            count++;
            rowElem.appendChild(colElem);
            document.getElementById('container').appendChild(rowElem);
            if(count === n) break;
        }
        for(let i=0;i<n;i++) {
            ReactDOM.render(<Product dataObj={this.state.dataList[i]} id={i} modalview={this.productmodal}/>, document.getElementById('prod'+i));
        }
    }

    handleSideBar() {
        document.getElementById('edevicesidebar').style.display = 'block'; 
    }

    closeSideBar() {
        document.getElementById('edevicesidebar').style.display = 'none'; 
    }

    filter() {
        const pcat = document.getElementById('pcat').value;
        const radioasc = document.getElementById('asc');
        const radiodesc = document.getElementById('desc');
        let order = '';
        if(radioasc.checked) {
            order = 'asc';
        } else if (radiodesc.checked) {
            order = 'desc';
        } else {
            order = '';
        }
        let lower = document.getElementById('lower').value;
        let higher = document.getElementById('higher').value;
        let temp = [];
        if(!lower) {
            lower = 0;
        }
        console.log(lower, higher);
        if(!higher) {
            this.state.dataList.forEach(obj => {
                console.log((Number(obj.ppricenew)));
                if(Number(obj.ppricenew) >= lower && pcat === obj.pcategory) {
                    temp.push(obj);
                    console.log(temp);
                } 
            });
        } else {
            this.state.dataList.forEach(obj => {
                console.log((Number(obj.ppricenew)));
                if((Number(obj.ppricenew) >= lower)&&(Number(obj.ppricenew) <= higher) && pcat === obj.pcategory) {
                    temp.push(obj);
                    console.log(temp);
                }
            });
        }
        console.log(order);
        if(order === 'asc') {
            temp.sort((a,b) => (a.ppricenew > b.ppricenew) ? 1 : ((a.ppricenew < b.ppricenew) ? -1 : 0));
        } else if(order === 'desc') {
            temp.sort((a,b) => (a.ppricenew < b.ppricenew) ? 1 : ((a.ppricenew > b.ppricenew) ? -1 : 0));
        } else {
            
        }
        console.log(temp);
        this.closeSideBar();
        this.displayfiltereddata(temp);
    }

    displayfiltereddata(data) {
        document.getElementById('container').innerHTML = '';
        const n = data.length;
        let count = 0;
        const rowElem = document.createElement('div');
        rowElem.setAttribute('class', 'row my-1');
        for(let i=0;i<n ;i++){
            const colElem = document.createElement('div');
            colElem.setAttribute('class', 'col-3');
            colElem.setAttribute('id', 'filtprod'+count);
            count++;
            rowElem.appendChild(colElem);
            document.getElementById('container').appendChild(rowElem);
            if(count === n) break;
        }
        for(let i=0;i<n;i++) {
            ReactDOM.render(<Product dataObj={data[i]} id={i} modalview={this.productmodal}/>, document.getElementById('filtprod'+i));
        }
    }

    productmodal(obj) {
        const modal = document.getElementById("edeviceproductModal");
        modal.style.display = "block";
        this.setState({
            modalobj: obj
        });
    }

    handleClose = () => {
        const modal = document.getElementById("edeviceproductModal");
        modal.style.display = "none";
    }

    handleKeyUp(e) {
        if (e.keyCode === 13) {
            const valtosearch = this.state.suggestions[0];
            this.search(valtosearch);
        }
    }

    handleChange(e) {
        const tempname = [...this.state.pnamelist];
        console.log(tempname);
        console.log(e.keyCode,e.target.value);
        const inputval = e.target.value;
        if(e.target.value.length === 0) {
            this.setState({
                suggestions: []
            });
            document.getElementById('container').innerHTML = '';
            this.displaydata();
            return;
        }
        let suggestedvalues = [];
        const tempdesc = this.state.pdesclist;
        let key,value;
        for(key in tempname) {
            if(suggestedvalues.length <=5) {
                value = tempname[key];
                console.log(value, value.indexOf(inputval));
                if(value.toLowerCase().indexOf(inputval) > -1) {
                    suggestedvalues.push(value);
                }
            }
        } 
        for(key in tempdesc) {
            if(suggestedvalues.length <=5) {
                value = tempdesc[key];
                if(value.toLowerCase().indexOf(inputval) > -1) {
                    suggestedvalues.push(value);
                }
            }
        } 
        this.setState({
            suggestions: [...suggestedvalues]
        });
        console.log(suggestedvalues);
    }

    search(name) {
        console.log(name);
        const templist = [];
        this.state.dataList.forEach(obj => {
            if(obj.pname === name) {
                templist.push(obj);
            } else if(obj.pdesc === name){
                templist.push(obj);
            }
        });
        this.displayfiltereddata(templist);
        this.setState({
            suggestions: []
        });
    }

    handleNumberChange(e) {
        console.log(e.target.value);
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.modalobj.pno = e.target.value;
    }

    handleClick() {
        if(document.getElementById('edevicequantity' + this.state.modalobj._id).value) {
            console.log(document.getElementById('edevicequantity' + this.state.modalobj._id).value);
            const store = createStore(rootReducer);
            store.dispatch({type: 'ADD_TO_CART', object: this.state.modalobj});
            document.getElementById('edevicereset' + this.state.modalobj._id).click();
        } else {
            console.log("Enter the number of products you want to buy!!");
        }
    }

    render() {
        
        return(
            <Fragment>
                <Navbar type='customer'/>
                <div className="search my-0">
                    <input type="text" className="searchTerm" placeholder="What are you looking for?" onChange={this.handleChange} onKeyUp={this.handleKeyUp} id={"edevicesearch" + this.state.modalobj._id}/>
                    <button type="button" className="searchButton" onClick={this.handleSideBar}>
                        Filter
                    </button>
                </div>
                <ul className="searchcontainer">
                {
                    this.state.suggestions.map(elem => {
                        return (
                            <li key={elem} >
                                <button type="button" className="searchsuggest"
                                onClick={() => {
                                    this.search(elem);
                                }}>{elem}</button>
                            </li>
                        )
                    })
                }
                </ul>
                <span id="edevicesidebar"  className="sidebar">
                    <div>
                    <i className="fa fa-close" onClick={this.closeSideBar}></i>
                    </div><br/>
                    <div  className="sidebarcontent">
                        <h3>E-devices</h3>
                        <label>Product category:</label><br/>
                        <select id="pcat">
                            <option value="laptop">Laptop</option>
                            <option value="desktop">Desktop</option>
                            <option value="phone">Mobile Phone</option>
                            <option value="tablet">Tablets</option>
                            <option value="tv">Television</option>
                        </select><br/>
                        <label>Price range:</label><br/>
                        <input type="number" id="lower" min="0"/> -&gt; Lower<br/><br/>
                        <input type="number" id="higher" min="0"/> -&gt; Higher<br/><br/>
                        <p>Sort by price:</p>
                        <input type="radio" id="asc" name="sort" value="asc"/>
                        <label htmlFor="asc">Ascending</label><br/>
                        <input type="radio" id="desc" name="sort" value="desc"/>
                        <label htmlFor="desc">Descending</label><br/>
                        <button type="button" className="btn btn-light" onClick={this.filter}>Search</button>
                    </div>
                </span>
                <div id="edeviceproductModal" className="modal">
                    <div className="modal-content">
                        <div className="closecontainer">
                            <div className="heading"><h5>{this.state.modalobj.pname} </h5></div>
                            <div id="close" className="close" onClick={this.handleClose}>&times;</div>
                        </div>
                        <form>
                            <div className="rowcontainer">
                                <div className="side">
                                    <img className="" src={this.state.modalobj.pimg} alt={this.state.modalobj.pname}/>
                                </div>
                                <div className="main">
                                    <div className="m-4 modalbody">
                                        <label className="discprice px-1">Rs.{this.state.modalobj.ppricenew} </label>
                                        <label className="discount px-1">{this.state.modalobj.pdiscount}% </label>
                                        <label className="price">{this.state.modalobj.pprice} </label><br/>
                                        <label>Available: {this.state.modalobj.pno}</label><br/>
                                        <label>Product description:</label><br/>
                                        <p>{this.state.modalobj.pdesc}</p>
                                        <label>Number:</label><br/>
                                        <input type="number" className="numberofprod" id={"edevicequantity" + this.state.modalobj._id} name="edevicequantity" min="1" max={this.state.modalobj.pno} onChange={this.handleNumberChange}/><br/>
                                        <button type="button" id={"edevicecart" + this.state.modalobj._id} className="btn btn-dark my-1" onClick={this.handleClick}>Add to cart</button>
                                        <button type="reset" id={"edevicereset" + this.state.modalobj._id} hidden>Reset</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <span id="container" className="container"></span>
            </Fragment>
        );
    }
}

export default withRouter(edevices);