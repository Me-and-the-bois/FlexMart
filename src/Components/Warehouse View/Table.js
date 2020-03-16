import React from 'react';

export default class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [],
            data: []
        };
    }
    deleteProduct = (row) => {
        console.log("Delete!!", row);
        //delete from backend
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
                                <tr key={Object.values(row)[1]}>
                                    {Object.keys(row).map(rowdatakey => {
                                            if(rowdatakey !== 'pimg')
                                            return <td key={rowdatakey}>{row[rowdatakey]}</td>
                                            else {
                                                const img = row[rowdatakey];
                                                return <td key={rowdatakey}><img src={img} width="100" height ="100" alt={row['pname']}/></td>
                                            }
                                        })}
                                    <td><button type="button" className="btn btn-dark mx-1" onClick= {() => {this.deleteProduct(row)}}>Delete</button></td>
                                </tr>
                                );
                            })
                    }
                </tbody>
            </table>
        );
    }
}