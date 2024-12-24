"use client";
export const dynamic = "force-dynamic";

import style from '../../styles/login.module.scss'
import logo from '../../assets/logo/logo.png'
import Image from 'next/image'
import menuicon from '../../assets/icons/menu2.svg'
import headLogo from '../../assets/logo/sonic-logo.svg'
import { useRouter } from 'next/navigation'
import { Routes } from '../routes/navigator'
import { Web3Provider } from '@/app/web3/Web3Context'
import { Suspense, useEffect, useState } from 'react'
import { GetUserAddress } from '@/app/utils/users'


 const LoginInterface =  ()=>{
    const router = useRouter();
    const [address, setAddress] = useState('')

    const navigate = (path : string) => {
        router.push(path);
      };
     const saveAddress = ()=> {
        localStorage.setItem('savedAddress', address)
        navigate(Routes.dashboard)
 
     }
      useEffect(()=> {
        const getAddress = async()=> {

            try {
                const response =await  GetUserAddress()
                if (response.success) {
                    setAddress(response.response)
                }
            } catch (error) {
                console.error(error)
                
            }

        }
        getAddress()
      }, [])
    
    return( 
        <Web3Provider>
        <div className={style.regInterface}>

            <div className={style.imageBackground} />
            <div className={style.topBar}>
                <div className={style.top}>
                 <div className={style.topLeft}>
                    <Image src={logo} alt="logo" width={50} />
                    <div className={style.logoText}> 
                        Multi-gain

                    </div>
                    

                 </div>
                 <div className={style.right}>

                 <Image   alt='image' width={30} height={30} src={menuicon} />
                 </div>
                </div>

            </div>

                <div className={style.head}>
                <div className={style.headLogo}>
  <Image src={headLogo} alt="logo" width={200} />
                </div>
                </div>
   <div className={style.title}>

                <h2>
                 Login to your account
                </h2>

                </div>

                <div className={style.registrationForm}>
                    <form onSubmit={(e)=> {
                        e.preventDefault()
                       saveAddress()
                    }} >
                       <div className={style.input}>
                        <label htmlFor="">
                            Enter an Address or connect wallet
                        </label>

                        <input type="text"  onChange={(e)=> setAddress(e.target.value)} value={address} className={style.inputElement}/>

                       </div>
                

                       <button >
                        Login
                       </button>
                    </form>

                    <div className={style.alreadyText}>
                        Not register yet? <span onClick={()=> navigate(Routes.register)} >regiser.</span>

                    </div>

                </div>


        </div>
        </Web3Provider>
    )
}


export default function Login () {
    return (
      <Suspense fallback={<div>Loading...</div>}>
  
      <LoginInterface />
      </Suspense>
  
    );
  }