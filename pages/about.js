import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Login from './login'
import Card from "./components/Card"
import cookie from 'cookie'
import Link from 'next/link'
import Header from './components/Header'
import { Fragment, useEffect, useState } from 'react'
import { getCookie } from 'cookies-next'
import jwt from 'jsonwebtoken'
import clientPromise from "../lib/mongodb";
import Section from './components/Section'
import Footer from './components/Footer'
import 'animate.css'
import Image from 'next/image'


export default function Home({ isSignin, user, places }) {
  let avatar = '/avatarStandard.jpg'
  if (isSignin) {
    const userParse = JSON.parse(user);
    avatar = userParse.avatar
  }

  const dataPlaces = JSON.parse(places)



  return (
    <Fragment>

      <Head>
        <title>K Travel</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/logo.svg" />
      </Head>

      <Header isSignin={isSignin} avatar={avatar} />
      <div className="h-screen w-screen relative">
        {/* Content wellcome */}
        <div className='absolute inset-0 z-10 my-32 mx-72 flex flex-col justify-start items-center bg-[#353d4ea7] p-10'>
          <div className='flex flex-col justify-center'>
            <Image src="/Avatar800x800.png" width="150" height="150" alt="" className='rounded-full' />
          </div>
          <p className="text-center text-[16px] font-bold text-[#fcfcfcd4]">Hi, My name's Vo Duy Khang. <br /> I'm studing in HUTECH. <br /> And I want to a Web Developer. <br/>This is my specialized projects</p>
          <p className='text-white '>037 267 6419 - voduykhang312001@gmail.com  </p>
        </div>
        <video
          className="object-cover h-full w-full absolute "
          autoPlay
          loop
          muted
        >
          <source
            // src="https://nft4charity-assets.s3.us-east-2.amazonaws.com/hero-video.mp4"
            src="video.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
      {/* <main className='flex flex-col justify-center items-center w-full h-full'>
        <Section data={dataPlaces} name="Top Vietnam" />
        <Section data={dataPlaces} name="Top Trending" />
        <Section data={dataPlaces} name="Your Favorite" />

      </main> */}
      <Footer />
    </Fragment>
  )
}



export async function getServerSideProps({ req, res }) {
  const client = await clientPromise
  const db = client.db('travel-to-share');

  //lấy dữ liệu của place
  const places = JSON.stringify(await db.collection('Place').find().toArray())


  const token = getCookie('KDV', { req, res })
  let isSignin = false
  if (token) {
    let decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const email = decode.email
    // const client = await clientPromise
    // const db = client.db('travel-to-share');
    const users = await db.collection('User').find({ email: email }).toArray()
    const user = JSON.stringify(users[0])
    isSignin = true


    return {
      props: {
        isSignin,
        user,
        places
      }
    }
  }
  return {
    props: { isSignin, places }
  }

}


