import React, { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link';

const Wellcome = () => {
  const { data: session } = useSession();

  const findUser = async () => {
    const users = await fetch("/api/user");
    const data = await  users.json()
  }

  if (session) {
    return (
      <div>
        <h1>Hi {session.user.name}</h1>
        <h3>Wellcome to Travel to Share!</h3>
        <Link href={`/profile`}>Click here to go to update your Profile...</Link>

          {/* {
            checkNew ?
              <Link href={`/profile`}>Click here to go to update your Profile...</Link>
              :
              <Link href={"/"}>Click here to go to continute</Link>
          } */}
      </div>
    )
  }
  return (

    <div>
      You are not sign in.
      <button onClick={() => signIn("google",{callbackUrl: '/wellcome'})}>Login now</button>
    </div>
  )
}

export default Wellcome

