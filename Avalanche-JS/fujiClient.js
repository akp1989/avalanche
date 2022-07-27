const ethers  = require ('ethers');

var mdcABI = require('./abilib/mdcABI');
var logicABI = require('./abilib/logicABI');
var docABI = require('./abilib/docABI');

//const network = "https://api.avax-test.network/ext/bc/C/rpc"
const localNetwork1 = "http://127.0.0.1:9611/ext/bc/2eQ5vLqssgbgQesWWxT4Aa1zuz5K8ur4WYnyzTR3niY2E1oGLo/rpc";
const localNetwork2 = "http://127.0.0.1:9621/ext/bc/2eQ5vLqssgbgQesWWxT4Aa1zuz5K8ur4WYnyzTR3niY2E1oGLo/rpc";
const localNetwork3 = "http://127.0.0.1:9631/ext/bc/2eQ5vLqssgbgQesWWxT4Aa1zuz5K8ur4WYnyzTR3niY2E1oGLo/rpc";
const localNetwork4 = "http://127.0.0.1:9641/ext/bc/2eQ5vLqssgbgQesWWxT4Aa1zuz5K8ur4WYnyzTR3niY2E1oGLo/rpc";
const localNetwork5 = "http://127.0.0.1:9651/ext/bc/2eQ5vLqssgbgQesWWxT4Aa1zuz5K8ur4WYnyzTR3niY2E1oGLo/rpc";


//const provider = ethers.getDefaultProvider(network)
const provider1 = new ethers.providers.JsonRpcProvider(localNetwork1);
const provider2 = new ethers.providers.JsonRpcProvider(localNetwork2);
const provider3 = new ethers.providers.JsonRpcProvider(localNetwork3);
const provider4 = new ethers.providers.JsonRpcProvider(localNetwork4);
const provider5 = new ethers.providers.JsonRpcProvider(localNetwork5);


const signer1 = new ethers.Wallet('a05ffe50146ea28df6b034213c0bd2e32b89e9606c7d90320a8a9800a0cdc593',provider1);
const signer2 = new ethers.Wallet('a05ffe50146ea28df6b034213c0bd2e32b89e9606c7d90320a8a9800a0cdc593',provider2);
const signer3 = new ethers.Wallet('a05ffe50146ea28df6b034213c0bd2e32b89e9606c7d90320a8a9800a0cdc593',provider3);

//Undetected network
//const signer4 = new ethers.Wallet('a05ffe50146ea28df6b034213c0bd2e32b89e9606c7d90320a8a9800a0cdc593',provider4);
//const signer5 = new ethers.Wallet('a05ffe50146ea28df6b034213c0bd2e32b89e9606c7d90320a8a9800a0cdc593',provider5);


//Contract details
const logicContract = new ethers.Contract('0x1b2BBB6aE22145AB73a1C5a2851e4983F259dD15', logicABI, provider1);
const mdcContract = new ethers.Contract('0xFC01a763ef0af935db343d2C1ADedC0591C56012',mdcABI,provider1);

// const logicContract = new ethers.Contract('0x1b2BBB6aE22145AB73a1C5a2851e4983F259dD15', logicABI, provider2);
// const mdcContract = new ethers.Contract('0xFC01a763ef0af935db343d2C1ADedC0591C56012',mdcABI,provider2);

// const logicContract = new ethers.Contract('0x1b2BBB6aE22145AB73a1C5a2851e4983F259dD15', logicABI, provider3);
// const mdcContract = new ethers.Contract('0xFC01a763ef0af935db343d2C1ADedC0591C56012',mdcABI,provider3);

// const logicContract = new ethers.Contract('0x1b2BBB6aE22145AB73a1C5a2851e4983F259dD15', logicABI, provider4);
// const mdcContract = new ethers.Contract('0xFC01a763ef0af935db343d2C1ADedC0591C56012',mdcABI,provider4);

// const logicContract = new ethers.Contract('0x1b2BBB6aE22145AB73a1C5a2851e4983F259dD15', logicABI, provider5);
// const mdcContract = new ethers.Contract('0xFC01a763ef0af935db343d2C1ADedC0591C56012',mdcABI,provider5);

const getBalance = async function(address) {
    const balance = await provider4.getBalance(address);
    console.log ("Balance of ",address," is ", ethers.utils.formatEther(balance));
}


const isValidReviewer = async function(address){
    const result = await logicContract.isReviewer(address);
    console.log(result);
}

const createDocument = async function(documentId,authorName,timeStamp,ipfsLink,checkSum, reviewers) {
    var transactionResult = await mdcContract.connect(signer3).createDocument(documentId,authorName,timeStamp,ipfsLink,checkSum, reviewers);
    console.log (JSON.stringify(transactionResult));
}

const searchByAuthor = async function(authorName){
    let eventFilter = mdcContract.filters.CreateDocument(null,ethers.utils.formatBytes32String(authorName),null);
    let events = await mdcContract.queryFilter(eventFilter);
    events.forEach((eventDetail)=>{
        const result = ethers.utils.parseBytes32String(eventDetail.args._documentId);
        console.log(result);
    });
}


//getBalance('0x743937C03780c9490FF93B9c9937591d48017167');
//isValidReviewer('0x743937C03780c9490FF93B9c9937591d48017167');
searchByAuthor("Bhavani");
//createDocument('document3',"Bhavani",'12:00:00','http://ipfs.io/doc3','documentcs3', ["0x8FaF48F45082248D80aad06e76d942f8586E6Dcd","0x743937c03780c9490ff93b9c9937591d48017167"]);
