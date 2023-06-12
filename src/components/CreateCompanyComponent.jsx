import React, { Component } from 'react';
import { Link as RouterLink, Navigate, useParams } from "react-router-dom";
import CompanyService from '../services/NewsService';

class CreateCompanyComponent extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            name: '',
            symbol:'',
            sector: '',
            marketCap: '',
            ipoYear: '',
            country: '',
            redirect: false
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeSymbolHandler = this.changeSymbolHandler.bind(this);
        this.changeSectorHandler = this.changeSectorHandler.bind(this);
        this.changeMarketCapHandler = this.changeMarketCapHandler.bind(this);
        this.changeIpoYearHandler = this.changeIpoYearHandler.bind(this);
        this.changeCountryHandler = this.changeCountryHandler.bind(this);
        this.saveCompany = this.saveCompany.bind(this);
        
    }


    saveCompany = (e) => {
        e.preventDefault();
        let company = {name: this.state.name, symbol: this.state.symbol, sector: this.state.sector,
                        marketCap: this.state.marketCap, ipoYear: this.state.ipoYear, country: this.state.country};

        CompanyService.createCompany(company).then((response) => {
            this.state.redirect = true
            console.log(response.data);
            this.forceUpdate()
        }).catch(error => {
            console.log(error);
        });
    }

    changeNameHandler = (event) => {
        this.setState({name: event.target.value});
    }

    changeSymbolHandler = (event) => {
        this.setState({symbol: event.target.value});
    }

    changeSectorHandler = (event) => {
        this.setState({sector: event.target.value});
    }

    changeMarketCapHandler = (event) => {
        this.setState({marketCap: event.target.value});
    }

    changeIpoYearHandler = (event) => {
        this.setState({ipoYear: event.target.value});
    }

    changeCountryHandler = (event) => {
        this.setState({country: event.target.value});
    }

    render() {
        const { redirect } = this.state;
        console.log(this.state.redirect)
        if (this.state.redirect) {
            return  <Navigate to="/companies" /> 
        }
        return (
            <div>
                <br></br>
                <div className = "container" >
                    <div className='row'>
                        <div className='card w-50 offset-md-3 offset-md-3'>
                            <h3 className='text-center'> Create Company</h3>
                            <div className='card-body' >
                                <form>
                                    <div className='form-group'>
                                        <input placeholder='Name' name = 'name' className='form-control mb-3'
                                        value = {this.state.name} onChange={this.changeNameHandler}/>
                                    </div>
                                    <div className='form-group'>
                                        <input placeholder='Symbol' name = 'symbol' className='form-control mb-3'
                                        value = {this.state.symbol} onChange={this.changeSymbolHandler}/>
                                    </div>
                                    <div className='form-group'>
                                        <input placeholder='Sector' name = 'sector' className='form-control mb-3'
                                        value = {this.state.sector} onChange={this.changeSectorHandler}/>
                                    </div>
                                    <div className='form-group'>
                                        <input placeholder='MarketCap' name = 'marketCap' className='form-control mb-3'
                                        value = {this.state.marketCap} onChange={this.changeMarketCapHandler}/>
                                    </div>
                                    <div className='form-group'>
                                        <input placeholder='IpoYear' name = 'ipoYear' className='form-control mb-3'
                                        value = {this.state.ipoYear} onChange={this.changeIpoYearHandler}/>
                                    </div>
                                    <div className='form-group'>
                                        <input placeholder='Country' name = 'country' className='form-control mb-3'
                                        value = {this.state.country} onChange={this.changeCountryHandler}/>
                                    </div>
                                    <button className='btn btn-success' onClick={this.saveCompany}>Save </button>
                                    <RouterLink to = "/companies">
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

export default CreateCompanyComponent;