import metamasklogo from '../css/MetamaskIcon.png'
import { useState } from 'react';
import '../css/index.css'
//import '../server/server'
import { INFURA } from "../server/keys";
import "../components/Landingpage";
const { ethers } = require("ethers");

//import { metaconnect, manualconnect, accounts} from '../server/server';



let infura = INFURA;


const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${infura}`)
const loader = document.getElementById('loader');
//const connectBtn = document.getElementById('connectBtn')
//const metamaskBtn = document.getElementById('MetamaskBtn')
const input = document.getElementById('input');
const container = document.getElementById('container');


const Landingpage = () => {

    const [message, setMessage] = useState('');
    const [account, setAccount] = useState('');
    const [balance, setBalance] = useState('');

    const handlechange = (e) => {
        setMessage(e.target.value);
    }



    const manualconnect = async () => {
        let balances;
        console.log(`${input.value}`.trim());

        balances = await provider.getBalance(`${input.value}`.trim());
        balances = ethers.utils.formatEther(balances);
        setBalance(balances);
        const gasprice = await provider.getGasPrice(`${input.value}`.trim());
        console.log(ethers.utils.formatUnits(gasprice, "gwei"));
        console.log(balance);
    };



    const metaconnect = async () => {
        let accounts;
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
                //console.log(err.code)
            })
            if (accounts[0] !== 'null') {
                window.location.href = '/result'
                setAccount(accounts[0]);
                return (account);
                

            } else {
                return
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
        <div id='container' className='container'>
            <div id="loader" class="center"></div>
            <div className='navDiv'>
                <nav>
                    <div className='navDiv_logoDiv'><i className="fa-brands fa-ethereum"></i><span>ETHEXPLORER</span></div>
                    <div className='navDiv_HomeDiv'><span className='navDiv_logoDiv'>Home</span><div className='homeBorderBottom'></div></div>
                    <div className='navDiv_optionsDiv'>
                        <ul>
                            <li>Blockchain <i class="fa-solid fa-angle-down"></i></li>
                            <li>About Us <i class="fa-solid fa-angle-down"></i></li>
                            <li>More <i class="fa-solid fa-angle-down"></i></li>
                        </ul>
                    </div>
                    <div className='navDiv_buttonDiv'>
                        <div>
                    <img src={metamasklogo} id='metamasklogomobile' alt='metemask logo'/>
                    <i class="fa-solid fa-bars"></i>
                    </div>
                    <button onClick={metaconnect} id='MetamaskBtn'>Connect Wallet <img src={metamasklogo} id='metamasklogo' alt='metemask logo'/></button>
                    </div>
                </nav>
            </div>


            <div className='bodyDiv'>
                <div className='bodyDivSub'>
                    <div className='bodyDiv_h1Text'><h1>Ethereum <span>Blockchain</span> Explorer</h1></div>
                    <div className='bodyDiv_paraText'><h3>Get access to all transactions that occur on the ethereum blockchain.</h3></div>
                    <div className='bodyDiv_input' >

                        <button onClick={manualconnect} id='connectBtn' className='ethlogoSearch'>ETH<i className="fa-brands fa-ethereum fa-ethereumlogo"></i></button>


                        <i class="fa-solid fa-magnifying-glass"></i>
                        <input
                            onChange={handlechange}
                            value={message}
                            type='text'
                            id='input'
                            placeholder="Search by Address, Transaction, or Block">
                        </input>
                    </div>
                    <div className='bodyDiv_inputText'>
                        <div><i class="fa-solid fa-wallet"></i><span className='bodyDiv_searchText' id='bodyDiv_searchTextAdd'>Address</span></div>
                        <div><i class="fa-solid fa-cube"></i><span className='bodyDiv_searchText' id='bodyDiv_searchTextBlo'>Block Number</span></div>
                        <div><i class="fa-solid fa-arrow-right-arrow-left"></i><span className='bodyDiv_searchText' id='bodyDiv_searchTextTra'>Transaction Hash</span></div>
                    </div>
                </div>
            </div>

            <div className='errorMes'><p>{balance}</p></div>

            <div className='infoDis'>
                <div className='infoDisplayDiv'>
                    <div className='infoDisplayFirstDiv'>
                        <i className="fa-brands fa-ethereum"></i><div className='infoDisplayPriceDiv'><span>ETHER PRICE</span></div>
                        <div className='infoDisplayValueDiv'>
                            <div className='infoDisplayValueDiv1'>
                                <span>$ 1, 182.32</span>
                            </div>
                            <div className='infoDisplayValueDiv2'>
                                <span>2.58%</span><i class="fa-solid fa-angle-down"></i>
                            </div>

                        </div>
                        <div className='vh'></div>
                        <div className='vl'></div>
                    </div>

                    <div className='infoDisplayFirstDiv'>
                        <i class="fa-solid fa-arrow-right-arrow-left"></i><div className='infoDisplayPriceDiv'><span>TRANSACTIONS</span></div>
                        <div className='infoDisplayValueDiv'>
                            <div className='infoDisplayValueDiv1'>
                                <span>$ 1, 182.32</span>
                            </div>
                            
                            <div className='vh2'></div>
                            <div className='vl2'></div>
                        </div>
                    </div>

                    <div className='infoDisplayFirstDiv infoDisplayFirstDivBlock'>
                        <i class="fa-solid fa-cube"></i><div className='infoDisplayPriceDiv'><span>BLOCKS</span></div>
                        <div className='infoDisplayValueDiv'>
                            <div className='infoDisplayValueDiv1'>
                                <span>$ 1, 182.32</span>
                            </div>
                            
                            <div className='vh3'></div>
                        </div>
                    </div>

                    <div className='infoDisplayFirstDiv'>
                        <i class="fa-solid fa-earth-oceania"></i><div className='infoDisplayPriceDiv'><span>MARKET CAP</span></div>
                        <div className='infoDisplayValueDiv'>
                            <div className='infoDisplayValueDiv1'>
                                <span>$ 1, 182.32</span>
                            </div>
                            

                        </div>
                    </div>

                    <div className='infoDisplayFirstDiv'>
                        <i class="fa-solid fa-clock"></i><div className='infoDisplayPriceDiv'><span>TRANSACTIONS PER SEC</span></div>
                        <div className='infoDisplayValueDiv'>
                            <div className='infoDisplayValueDiv1'>
                                <span>$ 1, 182.32</span>
                            </div>
                            

                        </div>
                    </div>

                    <div className='infoDisplayFirstDiv infoDisplayFirstDivMGP'>
                        <i class="fa-solid fa-dollar-sign"></i><div className='infoDisplayPriceDiv'><span>MED. GAS PRICE</span></div>
                        <div className='infoDisplayValueDiv'>
                            <div className='infoDisplayValueDiv1'>
                                <span>$ 1, 182.32</span>
                            </div>

                        </div>
                    </div>


                </div>
            </div>
            <section>
                <div className='footer'>
                    <div className='footer1'>
                        <div className='navDiv_logoDiv'><i className="fa-brands fa-ethereum"></i><span className='footerEth'>ETHEXPLORER</span></div>
                        <div><p><strong>ETHExplorer</strong> is a Blockchain platform for Ethereum.</p></div>
                        <div></div>
                    </div>

                    <div className='footer2'>
                        <div><span><strong>Blockchain</strong></span></div>
                        <div>
                            <ul>
                                <li>Transactions</li>
                                <li>Blocks</li>
                            </ul>
                        </div>
                    </div>

                    <div className='footer3'>
                        <div><span><strong>About</strong></span></div>
                        <div>
                            <ul>
                                <li>About Ethexplorer</li>
                                <li>Terms of service</li>
                                <li>Privacy Policy</li>
                                <li>FAQS</li>
                            </ul>
                        </div>
                    </div>

                    <div className='footer4'>
                        <div><span><strong>Languages</strong></span></div>
                        <div>
                            <ul>
                                <li>English</li>
                                <li>Arabic</li>
                                <li>French</li>
                                <li>German</li>
                            </ul>
                        </div>
                    </div>

                </div>

                <div className='lastSection'>
                    <div className='lastSection1'>
                        <p>Ethexplorer</p>
                        <i class="fa-regular fa-registered"></i>
                        <p>2022</p>
                    </div>

                    <div className='lastSection2'>
                        <p><i class="fa-brands fa-facebook"></i></p>
                        <p><i class="fa-brands fa-github"></i></p>
                        <p><i class="fa-brands fa-linkedin"></i></p>
                        <p><i class="fa-brands fa-instagram"></i></p>
                    </div>
                </div>
            </section>
        </div>


    );
}


export default Landingpage;