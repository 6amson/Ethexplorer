import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import Block from './Block';
import { useHistory } from "react-router-dom";
//import { useEffect } from 'react';
//import { INFURA } from "../server/keys";
import { ETHERSCANID } from '../server/keys';
import { useState } from 'react';
//const axios = require('axios');
//import "../components/Landingpage";
//const { ethers } = require("ethers");

TimeAgo.addDefaultLocale(en)





const endpoint = 'https://api.etherscan.io/api';


//let infura = INFURA;
const etherscanId = ETHERSCANID;
const timeAgo = new TimeAgo('en-US')

let accounts;

const Blockpage = () => {
    const location = useLocation();
    const block = location.state.blockPri;
    const history = useHistory();
    const button = document.querySelectorAll('#button');
    //const account = '0xB9EC6069F13F88476229f2Df442Dcd997b736B32';

    const [Miner, setMiner] = useState('');
    const [mainEtherPrice, setMainEtherPrice] = useState('');
    const [Transactionslength, setTransactionslength] = useState('');
    const [difficulty, setdifficulty] = useState('');
    const [timeStamp, setClientTimeStamp] = useState('');
    const [Hash, setHash] = useState('');
    const [Nonce, setNonce] = useState('');
    const [Reward, setReward] = useState('');
    const [GasUsed, setGasUsed] = useState('');

    const denom = 1000000000000000000;

    const finalBlock = Number(block.trim()).toString(16);


    const confirmMetaBlock = async () => {
        if (window.ethereum) {

            console.log('metamask present');
            accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            }).catch((err) => {

                //error handling
                if (err.code == '-32002') {


                    //disable buttons
                    button.disabled = true;

                    alert('Your connection is pending. Please open metamask to continue.')
                    console.log('worse than we imagined')
                }
                else if (err.code == '4001') {
                    alert('You rejected the request to connect Metamask.');
                    button.disabled = false;

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
         
        }
        else {
            alert('You do not have Metamask.');

        }
    }


    const truncate = (string, limit) => {
        if (string.length <= limit) {
            return string;
        }
        return string.slice(0, limit) + "...";
    }


    function expo(x, f) {
        return Number.parseFloat(x).toExponential(f);
    }


    async function getTxList() {

        async function determineBlock() {
            console.log(block);
            await fetch(endpoint + `?module=proxy&action=eth_getBlockByNumber&tag=${finalBlock}&boolean=true&apikey=${etherscanId}`)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    console.log(data.result.transactions.length)
                    setTransactionslength(data.result.transactions.length);
                    setClientTimeStamp(timeAgo.format(parseInt(data.result.timestamp) * 1000));
                    setHash(truncate(data.result.hash, 34))
                    setNonce(data.result.nonce);
                    setdifficulty(parseInt(data.result.totalDifficulty));
                    setGasUsed(parseInt(data.result.gasUsed));

                    

                })
                .catch((err) => {
                    console.log(err)
                })
        };

        determineBlock();

        async function getBlockReward() {
            await fetch(endpoint + `?module=block&action=getblockreward&blockno=${block}&apikey=${etherscanId}`)
                .then((res) => res.json())
                .then((data) => {

                    console.log(data);
                    setMiner(truncate(data.result.blockMiner, 34));
                    setReward(data.result.blockReward / denom)

                })
                .catch((err) => {
                    console.log(err)
                })
        }

        getBlockReward();



        async function getEtherPrice() {
            await fetch(endpoint + `?module=stats&action=ethprice&apikey=${etherscanId}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data.result.ethusd);
                    setMainEtherPrice(data.result.ethusd);
                })
                .catch((err) => {
                    console.log(err)
                })
        };

        //getEtherPrice()
    }


    useEffect(() => {

        getTxList()

        console.log('use effects used');
    }, []);




    return (


        <div>
            <Block gasused={GasUsed} miner={Miner} reward={Reward} difficulty={difficulty} nonce={Nonce} hash={Hash} timeStamp={timeStamp} transactions={Transactionslength} block={block} confirmMeta={confirmMetaBlock} />
        </div>
    )
}


export default Blockpage;