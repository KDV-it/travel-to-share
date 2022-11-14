import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import Header from './components/Header';
import Footer from './components/Footer';
import { verify } from 'jsonwebtoken'
import clientPromise from "../lib/mongodb";
import { GoMail } from "react-icons/go";
import { BsFacebook } from "react-icons/bs";
import { FaUser, FaGithub, FaLinkedin, FaSuitcase } from "react-icons/fa"
import { getCookie } from 'cookies-next';
import axios from 'axios';
import Avatar from './email/[email]';
const Profile = ({ user, isSignin }) => {

  const userParse = JSON.parse(user);

  const [isSetAvatar, setIsSetAvatar] = useState(false);

  const [readOnly, setReadOnly] = useState(false);
  const [isEditProfile, setEditProfile] = useState(false)
  const [displayName, setDisplayName] = useState(userParse.name.toUpperCase())
  const [srcImage, setSrcImage] = useState();
  const [srcAvt, setSrcAvt] = useState(userParse.avatar);
  const [uploadData, setUploadData] = useState()
  const router = useRouter();
  const [data, setData] = useState(null)

  function handlerSetAvatar() {
    setIsSetAvatar(true);
  }

  function handleOnChange() {

  }

  function handleSubmit() {

  }

  // function handleOnChange(changeEvent) {
  //   if (changeEvent.target.files[0].size > 10485760) {
  //     alert("File largest")
  //   } else {
  //     const reader = new FileReader();
  //     console.log("profile: onChange", reader)
  //     console.log("profile: changeEvent", changeEvent)



  //     reader.onload = function (onloadEvent) {
  //       setSrcImage(onloadEvent.target.result);
  //       setUploadData(undefined)
  //     }
  //     reader.readAsDataURL(changeEvent.target.files[0])
  //   }

  //   const profileForm = new FormData(profileForm);
  //   console.log("[profile-profileForm]" + profileForm)
  // }


  // async function handleSubmit(event) {
  //   event.preventDefault();
  //   const form = event.currentTarget;
  //   const fileInput = Array.from(form.elements).find(({ name }) => name === 'file')

  //   console.log("[profile]: fileInput", fileInput)

  //   const formData = new FormData();



  //   for (const file of fileInput.files) {
  //     formData.append('file', file)
  //   }
  //   formData.append('upload_preset', 'kdvupload')

  //   // gọi api upload ảnh lên cloudinary
  //   const data = await fetch('https://api.cloudinary.com/v1_1/drqct6sjp/image/upload', {
  //     method: 'POST',
  //     body: formData
  //   }).then(res => res.json())

  //   console.log("[prodile]:", data.secure_url);
  //   const url = data.secure_url;
  //   setSrcAvt(data.secure_url);

  //   // let dataProfile = JSON.stringify({
  //   //   email: userParse.email,
  //   //   avartar: url
  //   // })

  //   await axios({
  //     method: 'post',
  //     url: '/api/profile',
  //     data: {
  //       email: userParse.email,
  //       avatar: url,
  //     }
  //   })
  //   setSrcImage();
  //   setUploadData(data);
  // }

  return (
    <div className='flex flex-col justify-between '>
      {/* <Header /> */}
      <Header isSignin={isSignin} avatar={srcAvt ? srcAvt : '/avatarStandard.jpg'} />

      {/*  */}
      <div className='flex flex-row m-20 '>
        {/* avatar account and bio */}
        <div className='flex flex-col justify-center items-center rounded-xl w-1/4 mr-10 mb-40 bg-gray-200 py-5'>

          {/* Avatar */}
          {srcAvt ?
            <div
              className='w-28 h-28 rounded-full'
              style={{
                backgroundImage: `url(${srcAvt})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}
            >
            </div>
            : <div
              className='w-28 h-28 rounded-full'
              style={{
                backgroundImage: `url(/avatarStandard.jpg)`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}
            >
            </div>
          }

          {/* bio */}
          <h1 className='mt-6 font-bold text-2xl uppercase text-gray-600'>{displayName}</h1>
          <h3 className='text-lg uppercase text-gray-600'>{userParse.job}</h3>
          <div className='mt-4 mx-6' >
            <h3 className='text-gray-500 mb-2 font-bold'>Bio</h3>
            <div className="p-2 border-x border-y border-zinc-600 rounded-xl focus:border-slate-400 focus:border-2 bg-slate-200 h-40">{`${userParse.bio}`}</div>
          </div>
        </div>


        {/* infor user */}
        <form id="profileForm" className='w-3/4 grid grid-cols-4 gap-x-4 gap-y-1 p-7 bg-gray-50 rounded-2xl' method="POST" onChange={handleOnChange} onSubmit={handleSubmit} >
          <div className='col-span-4'>
            <h1 className='text-4xl font-bold'>Hello, {displayName}</h1>
          </div>

          <div className='flex flex-col col-span-2'>
            <label className="ml-2  text-slate-400" htmlFor="name">Dispplay Name </label>
            <input className=" text-slate-900 border-2 rounded-lg border-slate-300 w-2/3 p-1 px-4 " type={'text'} name="name" readOnly={readOnly} placeholder={displayName} />
          </div>

          <div className='flex flex-col  col-span-2'>
            <label className="ml-2  text-slate-400" htmlFor="age">Age</label>
            <input className="border-2 rounded-lg border-slate-300  w-2/3 p-1 px-4" type={'text'} name="age" readOnly={readOnly} placeholder={userParse.age} />
          </div>

          <div className='flex flex-col col-span-2'>
            <span className='flex flex-row items-center mb-2 text-slate-400 '>
              <FaUser className='text-xl' />
              <label className="ml-2 " htmlFor="gender">Gender</label>
            </span>
            <input className="border-2 rounded-lg border-slate-300  w-2/3 p-1 px-4" type={'text'} name="gender" readOnly={readOnly} placeholder={userParse.gender} />
          </div>

          <div className='flex flex-col col-span-2'>
            <span className='flex flex-row items-center mb-2 text-slate-400 '>
              <FaSuitcase className='text-xl' />
              <label className="ml-2 " htmlFor="job">Job</label>
            </span>
            <input className="border-2 rounded-lg border-slate-300  w-2/3 p-1 px-4" type={'text'} name="job" readOnly={readOnly} placeholder={userParse.job} />
          </div>

          <h1 className='col-span-4 font-bold text-slate-400'>Social Network</h1>
          <div className='flex flex-col col-span-2'>
            <span className='flex flex-row items-center mb-2 text-slate-400 '>
              <GoMail className='text-xl' />
              <label className="ml-2 " htmlFor="name">Email</label>
            </span>
            <input className="border-2 rounded-lg border-slate-300  w-2/3 p-1 px-4" type={'text'} name="email" readOnly={true} placeholder={userParse.email} />
          </div>

          <div className='flex flex-col col-span-2'>
            <span className='flex flex-row items-center mb-2 text-slate-400 '>
              <BsFacebook className='text-xl' />
              <label className="ml-2 " htmlFor="facebook">Facebook</label>
            </span>
            <input className="border-2 rounded-lg border-slate-300  w-2/3 p-1 px-4" type={'text'} name="facebook" readOnly={readOnly} placeholder={userParse.linkedin} />
          </div>


          <div className='flex flex-col col-span-2'>
            <span className='flex flex-row items-center mb-2 text-slate-400 '>
              <FaLinkedin className='text-xl' />
              <label className="ml-2 " htmlFor="linkedin">Linkedin</label>
            </span>
            <input className="border-2 rounded-lg border-slate-300  w-2/3 p-1 px-4" type={'text'} name="linkedin" readOnly={readOnly} placeholder={userParse.linkedin} />
          </div>

          <div className='flex flex-col col-span-2'>
            <span className='flex flex-row items-center mb-2 text-slate-400 '>
              <FaGithub className='text-xl' />
              <label className="ml-2 " htmlFor="github">Github</label>
            </span>
            <input className="border-2 rounded-lg border-slate-300  w-2/3 p-1 px-4" type={'text'} name="github" readOnly={readOnly} placeholder={userParse.github} />
          </div>

          <div className='flex flex-col col-span-2'>
            <span className='flex flex-row items-center mb-2 text-slate-400 '>
              <label className="ml-2 " htmlFor="github">Bio</label>
            </span>
            <textarea cols="12" rows=" 6" className="border-2 rounded-lg border-slate-300  w-2/3 p-1 px-4" name="github" readOnly={readOnly} placeholder={userParse.bio}></textarea>
          </div>

          <div className='w-full'>
            <Link href={`/email/${userParse.email}`}>
              <div className=' mt-4 col-span-4 w-4/5 bg-[#336ae1] py-2 px-4 rounded-xl text-white font-bold hover:bg-[#648add] cursor-pointer'>
                Update Avatar
              </div>
            </Link>
          </div>

          {/* upload image */}
          {/* <div className='flex flex-col col-span-2' >
            <label for='file' className='cursor-pointer underline hover:underline hover:text-sky-600 my-3'>Choose your avatar</label>
            <input className="hidden" type={"file"} id="file" name="file" placeholder='' />

            {srcImage && !uploadData && (
              <>
                <div
                  className='w-28 h-28 rounded-full my-4'
                  style={{
                    backgroundImage: `url(${srcImage})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                  }}
                >
                </div>
              </>
            )}
          </div > */}
          {/* Lưu thông tin của user vào database */}
          <button className='mt-4 col-span-4 w-1/6 bg-[#336ae1] py-2 px-4 rounded-xl text-white font-bold hover:bg-[#648add] cursor-pointer'>Save Profile</button>
        </form >
      </div >
      <Footer />
    </div >
  )
}


export default Profile


export async function getServerSideProps({ req, res }) {
  //lấy cookie
  const token = getCookie('KDV', { req, res })

  //kiểm tra cookie có tồn tại không
  if (token) {
    //decode cookie để lấy email
    let decode = verify(token, process.env.JWT_SECRET_KEY);
    const email = decode.email

    //truy cập vào database check user đã có hay chưa
    const client = await clientPromise
    const db = client.db('travel-to-share');
    const users = await db.collection('User').find({ email: email }).toArray()

    //kiểm tra nếu có thì trả về cho page thông tin của user
    if (users.length) {
      const user = JSON.stringify(users[0])
      const isSignin = true;

      return {
        props: {
          user,
          isSignin
        }
      }
    }
    //nếu không có thì thêm mới user
  }

  return { props: {} }
} 
