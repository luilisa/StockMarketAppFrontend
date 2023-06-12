import React, { Component } from 'react';
import { Link as RouterLink, Navigate, useParams } from "react-router-dom";
import PortfolioService from '../services/PortfolioService';

class CreatePortfolioComponent extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            portfolio_name: '',
            owner_email: '',
            redirect: false
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        // this.changeProfitabilityHandler = this.changeProfitabilityHandler.bind(this);
        this.changeOwnerEmailHandler = this.changeOwnerEmailHandler.bind(this);
        this.savePortfolio = this.savePortfolio.bind(this);
        
    }


    savePortfolio = (e) => {
        e.preventDefault();
        let portfolio = {portfolio_name: this.state.portfolio_name, owner_email: this.state.owner_email};

        PortfolioService.createPortfolio(portfolio).then((response) => {
            this.state.redirect = true
            console.log(response.data);
            this.forceUpdate()
        }).catch(error => {
            console.log(error);
        });
    }

    changeNameHandler = (event) => {
        this.setState({portfolio_name: event.target.value});
    }

    // changeProfitabilityHandler = (event) => {
    //     this.setState({profitability: event.target.value});
    // }

    changeOwnerEmailHandler = (event) => {
        this.setState({owner_email: event.target.value});
    }

    render() {
        const { redirect } = this.state;
        console.log(this.state.redirect)
        if (this.state.redirect) {
            return  <Navigate to="/portfolios" /> 
        }
        return (
            <div>
                <br></br>
                <div className = "container" >
                    <div className='row'>
                        <div className='card w-50 offset-md-3 offset-md-3'>
                            <h3 className='text-center'> Создание портфеля </h3>
                            <div className='card-body' >
                                <form>
                                    <div className='form-group'>
                                        <input placeholder='Название' name = 'portfolio_name' className='form-control mb-3'
                                        value = {this.state.portfolio_name} onChange={this.changeNameHandler}/>
                                    </div>
                                    <div className='form-group'>
                                        <input placeholder='Укажите вашу почту' name = 'ownerEmail' className='form-control mb-3'
                                        value = {this.state.owner_email} onChange={this.changeOwnerEmailHandler}/>
                                    </div>
                                    <button className='btn btn-outline-success' onClick={this.savePortfolio}>Сохранить </button>
                                    <RouterLink to = "/portfolios">
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

export default CreatePortfolioComponent;