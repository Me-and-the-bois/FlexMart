import React, { Fragment } from 'react';
import {connect} from 'react-redux';

class Cart extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            productList: []
        };
    }

    componentDidMount() {
        this.setState({
            productList: this.props.productList
        });
    }

    compo

    handleClick() {
        this.state.productList.
    }

    render() {
        return(
            <Fragment>
                {
                    this.state.productList.map((obj) => {
                        return (
                            <div className="jumbotron" key={obj._id}>
                                <p>Yo</p>
                                <button type="button" className="btn btn-danger" onClick={this.handleClick}>Remove</button>
                            </div>
                        );
                    })
                }
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        productList: state.productList
    }
}
export default connect(mapStateToProps)(Cart);