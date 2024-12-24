"use client";


import { InitEthereumWeb3 } from "@/app/web3/web3";
import { VrContract } from "../contracts/vr";



export const PurchaseLevel = async (level : number)=> {
try {

    const init = await initWeb3()
    if (init.success) {
       if (typeof init.response !== "string") {
         const web3 = init.response.web3
         const contract = init.response.vrContractInstance
         let ethereum : any
         if (typeof window !== "undefined") {
           ethereum = (window as any).ethereum;
        }
                 const connectedAddresses = await ethereum.request({
            method: 'eth_accounts',
          });
          const userAddress = connectedAddresses[0];
          const txData = contract!.methods.purchase(level).encodeABI();
          const levelPrice: string = await contract.methods.levelPrice(level).call(); // Prix obtenu du contrat

          
          const estimatedGas = await web3!.eth.estimateGas({
            from: userAddress,
            to: contract!.options.address,
            value: levelPrice,
            data: txData,
          });
          
        console.log("estimate fees: ", estimatedGas);
        const gasLimit = Math.floor((Number(estimatedGas) ));

        console.log("Estimated gas:", estimatedGas);
        console.log("Adjusted gas limit:", gasLimit);

        const tx =  {
            from: userAddress, 
            to: contract?.options.address, 
            value:web3.utils.toHex(levelPrice), // Montant en wei
            gas: web3!.utils.toHex(gasLimit), 
            data: txData,
          }

          console.log("tx: ", tx);

       const receipt = await ethereum.request({
            method: "eth_sendTransaction",
            params: [
             tx
            ],
          }); 

          if (receipt) {
            console.log('Transaction successful:', receipt.transactionHash);
            return { success: true, response: receipt.transactionHash };
          }

        } else {

            return {success : false , response : init.response }
        }
    } else {
        console.error('Error initializing Ethereum Web3:', init.response);
         return {success : false , response : 'Error initializing Ethereum Web3' } ;
    }
    
} catch (error) {
    console.error('Error purchasing level:', error);
    return {success : false , response : String(error) };
    
}
}






const initWeb3 = async () => {
    try {
      const web3Response = await InitEthereumWeb3();
      const web3 = web3Response.response;
      if (!web3) {
        return { success: false, response: 'Failed to initialize Ethereum web3' };
      }
  
      const vrContractInstance = new web3.eth.Contract(
        VrContract.abi,
        VrContract.address
      );
      if (!vrContractInstance) {
        return { success: false, response: 'Failed to initialize contract' };
      }
  
      return { success: true, response: { vrContractInstance, web3 } };
    } catch (error) {
      return {
        success: false,
        response: `Error: ${error || 'Failed to initialize contract'}`,
      };
    }
  };
  
  