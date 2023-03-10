import { Link } from 'react-router-dom';
import '../css/index.css';
import './Landingpage'
import metamasklogo from '../css/MetamaskIcon.png'



const Land = (props) => {
    const handlechange = props.handlechange
    const message = props.message;
    const metaconnect = props.metaconnect;
    const manualconnect = props.manualconnect;
    const timestamp1 = props.timestamp1;
    const timestamp2 = props.timestamp2;
    const totalnodecount = props.totalnodecount;
    const etherbtc = props.etherbtc;
    const ethersupply = props.ethersupply;
    const mainetherprice = props.mainetherprice;
    const recentblock = props.recentblock;
    const gasprice = props.gasprice;


    let count = 0;
    function menuClick() {
        count++
        console.log(count);

        function resetCount() {
            count = 0;
        }

        switch (count) {
            case 1:
                alert('Pretty harburger innit?');
                break;
            case 2:
                alert('You do realise this doesn\'t work right');
                break;
            case 3:
                alert("You\'re a stubborn one alright")
                break;
            case 4:
                alert('Damn!, I give in, here is a menu')
                break;
            case 5:
                alert('That will lead us back to doh...Doh, a deer, a female deer');
                setTimeout(() => {
                    console.log('timeout called')
                    resetCount();
                }, 1000)
                break;

        }
    }

    return (

        <div id='container' className='container'>
            <div id="loader" class="center"></div>
            <div className='navDiv'>
                <nav>
                    <div className='navDiv_logoDiv'><i className="fa-brands fa-ethereum"></i><Link to="/" className='linkHome'><span>ETHEXPLORER</span></Link></div>
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
                            <button onClick={metaconnect}><img src={metamasklogo} id='metamasklogomobile' alt='metamask logo' /></button>
                            <i onClick={menuClick} class="fa-solid fa-bars"></i>
                        </div>
                        <button onClick={metaconnect} className='MetamaskBtn' id='MetamaskBtn'>Connect Wallet <img src={metamasklogo} id='metamasklogo' alt='metemask logo' /></button>
                    </div>
                </nav>
            </div>


            <div className='bodyDiv'>
                <div className='bodyDivSub'>
                    <div className='bodyDiv_h1Text'><h1>Ethereum <span>Blockchain</span> Explorer</h1></div>
                    <div className='bodyDiv_paraText'><h3>Get access to all transactions that occur on the ethereum blockchain.</h3></div>
                    <div className='bodyDiv_input' >
                        <input
                            className='Input'
                            onChange={handlechange}
                            value={message}
                            type='text'
                            id='input'
                            placeholder="Search by Address, Transaction, or Block">
                        </input>
                        <button onClick={manualconnect} id='connectBtn' className='ethlogoSearch'><i class="fa-solid fa-magnifying-glass"></i></button>
                    </div>
                    <div className='bodyDiv_inputText'>
                        <div><i class="fa-solid fa-wallet"></i><span className='bodyDiv_searchText' id='bodyDiv_searchTextAdd'>Address</span></div>
                        <div><i class="fa-solid fa-cube"></i><span className='bodyDiv_searchText' id='bodyDiv_searchTextBlo'>Block Number</span></div>
                        <div><i class="fa-solid fa-arrow-right-arrow-left"></i><span className='bodyDiv_searchText' id='bodyDiv_searchTextTra'>Transaction Hash</span></div>
                    </div>
                </div>
            </div>



            <div className='infoDis'>
                <div className='infoDisplayDiv'>
                    <div className='infoDisplayFirstDiv'>
                        <i className="fa-brands fa-ethereum"></i><div className='infoDisplayPriceDiv'><span>ETHER PRICE</span></div>
                        <div className='infoDisplayValueDiv'>
                            <div className='infoDisplayValueDiv1'>
                                <span>${mainetherprice}</span>
                            </div>
                            <div className='infoDisplayValueDiv2'>
                                <span>{timestamp2}</span><i class="fa-solid fa-angle-down"></i>
                            </div>

                        </div>
                        <div className='vh'></div>
                        <div className='vl'></div>
                    </div>

                    <div className='infoDisplayFirstDiv'>
                        <i class="fa-solid fa-arrow-right-arrow-left"></i><div className='infoDisplayPriceDiv'><span>TOTAL ETHER SUPPLY</span></div>
                        <div className='infoDisplayValueDiv'>
                            <div className='infoDisplayValueDiv1'>
                                <span>{ethersupply}</span>
                            </div>


                            <div className='vh2'></div>
                            <div className='vl2'></div>
                        </div>
                    </div>

                    <div className='infoDisplayFirstDiv infoDisplayFirstDivBlock'>
                        <i class="fa-solid fa-cube"></i><div className='infoDisplayPriceDiv'><span>LATEST BLOCK</span></div>
                        <div className='infoDisplayValueDiv'>
                            <div className='infoDisplayValueDiv1'>
                                <span>{recentblock}</span>
                            </div>

                            <div className='vh3'></div>
                        </div>
                    </div>

                    <div className='infoDisplayFirstDiv'>
                        <i class="fa-solid fa-earth-oceania"></i><div className='infoDisplayPriceDiv'><span>ETH/BTC</span></div>
                        <div className='infoDisplayValueDiv'>
                            <div className='infoDisplayValueDiv1'>
                                <span>{etherbtc}</span>
                            </div>


                        </div>
                    </div>

                    <div className='infoDisplayFirstDiv'>
                        <i class="fa-solid fa-share-nodes"></i><div className='infoDisplayPriceDiv'><span>TOTAL NODE COUNT</span></div>
                        <div className='infoDisplayValueDiv'>
                            <div className='infoDisplayValueDiv1'>
                                <span>{totalnodecount}</span>
                            </div>


                        </div>
                    </div>

                    <div className='infoDisplayFirstDiv infoDisplayFirstDivMGP'>
                        <i class="fa-solid fa-fire"></i><div className='infoDisplayPriceDiv'><span>MED. GAS PRICE(Gwei)</span></div>
                        <div className='infoDisplayValueDiv'>
                            <div className='infoDisplayValueDiv1'>
                                <span>{gasprice}</span>
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
                        <div className='footer2Div'><span><strong>Blockchain</strong></span><i class="fa-solid fa-plus"></i></div>
                        <div>
                            <ul className='footer2Ul'>
                                <li>Transactions</li>
                                <li>Blocks</li>
                            </ul>
                        </div>
                    </div>

                    <div className='footer3'>
                        <div className='footer3Div'><span><strong>About</strong></span><i class="fa-solid fa-plus"></i></div>
                        <div>
                            <ul className='footer3Ul'>
                                <li>About Ethexplorer</li>
                                <li>Terms of service</li>
                                <li>Privacy Policy</li>
                                <li>FAQS</li>
                            </ul>
                        </div>
                    </div>

                    <div className='footer4'>
                        <div className='footer4Div'><span><strong>Languages</strong></span><i class="fa-solid fa-plus"></i></div>
                        <div>
                            <ul className='footer4Ul'>
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



    )
}

export default Land;