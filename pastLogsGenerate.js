"use strict";

const Web3 = require("web3");

const provider = "https://mainnet.infura.io/v3/b7771067f61c4314baa6d566cbfd88b7";


class TransactionChecker {
    web3;
    account;

    constructor(account) {
        this.web3 = new Web3(new Web3.providers.HttpProvider(provider));
        this.account = account.toLowerCase();
    }

    async checkBlock() {
        let block = await this.web3.eth.getBlock('latest');
        let number = block.number;

        console.log('Searching block' + number);

        if(block != null && block.transactions != null) {
            for(let txHash of block.transactions){
                let tx = await this.web3.eth.getTransaction(txHash);
                // if(this.account == tx.to.toLowerCase()){
                //     console.log('Transaction found on block Number '+ number);
                //     console.log({address:tx.from,value: this.web3.utils.fromWei(tx.value,'ether')});
                // }
                console.log(tx.from);
            }
        }
    }
}

let txn = new TransactionChecker('0xc6cde7c39eb2f0f0095f41570af89efc2c1ea828');

setInterval(() => {
    txn.checkBlock();
}, 15*1000);

let web3 = new Web3(new Web3.providers.HttpProvider(provider));

web3.eth.getPastLogs({
    address: "0xdac17f958d2ee523a2206206994597c13d831ec7"
})
.then(console.log);



web3.eth.getTransaction('0xa75ed59824f24b2db29ee51facafdd52e340359f144bbaf6f4642da7d27e5572')
.then(console.log);
