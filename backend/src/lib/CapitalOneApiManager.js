
var querystring = require('querystring');
var http = require('http');
import Config from '../config/Config.js';

class CapitalOneApiManager {
    constructor() {

    }


    async CreateCustomer(FirstName, LastName, StreeNumber, StreetName, City, State, Zip)
    {
        let newCustomer = querystring.stringify({
            "first_name": FirstName,
            "last_name": LastName,
            "address": {
                "street_number": StreeNumber,
                "street_name": StreetName,
                "city": City,
                "state": State,
                "zip": Zip
            }
        });

        let key;

        try{
            key = await Config.CapitalOne.ApiKey;
        }catch(e) {
            console.log("Failed to retreive APIKEY for Capital one!!! in createcustomrer() lol shit motherfucker!");
        }


        let post_options = {
            host: 'api.reimaginebanking.com',
            path: '/customers',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(newCustomer)
            },
            parameters: {
                'key': key
            }
        };

        let post_req = http.request(post_options, function(res) {
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                console.log('Response: ' + chunk);
            });
        });

        // post the data
        post_req.write(newCustomer);
        post_req.end();
    }

    async CreateAccount(CustomerId, NickName)
    {
        let newAccount = {
            "type": "Savings",
            "nickname": "test account",
            "rewards": 0,
            "balance": 0
        };

        let key;

        try{
            key = await Config.CapitalOne.ApiKey;
        }catch(e) {
            console.log("Failed to retreive APIKEY for Capital one!!! in CreateAccount() lol shit motherfucker!");
        }


        let post_options = {
            host: 'api.reimaginebanking.com',
            path: '/customers/' + CustomerId + '/accounts' ,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(newCustomer)
            },
            parameters: {
                'key': key
            }
        };

        let post_req = http.request(post_options, function(res) {
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                console.log('Response: ' + chunk);
            });
        });

        // post the data
        post_req.write(newAccount);
        post_req.end();
    }

    async CreateTransfer(PayerId, PayeeId, amount, Description)
    {
        let today = new Date();


        let newTransfer = {
            "medium": "balance",
            "payee_id": PayeeId,
            "amount": amount,
            "transaction_date": today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(),
            "description": Description
        }

        let key;

        try{
            key = await Config.CapitalOne.ApiKey;
        }catch(e) {
            console.log("Failed to retreive APIKEY for Capital one!!! in CreateTransfer() lol shit motherfucker!");
        }


        let post_options = {
            host: 'api.reimaginebanking.com',
            path: '/accounts/' + PayerId + '/transfers' ,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(newCustomer)
            },
            parameters: {
                'key': key
            }
        };

        let post_req = http.request(post_options, function(res) {
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                console.log('Response: ' + chunk);
            });
        });

        // post the data
        post_req.write(newTransfer);
        post_req.end();
    }

    async getAccount(AccountId){
        let key;

        try{
            key = await Config.CapitalOne.ApiKey;
        }catch(e) {
            console.log("Failed to retreive APIKEY for Capital one!!! in getAccount() lol shit motherfucker!");
        }


        let get_options = {
            host: 'api.reimaginebanking.com',
            path: '/accounts/' + AccountId,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            parameters: {
                'key': key
            }
        };

        let get_req = http.request(get_options, function(res) {
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                console.log('Response: ' + chunk);
            });
        });

        // post the data
        get_req.end();
    }

    async GetCustomer(CustomerId){
        let key;

        try{
            key = await Config.CapitalOne.ApiKey;
        }catch(e) {
            console.log("Failed to retreive APIKEY for Capital one!!! in getAccount() lol shit motherfucker!");
        }


        let get_options = {
            host: 'api.reimaginebanking.com',
            path: '/customers/' + CustomerId,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            parameters: {
                'key': key
            }
        };

        let get_req = http.request(get_options, function(res) {
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                console.log('Response: ' + chunk);
            });
        });

        // post the data
        get_req.end();
    }


}