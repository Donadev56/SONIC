"use client";


import Web3 from 'web3';
import { InitEthereumWeb3 } from '../../web3/web3';
import { regContract } from '../contracts/regContract';

export const RegisterUser = async (
  sponsorAddress: string,
  userName: string
) => {
  try {
    let ethereum : any
    if (typeof window !== "undefined") {
      ethereum = (window as any).ethereum;
   }
   
    await ethereum.request({ method: 'eth_requestAccounts' });
    const connectedAddresses = await ethereum.request({
      method: 'eth_accounts',
    });

    const userAddress = connectedAddresses[0];
    console.log('user address for registration  : ', userAddress);

    const web3Data = await initWeb3();
    let contract;
    let web3 :  Web3
    if (!web3Data.success) {
      return { success: false, response: 'Failed to initialize Ethereum web3' };
    }

    if (typeof web3Data.response !== 'string') {
      contract = web3Data.response.regContractInstance;
      web3 = web3Data.response.web3;
    }
    const registrationFees = 
      await contract!.methods.Registration_Fees().call()
      console.log('Registration fees:', registrationFees);
    

     const txData = contract!.methods.register(sponsorAddress, userName || "User").encodeABI();

     const estimatedGas = await web3!.eth.estimateGas({
       from: userAddress,
       to: contract!.options.address,
       value: registrationFees as any,
       data: txData,
     });
 
     
    console.log("estimate fees: ", estimatedGas);
     const gasLimit = Math.floor((Number(estimatedGas) ));
 
     console.log("Estimated gas:", estimatedGas);
     console.log("Adjusted gas limit:", gasLimit);
 
     const receipt = await ethereum.request({
       method: "eth_sendTransaction",
       params: [
         {
           from: userAddress, 
           to: contract?.options.address, 
           value: web3!.utils.toHex(registrationFees as any), 
           gas: web3!.utils.toHex(gasLimit), 
           data: txData,
         },
       ],
     });
 
     
    if (receipt) {
      console.log('Transaction successful:', receipt.transactionHash);
      return { success: true, response: receipt.transactionHash };
    }

    return { success: false, response: 'Failed to register user' };
  } catch (error) {
    console.error('Error registering user:', error);
    return {
      success: false,
      response: `Error: ${error || 'Failed to register user'}`,
    };
  }
};

const initWeb3 = async () => {
  try {
    const web3Response = await InitEthereumWeb3();
    const web3 = web3Response.response;
    if (!web3) {
      return { success: false, response: 'Failed to initialize Ethereum web3' };
    }

    const regContractInstance = new web3.eth.Contract(
      regContract.abi,
      regContract.address
    );
    if (!regContractInstance) {
      return { success: false, response: 'Failed to initialize contract' };
    }

    return { success: true, response: { regContractInstance, web3 } };
  } catch (error) {
    return {
      success: false,
      response: `Error: ${error || 'Failed to initialize contract'}`,
    };
  }
};
