"use client"
import { useRouter } from "next/navigation";
import { ChartIcon, DashboardIcon, UsersIcon } from "./icons"
import { Routes } from "@/app/pages/routes/navigator";

type props = {
    style : any
}
export const TopDashBoard = ({style} : props)=> {
    const router = useRouter();
    const navigate = (path : string) => {
        router.push(path);
      };
    return (

        <section className={style.topNav}>
        <div className={style.topNavContainer}>

        <div onClick={()=> navigate(Routes.dashboard)} className={style.nav}>
            Dashboard <DashboardIcon strokeWidth={1} fill='none'/>

        </div>
        <div  onClick={()=> navigate(Routes.downlines)} className={style.nav}>
            Downlines <UsersIcon/>
        </div>
        <div onClick={()=> navigate(Routes.activities)} className={style.nav}>
            Activities  <ChartIcon fill='none'/>

        </div>
        </div>

    </section>

    )
}