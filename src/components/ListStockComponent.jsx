import React, { Component } from 'react';
import StockService from '../services/StockService';
import { Link as RouterLink, Navigate, useParams } from "react-router-dom";

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
  }

class ListStockComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            stocks: []
        }
        this.deleteStock = this.deleteStock.bind(this);
    }

    componentDidMount() {
        StockService.getStocks().then((res) => {
            this.setState({stocks: res.data});
        });
    }

    deleteStock(id) {
        StockService.deleteStock(id).then( res => {
            this.setState({stocks: this.state.stocks.filter(stock => stock.id !== id)});
        });
    }

    render() {
        return (
            <div>
                 <br></br>
            
                 <div className = "row"> 
                 <table className = "table table-striped table-bordered" >
                     <thead className="thead-dark">
                         <tr>
                             <th>Название компании</th>
                             <th>Тикер</th>
                             <th>Цена</th>
                             <th>Действия</th>
                         </tr>
                     </thead>

                     <tbody>
                         {
                             this.state.stocks.map(
                                stock => 
                                 <tr key = {stock.company_symbol}>
                                 <td> {stock.company_name} </td>
                                 <td> {stock.company_symbol} </td>
                                 <td> {stock.stock_price} </td>
                                 <td>
                                 <RouterLink to = {`/add-stock/${stock.id}`}>
                                    <button className="btn btn-outline-success"> Добавить в портфель </button>
                                </RouterLink>
                                <RouterLink to = {`/stock_quotes/${stock.company_symbol}`}>
                                    <button style={{marginLeft: "10px"}} className="btn btn-outline-info"> Подробнее </button>
                                </RouterLink>
                                {/* <button style={{marginLeft: "10px"}} onClick={ () => this.deleteStock(stock.id)} className="btn btn-outline-danger">Delete </button> */}
                                 </td>
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

export default ListStockComponent;