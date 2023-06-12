import React, { Component } from 'react';
import { Link as RouterLink, Navigate, useParams } from "react-router-dom";
import StockService from '../services/StockService';

class CreateStockComponent extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            symbol: '',
            currentPrice: '',
            redirect: false
        }
        this.changeSymbolHandler = this.changeSymbolHandler.bind(this);
        this.changeCurrentPriceHandler = this.changeCurrentPriceHandler.bind(this);
        this.saveStock = this.saveStock.bind(this);
        
    }


    saveStock = (e) => {
        e.preventDefault();
        let stock = {symbol: this.state.symbol, currentPrice: this.state.currentPrice};

        StockService.createStock(stock).then((response) => {
            this.state.redirect = true
            console.log(response.data);
            this.forceUpdate()
        }).catch(error => {
            console.log(error);
        });
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
                            <h3 className='text-center'> Create Stock</h3>
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
                                    <button className='btn btn-success' onClick={this.saveStock}>Save </button>
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

export default CreateStockComponent;