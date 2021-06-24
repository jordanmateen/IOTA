//imports
const IOTA = require('@iota/core');
const Converter = require('@iota/converter');

// Create an instance of the IOTA API (Node on the devnet)
const iota = IOTA.composeAPI({
    provider: 'https://nodes.devnet.iota.org:443'
});

const options = {
    checksum: true,
    security: 2
}

//create a zero-value transaction
const depth = 3;
const minimumWeightMagnitude = 9;

const seed = process.env.SEED

//create hello world message to send to devnet. 
const message = JSON.stringify({"message": "Hello world"});
const messageInTrytes = Converter.asciiToTrytes(message);

//get address
iota.getNewAddress(seed, options, (error, newAddress)=>{
   try {
       const transfers = [
           {
               value: 0,
               address: newAddress,
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
       
        iota.prepareTransfers(seed, transfers)
            .then(trytes => {
                return iota.sendTrytes(trytes, depth, minimumWeightMagnitude);  
            })
            .then(bundle => {
                console.log(bundle)
            })
            .catch(err => {
                console.error(err)
            });

   } catch (e) {
       console.log(error)
       console.og('There was an error retrieving address')
   }
})




