import React, { Component } from 'react';
import PortfolioService from '../services/PortfolioService';
import { Link as RouterLink } from "react-router-dom";

class ListPortfolioComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            portfolios: []
        }
        this.deletePortfolio = this.deletePortfolio.bind(this);
    }

    componentDidMount() {
        PortfolioService.getPortfolios().then((res) => {
            this.setState({portfolios: res.data});
        });
    }

    deletePortfolio(id) {
        PortfolioService.deletePortfolio(id).then( res => {
            this.setState({portfolios: this.state.portfolios.filter(portfolio => portfolio.id !== id)});
        });
    }

    render() {
        return (
            <div>
                 <br></br>
                 <RouterLink to = {"/create-portfolio"}>
                         <button className="btn btn-outline-info"> Создать портфель </button>
                     </RouterLink>
                 <div className = "row"> 
                 <table className = "table table-striped table-bordered"  >
                     <thead className="thead-dark">
                         <tr>
                            <th> Идентификатор </th>
                             <th>Название</th>
        
                             <th>Владелец</th>
                             <th>Действия</th>
                         </tr>
                     </thead>

                     <tbody>
                         {
                            this.state.portfolios.map(
                                portfolio => 
                                <tr key = {portfolio.id}>
                                <td> {portfolio.id} </td>
                                <td> {portfolio.portfolio_name} </td>
                                <td> {portfolio.owner_email} </td>
                            
                                <td> 
                                <RouterLink to = {`/portfolios/${portfolio.id}`}>
                                <button className="btn btn-outline-info">Просмотр</button>
                                 </RouterLink>
                            <button style={{marginLeft: "10px"}} onClick={ () => this.deletePortfolio(portfolio.id)} className="btn btn-outline-danger">Удалить </button>
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

export default ListPortfolioComponent;