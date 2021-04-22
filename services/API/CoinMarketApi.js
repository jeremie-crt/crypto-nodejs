/**
 * //source for parameters: https://www.npmjs.com/package/axios#response-schema
 */
const axios = require('axios')

class coinMarketAPI {

    //Metadata - Returns all static metadata available for one or more cryptocurrencies
    //https://pro-api.coinmarketcap.com/v1/cryptocurrency/info
    static getCurrenciesInfo(...ids) {
        let listIds = ids.join()
        axiosCall('https://pro-api.coinmarketcap.com/v1/cryptocurrency/info', 'get', {
            'id': listIds,
        }).then((result) => {
            if(result.status === 200) {
                console.log(result.data);
                console.log('result.data');
            } else {
                console.log(result.message);
            }
        })
    }

    //Listings Latest - Returns a paginated list of all active cryptocurrencies with latest market data.
    static getCurrenciesLatestMarketData() {
        axiosCall('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', 'get', {
            'start': '1',
            'limit': '2',
            'convert': 'USD'
        }).then((result) => {
            if(result.status === 200) {
                console.log(result.data);
                console.log('result.data');
            } else {
                console.log(result.message);
            }
        })
    }

    //CoinMarketCap ID Map - Returns a mapping of all cryptocurrencies to unique CoinMarketCap ids.
    //https://pro-api.coinmarketcap.com/v1/cryptocurrency/map
    static getCurrenciesListedIds() {
    }

    //Quotes Latest - Returns the latest market quote for 1 or more cryptocurrencies.
    //https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest
    static getPickedCurrenciesDataMarket(...ids) {
    }

    //Convert an amount of one cryptocurrency or fiat currency into one or more different currencies utilizing the latest market rate for each currency.
    //https://pro-api.coinmarketcap.com/v1/tools/price-conversion
    static getConversionFor(from, into) {
    }

    //Returns a paginated list of FCAS scores for all cryptocurrencies currently supported by FCAS.
    //https://pro-api.coinmarketcap.com/v1/partners/flipside-crypto/fcas/listings/latest
    static getScoreByFcas(...ids) {
    }

    //Returns API key details and usage stats.
    //https://pro-api.coinmarketcap.com/v1/key/info
    static getApiStats() {
    }
}

module.exports = coinMarketAPI

function filterRequest(status, data, message) {
    dataRequest = {
        status: '',
        data: {},
        message: '',
    }

    dataRequest.status = parseInt(status)
    dataRequest.data = data
    dataRequest.message = message

    return dataRequest
}

function axiosCall(url, method, params, data) {
    return axios({
        url: url,
        method: method,
        headers: {'X-CMC_PRO_API_KEY': 'a40fe710-2cc7-4eee-a938-61fabd3a20c7'},
        params: params,
        data: data,
        responseType: 'json',
    }).then((response) => {

        return filterRequest(response.status, response.data, 'Call successfully done!')

    }).catch(function (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            let errorFromCoinMarketCall = error.response.data.status.error_message;
            return filterRequest(error.response.status, error.response.data, 'The request was made and the server responded with a status code that falls out of the range of 2xx - Error caught From CMAPI: ' + errorFromCoinMarketCall)

        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            return filterRequest(error.request.status, error.request, 'The request was made but no response was received!')
        } else {
            // Something happened in setting up the request that triggered an Error
            return filterRequest(error.status, error.message, 'Something happened in setting up the request that triggered an Error!')
        }
    });
}
