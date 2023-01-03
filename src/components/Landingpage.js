import { useHistory } from "react-router-dom";
import Land from './Land'
import { useState } from 'react';
import '../css/index.css'

import "../components/Landingpage";
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'

import { ETHERSCANID } from '../server/keys';






const endpoint = 'https://api.etherscan.io/api';
const etherscanId = ETHERSCANID;



let accounts;



const Landingpage = () => {

    const [message, setMessage] = useState('');

    const loader = document.getElementById('loader');
    const container = document.getElementById('container');
    const button = document.querySelectorAll('#button');

    const history = useHistory();

    const handlechange = (e) => {
        setMessage(e.target.value);
    }


    const manualconnect = () => {
        //console.log(`${input.value}`.trim());
        async function determineBlock() {
            const finalMessage = Number(message.trim()).toString(16);
            console.log(finalMessage);

            await fetch(endpoint + `?module=proxy&action=eth_getBlockByNumber&tag=${finalMessage}&boolean=true&apikey=${etherscanId}`)
                .then((res) => res.json())
                .then((data) => {
                    if(data.result !== null){   
                    console.log(data)
                    history.push({
                        pathname: "/blockresult",
                        state: {
                            blockPri: message.trim()
                        }
                    })
                    }else{
                        console.log('kosi much')
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }

        determineBlock();

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
                else {
                    alert('Thre is an error connecting with your metamask');
                }
            })

            if (accounts[0] !== 'null') {
                console.log('metamask connected');
                history.push({
                    pathname: "/result",
                    state: {
                        accountPri: accounts[0],

                    }
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

    }

    return (
        <div>
            <Land message={message} manualconnect={manualconnect} handlechange={handlechange} metaconnect={metaconnect} />
        </div>
    );
}




export default Landingpage;