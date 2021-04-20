const coinMarketService = require('../services/API/CoinMarketManager')

/**
 * Display the HomePage
 * @param req
 * @param res
 */
exports.homePage = (req, res) => {
    console.log('browser homePage ? ');
    coinMarketService.getAllCurrenciesList((result) => {
        console.log('result');
        console.log(result);

        res.render('index', {
            title: 'welcomePage',
            list: result
        });
    })
}

