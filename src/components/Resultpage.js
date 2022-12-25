import '../components/Landingpage'
import '../css/index.css'
import { useEffect } from 'react';

let metaconnect;
let account;
let balance;


const Resultpage = () => {
    
    return (

        
        <div id='container' className='container'>

            <div className='navDiv'>
                <div id="loader" class="center"></div>
                <nav>
                    <div className='navDiv_logoDiv'><i className="fa-brands fa-ethereum"></i><span>ETHEXPLORER</span></div>
                    <div className='navDiv_HomeDiv'><span className='navDiv_logoDiv'>Results</span><div className='homeBorderBottom'></div></div>
                    <div className='navDiv_optionsDiv'>
                        <ul>
                            <li>Blockchain <i class="fa-solid fa-angle-down"></i></li>
                            <li>About Us <i class="fa-solid fa-angle-down"></i></li>
                            <li>More <i class="fa-solid fa-angle-down"></i></li>
                        </ul>
                    </div>
                    <div className='navDiv_buttonDiv'>
                        <button onClick={metaconnect} id='MetamaskBtn'>Connect Wallet</button>
                    </div>
                </nav>
            </div>


            <div className='body'>
                <div className='body1'>
                    <div>
                        <i class="fa-solid fa-wallet"></i><p><strong>Address : </strong>{account}</p>
                    </div>
                    <div>
                        <i class="fa-solid fa-coins"></i><p><strong>Balance : </strong>{balance}</p>
                    </div>
                    <div>
                        <i class="fa-solid fa-hand-holding-dollar"></i><p><strong>Ether value : </strong>{''}</p>
                    </div>
                </div>

                <div className='body2'>

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
    )
}

export default Resultpage;