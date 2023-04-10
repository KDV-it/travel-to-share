import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { getCookie, deleteCookie } from 'cookies-next';
import { FiLogOut } from 'react-icons/fi'
import 'animate.css'

export default function Header({ isSignin, avatar }) {
  

  const router = useRouter();

  async function handleLogout(ev) {
    ev.preventDefault();
    const response = deleteCookie('KDV')
    router.push('/');
  }

  return (
    <>
      <nav className="flex w-screen h-16 items-center px-5 justify-around shadow-md bg-[#ffffffa4]  z-10 fixed animate__animated animate__fadeInDown  ">
        {/* logo */}
        <div className="flex items-center hover:cursor-pointer">
          <Link href="/" className="flex justify-center items-center">
            <Image src="/logo.svg" width={65} height={65} alt='logo' />
          </Link>
          <div className="flex justify-center flex-col items-center">
            <h1 className=" font-bold font-sansation text-[#2e4579] ">K TRAVEL</h1>
          </div>
        </div>

        <div className="w-2/5 flex flex-row justify-around text-white font-bold">
          <Link href={'/'} className="px-8 py-2 rounded-2xl hover:shadow-lg hover:bg-[#88a6ea] hover:text-white text-[#2e4579]">Home</Link>
          <Link href={isSignin?'/place':'/login'} className="px-8 py-2 rounded-2xl hover:shadow-lg hover:bg-[#88a6ea] hover:text-white text-[#2e4579]">Place</Link>
          <Link href={'/about'} className="px-8 py-2 rounded-2xl hover:shadow-lg hover:bg-[#88a6ea] hover:text-white text-[#2e4579]">About</Link>
        </div>

        {!isSignin ? <Link href="/login" className="bg-[#336ae1] py-2 px-4 rounded-xl text-white font-bold hover:bg-[#648add] cursor-pointer" >Login</Link>
          :
          <div className="flex flex-row justify-center items-center ">
            <Link href={'/profile'}>
              <div
                style={{
                  backgroundImage: `url(${avatar})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                }}
                className='h-10 w-10 rounded-full'
              ></div>
            </Link>
            <span
              className="flex justify-center items-center m-3 pl-3 py-2 cursor-pointer text-2xl text-slate-400 border-l-2 border-l-slate-400 hover:text-slate-600 hover:border-l-slate-600"
              onClick={handleLogout}>
              <FiLogOut className="cursor:pointer" />
            </span>
          </div>
        }
      </nav>
    </>
  )

}

