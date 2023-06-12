import axios from 'axios';

const STOCKQUOTES_API_BASE_URL = "http://127.0.0.1:8000/stock_quotes";

class StockQuotesService {
    getStockQuotes(stockSymbol) {
        return axios.get(STOCKQUOTES_API_BASE_URL + '/' + stockSymbol);
    }

}

export default new StockQuotesService()