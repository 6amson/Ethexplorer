import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { useHistory } from "react-router-dom";
import Land from './Land'
import { useState } from 'react';
import '../css/index.css'

import "../components/Landingpage";
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'

import { ETHERSCANID } from '../server/keys';
import { useEffect } from 'react';

TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US');




const endpoint = 'https://api.etherscan.io/api';
const etherscanId = ETHERSCANID;



let accounts;



const Landingpage = () => {

    const [TimeStamp2, setTimeStamp2] = useState('')
    const [TimeStamp1, setTimeStamp1] = useState('')
    const [TotalNodeCount, setTotalNodeCount] = useState('')
    const [EtherBtc, setEtherBtc] = useState('')
    const [EtherSupply, setEtherSupply] = useState('')
    const [MainEtherPrice, setMainEtherPrice] = useState('')
    const [RecentBlock, setRecentBlock] = useState('')
    const [GasPrice, setGasPrice] = useState('')
    const [message, setMessage] = useState('');

    const input = document.getElementById('input');
    const loader = document.getElementById('loader');
    const container = document.getElementById('container');
    const button = document.querySelectorAll('#button');

    const history = useHistory();

    const handlechange = (e) => {
        setMessage(e.target.value);
    }


    const manualconnect = () => {

        //console.log(`${input.value}`.trim());
        loader.style.display = 'block';
        determineBlock();
    }


    async function determineBlock() {
        const finalMessage = Number(message.trim()).toString(16);
        console.log(finalMessage);

        await fetch(endpoint + `?module=proxy&action=eth_getBlockByNumber&tag=${finalMessage}&boolean=true&apikey=${etherscanId}`)
            .then((res) => res.json())
            .then((data) => {
                if (!data) {
                    loader.style.dusplay = 'block';
                } else if (data.result) {
                    //fxn for history push
                    history.push({
                        pathname: "/blockresult",
                        state: {
                            blockPri: message.trim()
                        }
                    })
                    console.log('block accessed')
                } else if (data.error) {
                    determineHash()
                }
            }).catch((err) => {
                console.log(err.code)
            })
    }


    async function determineHash() {
        await fetch(endpoint + `?module=account&action=txlistinternal&txhash=${message}&apikey=${etherscanId}`)
            .then((res) => res.json())
            .then((data) => {

                if (data.status == 0) {
                    console.log(data.status)
                    determineAddress();

                } else if (data.status == 1) {
                    history.push({
                        pathname: "/hashresult",
                        state: {
                            hashPri: message.trim(),

                        }
                    })
                    //function for history push determinehash
                    console.log('Hash data', data)

                }

            }).catch((err) => {
                console.log(err)
            })
    };


    async function determineAddress() {
        await fetch(endpoint + `?module=account&action=txlist&address=${message}&startblock=0&endblock=999999999&page=1&offset=10&sort=asc&apikey=${etherscanId}`)
            .then((res) => res.json())
            .then((data) => {

                if (data.status == 0) {
                    console.log('nothing here')
                    loader.style.display = "none";
                    input.classList.toggle("invalid");
                    //input.classList.remove('invalid');
                    //return;

                } else if (data.status == 1) {
                    console.log('address logged', data);
                    history.push({
                        pathname: "/addressresult",
                        state: {
                            addressPri: message.trim(),
                        }
                    })

                }
            }).catch((err) => console.log(err))
    };




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
        }
        else {
            alert('You do not have Metamask.');

        }

    }


    function expo(x, f) {
        return Number.parseFloat(x).toExponential(f);
    }

    async function getlandingtxn() {

        await fetch(endpoint + `?module=stats&action=ethsupply&apikey=${etherscanId}`)
            .then((response) => response.json())
            .then((data) => {
                let finalsupply = data.result
                setEtherSupply(expo(finalsupply, 7));
            })
            .catch((err) => {
                console.log(err)
            })

        await fetch(endpoint + `?module=stats&action=ethprice&apikey=${etherscanId}`)
            .then((response) => response.json())
            .then((data) => {
                //console.log(data);
                setMainEtherPrice(data.result.ethusd);
                setEtherBtc(data.result.ethbtc);
                setTimeStamp1(timeAgo.format(parseInt(data.result.ethbtc_timestamp) * 1000));
                setTimeStamp2(timeAgo.format(parseInt(data.result.ethusd_timestamp) * 1000));
            })
            .catch((err) => {
                console.log(err)
            })

        await fetch(endpoint + `?module=stats&action=nodecount&apikey=${etherscanId}`)
            .then((response) => response.json())
            .then((data) => {
                //console.log(data);
                setTotalNodeCount(data.result.TotalNodeCount);    
            })
            .catch((err) => {
                console.log(err)
            })


        await fetch(endpoint + `?module=proxy&action=eth_blockNumber&apikey=${etherscanId}`)
            .then((response) => response.json())
            .then((data) => {
                //console.log(data.result.ethusd);
                setRecentBlock(parseInt(data.result));
            })
            .catch((err) => {
                console.log(err)
            })


        await fetch(endpoint + `?module=proxy&action=eth_gasPrice&apikey=${etherscanId}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data.result);
                setGasPrice(parseInt(data.result));
            })
            .catch((err) => {
                console.log(err)
            })

            
    }

    useEffect(() => {

        getlandingtxn();

    }, [])

    return (
        <div>
            <Land timestamp1={TimeStamp1} timestamp2={TimeStamp2} totalnodecount={TotalNodeCount} etherbtc={EtherBtc} ethersupply={EtherSupply} mainetherprice={MainEtherPrice} recentblock={RecentBlock} gasprice={GasPrice} message={message} manualconnect={manualconnect} handlechange={handlechange} metaconnect={metaconnect} />
        </div>
    );
}




export default Landingpage;