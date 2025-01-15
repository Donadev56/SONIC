"use client";


import { TeamDataInterface, UserData } from '../../interface/interface';
import { InitEthereumWeb3 } from '../../web3/web3';
import { regContract } from '../contracts/regContract';
import Web3 from 'web3';

export const getUserData = async (userAddress: string) => {
  try {
    const web3Data = await initWeb3();
    let contract;

    if (!web3Data.success) {
      return { success: false, response: 'Failed to initialize Ethereum web3' };
    }

    if (typeof web3Data.response !== 'string') {
      contract = web3Data.response.regContractInstance;
    }

    const userData : UserData = await contract!.methods.users(userAddress).call();
    if (userData) {
      return { success: true, response: userData };
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    return {
      success: false,
      response: `Error: ${error || 'Failed to get user data'}`,
    };
  }
};


export const getUserTeamData = async (userAddress: string) => {
  try {
    const web3Data = await initWeb3();
    let contract;

    if (!web3Data.success) {
      return { success: false, response: 'Failed to initialize Ethereum web3' };
    }

    if (typeof web3Data.response !== 'string') {
      contract = web3Data.response.regContractInstance;
    }
   let teamData : TeamDataInterface = {
    directDownlinesCount : 0 ,
    teamSize : 0 ,
    directDownlinesArray : []
   }
    const estimatedGas = await contract!.methods.directDownlinesCount(userAddress).estimateGas()
    const directDownlinesCount : number = await contract!.methods.directDownlinesCount(userAddress).call({
      gas : (estimatedGas).toString()
    });
    console.log('Getting  data for team count :', directDownlinesCount)
    if (directDownlinesCount) {
      teamData.directDownlinesCount = directDownlinesCount
      for (let i = 0; i < teamData.directDownlinesCount; i ++) {
        const gas =  await contract!.methods.directDownlines(userAddress, i).estimateGas()
        const currentDownline : string = await contract!.methods.directDownlines(userAddress, i).call({
          gas : gas.toString()
        });
        console.log(currentDownline)
        if (currentDownline) {
          teamData.directDownlinesArray.push(currentDownline)
        }

      }
    }
    const teamSize : number = await contract!.methods.getTotalTeamSize(userAddress).call();
    if (teamSize) {
      teamData.teamSize = teamSize
    }

    return { success: true, response: teamData };
    
   
  } catch (error) {
    console.error('Error fetching user data:', error);
    return {
      success: false,
      response: `Error: ${error || 'Failed to get user data'}`,
    };
  }
};


export const IsRegistered = async (userAddress: string) => {
  try {
    const web3Data = await initWeb3();
    let contract;
    let web3: Web3;
    if (!web3Data.success) {
      return { success: false, response: 'Failed to initialize Ethereum web3' };
    }
    if (typeof web3Data.response !== 'string') {
      contract = web3Data.response.regContractInstance;
      web3 = web3Data.response.web3;
    }
    const isRegistered = await contract!.methods
      .isRegistered(userAddress)
      .call();
    if (isRegistered) {
      return { success: true, response: isRegistered };
    }
  } catch (error) {
    console.error('Error checking if user is registered:', error);
    return {
      success: false,
      response: `Error: ${error || 'Failed to check user registration'}`,
    };
  }
};


export const NumberOfUsers = async () => {
  try {
    const web3Data = await initWeb3();
    let contract;
    let web3: Web3;
    if (!web3Data.success) {
      return { success: false, response: 'Failed to initialize Ethereum web3' };
    }
    if (typeof web3Data.response !== 'string') {
      contract = web3Data.response.regContractInstance;
      web3 = web3Data.response.web3;
    }
    const NumberOfUsers : number= await contract!.methods
      .NumberOfUsers()
      .call();
    if (NumberOfUsers) {
      return { success: true, response: NumberOfUsers };
    } else {
      return { success: false, response: 'User not found' };
    }
  } catch (error) {
    console.error('Error checking  NumberOfUsers:', error);
    return {
      success: false,
      response: `Error: ${error || 'Failed to get NumberOfUsers'}`,
    };
  }
};
export const AddressById = async (id: number) => {
  try {
    const web3Data = await initWeb3();
    let contract;
    let web3: Web3;
    if (!web3Data.success) {
      return { success: false, response: 'Failed to initialize Ethereum web3' };
    }
    if (typeof web3Data.response !== 'string') {
      contract = web3Data.response.regContractInstance;
      web3 = web3Data.response.web3;
    }
    const address : string = await contract!.methods
      .countIdToAddress(id)
      .call();
    if (address) {
      return { success: true, response: address };
    } else {
      return { success: false, response: 'User not found' };
    }
  } catch (error) {
    console.error('Error checking if user address:', error);
    return {
      success: false,
      response: `Error: ${error || 'Failed to check user address'}`,
    };
  }
};

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
