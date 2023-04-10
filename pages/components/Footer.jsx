import Link from "next/link"
import Image from "next/image"
import { SiFacebook, SiTwitter, SiGithub, SiLinkedin } from "react-icons/si"
import { AiOutlineCopyright } from "react-icons/ai";

export default function Footer() {
  return (
    <div className="flex flex-col justify-around bg-[#f3f4f6] py-10" >

      <div className="flex flex-row justify-around px-5 py-14">
        <div>
          <div className="flex items-center hover:cursor-pointer hover:bg-brand-color-2 hover:rounded-xl">
            <Link href="/">

              <Image src="/logo.svg" width={65} height={65} alt='logo' />

            </Link>
            <div className="flex justify-center flex-col items-center">
              <h1 className=" font-bold font-sansation text-[#88a6ea]  ">K TRAVEL</h1>
            </div>
          </div>

          <div>
            <p className="text-gray-500">Making your working to expensive.<br /> Find your favorite place for work! </p>
          </div>
        </div>

        <div>
          <h2 className="font-bold text-[#88a6ea]  mb-2">COMPANY</h2>
          <ul className="text-gray-500">
            <li className="hover:cursor-pointer hover:text-[#7693c9]"><Link href={'/'}>Home</Link></li>
            <li className="hover:cursor-pointer hover:text-[#7693c9]"><Link href={'/about'}>About Us</Link></li>
            <li className="hover:cursor-pointer hover:text-[#7693c9]">Contact Us</li>
          </ul>
        </div>

        <div>
          <h2 className="font-bold text-[#88a6ea]  mb-2">HELP CENTER</h2>
          <ul className="text-gray-500" >
            <li className="hover:cursor-pointer hover:text-[#7693c9]">Find Cites</li>
            <li className="hover:cursor-pointer hover:text-[#7693c9]">Find A New Friends</li>
            <li className="hover:cursor-pointer hover:text-[#7693c9]">FAQs</li>
            <li className="hover:cursor-pointer hover:text-[#7693c9]">Feedback</li>
          </ul>
        </div>

        <div>
          <h2 className="font-bold text-[#88a6ea]  mb-2">CONTACT INFO</h2>
          <ul className="text-gray-500 flex flex-col justify-around">
            <li>Phone: +84 372 676 419</li>
            <li>Email: voduykhang312001@gmail.com</li>
            <li>Location: Ho Chi Minh City, Viet Nam</li>
          </ul>
          <div className="flex flex-row justify-around mt-4 text-[#516aa5] ">
            <Link href={'https://www.facebook.com/KDVIT0301/'} target="blank" rel="noopener noreferrer" className="hover:cursor-pointer hover:text-brand-color">
                <span><SiFacebook /></span>
            </Link>
            <Link href={'https://twitter.com/DKhangKDV'} target="_blank" rel="noopener noreferrer" className="hover:cursor-pointer hover:text-brand-color">
              
                <span><SiTwitter /></span>
              
            </Link>
            <Link href={'https://github.com/KDV-it'} target="_blank" rel="noopener noreferrer" className="hover:cursor-pointer hover:text-brand-color">
                <span><SiGithub /></span>
            </Link>
            <Link href={'www.linkedin.com/in/KDVIT0301'}  target="_blank" rel="noopener noreferrer" className="hover:cursor-pointer hover:text-brand-color">
                <span><SiLinkedin /></span>
            </Link>
          </div>
        </div>

      </div >

      <div className="flex flex-col justify-center items-center w-full  text-center">
        <span className="w-11/12  border-t border-t-gray text-center"><p className="text-gray my-3">© 2022 K Travel | All rights reserved</p></span>
      </div>
    </div>

  )
}