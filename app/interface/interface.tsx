"use client";


import Web3 from 'web3';

export interface Web3response {
  success: boolean;
  response: Web3 | undefined;
}

export interface ResponseInterface {
  success: boolean;
  response: string;
}
export interface UserData {
  name: string;
  uplineId: string;
  userId: string;
  imgURL: string;
  
  joiningDate: number;
  countId: number;
  uplineCountID: number;
}

export interface Transaction {
  actionName: "Direct Gain" | "Sponsor Gain"; 
  actionAmount: number;
  actionFrom: string;
  actionDate: number; 
}

export interface TeamDataInterface {
  
    directDownlinesCount : number ,
    teamSize : number ,
    directDownlinesArray : string []
   
}
// Type pour une liste de transactions
export type TransactionList = Transaction[];


export interface VrDataInterface {
  userAddress: string;       
  teamId: number;             
  totalIncome: number;        
  totalVirtualIncome: number;  
  transactionCount: number;    
  totalDirect: number;        
  lastUpdate: number;         
  currentUserLevel: number;  
  firstActivationDate: number;
}

export interface DownlineDataInterface {
  
    address: string;
    downlines: any[];
    vrData?: VrDataInterface;
    user?: UserData;
  
}

export interface EventData {
  address: string;
  blockHash: string;
  blockNumber: bigint;
  data: string;
  event: string;
  logIndex: bigint;
  removed: boolean;
  transactionHash: string;
  transactionIndex: bigint;
  returnValues: {
    to: string;
    amount: bigint;
    timestamp: bigint;
  };
}
