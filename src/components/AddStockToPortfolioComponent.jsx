import React, { Component } from 'react';
import StockService from '../services/StockService';
import PortfolioService from '../services/PortfolioService';
import { Link as RouterLink, Navigate, useParams} from "react-router-dom";
function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
  }
class AddStockToPortfolioComponent extends Component {
        constructor(props) {
            super(props)
            let { id } = this.props.params;
            this.state = {
                id: '',
                stockId: id,
                redirect: false
            }
            this.setPortfolio = this.setPortfolio.bind(this);
            this.addStockToPortfolio = this.addStockToPortfolio.bind(this);
            
        }
    
        componentDidMount() {
            
         
        }

        addStockToPortfolio = (event) => {
            let portfolio = {name: this.state.name, owner_email: this.state.owner_email};
        PortfolioService.addStockToPortfolio(this.state.stockId, this.state.id).then((response) => {
            // this.forceUpdate();
            console.log(this.state.id, this.state.stockId);
        
        });
        this.state.redirect = true
        this.forceUpdate();
        console.log(this.state.redirect)
        }
    
    
        setPortfolio = (event) => {
            this.setState({id: event.target.value})
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
                                <h3 className='text-center'> Добавить акцию в портфель</h3>
                                <div className='card-body' >
                                    <form>
                                        <div className='form-group'>
                                            <input placeholder='Введите идентификатор портфеля' name = 'portfolioId' className='form-control mb-3'
                                            value = {this.state.id} onChange={this.setPortfolio}/>
                                        </div>
                                
                                        <button className='btn btn-outline-success' onClick={this.addStockToPortfolio}>Подтвердить </button>
                                        <RouterLink to = "/stocks">
                                        <button className='btn btn-outline-danger' style={{marginLeft: "10px"}}>Отмена</button>
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


export default withParams(AddStockToPortfolioComponent);