import { useHistory } from "react-router-dom";
import Land from './Land'
import { useState } from 'react';
import '../css/index.css'
import { INFURA } from "../server/keys";
import "../components/Landingpage";
import Resultpage from './Resultpage';
import { render } from '@testing-library/react';
const { ethers } = require("ethers");



//import { metaconnect, manualconnect, accounts} from '../server/server';



let infura = INFURA;

const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${infura}`)
let accounts;



const Landingpage = () => {

    const [message, setMessage] = useState('');
    const [account, setAccount] = useState('');
    const [balance, setBalance] = useState('');

    const loader = document.getElementById('loader');
    //const connectBtn = document.getElementById('connectBtn')
    //const metamaskBtn = document.getElementById('MetamaskBtn')
    const input = document.getElementById('input');
    const container = document.getElementById('container');
    const button = document.querySelectorAll('#button');

    const history = useHistory();

    const handlechange = (e) => {
        setMessage(e.target.value);
    }


    //console.log(balance);

    const manualconnect = async () => {
        let balances;
        //console.log(`${input.value}`.trim());

        balances = await provider.getBalance(message.trim());
        balances = ethers.utils.formatEther(balances);
        setBalance(balances);
        const gasprice = await provider.getGasPrice(message.trim());
        console.log(ethers.utils.formatUnits(gasprice, "gwei"));

    };
  
    //console.log(account);



    const metaconnect = async () => {

        if (window.ethereum) {

            console.log('metamask present');
            accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            }).catch((err) => {

                //error handling
                if (err.code == '-32002') {


                    //disable buttons
                    button.disabled = true;
                    container.style.opacity = '0.4';
                    loader.style.opacity = '1';

                    alert('Your connection is pending. Please open metamask to continue.')
                    console.log('worse than we imagined')
                }
                else if (err.code == '4001') {
                    alert('You rejected the request to connect Metamask.');
                    container.style.opacity = '1';
                    loader.style.opacity = '0';
                }
                else{
                    alert('Thre is an error connecting with your metamask');
                }
                //console.log(err.code)
            })
        
            if (accounts[0] !== 'null') {
                //window.location.href = '/result'
                //return (account);
                console.log('metamask connected');
                setAccount(accounts[0]);
                
                console.log(account);
                //console.log(accounts[0]);
                history.push({
                    pathname: "/result",
                    state: { detail: accounts[0]}
                })
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

        }

        return (account);

    }

    return (
        <div>
            <Land message={message} balance={balance} manualconnect={manualconnect} handlechange={handlechange} metaconnect={metaconnect} />
        </div>
    );
}




export default Landingpage;