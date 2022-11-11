import React, { useEffect, useState } from 'react'
import { useSession, signOut, getSession } from 'next-auth/react'
import { useRouter } from 'next/router';
import Link from 'next/link'
import jwt from 'jsonwebtoken';
import clientPromise from '../../lib/mongodb';

const Profile = ({ user }) => {
  const router = useRouter()
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   setLoading(true)
  //   fetch(`/api/user/email/${email}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setData(data)
  //       setLoading(false);
  //     })
  // }, [])

  return (
    <div>
      Wellcome
    </div>
  )

}

export default Profile

export async function getServerSideProps(context) {
  const cookie = context.req.cookies;

  const token = cookie.KDV
  let decode;
  
  try {
    decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
  } catch (e) {
    console.log(e)
  }
  const email = decode.email;

  console.log(email)

  try {
    const client = await clientPromise
    console.log("Connect")
    const db = client.db("travel-to-share")

    const user = await db
      .collection("User")
      .find({})
    console.log(user)
    const userFind = user.map((user)=> user.email === email)
    
    return {
      props: {
        user: JSON.parse(JSON.stringify(userFind)) ,
      },
    }
  } catch (e) {
    console.log(e);
  }

}
