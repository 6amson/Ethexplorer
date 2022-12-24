import { INFURA } from "../server/keys";
import "../components/Landingpage";

const { ethers } = require("ethers");

//num.toExponential(0)




let infura = INFURA;
let accounts;
let balance;

const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${infura}`)
const container = document.getElementById('container');
const loader = document.getElementById('loader');




//const connectBtn = document.getElementById('connectBtn')
const metamaskBtn = document.getElementById('MetamaskBtn')


export const connection = () => {
    console.log('clicked');
};

export const metaconnect = async () => {
    if (window.ethereum) {
        console.log('metamask present');
        accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
        }).catch((err) => {
            //error handling
            if (err.code == '-32002') {
                const button = document.querySelectorAll('#button');
                //disable buttons
                button.disabled = true;

                container.style.opacity = '0.4';

                loader.style.opacity = '1';

                alert('Your connection is pending. Please open metamask to continue.')
                console.log('worse than we imagined')
            }
            else if (err.code == '4001') {
                alert('You rejected the request to connect Metamask.');
                container.style.opacity = '';
                loader.style.opacity = '0';
                
            }
            console.log(err.code)
        })
        if (accounts[0] !== 'null') {
            setTimeout(() => {
                window.location.href = '/landing'
            }, 300);
            console.log(accounts[0]);
        }

        //balance = await provider.getBalance(accounts[0]);
        //balance = ethers.utils.formatEther(balance);


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
    else {
        alert('You do not have Metamask.');
        console.log('nothin dey here');

    }

    //return(balance, ', ', accounts[0]);
}





