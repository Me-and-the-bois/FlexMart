import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import Product from './product';

export default class edevices extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: []
        };
        this.getData();
    }

    getData() {
        Axios.get("http://localhost:5000/customer/edevices/data")
            .then((res) => {
                console.log('Data from backend', res.data);
                this.setState({
                    dataList: res.data.data
                });
            })
    }

    componentDidUpdate() {
        const n = this.state.dataList.length;
        let count = 0;
        for(let i=0;i<Math.ceil(n/4) ;i++){
            const rowElem = document.createElement('div');
            rowElem.setAttribute('class', 'row my-3');
            for(let j=0;j<4;j++){
                const colElem = document.createElement('div');
                colElem.setAttribute('class', 'col-3');
                colElem.setAttribute('id', 'prod'+count);
                count++;
                rowElem.appendChild(colElem);
            }
            document.getElementById('container').appendChild(rowElem);
            if(count === n) break;
        }
        for(let i=0;i<n;i++) {
            ReactDOM.render(<Product dataObj={this.state.dataList[i]}/>, document.getElementById('prod'+i));
        }
    }

    render() {
        return(
            <Fragment>
                <h3>E-devices</h3>
                <span id="container" className="container"></span>
            </Fragment>
        );
    }
}