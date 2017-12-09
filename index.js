var express = require('express');
var request = require('request');

var app = express();

const API_URL = 'https://api.coinmarketcap.com/v1';

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/', function (req, res) {
    res.send('9Coin Market Server for you.')
});

app.get('/ticker', function (req, res) {
    request(API_URL + '/ticker/?limit=20', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body)
        } else {
            res.send(error);
        }
    })
});

app.get('/ticker/:currency', function (req, res) {
    var currency = req.params.currency;

    request(API_URL + '/ticker/?convert=' + currency +'&limit=20', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body)
        } else {
            res.send(error);
        }
    })
});

app.get('/convert/:coin', function (req, res) {
    var coin = req.params.coin;

    request(API_URL + '/ticker' + '/' + coin + '/', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body)
        } else {
            res.send(error);
        }
    })
});

app.get('/convert/:coin/:currency', function (req, res) {
    var coin = req.params.coin;
    var currency = req.params.currency;

    request(API_URL + '/ticker' + '/' + coin + '/?convert=' + currency, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body)
        } else {
            res.send(error);
        }
    })
});

app.get('/global', function (req, res) {
    request(API_URL + '/global', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body)
        } else {
            res.send(error);
        }
    })
});

app.get('/global/:currency', function (req, res) {
    var currency = req.params.currency;

    request(API_URL + '/global' + '/' + currency, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body)
        } else {
            res.send(error);
        }
    })
});

app.listen(3456, function () {
    console.log('Example app listening on port 3000!');
});