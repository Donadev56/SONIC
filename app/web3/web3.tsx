"use client";


import { Web3 } from 'web3';
import { Web3response } from '../interface/interface';

const node = 'https://sonic.drpc.org';
const nodes = ['https://sonic.drpc.org', 'https://rpc.ankr.com/sonic_mainnet']

export const InitEthereumWeb3 = async (): Promise<Web3response> => {
  try {
    const randomNode = nodes[Math.floor(Math.random() * nodes.length)]
    const currentNetwork: string = randomNode;

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
