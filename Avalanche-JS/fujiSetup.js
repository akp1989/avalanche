const { Mnemonic } = require ('avalanche');
const { randomBytes } = require  ('crypto');
const ethers  = require ('ethers');

 
const { Avalanche, Buffer, HDNode } = require ('avalanche');
const { EVMAPI, KeyChain } = require ('avalanche/dist/apis/evm');


const mnemonic  = Mnemonic.getInstance();
const strength = 256;
const wordList = mnemonic.getWordlists('english');


const ip = "api.avax-test.network"
const port = 443
const protocol = "https"
const networkID = 5
const avalanche = new Avalanche(ip, port, protocol, networkID)
const cchain = avalanche.CChain()


const network = "https://api.avax-test.network/ext/bc/C/rpc"
//const provider = ethers.getDefaultProvider(network)
const provider = new ethers.providers.JsonRpcProvider(network)
const signer1 = new ethers.Wallet('9d4e5acac01e8b99048d388b803de26dee860a44c86ca3f6f94e97d96db770b7',provider);
const signer2 = new ethers.Wallet('93381b9a52c6f8cda45c3a983889b92ed499f6570323fcac232ed46dd633a99f',provider);
const signer3 = new ethers.Wallet('9a511740cea2e8fe13c8ac40ada97fb57b48c277308c4d6050a1da5e2221fe14',provider);

//Function to derive a mnemonic
const deriveMnemonic = async function()  {
    const m = mnemonic.generateMnemonic(strength, randomBytes, wordList);
    console.log(m);

    //Result : "normal desert behind crazy boss talk cousin tree flock alien wash lazy school stumble unique jar piano aisle comic payment fire jar equip atom";
}

//Function to derive address and keys from the mnemonic
const deriveAddress = async function() {
    const m = "normal desert behind crazy boss talk cousin tree flock alien wash lazy school stumble unique jar piano aisle comic payment fire jar equip atom";
    const seed = mnemonic.mnemonicToSeedSync(m);
    const hdNode = new HDNode(seed);
    const keyChain = cchain.newKeyChain();
    const cAddresses = [];
    const privateKeys = [];

    for (let i = 0; i <= 2; i++) {
        const child = hdNode.derive(`m/44'/60'/0'/0/${i}`);
        privateKeys.push(child.privateKey.toString('HEX'));
        keyChain.importKey(child.privateKey);
        const cchainAddress = ethers.utils.computeAddress(child.privateKey);
        cAddresses.push(cchainAddress);
      }
      console.log(privateKeys);
      console.log(cAddresses);

      //Accounts: 
      // 0x9b649351149EB6ce34A123B6566602ABd9768a2B : 9d4e5acac01e8b99048d388b803de26dee860a44c86ca3f6f94e97d96db770b7
      // 0xdF32d7Ab252220E7e55F0cAB9E0f34De2DbA907a : 93381b9a52c6f8cda45c3a983889b92ed499f6570323fcac232ed46dd633a99f
      // 0x416F179547e5c267b11D494ac324f377496F1657 : 9a511740cea2e8fe13c8ac40ada97fb57b48c277308c4d6050a1da5e2221fe14
}


const getBalance = async function(address) {
    const balance = await provider.getBalance(address);
    console.log ("Balance of ",address," is ", ethers.utils.formatEther(balance));
}

const transferAV = async function(receiver, amountWei){
    let tx = {
        to : receiver,
        value : ethers.utils.parseEther(amountWei)
    };

    var txRes = await signer1.sendTransaction(tx);
    console.log(txRes);

}
//deriveMnemonic();
//deriveAddress();
getBalance('0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC');

//transferAV('0x743937C03780c9490FF93B9c9937591d48017167', '0.5');