"use client";


import { Web3 } from 'web3';
import { Web3response } from '../interface/interface';

const node = 'https://rpc.soniclabs.com';

export const InitEthereumWeb3 = async (): Promise<Web3response> => {
  try {
    const currentNetwork: string = node;

    const web3 = new Web3(currentNetwork);

    if (web3) {
      console.log(`Connected to Ethereum network: ${currentNetwork}`);
      return { success: true, response: web3 };
    } else {
      throw new Error('Failed to connect to Ethereum network');
    }
  } catch (error) {
    console.error('An error occured during web3 initialization:', error);
    return { success: false, response: undefined };
  }
};
