import React, { Component } from 'react';
import StockQuotesService from '../services/StockQuotesService';
import LineChart from './LineChart';
import LineChartTwo from './LineChartTwo';
import BarChart from './BarChart';
import BarChartTwo from './BarChartTwo';

import Row from 'react-bootstrap/Row';
import { Link as RouterLink, Navigate, useParams } from "react-router-dom";

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
  }

class StockQuotesComponent extends Component {
    constructor(props) {
        super(props)

        let { symbol } = this.props.params;

        this.state = {
            stock_symbol: symbol,
            stockquotes: [],
            stockquotesdates: [],
            stockquoteprices: [],
            stockquotesvolumes: [],

        }
    }

    componentDidMount() {
        StockQuotesService.getStockQuotes(this.state.stock_symbol).then((response) => {
            let stockquoteprices = [];
            let stockquotesdates = [];
            let stockquotesvolumes =[];
            for(var key  in  response.data) {
                var value = response.data[key];
                stockquoteprices.push( value.close_price)
                stockquotesdates.push(value.date)
                stockquotesvolumes.push(value.volume)
                // do something with "key" and "value" variables
              }
              console.log(stockquotesvolumes)
            this.setState({stockquotesdates: stockquotesdates.reverse(),  stockquotes: response.data, 
                stockquoteprices: stockquoteprices.reverse(), stockquotesvolumes: stockquotesvolumes.reverse() });
            // console.log(stockquotesdates)
        });
    }


    render() {
        return (
            <div>
                 <br></br>
                 
                 <div className = "row"> 
                 
                 <div className="d-flex justify-content-around">
                 <div  style={{ width: '45rem' }}>
                    <LineChart data =  {this.state.stockquotesdates} prices = {this.state.stockquoteprices}> </LineChart>
                    </div>
                    <div style={{ width: '45rem' }}>
                    <LineChartTwo data =  {this.state.stockquotesdates} prices = {this.state.stockquoteprices}> </LineChartTwo>
                </div>
                </div>
                <div className="d-flex justify-content-around">
                <div style={{ width: '42rem' }}>
                <BarChart data =  {this.state.stockquotesdates} volumes = {this.state.stockquotesvolumes}> </BarChart>
                </div>
                <div style={{ width: '42rem' }}>
                <BarChartTwo data =  {this.state.stockquotesdates} volumes = {this.state.stockquotesvolumes} prices = {this.state.stockquoteprices}> </BarChartTwo>
                </div>
                </div>
                 <table className = "table table-striped table-bordered" >
                     <thead className="thead-dark">
                         <tr>
                             <th>Тикер</th>
                             <th>Дата</th>
                             <th>Цена открытия</th>
                             <th>Цена закрытия</th>
                             <th>Наибольшая цена</th>
                             <th>Наименьшая цена</th>
                             <th>Объем торгов</th>
                         </tr>
                     </thead>

                     <tbody>
                         { this.state.stockquotes.map(
                            quotes =>
                             <tr key = {quotes.date} >
                                <td>{quotes.stock_symbol}</td>
                                <td> {quotes.date}</td>
                                 <td> {quotes.open_price} </td>
                                 <td> {quotes.close_price} </td>
                                 <td> {quotes.high_price} </td>
                                 <td> {quotes.low_price} </td>
                                 <td> {quotes.volume} </td>
                            </tr>
                         )
                         }
                     </tbody>
                 </table>
                </div>
            </div>
        );
    }
}

export default withParams(StockQuotesComponent);