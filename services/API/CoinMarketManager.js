const coinMarketAPI = require('./CoinMarketApi')

class coinMarketManager {

    static getAllCurrenciesList(next) {
        coinMarketAPI.getCurrenciesInfo('1','1027','1839','2539')
    }

    static getOneCurrency(id) {
    }
}

module.exports = coinMarketManager
