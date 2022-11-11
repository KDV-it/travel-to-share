import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link'
import Image from 'next/image';
import Header from './components/Header';
import Footer from './components/Footer';
import {parse} from 'cookie'
import {verify} from 'jsonwebtoken'

import { GoMail } from "react-icons/go";
import { BsFacebook } from "react-icons/bs";
import { FaUser, FaGithub, FaLinkedin, FaSuitcase } from "react-icons/fa"
import { Cookies } from 'react-cookie';
import { getCookie } from 'cookies-next';
const Profile = () => {
  const user = {
    favorite: ["636b1a40a48674ce7fd041c9",],
    age: 20,
    job: "IT",
    name: "Vo Duy Khang",
    facebook: "",
    gender: "nam",
    github: "",
    linkedin: "",
    twitter: "",
    avatar: "/Avatar800x800.png",
    email: "voduykhang312001@gmail.com",
    bio: "I'm a webdeveloper. I'm work with Next.js"
  }

  const [readOnly, setReadOnly] = useState(false);
  const [bio, setBio] = useState(user.bio)
  const [isEditProfile, setEditProfile] = useState(false)

  

  const [srcAvt, setSrcAvt] = useState(user.avatar);
  const [uploadData, setUploadData] = useState()
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const [data, setData] = useState(null)


  function handleEditProfile() {
    setEditProfile(true);
    setReadOnly(false);
  }

  function handleSave() {
    setEditProfile(false);
    setReadOnly(true);
  }

  function handleOnChange(changeEvent) {
    const reader = new FileReader();
    reader.onload = function (onloadEvent) {
      setSrcAvt(onloadEvent.target.result);
      setUploadData(undefined)
    }

    reader.readAsDataURL(changeEvent.target.files[0])
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(({ name }) => name === 'file')

    const formData = new FormData();

    for (const file of fileInput.files) {
      formData.append('file', file)
    }

    formData.append('upload_preset', 'kdvupload')

    const data = await fetch('https://api.cloudinary.com/v1_1/drqct6sjp/image/upload', {
      method: 'POST',
      body: formData
    }).then(res => res.json())

    setSrcAvt(data.secure_url);
    setUploadData(data);

    console.log('data', data)
  }

  return (
    <div className='flex flex-col justify-between '>
      {/* <Header /> */}
      <Header />
      <form className='flex flex-row m-20 '>
        {/* avatar account and bio */}
        <div className='flex flex-col justify-center items-center rounded-xl w-1/4 mr-10 mb-40 bg-gray-200 py-5'>
          {/* Avatar */}
          <div>
            <form className="flex flex-col justify-center items-center" method="POST" onChange={handleOnChange} onSubmit={handleSubmit}>
              <div
                className='w-28 h-28 rounded-full'
                style={{
                  backgroundImage: `url(${srcAvt})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                }}
              >
              </div>
              <label for='file' className='cursor-pointer underline hover:underline hover:text-sky-600 my-3'>Choose your avatar</label>
              <input className="hidden" type={"file"} id="file" name="file" placeholder='' />
              {srcAvt && !uploadData && (
                <button className='bg-[#336ae1] py-2 px-4 rounded-xl text-white font-bold hover:bg-[#648add]'>Upload file</button>
              )}
            </form>
          </div>
          {/* bio */}
          <h1 className='mt-6 font-bold text-2xl uppercase text-gray-600'>{user.name}</h1>
          <div className='mt-4 mx-6' >
            <h3 className='text-gray-500 mb-2 font-bold'>Bio</h3>
            <div className="p-2 border-x border-y border-zinc-600 rounded-xl focus:border-slate-400 focus:border-2 bg-slate-200 h-40">{`${user.bio}`}</div>
          </div>

        </div>

        {/* infor user */}
        <div className='w-3/4 grid grid-cols-4 gap-x-4 gap-y-1 p-7 bg-gray-50 rounded-2xl'>
          <div className='col-span-4'>
            <h1 className='text-4xl font-bold'>Hello, {user.name}</h1>
          </div>
          <div className='flex flex-col col-span-2'>
            <label className="ml-2  text-slate-400" for="name">Dispplay Name </label>
            <input className=" text-slate-900 border-2 rounded-lg border-slate-300 w-2/3 p-1 px-4 " type={'text'} name="name" readOnly={readOnly} placeholder={user.name} />
          </div>

          <div className='flex flex-col  col-span-2'>
            <label className="ml-2  text-slate-400" for="age">Age</label>
            <input className="border-2 rounded-lg border-slate-300  w-2/3 p-1 px-4" type={'text'} name="age" readOnly={readOnly} placeholder={user.age}/>
          </div>
          <div className='flex flex-col col-span-2'>
            <span className='flex flex-row items-center mb-2 text-slate-400 '>
              <FaUser className='text-xl' />
              <label className="ml-2 " for="gender">Gender</label>
            </span>
            <input className="border-2 rounded-lg border-slate-300  w-2/3 p-1 px-4" type={'text'} name="gender" readOnly={readOnly} placeholder={user.gender} />
          </div>




          <div className='flex flex-col col-span-2'>
            <span className='flex flex-row items-center mb-2 text-slate-400 '>
              <FaSuitcase className='text-xl' />
              <label className="ml-2 " for="job">Job</label>
            </span>
            <input className="border-2 rounded-lg border-slate-300  w-2/3 p-1 px-4" type={'text'} name="job" readOnly={readOnly}  placeholder={user.job}/>
          </div>

          <h1 className='col-span-4 font-bold text-slate-400'>Social Network</h1>
          <div className='flex flex-col col-span-2'>
            <span className='flex flex-row items-center mb-2 text-slate-400 '>
              <GoMail className='text-xl' />
              <label className="ml-2 " for="name">Email</label>
            </span>
            <input className="border-2 rounded-lg border-slate-300  w-2/3 p-1 px-4" type={'text'} name="email" readOnly={readOnly} placeholder={user.email} />
          </div>

          <div className='flex flex-col col-span-2'>
            <span className='flex flex-row items-center mb-2 text-slate-400 '>
              <BsFacebook className='text-xl' />
              <label className="ml-2 " for="facebook">Facebook</label>
            </span>
            <input className="border-2 rounded-lg border-slate-300  w-2/3 p-1 px-4" type={'text'} name="facebook" readOnly={readOnly} placeholder={user.linkedin} />
          </div>


          <div className='flex flex-col col-span-2'>
            <span className='flex flex-row items-center mb-2 text-slate-400 '>
              <FaLinkedin className='text-xl' />
              <label className="ml-2 " for="linkedin">Linkedin</label>
            </span>
            <input className="border-2 rounded-lg border-slate-300  w-2/3 p-1 px-4" type={'text'} name="linkedin" readOnly={readOnly} placeholder={user.linkedin} />
          </div>

          <div className='flex flex-col col-span-2'>
            <span className='flex flex-row items-center mb-2 text-slate-400 '>
              <FaGithub className='text-xl' />
              <label className="ml-2 " for="github">Github</label>
            </span>
            <input className="border-2 rounded-lg border-slate-300  w-2/3 p-1 px-4" type={'text'} name="github" readOnly={readOnly}  placeholder={user.github}/>
          </div>

          <div className='flex flex-col col-span-2'>
            <span className='flex flex-row items-center mb-2 text-slate-400 '>
              <label className="ml-2 " for="github">Bio</label>
            </span>
            <textarea cols="12" rows=" 6" className="border-2 rounded-lg border-slate-300  w-2/3 p-1 px-4" name="github" readOnly={readOnly}  placeholder={user.bio}></textarea>
          </div>

          <div className='mt-4 col-span-4 flex flex-row justify-between'>
            <button onClick={handleEditProfile} className='bg-[#336ae1] py-2 px-4 rounded-xl text-white font-bold hover:bg-[#648add] cursor-pointer'  >Save Profile</button>
          </div>
        </div>

      </form>

      <Footer />
    </div>
  )
}


export default Profile


export async function getServerSideProps (context) {
  
  
  const token = getCookie('KDV')

  // const token = parsedCookies.KDV;
  console.log(token);
  console.log(process.env.JWT_SECRET_KEY);
  let decode = verify(token, process.env.JWT_SECRET_KEY);
  

  console.log(decode.email)

  return { props: {} }
} 
