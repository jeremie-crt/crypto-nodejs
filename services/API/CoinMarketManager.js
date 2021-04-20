const coinMarketAPI = require('./CoinMarketApi')

class coinMarketManager {

    static getAllCurrenciesList(next) {
        coinMarketAPI.getAllCurrencies(next)
    }

    static getOneCurrency(id) {
    }
}

module.exports = coinMarketManager
