import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import Block from './Block';
import { useHistory } from "react-router-dom";
import Transhash from './Transhash';
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

const Transhashpage = () => {
    const location = useLocation();
    const hash = location.state.hashPri;
    const history = useHistory();
    const button = document.querySelectorAll('#button');
    //const account = '0xB9EC6069F13F88476229f2Df442Dcd997b736B32';
    //const [Miner, setMiner] = useState('');
    //const [mainEtherPrice, setMainEtherPrice] = useState('');
    const [blockNumber, setBlockNumber] = useState('');
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [value, setValue] = useState('');
    const [timeStamp, setTimeStamp] = useState('');
    const [status, setStatus] = useState('');
    const [type, setType] = useState('');
    const [gasUsed, setGasUsed] = useState('');
    const [gas, setGas] = useState('');

    const denom = 1000000000000000000;




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

    const finalhash = truncate(hash, 34)


    function expo(x, f) {
        return Number.parseFloat(x).toExponential(f);
    }


    async function getTxList() {

        async function determineTransaction() {
  
            await fetch(endpoint + `?module=account&action=txlistinternal&txhash=${hash}&apikey=${etherscanId}`)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)

                    setType(data.result[0].type);
                    setBlockNumber(data.result[0].blockNumber);
                    setFrom(data.result[0].from)
                    //setFrom(truncate(data.result[0].from, 34))
                    setTo(data.result[0].to);
                    //setTo(truncate(data.result[0].to, 34))
                    setValue(data.result[0].value / denom);
                    setGasUsed(data.result[0].gasUsed);
                    setGas(data.result[0].gas);
                    setTimeStamp(timeAgo.format(parseInt(data.result[0].timeStamp) * 1000));
                    if(data.result[0].isError == 0){
                        setStatus('Success');
                    }else{
                        setStatus('Cancelled');
                    }
                    

                })
                .catch((err) => {
                    console.log(err)
                })
        };

        determineTransaction()
    }


    useEffect(() => {

        getTxList();

        console.log('use effects used on TransactionHashpage');
    }, []);




    return (


        <div>
            <Transhash gas={gas} gasused={gasUsed} from={from} to={to} value={value} type={type} status={status} timeStamp={timeStamp} blockNumber={blockNumber} hash={finalhash} confirmMeta={confirmMetaBlock} />
        </div>
    )
}


export default Transhashpage;