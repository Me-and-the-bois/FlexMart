import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import Product from './product';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../../reducers/rootReducer';
import Navbar from '../layout/navbar';
export default class furniture extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: []
        };
        this.getData();
    }

    getData() {
        Axios.get("http://localhost:5000/customer/furniture/data")
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
        const store = createStore(rootReducer);
        for(let i=0;i<n;i++) {
            ReactDOM.render(<Provider store={store}><Product dataObj={this.state.dataList[i]} id={i}/></Provider>, document.getElementById('prod'+i));
        }
    }

    render() {
        return(
            <Fragment>
                <Navbar type='customer'/>
                <h3>Furnitures</h3>
                <span id="container" className="container"></span>
            </Fragment>
        );
    }
}