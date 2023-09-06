import React,{useState,useEffect} from "react";
import {ethers} from 'ethers';

import {contractABI,contractAddr} from '../utils/constants';

export const TransactionContext = React.createContext();

const {ethereum} = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddr,contractABI,signer);

    return transactionContract;

}

export const TransactionProvider = ({children}) => {

const[currentAccount,setCurrentAccount]=useState("");
const[formData,setFormData] = useState({addressTo:'', amount: '',keyword:'', message:''});
const[isLoading,setIsLoading] = useState(false);
const[transactionCount,setTransactionCount] = useState(localStorage.getItem('transactionCount'));
const[transactions,setTransactions] = useState([]);

const handleChange = (e,name) => {
    setFormData((prevState) => ({...prevState, [name]: e.target.value}));
}

const getAllTransactions = async() => {
    try {
        if(!ethereum) return alert("Please Install metamask");

        const transactionsContract = getEthereumContract();
        const availableTransactions = await transactionsContract.getAllTransaction();

        const structuredTransactions = availableTransactions.map((transaction) => ({
            addressTo:transaction.receiver,
            addressFrom: transaction.sender,
            timestamp:new Date(transaction.timestamp.toNumber()*1000).toLocaleString(),
            message:transaction.message,
            keyword:transaction.keyword,
            amount:parseInt(transaction.amount._hex) /(10** 18)
        }))
       
        setTransactions(structuredTransactions.reverse());

    } catch (error) {
            console.log(error);
    }
}

const checkIfWalletIsConnected = async() => {
    try{
        if(!ethereum) return alert("Please Install metamask");

    const accounts = await window.ethereum.request({method:'eth_requestAccounts'});
    console.log(accounts);

    if(accounts.length){;
        setCurrentAccount(accounts[0]);

        getAllTransactions();
    }else{;
        console.log('No Access Account')
    }
    }catch(error) {
        console.log("No Ethereum Object");
    }
}

const checkIfTransactionExist = async() => {
    try{
        const transactionsContract = getEthereumContract();
        const transactionCount = await transactionsContract.getTransaction();

        window.localStorage.setItem("transactionCount",transactionCount);
    }catch(error){
        console.log(error);
    }
}

const connectWallet = async() => {
    try{
        if(window.ethereum){
            const accounts = await window.ethereum.request({method:'eth_requestAccounts'});
            setCurrentAccount(accounts[0]);
            console.log(currentAccount);
            window.location.reload();
        
        }else{
            console.log("please install metamask")
        }

       
    }catch(error) {
        console.log(error);
    }
}

    const sendTransaction = async() => {
        try{
            if(!ethereum) return alert("please install metamask");

            const {addressTo,amount,keyword,message} = formData;
            const transactionContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);

            await ethereum.request({
                method:'eth_sendTransaction',
                params:[{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208',
                    value:parsedAmount._hex,
                }]
            });

              const transactionHash = await  transactionContract.addToBlockchain(addressTo, parsedAmount,message,keyword);
            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);

            await transactionHash.wait();

            setIsLoading(false);
            console.log(`Success - ${transactionHash.hash}`);

            const transactionCount = await transactionContract.getTransaction();
            setTransactionCount(transactionCount.toNumber());
        
        }catch(error) {
            console.log(error);
        }
    }

useEffect(() =>{
    checkIfWalletIsConnected();
    checkIfTransactionExist();
},[]);

    return(
        <TransactionContext.Provider value={{connectWallet,currentAccount,formData,sendTransaction,handleChange,transactions,isLoading}} >
            {children}
        </TransactionContext.Provider>
    );
}
