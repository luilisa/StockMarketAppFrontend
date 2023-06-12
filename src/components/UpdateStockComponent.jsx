import React, { Component } from 'react';
import StockService from '../services/StockService';
import { Link as RouterLink, Navigate, useParams} from "react-router-dom";
function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
  }
class UpdateStockComponent extends Component {
    constructor(props) {
        super(props)
        let { id } = this.props.params;
        this.state = {
            id: id,
            symbol: '',
            currentPrice: '',
            redirect: false
        }
        this.changeSymbolHandler = this.changeSymbolHandler.bind(this);
        this.changeCurrentPriceHandler = this.changeCurrentPriceHandler.bind(this);
        this.updateStock = this.updateStock.bind(this);
        
    }

    componentDidMount() {
        StockService.getStockById(this.state.id).then((response) => {
            let stock = response.data;
            this.setState({id: stock.id, symbol: stock.symbol, currentPrice:stock.currentPrice});
        });
    }


    updateStock = (e) => {
        let stock = {symbol: this.state.symbol, currentPrice: this.state.currentPrice};
        StockService.updateStock(stock, this.state.id).then((response) => {
           
            // this.forceUpdate();
            console.log(response.data);
        
        });
        this.state.redirect = true
        this.forceUpdate();
        console.log(this.state.redirect)
    }

    changeSymbolHandler = (event) => {
        this.setState({symbol: event.target.value});
    }

    changeCurrentPriceHandler = (event) => {
        this.setState({currentPrice: event.target.value});
    }

    render() {
        const { redirect } = this.state;
        console.log(this.state.redirect)
        if (this.state.redirect) {
            return  <Navigate to="/stocks" /> 
        }
        return (
            <div>
                <br></br>
                <div className = "container" >
                    <div className='row'>
                        <div className='card w-50 offset-md-3 offset-md-3'>
                            <h3 className='text-center'> Update Stock</h3>
                            <div className='card-body' >
                                <form>
                                    <div className='form-group'>
                                        <input placeholder='Symbol' name = 'symbol' className='form-control mb-3'
                                        value = {this.state.symbol} onChange={this.changeSymbolHandler}/>
                                    </div>
                                    <div className='form-group'>
                                        <input placeholder='CurrentPrice' name = 'currentPrice' className='form-control mb-3'
                                        value = {this.state.currentPrice} onChange={this.changeCurrentPriceHandler}/>
                                    </div>
                                    <button className='btn btn-success' onClick={this.updateStock}>Confirm </button>
                                    <RouterLink to = "/stocks">
                                    <button className='btn btn-danger' style={{marginLeft: "10px"}}>Cancel</button>
                                    </RouterLink>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}


export default withParams(UpdateStockComponent);