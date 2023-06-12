
import axios from 'axios';

const PORTFOLIO_API_BASE_URL = "http://127.0.0.1:8000/portfolios";

class PortfolioService {
    getPortfolios() {
        return axios.get(PORTFOLIO_API_BASE_URL);
    }

    createPortfolio(portfolio) {
        return axios.post(PORTFOLIO_API_BASE_URL + '/create-portfolio/', portfolio);
    }

    getPortfolioById(portfolioId){
        return axios.get(PORTFOLIO_API_BASE_URL + '/' + portfolioId);
    }

    updatePortfolio(portfolio, portfolioId) {
        return axios.put(PORTFOLIO_API_BASE_URL + '/' + portfolioId, portfolio);
    }

    addStockToPortfolio(stockId, portfolioId) {
        return axios.put(PORTFOLIO_API_BASE_URL + '/update/' + portfolioId + '/stocks/' + stockId);
    }

    deletePortfolio(portfolioId){
        return axios.delete(PORTFOLIO_API_BASE_URL + '/' + portfolioId);
    }

    deleteStockInPortfolio(portfolioId, stockId){
        return axios.delete(PORTFOLIO_API_BASE_URL + '/delete/' + portfolioId + '/stocks/' + stockId);
    }
}

export default new PortfolioService()