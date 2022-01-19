const mongoose = require("mongoose");
const TraceContract = require("web3-eth-contract");
const dotnv = require("dotenv");
const Holder = require("./model/holderSchema");

dotnv.config();

const DB = process.env.MONGO_CONNECTION_STRING;

mongoose
  .connect(DB)
  .then(() => {
    console.log("connection successful");
  })
  .catch(() => console.log("no connection"));

const provider = process.env.NODE_CLIENT_KEY;

TraceContract.setProvider(provider);

const usdtABI = [
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "from", type: "address" },
      { indexed: true, name: "to", type: "address" },
      { indexed: false, name: "value", type: "uint256" },
    ],
    name: "Transfer",
    type: "event",
  },
];
const address = "0xdac17f958d2ee523a2206206994597c13d831ec7";
const contract = new TraceContract(usdtABI, address);

async function doit(from, to) {
  console.log("waiting");
  await contract
    .getPastEvents("Transfer", {
      fromBlock: from,
      toBlock: to,
    })
    .then((res) => {
      // eslint-disable-next-line no-restricted-syntax
      for (const val of res) {
        const newHolder = {
          address: val.returnValues.to,
          value: parseInt(val.returnValues.value, 10),
        };
        const holder = new Holder(newHolder);
        holder
          .save()
          .then(() => {
            console.log("Data Saved to DB");
          })
          .catch(() => {
            console.log("unable to save data!");
          });
      }
    });
}

const start = 4634748; // The block Number at which usdt was deployed!

async function perform() {
  for (let st = start; st < 14027566; st += 2000) {
    // eslint-disable-next-line no-await-in-loop
    await doit(st, st + 1900);
  }
}
perform(); // Data Being Filled in cloud (*mongodb ATLAS)
