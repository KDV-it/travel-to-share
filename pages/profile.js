import { verify } from 'jsonwebtoken'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import clientPromise from '../lib/mongodb'

import { getCookie } from 'cookies-next'
import { BsFacebook } from 'react-icons/bs'
import { FaGithub, FaLinkedin, FaSuitcase, FaUser } from 'react-icons/fa'
import { GoMail } from 'react-icons/go'

const Profile = () => {
  const user = {
    favorite: ['636b1a40a48674ce7fd041c9'],
    age: 20,
    job: 'IT',
    name: 'Vo Duy Khang',
    facebook: '',
    gender: 'nam',
    github: '',
    linkedin: '',
    twitter: '',
    avatar: '/Avatar800x800.png',
    email: 'voduykhang312001@gmail.com',
    bio: "I'm a webdeveloper. I'm work with Next.js",
  }

  const [readOnly, setReadOnly] = useState(false)
  const [bio, setBio] = useState(user.bio)
  const [isEditProfile, setEditProfile] = useState(false)

  const [srcAvt, setSrcAvt] = useState(user.avatar)
  const [uploadData, setUploadData] = useState()
  const [isLoading, setLoading] = useState(false)
  const router = useRouter()
  const [data, setData] = useState(null)

  function handleEditProfile() {
    setEditProfile(true)
    setReadOnly(false)
  }

  function handleSave() {
    setEditProfile(false)
    setReadOnly(true)
  }

  function handleOnChange(changeEvent) {
    const reader = new FileReader()
    reader.onload = function (onloadEvent) {
      setSrcAvt(onloadEvent.target.result)
      setUploadData(undefined)
    }

    reader.readAsDataURL(changeEvent.target.files[0])
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === 'file'
    )

    const formData = new FormData()

    for (const file of fileInput.files) {
      formData.append('file', file)
    }

    formData.append('upload_preset', 'kdvupload')

    const data = await fetch(
      'https://api.cloudinary.com/v1_1/drqct6sjp/image/upload',
      {
        method: 'POST',
        body: formData,
      }
    ).then(res => res.json())

    setSrcAvt(data.secure_url)
    setUploadData(data)

    console.log('data', data)
  }

  return (
    <div className='flex flex-col justify-between '>
      {/* <Header /> */}
      <Header />
      <form className='flex flex-row m-20 '>
        {/* avatar account and bio */}
        <div className='flex flex-col items-center justify-center w-1/4 py-5 mb-40 mr-10 bg-gray-200 rounded-xl'>
          {/* Avatar */}
          <div>
            <form
              className='flex flex-col items-center justify-center'
              method='POST'
              onChange={handleOnChange}
              onSubmit={handleSubmit}
            >
              <div
                className='rounded-full w-28 h-28'
                style={{
                  backgroundImage: `url(${srcAvt})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                }}
              ></div>
              <label
                for='file'
                className='my-3 underline cursor-pointer hover:underline hover:text-sky-600'
              >
                Choose your avatar
              </label>
              <input
                className='hidden'
                type={'file'}
                id='file'
                name='file'
                placeholder=''
              />
              {srcAvt && !uploadData && (
                <button className='bg-[#336ae1] py-2 px-4 rounded-xl text-white font-bold hover:bg-[#648add]'>
                  Upload file
                </button>
              )}
            </form>
          </div>
          {/* bio */}
          <h1 className='mt-6 text-2xl font-bold text-gray-600 uppercase'>
            {user.name}
          </h1>
          <div className='mx-6 mt-4'>
            <h3 className='mb-2 font-bold text-gray-500'>Bio</h3>
            <div className='h-40 p-2 border-x border-y border-zinc-600 rounded-xl focus:border-slate-400 focus:border-2 bg-slate-200'>{`${user.bio}`}</div>
          </div>
        </div>

        {/* infor user */}
        <div className='grid w-3/4 grid-cols-4 gap-x-4 gap-y-1 p-7 bg-gray-50 rounded-2xl'>
          <div className='col-span-4'>
            <h1 className='text-4xl font-bold'>Hello, {user.name}</h1>
          </div>
          <div className='flex flex-col col-span-2'>
            <label className='ml-2 text-slate-400' for='name'>
              Dispplay Name{' '}
            </label>
            <input
              className='w-2/3 p-1 px-4 border-2 rounded-lg text-slate-900 border-slate-300'
              type={'text'}
              name='name'
              readOnly={readOnly}
              placeholder={user.name}
            />
          </div>

          <div className='flex flex-col col-span-2'>
            <label className='ml-2 text-slate-400' for='age'>
              Age
            </label>
            <input
              className='w-2/3 p-1 px-4 border-2 rounded-lg border-slate-300'
              type={'text'}
              name='age'
              readOnly={readOnly}
              placeholder={user.age}
            />
          </div>
          <div className='flex flex-col col-span-2'>
            <span className='flex flex-row items-center mb-2 text-slate-400 '>
              <FaUser className='text-xl' />
              <label className='ml-2 ' for='gender'>
                Gender
              </label>
            </span>
            <input
              className='w-2/3 p-1 px-4 border-2 rounded-lg border-slate-300'
              type={'text'}
              name='gender'
              readOnly={readOnly}
              placeholder={user.gender}
            />
          </div>

          <div className='flex flex-col col-span-2'>
            <span className='flex flex-row items-center mb-2 text-slate-400 '>
              <FaSuitcase className='text-xl' />
              <label className='ml-2 ' for='job'>
                Job
              </label>
            </span>
            <input
              className='w-2/3 p-1 px-4 border-2 rounded-lg border-slate-300'
              type={'text'}
              name='job'
              readOnly={readOnly}
              placeholder={user.job}
            />
          </div>

          <h1 className='col-span-4 font-bold text-slate-400'>
            Social Network
          </h1>
          <div className='flex flex-col col-span-2'>
            <span className='flex flex-row items-center mb-2 text-slate-400 '>
              <GoMail className='text-xl' />
              <label className='ml-2 ' for='name'>
                Email
              </label>
            </span>
            <input
              className='w-2/3 p-1 px-4 border-2 rounded-lg border-slate-300'
              type={'text'}
              name='email'
              readOnly={readOnly}
              placeholder={user.email}
            />
          </div>

          <div className='flex flex-col col-span-2'>
            <span className='flex flex-row items-center mb-2 text-slate-400 '>
              <BsFacebook className='text-xl' />
              <label className='ml-2 ' for='facebook'>
                Facebook
              </label>
            </span>
            <input
              className='w-2/3 p-1 px-4 border-2 rounded-lg border-slate-300'
              type={'text'}
              name='facebook'
              readOnly={readOnly}
              placeholder={user.linkedin}
            />
          </div>

          <div className='flex flex-col col-span-2'>
            <span className='flex flex-row items-center mb-2 text-slate-400 '>
              <FaLinkedin className='text-xl' />
              <label className='ml-2 ' for='linkedin'>
                Linkedin
              </label>
            </span>
            <input
              className='w-2/3 p-1 px-4 border-2 rounded-lg border-slate-300'
              type={'text'}
              name='linkedin'
              readOnly={readOnly}
              placeholder={user.linkedin}
            />
          </div>

          <div className='flex flex-col col-span-2'>
            <span className='flex flex-row items-center mb-2 text-slate-400 '>
              <FaGithub className='text-xl' />
              <label className='ml-2 ' for='github'>
                Github
              </label>
            </span>
            <input
              className='w-2/3 p-1 px-4 border-2 rounded-lg border-slate-300'
              type={'text'}
              name='github'
              readOnly={readOnly}
              placeholder={user.github}
            />
          </div>

          <div className='flex flex-col col-span-2'>
            <span className='flex flex-row items-center mb-2 text-slate-400 '>
              <label className='ml-2 ' for='github'>
                Bio
              </label>
            </span>
            <textarea
              cols='12'
              rows=' 6'
              className='w-2/3 p-1 px-4 border-2 rounded-lg border-slate-300'
              name='github'
              readOnly={readOnly}
              placeholder={user.bio}
            ></textarea>
          </div>

          <div className='flex flex-row justify-between col-span-4 mt-4'>
            <button
              onClick={handleEditProfile}
              className='bg-[#336ae1] py-2 px-4 rounded-xl text-white font-bold hover:bg-[#648add] cursor-pointer'
            >
              Save Profile
            </button>
          </div>
        </div>
      </form>

      <Footer />
    </div>
  )
}

export default Profile

export async function getServerSideProps({ req, res }) {
  const token = getCookie('KDV', { req, res })

  // const token = parsedCookies.KDV;
  let decode = verify(token, process.env.JWT_SECRET_KEY)

  const email = decode.email

  const client = await clientPromise
  const db = client.db('travel-to-share')

  const users = await db.collection('User').find({ email }).toArray()

  if (users.length) {
    const user = users[0]

    return { props: { user } }
  }

  // User not exists

  return { props: {} }
}
