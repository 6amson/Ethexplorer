import '../css/index.css';
import './Resultpage'
import metamasklogo from '../css/MetamaskIcon.png'
import { Link } from 'react-router-dom';




const Block = (props) => {
    const confirmMeta = props.confirmMeta
    const block = props.block;
    const transactions = props.transactions;
    const timeStamp = props.timeStamp;
    const hash = props.hash;
    const nonce = props.nonce;
    const difficulty = props.difficulty;
    const reward = props.reward;
    const miner = props.miner;
    const gasused = props.gasused;



    return (
        <div id='container' className='container'>

            <div className='navDiv'>

                <nav>
                    <div className='navDiv_logoDiv'><i className="fa-brands fa-ethereum"></i><Link to="/" className='linkHome'><span>ETHEXPLORER</span></Link></div>
                    <div className='navDiv_HomeDiv'><span className='navDiv_logoDiv'>Block</span><div className='homeBorderBottom'></div></div>
                    <div className='navDiv_optionsDiv'>
                        <ul>
                            <li>Blockchain <i class="fa-solid fa-angle-down"></i></li>
                            <li>About Us <i class="fa-solid fa-angle-down"></i></li>
                            <li>More <i class="fa-solid fa-angle-down"></i></li>
                        </ul>
                    </div>
                    <div className='navDiv_buttonDiv'>
                        <div>
                            <button onClick={confirmMeta}><img src={metamasklogo} id='metamasklogomobile' alt='metamask logo' /></button>
                            <i class="fa-solid fa-bars"></i>
                        </div>
                        <button onClick={confirmMeta} className='MetamaskBtn' id='MetamaskBtn'>Connect Wallet <img src={metamasklogo} id='metamasklogo' alt='metemask logo' /></button>
                    </div>
                </nav>
            </div>


            <div className='bodyblock'>
                <div className='body1'>
                    <caption>Block Details</caption>
                    <hr />
                    <div className='body11'>

                        <div>
                            <p><strong>Block : </strong>{block}</p>
                        </div>
                        <div>
                            <p><strong>Transactions : </strong><span className='balanceSpan'>{transactions}</span></p>
                        </div>
                        <div>
                            <p><strong>TimeStamp : </strong><span style={{ color: 'rgba(31, 199, 212, 1)' }}>{timeStamp}</span></p>
                        </div>
                    </div>
                </div>

                <div className='blockbodyy'>

                    <div className='blockbodyDiv'>
                        <div className='blockbody'>
                            <div className='blockbody1'><p>Additional Info</p></div>

                            <div className='blockbody2'>
                                <div  className='blockbody2para1'>
                                    <p><strong>Hash :</strong></p>
                                    <p>{hash}</p>
                                </div>

                                <div  className='blockbody2para2'>
                                    <p><strong>Nonce :</strong></p>
                                    <p>{nonce}</p>
                                </div>

                                <div  className='blockbody2para3'>
                                    <p><strong>Total Difficulty :</strong></p>
                                    <p>{difficulty}</p>
                                </div>
                                
                            </div>

                            <div className='blockbody3'>

                            <div  className='blockbody3para1'>
                                    <p><strong>Miner: </strong></p>
                                    <p>{miner}</p>
                                </div>

                                <div  className='blockbody3para2'>
                                    <p><strong>Reward :</strong></p>
                                    <p>{reward} Ether</p>
                                </div>
                                
                                <div  className='blockbody3para3'>
                                    <p><strong>GasUsed (Gwei) :</strong></p>
                                    <p>{gasused}</p>
                                </div>
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


export default Block;