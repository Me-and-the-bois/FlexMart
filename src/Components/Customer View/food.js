import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import Product from './product';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../../reducers/rootReducer';
import Navbar from '../layout/navbar';
import './searchbox.css';
import './sidebar.css';
export default class food extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
            pnamelist: [],
            //,pdesclist: []
            suggestions: []
        };
        this.filter = this.filter.bind(this);
        this.sortData = this.sortData.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.search = this.search.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        Axios.get("http://localhost:5000/customer/food/data")
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
        //const tempdesc = [];
        temp.forEach(obj => {
            tempname.push(obj.pname);
            //tempdesc.push(obj.pdesc);
        });
        this.setState({
            pnamelist: tempname
            //,pdesclist: tempdesc
        });
    }

    displaydata() {
        const n = this.state.dataList.length;
        let count = 0;
        const rowElem = document.createElement('div');
        rowElem.setAttribute('class', 'row my-3');
        for(let i=0;i<n ;i++){
            const colElem = document.createElement('div');
            colElem.setAttribute('class', 'col-3');
            colElem.setAttribute('id', 'prod2'+count);
            count++;
            rowElem.appendChild(colElem);
            document.getElementById('container2').appendChild(rowElem);
            if(count === n) break;
        }
        const store = createStore(rootReducer);
        for(let i=0;i<n;i++) {
            ReactDOM.render(<Provider store={store}><Product dataObj={this.state.dataList[i]} id={i}/></Provider>, document.getElementById('prod2'+i));
        }
    }

    handleSideBar() {
        document.getElementById('foodsidebar').style.display = 'block'; 
    }

    closeSideBar() {
        document.getElementById('foodsidebar').style.display = 'none'; 
    }

    filter() {
        // const pcat = document.getElementById('pcat').value;
        let lower = document.getElementById('lower2').value;
        let higher = document.getElementById('higher2').value;
        let temp = [];
        if(!lower) {
            lower = 0;
        }
        console.log(lower, higher);
        if(!higher) {
            this.state.dataList.forEach(obj => {
                console.log((Number(obj.pprice)));
                if(Number(obj.pprice) >= lower) {
                    temp.push(obj);
                    console.log(temp);
                } 
            });
        } else {
            this.state.dataList.forEach(obj => {
                console.log((Number(obj.pprice)));
                if((Number(obj.pprice) >= lower)&&(Number(obj.pprice) <= higher)) {
                    temp.push(obj);
                    console.log(temp);
                }
            });
        }
        console.log(temp);
        this.closeSideBar();
        this.displayfiltereddata(temp);
    }

    displayfiltereddata(data) {
        document.getElementById('container2').innerHTML = '';
        const n = data.length;
        let count = 0;
        const rowElem = document.createElement('div');
        rowElem.setAttribute('class', 'row my-3');
        for(let i=0;i<n ;i++){
            const colElem = document.createElement('div');
            colElem.setAttribute('class', 'col-3');
            colElem.setAttribute('id', 'filtprod2'+count);
            count++;
            rowElem.appendChild(colElem);
            document.getElementById('container2').appendChild(rowElem);
            if(count === n) break;
        }
        const store = createStore(rootReducer);
        for(let i=0;i<n;i++) {
            ReactDOM.render(<Provider store={store}><Product dataObj={data[i]} id={i}/></Provider>, document.getElementById('filtprod2'+i));
        }
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
            document.getElementById('container2').innerHTML = '';
            this.displaydata();
            return;
        }
        let suggestedvalues = [];
        //const tempdesc = this.state.pdesclist;
        let key,value;
        for(key in tempname) {
            value = tempname[key];
            console.log(value, value.indexOf(inputval));
            if(value.toLowerCase().indexOf(inputval) > -1) {
                suggestedvalues.push(value);
            }
        } 
        // for(key in tempdesc) {
        //     value = tempdesc[key];
        //     if(value.includes(inputval)) {
        //         suggestedvalues.push(value);
        //     }
        // } 
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
            }
        });
        this.displayfiltereddata(templist);
        this.setState({
            suggestions: []
        });
    }

    render() {
        return(
            <Fragment>
                <Navbar type='customer'/>
                <div className="search">
                    <input type="text" className="searchTerm" placeholder="What are you looking for?" onChange={this.handleChange} onKeyUp={this.handleKeyUp}/>
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
                <span id="foodsidebar"  className="sidebar">
                    <div>
                    <i className="fa fa-close" onClick={this.closeSideBar}></i>
                    </div><br/>
                    <div  className="sidebarcontent">
                        <h3>Food</h3>
                        <label>Product category:</label><br/>
                        <select id="pcat2">
                            <option value="all">All</option>
                            <option value="laptop">Laptop</option>
                            <option value="desktop">Desktop</option>
                            <option value="phone">Mobile Phone</option>
                            <option value="tablet">Tablets</option>
                            <option value="tv">Television</option>
                        </select><br/>
                        <label>Price range:</label><br/>
                        <input type="number" id="lower2" min="0"/> -> Lower<br/><br/>
                        <input type="number" id="higher2" min="0"/> -> Higher<br/><br/>
                        <button type="button" className="btn btn-light" onClick={this.filter}>Search</button>
                    </div>
                </span>
                <span id="container2" className="container"></span>
            </Fragment>
        );
    }
}