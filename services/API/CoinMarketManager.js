const coinMarketAPI = require('./CoinMarketApi')

class coinMarketManager {

    static getAllCurrenciesList(next) {
        console.log('99999');
        //coinMarketAPI.getCurrenciesListedIds('1','1027','1839','2539')

        coinMarketAPI.getCurrenciesListedIds();

    }

    static getOneCurrency(id) {
    }
}

module.exports = coinMarketManager
