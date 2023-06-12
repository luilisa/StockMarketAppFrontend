import React, { Component } from 'react';
import PortfolioService from '../services/PortfolioService';
import StockService from '../services/StockService';
import { Link as RouterLink, Navigate, useParams } from "react-router-dom";

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
  }

class ListStocksInPortfolioComponent extends Component {

    
    constructor(props) {
        super(props)

        let { id } = this.props.params;

        this.state = {
            id: id,
            name: '',
            owner_email:'',
            stocks: []
        }
        this.deleteStockInPortfolio = this.deleteStockInPortfolio.bind(this);
    }

    componentDidMount() {

        PortfolioService.getPortfolioById(this.state.id).then((response) => {
            let portfolio = response.data;
            this.setState({stocks: portfolio.stocks});
        });
    }

    deleteStockInPortfolio(portfolioId, stockId) {
        PortfolioService.deleteStockInPortfolio(portfolioId, stockId).then( res => {
            this.setState({stocks: this.state.stocks.filter(stock => stock.id !== stockId)});
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
                             <th>Тикер</th>
                             <th>Цена</th>
                             <th>Действия</th>
                         </tr>
                     </thead>

                     <tbody>
                         {
                             this.state.stocks.map(
                                stock => 
                                 <tr key = {stock.id}>
                                 <td> {stock.company_symbol} </td>
                                 <td> {stock.stock_price} </td>
                                 <td>
                                 {/* <RouterLink to = {`/update-stock/${stock.id}`}>
                                    <button className="btn btn-info">Update </button>
                                </RouterLink> */}
                                <button style={{marginLeft: "10px"}} onClick={ () => this.deleteStockInPortfolio(this.state.id,stock.id)} className="btn btn-outline-danger">Удалить </button>
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

export default withParams(ListStocksInPortfolioComponent);