import React, { Fragment } from 'react';
import axios from 'axios';
import './table.css';

export default class customerrecord extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [],
            data: [],
            pnamelist: [],
            pidlist: [],
            suggestions: []
        };
        this.getData = this.getData.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.search = this.search.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        axios.get('http://localhost:5000/admin/adminList/get')
        .then(res => {
            console.log(res.data.message);
            // const temp = props.data;
            // const tempname = [];
            // const tempid = [];
            // temp.forEach(obj => {
            //     tempname.push(obj.pname);
            //     tempid.push(obj._id);
            // });
            // return {
            //     columns: props.columns,
            //     data: props.data,
            //     pnamelist: tempname,
            //     pidlist: tempid
            // }; 
        });
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
            return;
        }
        let suggestedvalues = [];
        const tempid = this.state.pidlist;
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
        for(key in tempid) {
            if(suggestedvalues.length <=5) {
                value = tempid[key];
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

    handleKeyUp(e) {
        if (e.keyCode === 13) {
            const valtosearch = this.state.suggestions[0];
            this.search(valtosearch);
        }
    }

    handleClick() {
        this.search(this.state.suggestions[0]);
    }

    search(name) {
        console.log(name);
        let id = '';
        this.state.data.forEach(elem => {
            if(elem.pname === name) {
                id = elem._id;
            } else if(elem._id === name) {
                id = elem._id;
            }
        })
        document.getElementById("tabrow" + id).scrollIntoView();
    }

    render(){
        return(
            <Fragment>
                <div className="search my-0">
                    <input className="searchTerm" id="warehousesearch" type="text" placeholder="Search by name or id..." onChange={this.handleChange} onKeyUp={this.handleKeyUp}/>
                    <button type="button" className="searchbutton" onClick={this.handleClick}>
                        Search
                    </button>
                </div>
                <ul className="searchContainer" id="searchContainer">
                {
                    this.state.suggestions.map(elem => {
                        return (
                            <li key={elem}>
                                <button type="button" className="searchSuggest"
                                onClick={() => {
                                    this.search(elem);
                                }}>{elem}</button>
                            </li>
                        )
                    })
                }
                </ul>
                <table id="t01">
                    <tbody>
                    <tr>
                        {this.state.columns.map(data => <th key={data}>{data}</th>)}
                    </tr>
                    {this.state.data.map(row => {
                                return(
                                <tr key={row._id} id={"tabrow" + row._id}>
                                    {Object.keys(row).map(rowdatakey => {
                                            if(rowdatakey !== 'pimg')
                                            return <td key={rowdatakey}>{row[rowdatakey]}</td>
                                            else {
                                                const img = row[rowdatakey];
                                                return <td key={rowdatakey}><img src={img} width="100" height ="100" alt={row['pname']}/></td>
                                            }
                                        })}
                                    <td><button type="button" className="editwh mx-1" onClick= {() => {this.deleteProduct(row)}}><i className="fa fa-remove"></i></button></td>
                                    <td><button type="button" className="delwh mx-1" onClick= {() => {this.editProduct(row)}}><i className="fa fa-edit"></i></button></td>
                                </tr>
                                );
                            })
                    }
                    </tbody>
                </table>
            </Fragment>
        );
    }
}