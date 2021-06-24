//imports
const IOTA = require('@iota/core');
const Converter = require('@iota/converter');
const dotenv = require('dotenv');
dotenv.config();

// Create an instance of the IOTA API (Node on the devnet)
const iota = IOTA.composeAPI({
    provider: 'https://nodes.devnet.iota.org:443'
});

//info 
iota.getNodeInfo()
    .then( info => console.log(JSON.stringify(info, null, 1)))
    .catch(e => {
        console.log('Cannot connect to IOTA',e.message);
    })


//create a zero-value transaction
const depth = 3;
const minimumWeightMagnitude = 9;

const address = process.env.ADDRESS;
const seed = process.env.SEED;

//create hello world message to send to devnet. 
const message = JSON.stringify({"message": "Hello world"});
const messageInTrytes = Converter.asciiToTrytes(message);

const transfers =[
    {
        value: 0,
        address,
        message:messageInTrytes
    }
]

/**
 * 
 * @param {*} seed 
 * @param {*} transfers 
 * 
 * functions: 
 *  prepareTransfers => preparing transfer by doing tip selections. (Where the node will be placed on the graph) 
 *  sendTrytes => handles the remote proof or work (Remote PoW: When a node does proof of work on your transaction)
 *  sendTrytes =>  also handles sending the transaction to the node so it can be attached to Tanlge 
 */

const sendToIOTA = (seed, transfers) => {

    iota.prepareTransfers(seed, transfers)
        .then(trytes => {
            return iota.sendTrytes(trytes, depth, minimumWeightMagnitude);  
        })
        .then(bundle => {
            console.log(bundle, '\n',bundle[0].hash)
        })
        .catch(err => {
            console.error(err)
        });
}

sendToIOTA(seed, transfers)