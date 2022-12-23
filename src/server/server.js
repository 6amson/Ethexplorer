import { INFURA } from "../server/keys";
import "../components/Landingpage";
const { ethers } = require("ethers");

//num.toExponential(0)




let infura = INFURA;
let accounts;
let balance;

const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${infura}`)




//const connectBtn = document.getElementById('connectBtn')
//const metamaskBtn = document.getElementById('MetamaskBtn')


export const connection = () => {
    console.log('clicked');
};

export const metaconnect = async  () => {
    if(window.ethereum){
        console.log('metamask present');
        accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
        }).catch((err) => {
            //error handling
         console.log(err)
        })
        balance = await provider.getBalance(accounts[0]);
        balance = ethers.utils.formatEther(balance);
        
        
        //const block = await provider.getBlockNumber();
        //console.log(balance);
        //const count = provider.getTransactionCount(accounts[0]).then((data) => {
        //    //console.log(data)
        //});
        //provider.getBlockWithTransactions(block).then((data) => {
        //  console.log(data.transactions[0]);
        //}).catch((err) => console.log(err))
        //console.log((block));
            //console.log(accounts[0]) 
    }
    else{
        console.log('nothin dey here');
        
    }
    return(balance, ', ', accounts[0]);
}





