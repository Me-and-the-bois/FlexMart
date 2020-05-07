import React from 'react';
import './warehouse.css';

export default class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [],
            data: []
        };
    }
    deleteProduct = (row) => {
        this.props.delete(row);
    }
    editProduct = (row) => {
        this.props.edit(row);
    }

    static getDerivedStateFromProps(props, state) {
        return {
            columns: props.columns,
            data: props.data
        };
    }
    render(){
        return(
            <table>
                <thead>
                    <tr>
                        {this.state.columns.map(data => <th key={data}>{data}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {this.state.data.map(row => {
                                return(
                                <tr key={Object.values(row)[2]}>
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
        );
    }
}