"use client";


import { InitEthereumWeb3 } from "@/app/web3/web3";
import { VrContract } from "../contracts/vr";
import { EventData, Transaction, VrDataInterface } from "@/app/interface/interface";
import { EventLog } from "web3";
export const GetUserHistories = async (address : string)=> {
     if (address.length  === 0) {
         return {success : false , response : 'Invalid address'}
     }

    try {
        const init = await initWeb3()
        if (init.success) {
           if (typeof init.response !== "string") {
             const web3 = init.response.web3
             const contract = init.response.vrContractInstance

             const histories : Transaction[] = await contract.methods.getStories(address).call()
             return{success : true , response : histories}
            } else {

                return {success : false , response : init.response }
            }
        } else {
            console.error('Error initializing Ethereum Web3:', init.response);
             return {success : false , response : 'Error initializing Ethereum Web3' } ;
        }
        
    } catch (error) {
        console.error('Error getting user histories:', error);
        return {success : false , response : 'Error getting user histories'  }
        
    }

}

export const getUserLevel = async (address : string)=> {
    try {
        const init = await initWeb3()
        if (init.success) {
           if (typeof init.response !== "string") {
             const contract = init.response.vrContractInstance

             const userLevel : number = await contract.methods.userLevel(address).call()
             return{success : true , response : userLevel}
            } else {

                return {success : false , response : init.response }
            }
        } else {
            console.error('Error initializing Ethereum Web3:', init.response);
             return {success : false , response : 'Error initializing Ethereum Web3' } ;
        }
    } catch (error) {
        console.error('Error getting user level:', error);
        return {success : false , response : 'Error getting user level'};

        
    }
}

export const getUserVrData = async (address : string)=> {
    try {
        const init = await initWeb3()
        if (init.success) {
           if (typeof init.response !== "string") {
             const contract = init.response.vrContractInstance

             const user : VrDataInterface = await contract.methods.users(address).call()
             return{success : true , response : user}
            } else {

                return {success : false , response : init.response }
            }
        } else {
            console.error('Error initializing Ethereum Web3:', init.response);
             return {success : false , response : 'Error initializing Ethereum Web3' } ;
        }
    } catch (error) {
        console.error('Error getting user level:', error);
        return {success : false , response : 'Error getting vr user level'};

        
    }
}



export const getTotalEarned = async ()=> {
    try {
        const init = await initWeb3()
        if (init.success) {
           if (typeof init.response !== "string") {
             const contract = init.response.vrContractInstance

             const totalEarned : number = await contract.methods.totalEarned().call()
             return{success : true , response : totalEarned}
            } else {

                return {success : false , response : init.response }
            }
        } else {
            console.error('Error initializing Ethereum Web3:', init.response);
             return {success : false , response : 'Error initializing Ethereum Web3' } ;
        }
    } catch (error) {
        console.error('Error getting user level:', error);
        return {success : false , response : 'Error getting total earned'};

        
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
  
export const getUserlevel =  async (address : string)=> {
  try {
    
 
  const init = await initWeb3();
  let contract 
  if (init.success) {
      if (typeof init.response !== "string") {
         contract = init.response.vrContractInstance
      }

  }

  const userLevelResponse = String( await contract?.methods.userLevel(address).call() )
  if (userLevelResponse) {
    return {success : true , response : userLevelResponse}
  } else {
    return {success : false , response : "the reponse is undefined"}
  }

} catch (error) {
  console.error(error)
  return {success : false , response : error as string}
    
}
}

export const GetLastEvents = async () => {
    try {
        const init = await initWeb3();
        let contract 
        let web3

        if (init.success) {
            if (typeof init.response !== "string") {
               contract = init.response.vrContractInstance
               web3 = init.response.web3
            }

        }
      console.log("Web3 initialized successfully", web3);
      console.log("MainContract instance created: ", contract);
  
      if (!contract) throw new Error("Failed to create contract instance");
  
      const latestBlock = Number(await web3?.eth.getBlockNumber());
      console.log("Latest block: ", latestBlock);
  
      const fromBlock = latestBlock - 3000 >= 0 ? latestBlock - 3000 : 0;
  
      const eventResponse = await contract.getPastEvents("allEvents", {
        fromBlock: fromBlock, 
        toBlock: 'latest',
      });
      let events : EventLog [] = []
      eventResponse.forEach((event)=> {
        if (typeof event !== "string") {
            events.push(event) 
        }

      } )
     
      if (events && events.length > 0) {
        console.log(`Found ${events.length} events: `, events);
        return {success : true , response : events}; 
      } else {
        console.log("No events found.");
        return {success : false , response :"No events found." };
      }
  
    } catch (error) {
      console.error("An error occurred while fetching contract events:", error);
      return {success : false , response : error as string };
    }
  };
  
  
  