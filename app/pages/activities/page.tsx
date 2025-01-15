"use client"
export const dynamic = "force-dynamic";

import { TopDashBoard } from '@/app/components/icons/top'
import style from '../../styles/activities.module.scss'
import { useEffect, useState } from 'react'
import { GetLastEvents, getTotalEarned } from '@/app/contract/vrContract/getter'
import { EventData } from '@/app/interface/interface'
import { EventLog } from 'web3'
import { MoneyIcon } from '@/app/components/icons/icons'
import { NumberOfUsers } from '@/app/contract/regContract/getters'

export default function Activities () {
    const [events, setEvents] = useState<EventLog[]>([]);
    const [totalEarned , setTotalEarned ] = useState(0)
    const [users , setUsers ] = useState(0)

    const getMunites = (timestamp : number)=> {
        const minute = 60
        const currentTimestamp = Date.now() / 1000
        const timeElapsed = currentTimestamp - timestamp
        const minutesElapsed = Math.floor(timeElapsed / minute)
        return minutesElapsed

    }

    useEffect(()=> {
        const getEvents = async ()=> {
            try {
                const eventsResponse = await GetLastEvents()
                if (eventsResponse.success) {
                    if (typeof eventsResponse.response !== 'string' ) {
                        setEvents(eventsResponse.response); // Stocke les événements dans l'état

                    }
                } else {
                    console.error('Error getting events:', eventsResponse.response);
                }
                getTotalInvest()

            } catch (error) {
                console.error('Error getting events:', error);
                
            }
        }
         const getTotalInvest=  async()=> {
            try {
                const totalEarnedResponse = await getTotalEarned()
                if (totalEarnedResponse.success) {
                    if (typeof totalEarnedResponse.response !== 'string' ) {
                        setTotalEarned(Number(totalEarnedResponse.response)); // Stocke les événements dans l'état
                        console.log('TotalEarned' , totalEarnedResponse.response);

                    }
                } else {
                    console.error('Error getting total earned:', totalEarnedResponse.response);
                }
                
            } catch (error) {
                console.error('Error getting total earned:', error);
                
            }
         }
         const getUsers=  async()=> {
            try {
                const totalEarnedResponse = await NumberOfUsers()
                if (totalEarnedResponse.success) {
                    if (typeof totalEarnedResponse.response !== 'string' ) {
                        setUsers(Number(totalEarnedResponse.response)); // Stocke les événements dans l'état
                        console.log('users' , totalEarnedResponse.response);

                    }
                } else {
                    console.error('Error getting total earned:', totalEarnedResponse.response);
                }
                
            } catch (error) {
                console.error('Error getting total earned:', error);
                
            }
         }
        getEvents()
        getUsers()
    }, [])
    return(
        <div className={style.activities}>
      <div className={style.bg} />
       <TopDashBoard style={style} /> 
       <div className={style.systemStats}>

<div className={style.users}>
    <h2>Users</h2>
    <div className={style.stats}>{users}</div>

</div>
<div className={style.users}>
    <h2>Total Earned</h2>
    <div className={style.stats}>
        {totalEarned && ((totalEarned)/1e18).toFixed(0)} SONIC
    </div>

</div>

</div>
    
       <div className={style.eventsContainer}>
        <h1>Contract Events</h1>

    
    <div className={style.activitiesConatainer}>
    {  events.map((event, index)=> (   
            <div className={style.activity}>
                <div className={style.activityIcon}>
                    <MoneyIcon size={30} />
                </div>
                <div style={{
                    backgroundColor : event.event === "TransferSent" ? "orange" : "rgb(0, 255, 106)",
                    color :  event.event === "TransferSent" ? "white" : "black",
                }} className={style.activityName}>
                {event.event === "TransferSent" ? "Transfer" : "Upgrade"}
                </div>
                <div className={style.actvitytime}>
                    {String(event.returnValues.to || event.returnValues.from).slice(0, 5)}...
                    </div>
                <div className={style.activityAmount}>
            {((Number(event.returnValues.amount)) / 1e18)} S

                </div>

                <div className={style.actvitytime}>
                    {getMunites(Number(event.returnValues.timestamp))} min
                </div>


            </div>))}
        </div>
      </div>



        </div>

    )
}