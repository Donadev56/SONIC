"use client"
export const dynamic = "force-dynamic";

import { useRouter } from 'next/navigation'
import style from '../../styles/dashboard.module.scss'
import { ChartIcon, DashboardIcon, SonicIcon, User, UsersIcon } from '@/app/components/icons/icons'
import { useEffect, useState } from 'react'
import { TeamDataInterface, Transaction, UserData, VrDataInterface } from '@/app/interface/interface'
import { GetUserAddress } from '@/app/utils/users'
import { InitEthereumWeb3 } from '@/app/web3/web3'
import {Web3} from 'web3'
import { getUserData, getUserTeamData } from '@/app/contract/regContract/getters'
import { GetUserHistories, getUserVrData } from '@/app/contract/vrContract/getter'
import { TopDashBoard } from '@/app/components/icons/top'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PurchaseLevel } from '@/app/contract/vrContract/setters'


export default function Dashboard () {
    const [address , setAddress] =  useState('')
    const [balance , setBalance] = useState(0)
    const [sponsor , setSponsor] = useState("")
    const [level , setLevel] = useState(0)
    const [userData , setUserData] = useState<UserData | null >(null)
    const [isScrolling , setIsCrolling] = useState(false)
    const [transactions , setTransactions] = useState<Transaction[] | null >(null)
    const [TeamData , setTeamData] = useState<TeamDataInterface | null >(null )
    const [vrData , setVrData] = useState<VrDataInterface | null >(null)
    const [canLoad , setCanLoad] = useState(true)
    const [currentLocation , setCurrentLocation] = useState("")
    const [prices, setPrices] = useState(() => {
        const pricesArray = [];
        pricesArray[0] = 5;
        for (let i = 1; i < 10; i++) {
          pricesArray[i] = pricesArray[i - 1] * 2;
        }
        return pricesArray;
      });
      const blockchainStatuses = [
        "Beginner", 
        "Learner", 
        "Explorer", 
        "Enthusiast", 
        "Developer",
        "Innovator",
        "Validator", 
        "Architect",
        "Expert", 
        "Pioneer"
        
      ];
      
      const sendNotifcation = (message : string , state : "success"  | "error" | "warning"| "info") => {
        toast[state](message);
      };

    const router = useRouter();
    const navigate = (path : string) => {
        router.push(path);
      };

    function convertTimestampToDate(timestamp: number): string {
        const date = new Date(timestamp * 1000);
        return date.toLocaleString();
      }
 
      useEffect(()=> {
        const handleScrolling = ()=> {
            if (window.scrollY > 0) {
               setIsCrolling(true); //
              } else {
              setIsCrolling(false);
              }
        }
        window.addEventListener('scroll', handleScrolling);
        handleScrolling();

        return ()=> {
            window.removeEventListener('scroll', handleScrolling);
        }

      },[])

      useEffect(()=> {
        const getAddress = async()=> {

            try {
                const response =await  GetUserAddress()
                if (response.success) {
                    setAddress(response.response)
                    getBalance(response.response)
                    getTeamData(response.response)
                    getTransactions(response.response)
                    getVrData(response.response)
                    setCanLoad(false)


                }
            } catch (error) {
                console.error(error)
                setCanLoad(false)
                
            }

        }
        const getBalance = async (address : string)=> {
            try {
                const web3Response = await InitEthereumWeb3()
                let web3 : Web3
                if (web3Response.success) {
                    if (web3Response.response) {
                        web3 = web3Response.response
                        const balance = await web3.eth.getBalance(address)
                        console.log(balance)
                        setBalance(Number(balance) / 1e18)

                    } 

                 } else {
                    console.error('Error initializing Ethereum Web3:', web3Response.response)
                 }
                
            } catch (error) {
                console.error(error)
                
            }
        }
    

          const getTransactions = async(address : string) => {
            try {
                const response = await GetUserHistories(address)
                if (response.success) {
                   if (typeof response.response !== 'string') { 
                     setTransactions(response.response)
                   }
                }
                
            } catch (error) {
                console.error(error)
                
            }
          }

          const getTeamData = async(address : string )=> {
            try {

                const response = await getUserTeamData(address)
                if (response.success) {
                    if (typeof response.response !== 'string') {
                        const teamData : TeamDataInterface   = response.response
                        setTeamData(teamData)

                     }
 
                }

                
            } catch (error) {
                console.error(error)
                
            }
          }

         const getLocation = ()=> {
            setCurrentLocation(location.origin)
         }
         getLocation()
          getUser()

        getAddress()
      }, [])

      const getUser = async()=> {
        try {
          const addressResponse  = await GetUserAddress()
          if (addressResponse.success) {
            const address = addressResponse.response
            const userData = await getUserData(address)
            if (userData!.success && userData!.response) {
              const data = typeof  userData!.response !== 'string' ? userData!.response : null
              setUserData(data )
            } else {
              console.error('Failed to fetch user data:', userData!.response)
            }
          } else {
            console.error('Failed to fetch user address:', addressResponse.response)
          }
          
        } catch (error) {
          console.error('Error fetching user:', error);
          
        }
      }
      const getVrData = async(address : string)=> {
        try {
            const vrData = await getUserVrData(address)
            console.log(vrData)
            if (vrData.success) {
                if (typeof vrData.response !== 'string') {
                    setVrData(vrData.response)
                    setLevel(vrData.response.currentUserLevel)
                 }
                }
            
        } catch (error) {
            console.error(error)
            
        }
      }
       
   const purchaselevel  = async(level : number) => {
    setCanLoad(true)
    try {
        const request = await PurchaseLevel(level)
        if (request?.success) {
            sendNotifcation("Purchased Level successfully", "success")
            setCanLoad(false)
            getVrData(address)
            getUser()

        } else {
            sendNotifcation(request?.response, "error")
            console.error(request?.response)
            setCanLoad(false)
        }
    } catch (error) {
        console.log(error)
        sendNotifcation(error as string , "error")
        setCanLoad(false)
        
    }
   }

    return (

        <div className={style.dashboard}>
            <div className={style.bg} />
      <TopDashBoard style={style} /> 
    

            <section className={style.dashBoardData}>
                <div className={style.profile}>
                    <div className={style.userAddressContainer}>
                    Address : <div className={style.userAddress}>{address.slice(0, 5) || "Not connected"}...{address.slice(address.length -4 , address.length )}</div>

                    </div>

                    <div className={style.walletbalanceContainer}>
                        Wallet Balance : <div className={style.walletBalance}>{balance && balance.toFixed(5)} S</div>


                    </div>
                    <div style={{
                        padding:"10px"
                    }}>
                    <div className={style.profileData}>
                      <div className={style.dataTitle}>Username :</div> <div className={style.dataValue}> {userData?.name || "unknown"}</div>

                    </div>

                    <div className={style.profileData}>
                      <div className={style.dataTitle}>User Id :</div> <div className={style.dataValue}> {userData?.countId || 0}</div>

                    </div>
                    <div className={style.profileData}>
                      <div className={style.dataTitle}>Sponsor Id :</div> <div className={style.dataValue}> {userData?.uplineCountID || 0}</div>

                    </div>
                    <div className={style.profileData}>
                      <div className={style.dataTitle}>Status :</div>  <div className={style.dataValue}> { level ? blockchainStatuses[Number(level) - 1] : "Only Registered" }</div> 

                    </div>
                    <div className={style.profileData}>
                      <div  className={style.dataTitle}>Date:</div>  <div style={{fontWeight : 100}} className={style.dataValue}> {convertTimestampToDate( Number( userData?.joiningDate) )} </div> 

                    </div>
                   
                </div>
                </div>

            </section>

            <section className={style.referralLink}>
            <div className={style.ref}>

                <h2 style={{
                    padding: '10px',
                }} >Referral Link</h2>
                <div className={style.refLinkConatiner}>
                    <input type="text" value={`${currentLocation}/pages/register?ref=${address}`} />
                    <button onClick={()=> {
                        navigator.clipboard.writeText(`${currentLocation}/pages/register?ref=${address}`)
                        sendNotifcation("Referral link copied to clipboard", "success")
                    }} className={style.copyButton}>Copy</button>
                    </div>

                </div>

            </section>

            <section className={style.teamAndGain}>
            <div className={style.tmgDataConatiner}>
            <div className={style.tgmSprt}>
                <div className={style.tmgData}>
                  <div className={style.tmgDataInfo}> <div className={style.tmgDataTitle}>Total Income</div> <div className={style.tmgDataValue}> {Number(vrData?.totalIncome)/1e18 || 0} </div> </div>
                  <SonicIcon />
                </div>
                <div className={style.tmgData}>
                  <div className={style.tmgDataInfo}> <div className={style.tmgDataTitle}>Level Income</div> <div className={style.tmgDataValue}> {Number(vrData?.totalVirtualIncome)/1e18 || 0} </div> </div>
                  <SonicIcon />
                </div>
                </div>
                <div className={style.tgmSprt}>

                <div className={style.tmgData}>
                  <div className={style.tmgDataInfo}> <div className={style.tmgDataTitle}>Direct Team</div> <div className={style.tmgDataValue}> { Number(TeamData?.directDownlinesCount) || 0} </div> </div>
                  <User />
                </div>
                <div className={style.tmgData}>
                  <div className={style.tmgDataInfo}> <div className={style.tmgDataTitle}>Total Team</div> <div className={style.tmgDataValue}> {Number(TeamData?.teamSize) || 0} </div> </div>
                  <UsersIcon size={45} />
                </div>
                </div>


            </div>


           </section>
           <section className={style.packagesConatiner}>
           
           <h2 className={style.packageTitle}>
             Packages

           </h2>

           <div className={style.packages}>
           { prices.map((price , index)=>(  <div className={style.package}>
                 <div className={style.cardTitle}>
                     Level {index + 1}

                 </div>
                 <div className={style.cardPrice}>
                     {price} SONIC

                 </div>
                <button  onClick={()=> purchaselevel(index + 1) } className={`${level > index && style.activated} ${style.purchaseButton}`}>
         {     level  > index ? "Activated"  :  'Purchase'}

                </button>

             </div>))}

           </div>

        </section>
           <section className={style.transactions}>
  <h2 className={style.transactionsTitle}>Transactions List</h2>
  {transactions && transactions.length > 0 ? (
    <div className={style.transactionsContainer}>
      <div className={style.transactionsHeader}>
        <div>#</div>
        <div>Type</div>
        <div>Sonic</div>
        <div>From</div>
        <div>Date</div>
      </div>
      <div className={style.transactionsBody}>
        {transactions.map((transaction, index) => (
          <div key={index} className={style.transactionRow}>
            <div>{index + 1}</div>
            <div>{transaction.actionName}</div>
            <div>{(Number(transaction.actionAmount) / 1e18).toFixed(3)}</div>
            <div>{transaction.actionFrom}</div>
            <div>{convertTimestampToDate(Number(transaction.actionDate))}</div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <p className={style.noTransactions}>No transactions available</p>
  )}
</section>

<ToastContainer toastStyle={{
              borderRadius: '0px', // Coins carrés

}} theme='dark'  />
{ canLoad && 
<div className={style.loaderContainer}>

                <span className={style.loader}></span>
            </div>}
        </div>


    )
}

