import React, { Component } from 'react';
import PortfolioService from '../services/PortfolioService';
import { Link as RouterLink, Navigate, useParams} from "react-router-dom";
function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
  }
class UpdatePortfolioComponent extends Component {
    constructor(props) {
        super(props)
        let { id } = this.props.params;
        this.state = {
            id: id,
            name: '',
            profitability: '',
            userId:'',
            redirect: false
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeProfitabilityHandler = this.changeProfitabilityHandler.bind(this);
        this.updatePortfolio = this.updatePortfolio.bind(this);
        
    }

    componentDidMount() {
        PortfolioService.getPortfolioById(this.state.id).then((response) => {
            let portfolio = response.data;
            this.setState({name: portfolio.name, profitability: portfolio.profitability, userId:portfolio.userId});
        });
    }


    updatePortfolio = (e) => {
        let portfolio = {name: this.state.name, profitability: this.state.profitability, userId: this.state.userId};
        PortfolioService.updatePortfolio(portfolio, this.state.id).then((response) => {
            // this.forceUpdate();
            console.log(response.data);
        
        });
        this.state.redirect = true
        this.forceUpdate();
        console.log(this.state.redirect)
    }

    changeNameHandler = (event) => {
        this.setState({name: event.target.value});
    }

    changeProfitabilityHandler = (event) => {
        this.setState({profitability: event.target.value});
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
                            <h3 className='text-center'> Update Portfolio</h3>
                            <div className='card-body' >
                                <form>
                                    <div className='form-group'>
                                        <input placeholder='Name' name = 'name' className='form-control mb-3'
                                        value = {this.state.name} onChange={this.changeNameHandler}/>
                                    </div>
                                    <div className='form-group'>
                                        <input placeholder='Profitability' name = 'profitability' className='form-control mb-3'
                                        value = {this.state.profitability} onChange={this.changeProfitabilityHandler}/>
                                    </div>
                            
                                    <button className='btn btn-success' onClick={this.updatePortfolio}>Confirm </button>
                                    <RouterLink to = "/portfolios">
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


export default withParams(UpdatePortfolioComponent);