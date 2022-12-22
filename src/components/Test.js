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
