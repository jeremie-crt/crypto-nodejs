/**
 * //source for parameters: https://www.npmjs.com/package/axios#response-schema
 */
const axios = require('axios')

class coinMarketAPI {

    static getAllCurrencies(next) {
        axiosCall('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', 'get', {
            'start': '1',
            'limit': '2',
            'convert': 'USD'
        }, next)
    }

    static getOneCurrency(id) {
    }
}

module.exports = coinMarketAPI

function filterRequest(status, data, message) {
    dataRequest = {
        status : '',
        data: {},
        message: '',
    }

    dataRequest.status = status
    dataRequest.data = data
    dataRequest.message = message

    return dataRequest
}

function axiosCall(url, method, data, next) {
    let dataRequest = {
        status : '',
        data: {},
        message: '',
    }

    axios({
        url: url,
        method: method,
        headers: {'X-CMC_PRO_API_KEY': 'a40fe710-2cc7-4eee-a938-61fabd3a20c7'},
        data: data,
        responseType: 'json',
    }).then((response) => {
        console.log('okkkkk call');
        next(filterRequest(response.status, response.data, 'Call successfully done!'))

    }).catch(function (error) {
        console.log('!!!error!!!', error);
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            next(filterRequest(error.response.status, error.response.data, 'The request was made and the server responded with a status code that falls out of the range of 2xx'))

        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            next(filterRequest(error.request.status, error.request, 'The request was made but no response was received!'))
        } else {
            // Something happened in setting up the request that triggered an Error
            next(filterRequest(error.status, error.message, 'Something happened in setting up the request that triggered an Error!'))
        }
    });
}
