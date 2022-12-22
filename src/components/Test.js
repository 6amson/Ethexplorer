import '../css/index.css'
//import { useEffect } from 'react';


const Test = () =>{
    return(
        <div className='testdiv'>
            <p>Today</p>
            <input className='testInput' type='text' />
        </div>
    );
};

export default Test;
const Alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

(function generateRandomAlphabet(){
    const number = Math.floor(Math.random()*27);
    return Alphabet[number];
})();


<div className='footer'>
<div className='footer1'>
<div className='navDiv_logoDiv'><i className="fa-brands fa-ethereum"></i><span>ETHEXPLORER</span></div>
    <div><p><strong>ETHExplorer</strong> is a Blockchain platform for Ethereum</p></div>
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




//<div className='footer1'>
//                    ll
//                    </div>
//                    <div className='footer1'>
//                    ll
//                    </div>
//                    <div className='footer1'>
//                    ll
//                    </div>
//                    <div className='footer1'>
//                    ll
//                    </div>