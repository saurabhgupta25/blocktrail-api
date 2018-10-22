var express = require('express');
var app = express();
var blocktrail = require('blocktrail-sdk');

client = blocktrail.BlocktrailSDK({apiKey: "68a9b5a56109e4c810710699d2cb8ed179e2fa44", apiSecret: "cdf8b34ca38a80280881e372f448eab8644ce24c", network: "BTC", testnet: true});

app.get('/getAddressInfo/:address', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    client.address(req.params.address, function(err, address) { 
        client.addressTransactions(req.params.address, {limit: '10'}, 
            function(err, addressTxs) { 
                params = {addressDetails: address, transactions: addressTxs};
                res.json(params);
             });
    });
 })

 app.get('/sendMoney/:address/:amountInBitcoin', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    satoshiValue = blocktrail.toSatoshi(req.params.amountInBitcoin);
    address = req.params.address;
    param={};
    param[address]=satoshiValue;
    client.initWallet("username", "password", function(err, wallet) {
        wallet.pay(param, null, false, true, blocktrail.Wallet.FEE_STRATEGY_BASE_FEE,
            function(err, result) {
                response = {error:err, result:result};
                res.json(response);
            });
    });
 })
 
 var server = app.listen(process.env.port || 8080, function () {
 
   var host = server.address().address
   var port = server.address().port
 
 })