"use client"
export const dynamic = "force-dynamic";

import { TopDashBoard } from '@/app/components/icons/top'
import style from '../../styles/downlines.module.scss'
import { useCallback, useEffect , useState } from 'react'
import { DownlineDataInterface, TeamDataInterface, Transaction, UserData, VrDataInterface } from '@/app/interface/interface'
import { GetUserAddress } from '@/app/utils/users'
import { InitEthereumWeb3 } from '@/app/web3/web3'
import Web3 from 'web3'
import { AddressById, getUserData, getUserTeamData } from '@/app/contract/regContract/getters'
import { GetUserHistories, getUserLevel, getUserVrData } from '@/app/contract/vrContract/getter'
import { User, UsersIcon } from '@/app/components/icons/icons'


export default function Downlines () { 
    const [address , setAddress] =  useState('')
    const [balance , setBalance] = useState(0)
    const [sponsor , setSponsor] = useState("")
    const [level , setLevel] = useState(0)
    const [userData , setUserData] = useState<UserData | null >(null)
    const [isScrolling , setIsCrolling] = useState(false)
    const [transactions , setTransactions] = useState<Transaction[] | null >(null)
    const [vrData , setVrData] = useState<VrDataInterface | null >(null)
    const [canCardDisplay , setCanCardDisplay] = useState(false)
    const [selectedUserData , setSelectedUserData] = useState<DownlineDataInterface >({
        address: "",
        downlines: [],
        vrData : undefined,
        user: undefined,
    })
    const [isSearching , setIsSearching] = useState(false)
    const [query, setQuery] = useState("")
    
    const [downlineData, setDownlineData] = useState<DownlineDataInterface[]>([]);
    const colors = ['#007bff', 'rgb(255 164 7)', '#28a745', '#e83e8c'];
 
const getRandomColor = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}, [colors]); 
      

    useEffect(()=> {
 

          const getDownlinesData = async (address : string)=> {
            try {
                const userTeamData = await getTeamData(address)
                if (!userTeamData) {
                    return
                }
                const downlines = userTeamData.directDownlinesArray
                 const downLinedStruct  : {
                    address  : string ,
                    downlines : string [],
                    vrData : VrDataInterface,
                    user : UserData

                 } [] = []

                 for (let i = 0 ; i < downlines.length  ; i ++) {
                    const downlineAddress = downlines[i]
                    let directs : string [] = []
                    let vrDataOfUser : VrDataInterface 
                    let userDataOfUser : UserData 
                    const directsRequest = await getTeamData(downlineAddress)
                    if (directsRequest) {
                        directs = directsRequest.directDownlinesArray
                    } 
                    const vrResponse = await getVrData(downlineAddress)
                    if (vrResponse) {
                        let lvl = 0
                        const lvlResponse = await getUserLevel(downlineAddress)
                        if (lvlResponse.success && typeof lvlResponse.response !== "string") {
                            lvl = lvlResponse.response
                        }
                        vrDataOfUser = vrResponse
                        vrDataOfUser.currentUserLevel = lvl

                    }
                    const userResponse = await getUser(downlineAddress)
                    if (userResponse) {
                        userDataOfUser = userResponse
                    }

                    downLinedStruct.push({
                        address : downlineAddress,
                        downlines : directs,
                        vrData : vrDataOfUser!,
                        user : userDataOfUser!,
                    })
                    setDownlineData(downLinedStruct)
                 }

                 console.log(downLinedStruct)
                
            } catch (error) {
                console.error(error)
                
            }
          }
          const getAddress = async()=> {

            try {
                const response =await  GetUserAddress()
                if (response.success) {
                    setAddress(response.response)
                    getDownlinesData(response.response)
    
                }
            } catch (error) {
                console.error(error)
                
            }
    
        }
        getAddress()
      }, [])

    
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
    const getUser = async(address : string)=> {
        try {
        
            const userData = await getUserData(address)
            if (userData!.success && userData!.response) {
              const data = typeof  userData!.response !== 'string' ? userData!.response : null
              return data
            } else {
              console.error('Failed to fetch user data:', userData!.response)
            }
       
          
        } catch (error) {
          console.error('Error fetching user:', error);
          
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



      const getVrData = async(address : string)=> {
        try {
            const vrData = await getUserVrData(address)
            console.log(vrData)
            if (vrData.success) {
                if (typeof vrData.response !== 'string') {
                    setVrData(vrData.response)
                    setLevel(vrData.response.currentUserLevel)
                    return vrData.response
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
                   return teamData

                 }

            }

            
        } catch (error) {
            console.error(error)
            
        }
      }
       const setDownlineToDisplay =async (address: string) => {
        try {
            const downlineAddress = address
            let directs : string [] = []
            let vrDataOfUser : VrDataInterface 
            let userDataOfUser : UserData 
            const directsRequest = await getTeamData(downlineAddress)
            if (directsRequest) {
                directs = directsRequest.directDownlinesArray
            } 
            const vrResponse = await getVrData(downlineAddress)
            if (vrResponse) {
                vrDataOfUser = vrResponse

            }
            const userResponse = await getUser(downlineAddress)
            if (userResponse) {
                userDataOfUser = userResponse
            }

            setSelectedUserData({
                address : address,
                downlines : directs,
                vrData : vrDataOfUser!,
                user : userDataOfUser!,
            })
            setCanCardDisplay(true)
            setIsSearching(false)

        } catch (error) {
            console.error(error)
            
        }
       }
       const search = async()=> {
        setIsSearching(true)
    if (query.startsWith("0x") && query.length === 42) {
       await setDownlineToDisplay(address)

    } else if (Number(query)) {
       await getUserAddressById(Number(query))

    } else {
        setIsSearching(true)

    }
  }
  const getUserAddressById= async (id : number)=> {
    try {
        const response = await AddressById(id)
        if (response.success) {
            setDownlineToDisplay(response.response)
        }

        
    } catch (error) {
        console.error(error)
        
    }
  }
    return(
        <div className={style.downlines}>
                      <div className={style.bg} />
                      <TopDashBoard style={style} /> 
                      <div className={style.researchSection}>
        <input value={query} onChange={(e)=> setQuery( e.target.value)} type='search' /> <button onClick={search}>{isSearching ? "Loading..." : "Search"}</button>

      </div>
                      {downlineData.length ? (
            <div className={style.customGridContainer}>
                {downlineData.map((downline) => (
                    <CustomGridContainer 
                    setDownlineToDisplay={setDownlineToDisplay}
                        key={downline.address} 
                        downline={downline} 
                        getRandomColor={getRandomColor} 
                    />
                ))}
            </div>
        ) : (
            <div className={style.loaderContainer}>
                <span className={style.loader}></span>
            </div>
        )}
        {  canCardDisplay &&  <div className={style.dataOverView}>
            <div onClick={()=> {
                setCanCardDisplay(false)
            }} className={style.overlay} />
                <CustomGridContainer setDownlineToDisplay={setDownlineToDisplay} downline={selectedUserData} getRandomColor={getRandomColor} />
            </div>}
        </div>
    )
}


function CustomGridContainer({ downline, getRandomColor , setDownlineToDisplay}: { downline: DownlineDataInterface, getRandomColor: () => string  , setDownlineToDisplay(address : string) : Promise<void>}) {
    return (
        <div className={style.card}>
            <div style={{ backgroundColor: getRandomColor() }} className={style.cardHeader}>
                <div className={style.cardLeft}>
                <User size={30} strokeWidth={1} />
                <h3>{downline.user?.name}</h3>
                </div>
                <div className={style.cardRight}>
                    {downline.user?.countId}

                </div>
            </div>
            <div className={style.cardBody}>
                <p><strong>Address:</strong> {downline.address.slice(0, 15)}...</p>
                <p><strong>Level:</strong> {downline.vrData?.currentUserLevel}</p>
                <p><strong>Total Income:</strong> {(Number(downline.vrData?.totalIncome)/1e18).toFixed(2)} Sonic</p>
                <p><strong>Directs:</strong> {downline.downlines.length}</p>
                <div><strong>Directs Address:</strong>{downline.downlines.length > 0 && (
                    <div className={style.addressesList}>
                        {downline.downlines.map((adr, index) => (
                            <div className={style.adr } onClick={()=> setDownlineToDisplay(adr)} key={index}>{adr.slice(0, 15)}...</div>
                        ))}
                    </div>
                )}</div>
            </div>
        </div>
    );
}
