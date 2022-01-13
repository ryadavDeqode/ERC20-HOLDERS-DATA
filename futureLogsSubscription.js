"use strict";

const Web3 = require("web3");

const provider = 'wss://eth-mainnet.alchemyapi.io/v2/ME9g3GUiEdOP0lGP2iRbLnGslxgRmKM-';

let web3 = new Web3(new Web3.providers.WebsocketProvider(provider));

let _address = "0xdac17f958d2ee523a2206206994597c13d831ec7";

const eventSignature = web3.utils.sha3('Transfer(address,address,uint256)');
// console.log(eventSignature);

const _topics = [
    eventSignature,
    null,
    null
]

var subscription = web3.eth.subscribe('logs', {
    address: _address,
    topics: _topics
}, function(error, result){
    if (!error)
        console.log(result);
    else console.log(error);
});