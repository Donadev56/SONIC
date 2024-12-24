"use client";
export const dynamic = "force-dynamic";

import style from '../../styles/register.module.scss';
import logo from '../../assets/logo/logo.png';
import Image from 'next/image';
import menuicon from '../../assets/icons/menu2.svg';
import headLogo from '../../assets/logo/sonic-logo.svg';
import { useRouter, useSearchParams } from 'next/navigation';
import { Routes } from '../routes/navigator';
import { Web3Provider } from '@/app/web3/Web3Context';
import { Suspense, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { AddressById, IsRegistered } from '@/app/contract/regContract/getters';
import { GetUserAddress } from '@/app/utils/users';
import { RegisterUser } from '@/app/contract/regContract/setters';

 const  RegInterface = () =>{
  const router = useRouter();
  const searchParams = useSearchParams(); // Utilisation pour lire les paramètres d'URL
  const [sponsor , setSponsor] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const [name , setName] = useState("")

  const navigate = (path: string) => {
    router.push(path);
  };
  const sendNotifcation = (message : string , state : "success"  | "error" | "warning"| "info") => {
    toast[state](message);
  };

  useEffect(() => {
    const referral = searchParams.get('ref'); // Récupère le paramètre 'ref'
    if (referral) {
      setSponsor(referral); // Met à jour l'état local avec le paramètre
    }
  }, [searchParams]);

  const register = async ()=> {
    try {
        setIsLoading(true)
        let addressById  = ""
     if (!name) {
        sendNotifcation("Please enter your username", "error");
        setIsLoading(false)
        return;
 
     }

     if (!sponsor.startsWith("0x")) {
        if (Number(sponsor)) {
            const addressResponse = await AddressById(Number(sponsor))
           if (addressResponse.success) {
            addressById = addressResponse.response
            setSponsor(addressById)
           }
           
        }
      
     }
     const addressResponse = await GetUserAddress()
     if (!addressResponse.success) {
        sendNotifcation("Failed to get user address", "error");
        setIsLoading(false)
        return;
     }

     const isRegResponse = await IsRegistered(addressResponse.response)
     if (isRegResponse?.success) {
        sendNotifcation("User is already registered", "error");
        setIsLoading(false)
        return;
     }
     const registrationResponse = await RegisterUser(sponsor.length < 42 ? addressById : sponsor , name)
     if (registrationResponse.success) {
        sendNotifcation("User registered successfully", "success");
        setIsLoading(false)
        navigate(Routes.dashboard)
     }
        
    } catch (error) {
        console.error(error);
        
    }
  }

  return (
    <Web3Provider>
      <div className={style.regInterface}>
        <div className={style.imageBackground} />
        <div className={style.topBar}>
          <div className={style.top}>
            <div className={style.topLeft}>
              <Image src={logo} alt="logo" width={50} />
              <div className={style.logoText}>Multi-gain</div>
            </div>
            <div className={style.right}>
              <Image alt="image" width={30} height={30} src={menuicon} />
            </div>
          </div>
        </div>

        <div className={style.head}>
          <div className={style.headLogo}>
            <Image src={headLogo} alt="logo" width={200} />
          </div>
        </div>

        <div className={style.title}>
          <h2>Registration</h2>
        </div>

        <div className={style.registrationForm}>
          <form onSubmit={(e)=> {
            e.preventDefault()
            register() 
          }} >
            <div className={style.input}>
              <label htmlFor="">Sponsor</label>
              {/* Champ pré-rempli avec le paramètre "ref" */}
              <input
                type="text"
                className={style.inputElement}
                value={sponsor}
                onChange={(e)=> setSponsor(e.target.value)}
              />
            </div>
            <div className={style.input}>
              <label htmlFor="">Nickname</label>
              <input onChange={(e)=> setName(e.target.value)} value={name} type="text" className={style.inputElement} />
            </div>
            <button>Register</button>
          </form>

          <div className={style.alreadyText}>
            Already have an account?{' '}
            <span onClick={() => navigate(Routes.login)}>Login.</span>
          </div>
        </div>
        {   isLoading &&     <div className={style.loaderContainer}>
                <span className={style.loader}></span>
            </div>}

      </div>

<ToastContainer toastStyle={{
              borderRadius: '0px', // Coins carrés

}} theme='dark'  />
    </Web3Provider>
  );
}

export default function Registration () {
  return (
    <Suspense fallback={<div>Loading...</div>}>

    <RegInterface />
    </Suspense>

  );
}