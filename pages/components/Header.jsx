import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Header({ props, isSignin }) {
  const srcAvt = '/avatarTest/avatar1.png'
  const router = useRouter();


  const handlerProfile = () => {
    router.push("/profile");
  }

  // if (isLogined) {
  return (
    <>
      <nav className="flex w-screen h-16 items-center px-5 justify-around shadow-md bg-gray-200 opacity-90fixed">
        {/* logo */}
        <div className="flex items-center hover:cursor-pointer">
          <Link href="/" className="flex justify-center items-center">
              <Image src="/logo.svg" width={65} height={65} alt='logo' />
          </Link>
          <div className="flex justify-center flex-col items-center">
            <h1 className=" font-bold font-sansation text-[#88a6ea] ">K TRAVEL</h1>
          </div>
        </div>

        <div className="w-2/5 flex flex-row justify-around text-white font-bold">
          <Link href={'/'} className="px-8 py-2 rounded-2xl hover:shadow-lg hover:bg-[#88a6ea] hover:text-white text-gray-500">Home</Link>
          <Link href={'/'}className="px-8 py-2 rounded-2xl hover:shadow-lg hover:bg-[#88a6ea] hover:text-white text-gray-500">Place</Link>
          <Link href={'/'}className="px-8 py-2 rounded-2xl hover:shadow-lg hover:bg-[#88a6ea] hover:text-white text-gray-500">About</Link>

        </div>

        {/* Login/Profile */}
        {/* {isSignin ? <BtnProfile urlImg={srcAvt} onClick={handlerProfile} /> : <BtnLoginSignup />} */}
        
          <Link href="/login" className="bg-[#336ae1] py-2 px-4 rounded-xl text-white font-bold hover:bg-[#648add] cursor-pointer" >Login</Link>
        
      </nav>
    </>
  )

}