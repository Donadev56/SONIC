"use client";


import { ResponseInterface } from '../interface/interface';

export const GetUserAddress = async (): Promise<ResponseInterface> => {
  try {
    let ethereum : any
    if (typeof window !== "undefined") {
      ethereum = (window as any).ethereum;
   }
   
    
    if (!ethereum) {
      console.log('No Ethereum browser detected!');
    } else {
      console.log('Metamask detected ...');

    }
    let addresses : string[] = []
    try {
       addresses = await ethereum.request({ method: 'eth_requestAccounts' });

    } catch (error) {
      console.error(error)
      
    }
    const savedAddress = localStorage.getItem('savedAddress');
    console.log(savedAddress)
    const address = addresses[0];

    if (address) {
      console.log('Using connected address:', address);
      return { success: true, response: address };
    } else if (savedAddress) {
      console.log('Using saved address:', savedAddress);
      return { success: true, response: savedAddress };
    } 

    return { success: false, response: 'User address not found' };
  } catch (error) {
    console.error('Error fetching user address:', error);
    return {
      success: false,
      response: `Error: ${error || 'Failed to get user address'}`,
    };
  }
};
