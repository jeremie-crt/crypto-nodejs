const axios = require('axios')

const getOneCurrency = async () => {

    getList = await axios({
        url: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
        method: 'get',
        headers: {'X-CMC_PRO_API_KEY': 'a40fe710-2cc7-4eee-a938-61fabd3a20c7'},
        params: {
            'start': '1',
            'limit': '15',
            'convert': 'USD'
        },
        data: {},
        responseType: 'json',
    }).then((response) => {
        console.log(response.status);
        console.log(response.data);

    }).catch(function (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        console.log(error.config);
    });

    return getList
}

module.exports = getOneCurrency
