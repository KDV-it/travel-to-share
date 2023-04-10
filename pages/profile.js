import React, { use, useEffect, useState } from 'react'
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
import Head from 'next/head'
import axios from 'axios';
import Avatar from './email/[email]';
const Profile = ({ user, isSignin }) => {

  const userParse = JSON.parse(user);

  const [readOnly, setReadOnly] = useState(false);
  const [displayName, setDisplayName] = useState(userParse.name.toUpperCase())
  const [srcAvt, setSrcAvt] = useState(userParse.avatar);

  const [name, setName] = useState(userParse.name);
  const [job, setJob] = useState(userParse.job);
  const [facebook, setFacebook] = useState(userParse.facebook);
  const [gender, setGender] = useState(userParse.gender)
  const [github, setGithub] = useState(userParse.github)
  const [linkedin, setLinkedin] = useState(userParse.linkedin)
  const [twitter, setTwitter] = useState(userParse.twitter)
  const [age, setAge] = useState(userParse.age)
  const [bio, setBio] = useState(userParse.bio)

  async function handleClick() {
    const test = await axios({
      method: 'post',
      url: '/api/updateUser',
      data: {
        email: userParse.email,
        name: name,
        job: job,
        facebook: facebook,
        gender: gender,
        github: github,
        linkedin: linkedin,
        twitter: twitter,
        age: age,
        bio: bio
      }
    }).then(alert("Successfully!"))
    
    console.log(test)
    setTimeout(() => {router.push('/profile')}, 2000)
    
    // const result = confirm("Successfull!");
    // if (result === true || result === false) {
    //   router.push("/profile");
    // }

  }

  function handlerSetAvatar() {
    setIsSetAvatar(true);
  }

  function handleOnChange() {

  }

  function handleSubmit() {

  }



  return (
    <div className='flex flex-col justify-between '
      style={{
        backgroundImage: "url(/2774351.jpg)",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <Head>
        <title>K Travel - Profile</title>
        <link rel="icon" href="/logo.svg" />

      </Head>
      {/* <Header /> */}
      <Header isSignin={isSignin} avatar={srcAvt ? srcAvt : '/avatarStandard.jpg'} />

      {/*  */}
      <div className='flex flex-row m-20 '>
        {/* avatar account and bio */}
        <div className='flex flex-col justify-center items-center rounded-xl w-1/4 mr-10 mb-40 bg-[#9fd7ff93] py-5 '>

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
          <h1 className='mt-6 font-bold text-2xl uppercase text-[#1f1247]'>{displayName}</h1>
          <h3 className='text-lg  text-[#2e2a3c]'>{userParse.job}</h3>
          <div className='mt-4 mx-6' >
            <h3 className='text-gray-500 mb-2 font-bold'>Bio</h3>
            <div className="w-52 p-2 border-x border-y border-zinc-600 rounded-xl  focus:border-2 bg-[#292626b1] text-[#ffffff] h-40">{`${userParse.bio}`}</div>
          </div>
        </div>


        {/* infor user */}
        <form id="profileForm" className='w-3/4 grid grid-cols-4 gap-x-4 gap-y-1 p-7 bg-[#9fd7ff93] rounded-2xl' onChange={handleOnChange} onSubmit={handleSubmit} >
          <div className='col-span-4'>
            <h1 className='text-4xl font-bold text-[#1f1247]'>Hello, {displayName}</h1>
          </div>

          <div className='flex flex-col col-span-2'>
            <label className="ml-2  text-[#2e2a3c]" htmlFor="name">Dispplay Name </label>
            <input onChange={(e) => { setName(e.target.value) }} className=" text-slate-900 border-2 rounded-lg border-slate-300 w-2/3 p-1 px-4 " type={'text'} name="name" readOnly={readOnly} placeholder={name} />
          </div>

          <div className='flex flex-col  col-span-2'>
            <label className="ml-2  text-[#2e2a3c]" htmlFor="age">Age</label>
            <input onChange={(e) => { setAge(e.target.value) }} className="border-2 rounded-lg border-slate-300  w-2/3 p-1 px-4" type={'text'} name="age" readOnly={readOnly} placeholder={age} />
          </div>

          <div className='flex flex-col col-span-2'>
            <span className='flex flex-row items-center mb-2 text-[#2e2a3c] '>
              <FaUser className='text-xl' />
              <label className="ml-2 " htmlFor="gender">Gender</label>
            </span>
            <input onChange={(e) => { setGender(e.target.value) }} className="border-2 rounded-lg border-slate-300  w-2/3 p-1 px-4" type={'text'} name="gender" readOnly={readOnly} placeholder={gender} />
          </div>

          <div className='flex flex-col col-span-2'>
            <span className='flex flex-row items-center mb-2 text-[#2e2a3c] '>
              <FaSuitcase className='text-xl' />
              <label className="ml-2 " htmlFor="job">Job</label>
            </span>
            <input onChange={(e) => { setJob(e.target.value) }} className="border-2 rounded-lg border-slate-300  w-2/3 p-1 px-4" type={'text'} name="job" readOnly={readOnly} placeholder={job} />
          </div>

          <h1 className='col-span-4 font-bold text-[#2e2a3c]'>Social Network</h1>
          <div className='flex flex-col col-span-2'>
            <span className='flex flex-row items-center mb-2 text-[#2e2a3c] '>
              <GoMail className='text-xl' />
              <label className="ml-2 " htmlFor="name">Email</label>
            </span>
            <input className="border-2 rounded-lg border-slate-300  w-2/3 p-1 px-4" type={'text'} name="email" readOnly={true} placeholder={userParse.email} />
          </div>

          <div className='flex flex-col col-span-2'>
            <span className='flex flex-row items-center mb-2 text-[#2e2a3c] '>
              <BsFacebook className='text-xl' />
              <label className="ml-2 " htmlFor="facebook">Facebook</label>
            </span>
            <input onChange={(e) => { setFacebook(e.target.value) }} className="border-2 rounded-lg border-slate-300  w-2/3 p-1 px-4" type={'text'} name="facebook" readOnly={readOnly} placeholder={facebook} />
          </div>


          <div className='flex flex-col col-span-2'>
            <span className='flex flex-row items-center mb-2 text-[#2e2a3c] '>
              <FaLinkedin className='text-xl' />
              <label className="ml-2 " htmlFor="linkedin">Linkedin</label>
            </span>
            <input onChange={(e) => { setLinkedin(e.target.value) }} className="border-2 rounded-lg border-slate-300  w-2/3 p-1 px-4" type={'text'} name="linkedin" readOnly={readOnly} placeholder={linkedin} />
          </div>

          <div className='flex flex-col col-span-2'>
            <span className='flex flex-row items-center mb-2 text-[#2e2a3c] '>
              <FaGithub className='text-xl' />
              <label className="ml-2 " htmlFor="github">Github</label>
            </span>
            <input onChange={(e) => { setGithub(e.target.value) }} className="border-2 rounded-lg border-slate-300  w-2/3 p-1 px-4" type={'text'} name="github" readOnly={readOnly} placeholder={github} />
          </div>

          <div className='flex flex-col col-span-2'>
            <span className='flex flex-row items-center mb-2 text-[#2e2a3c] '>
              <label className="ml-2 font-bold" htmlFor="github">Bio</label>
            </span>
            <textarea onChange={(e) => { setBio(e.target.value); console.log(bio) }} cols="12" rows=" 6" className="border-2 rounded-lg border-slate-300  w-2/3 p-1 px-4" name="github" readOnly={readOnly} placeholder={bio}></textarea>
          </div>

          <div className='w-full'>
            <Link href={`/email/${userParse.email}`}>
              <div className=' mt-4 col-span-4 w-4/5 bg-[#336ae1] py-2 px-4 rounded-xl text-white font-bold hover:bg-[#648add] cursor-pointer'>
                Update Avatar
              </div>
            </Link>
          </div>

          {/* o  */}
          <button onClick={handleClick}className='mt-4 col-span-4 w-1/6 bg-[#336ae1] py-2 px-4 rounded-xl text-white font-bold hover:bg-[#648add] cursor-pointer'>Save Profile</button>
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
    else {
      const createUser = await db.collection('User').insertOne(
        {
          email: email,
          favorite: [],
          job: "",
          name: email,
          facebook: "",
          gender: "",
          github: "",
          linkedin: "",
          twitter: "",
          avatar: "",
          age: "",
          bio: ""
        }
      )
      const users = await db.collection('User').find({ email: email }).toArray()
      const user = JSON.stringify(users[0])
      const isSignin = true;

      return {
        props: {
          user,
          isSignin
        }
      }
    }
  }

} 
