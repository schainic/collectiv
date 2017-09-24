
var querystring = require('querystring');
var http = require('http');
import Config from '../config/Config.js';

class _CapitalOneApiManager {
    constructor() {

    }


    CreateCustomer(FirstName, LastName, StreeNumber, StreetName, City, State, Zip)
    {
        return new Promise((resolve, reject) => {
            let newCustomer = {
                "first_name": FirstName,
                "last_name": LastName,
                "address": {
                    "street_number": StreeNumber,
                    "street_name": StreetName,
                    "city": City,
                    "state": State,
                    "zip": Zip
                }
            };

            let key = Config.capitalOne.ApiKey;

            let post_options = {
                host: 'api.reimaginebanking.com',
                path: '/customers' + "?key=" + key,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            let post_req = http.request(post_options, function(res) {
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                    // console.log('Response: ' + chunk);
                    resolve(JSON.parse(chunk));
                });
            });

            // post the data
            post_req.write(JSON.stringify(newCustomer));
            post_req.end();
        });
    }

    CreateAccount(CustomerId, NickName)
    {
        return new Promise((resolve, reject) => {
            let newAccount = {
                "type": "Savings",
                "nickname": "test account",
                "rewards": 0,
                "balance": 9999
            };

            let key = Config.capitalOne.ApiKey;

            let post_options = {
                host: 'api.reimaginebanking.com',
                path: '/customers/' + CustomerId + '/accounts' + "?key=" + key,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            };

            let post_req = http.request(post_options, function(res) {
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                    // console.log('Response: ' + chunk);
                    resolve(JSON.parse(chunk));
                });
            });

            // post the data
            post_req.write(JSON.stringify(newAccount));
            post_req.end();
        });
    }

    CreateTransfer(PayerId, PayeeId, amount, Description)
    {
        return new Promise((resolve, reject) => {
            let today = new Date();

            let newTransfer = {
                "medium": "balance",
                "payee_id": PayeeId,
                "amount": amount,
                "transaction_date": today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(),
                "description": Description
            }

            let key = Config.capitalOne.ApiKey;

            let post_options = {
                host: 'api.reimaginebanking.com',
                path: '/accounts/' + PayerId + '/transfers' + "?key=" + key,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            };

            let post_req = http.request(post_options, function(res) {
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                    // console.log('Response: ' + chunk);
                });
            });

            // post the data
            post_req.write(JSON.stringify(newTransfer));
            post_req.end();
        });
    }

    async GetAccount(AccountId){
        let key;

        try{
            key = await Config.CapitalOne.ApiKey;
        }catch(e) {
            console.log("Failed to retreive APIKEY for Capital one!!! in getAccount() lol shit motherfucker!");
        }


        let get_options = {
            host: 'api.reimaginebanking.com',
            path: '/accounts/' + AccountId + "?key=" + key,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
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
            console.log("Failed to retreive APIKEY for Capital one!!! in getCustomer() lol shit motherfucker!");
        }


        let get_options = {
            host: 'api.reimaginebanking.com',
            path: '/customers/' + CustomerId + "?key=" + key,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
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

const CapitalOneApiManager = new _CapitalOneApiManager();

export default CapitalOneApiManager;