const coinMarketService = require('../services/API/CoinMarketApi')

/**
 * Display the HomePage
 * @param req
 * @param res
 */
exports.welcomePage = (req, res) => {
    console.log('browser viewaa ? ');
    console.log(coinMarketService());

    res.render('index', { title: 'welcomePage' });
}
