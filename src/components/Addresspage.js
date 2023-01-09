import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import Address from './Address';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { ETHERSCANID } from '../server/keys';
import { useState } from 'react';


TimeAgo.addDefaultLocale(en)





const endpoint = 'https://api.etherscan.io/api';


//let infura = INFURA;
const etherscanId = ETHERSCANID;
const timeAgo = new TimeAgo('en-US')

const Addresspage = () => {
    let accounts;
    const location = useLocation();
    const address = location.state.addressPri;
    const history = useHistory();
    const button = document.querySelectorAll('#button');

    const account = location.state.accountPri;

    const [balance, setBalance] = useState('');
    const [mainEtherPrice, setMainEtherPrice] = useState('');

    const denom = 1000000000000000000;

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

        async function getEtherPrice(){
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

        getEtherPrice()
        


        async function getWalletBalance() {
            await fetch(endpoint + `?module=account&action=balance&address=${address}&apikey=${etherscanId}`)
                .then((response) => response.json())
                .then((data) => { 
                    setBalance(data.result);
                })
                .catch((err) => console.log(err));
        }

        getWalletBalance()

        await fetch(endpoint + `?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=${etherscanId}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.status == 1) {

                    let i;
                    for (i = 0; i <= 25; i++) {
                        //console.log('i love you');
                        
                        const rawBlockNumber = data.result[i].blockNumber;
                        const rawTimeStamp = data.result[i].timeStamp;
                        const rawHash = data.result[i].hash;
                        const rawValue = data.result[i].value;
                        const rawGasPrice = data.result[i].gasPrice;

                        const dividedValue = rawValue / denom;
                        const finalValue = expo(dividedValue, 3);

                  

                        const resultList = document.getElementById('resultList');
                        const listrow = document.createElement('tr');
                        const listdetail = document.createElement('td');
                        const listdetail1 = document.createElement('td');
                        const listdetail2 = document.createElement('td');
                        const listdetail3 = document.createElement('td');
                        const listdetail4 = document.createElement('td');
                        listdetail.innerHTML += truncate(rawHash, 10);
                        listdetail1.innerHTML += truncate(rawBlockNumber, 8);
                        listdetail2.innerHTML += timeAgo.format(rawTimeStamp * 1000);
                        listdetail3.innerHTML += finalValue;
                        listdetail4.innerHTML += truncate(rawGasPrice, 9);

                        listrow.append(listdetail);
                        listrow.append(listdetail1);
                        listrow.append(listdetail2);
                        listrow.append(listdetail3);
                        listrow.append(listdetail4);
                        resultList.append(listrow);
                        

                        //Result display for mobile view
                        
                        
                        const div1 = document.createElement('div');
                        const div2 = document.createElement('div');
                        const para1 = document.createElement('p');
                        const para2 = document.createElement('p');
                        const para3 = document.createElement('p');
                        const para4 = document.createElement('p');
                        const para5 = document.createElement('p');
                        const transStamp = document.getElementById('transStamp');
                        

                        para1.innerHTML+= "<b> Tx#:  </b>" + truncate(rawHash, 14);
                        para2.innerHTML+= timeAgo.format(rawTimeStamp * 1000);
                        para3.innerHTML+= "<b> Block Number:  </b>" +truncate(rawBlockNumber, 8);
                        para4.innerHTML+= '<b> Value:  </b>' + finalValue + " Ether";
                        para5.innerHTML+= '<b> GasUsed (Gwei):  <b/>' + truncate(rawGasPrice, 9);
                        para2.style.color = 'rgba(239, 203, 13, 1)'
                        div1.style.display = 'flex';
                        div1.style.justifyContent = "space-between";
                        div2.style.borderBottom = 'solid 2px silver';
                        div2.style.padding = '0 0 5px 5px'
                        div1.style.paddingLeft = '5px'
                        div1.style.paddingTop = '5px'
                        div1.append(para1);
                        div1.append(para2);
                        div2.append(para3);
                        div2.append(para4);
                        div2.append(para5);
                        transStamp.append(div1)
                        transStamp.append(div2);
                    }


                }else if(data.result.length == 0){
                    const resultList = document.getElementById('resultList');
                    const listrow = document.createElement('tr');
                    const listdetail = document.createElement('td');
                    listdetail.setAttribute('colspan', 5);
                    listdetail.innerHTML += 'No transaction';
                    listrow.append(listdetail);
                    resultList.append(listrow);

                    //No Transaction
                    const div1 = document.createElement('div');
                    const para1 = document.createElement('p');
                    const transStamp = document.getElementById('transStamp');
                    para1.innerHTML+= 'No Transactions';
                    div1.append(para1);
                    transStamp.append(div1);
                    div1.style.textAlign = 'center'
                }
            })
            .catch((err) => console.log(err));
    }

    const dividedBalance = expo(balance / denom, 3) + ' Ether';
    console.log(balance);
    console.log(denom);
    const midBalance = (balance/denom) * mainEtherPrice; 
   //const finalBalance = dividedBalance * mainEtherPrice;

   const confirmMeta = async () => {
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
   



    useEffect(() => {

        getTxList()

        console.log('use effects used');
    }, []);

   



    return (
        <div>
            <Address /*message={message}*/ etherprice={midBalance} balance={dividedBalance} address={address} confirmMeta={confirmMeta} />
        </div>
    )
}

export default Addresspage;