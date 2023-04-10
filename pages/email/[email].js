import React, { useState } from 'react'
import Header from '../components/Header';
import axios from 'axios';
import { useRouter } from 'next/router'
import Link from 'next/link'


const Avatar = () => {
  const router = useRouter();

  const [srcImage, setSrcImage] = useState();
  const [uploadData, setUploadData] = useState();
  const [isChoose, setIsChoose] = useState(false);

  const { email } = router.query;
  console.log(email);

  function handleOnChange(changeEvent) {
    if (changeEvent.target.files[0].size > 10485760) {
      alert("File largest")
    } else {
      const reader = new FileReader();
      setIsChoose(true);
      console.log("profile: onChange", reader)
      console.log("profile: changeEvent", changeEvent)

      reader.onload = function (onloadEvent) {
        setSrcImage(onloadEvent.target.result);
        setUploadData(undefined)
      }
      reader.readAsDataURL(changeEvent.target.files[0])
    }

  }


  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(({ name }) => name === 'file')

    console.log("[profile]: fileInput", fileInput)

    const formData = new FormData();

    for (const file of fileInput.files) {
      formData.append('file', file)
    }
    formData.append('upload_preset', 'kdvupload')

    // gọi api upload ảnh lên cloudinary
    const data = await fetch('https://api.cloudinary.com/v1_1/drqct6sjp/image/upload', {
      method: 'POST',
      body: formData
    }).then(res => res.json())

    console.log("[prodile]:", data.secure_url);
    const url = data.secure_url;
    // setSrcAvt(data.secure_url);

    const test = await axios({
      method: 'post',
      url: '/api/profile',
      data: {
        email: email,
        avatar: url,
      }
    }).then(() => {
      const result = confirm("Successfull!");
      if (result === true || result === false) {
        router.push('/profile')
      }
    }).catch((e) => { alert("Something went wrong!") })

    console.log(test);
    setSrcImage(data.secure_url);
    setUploadData(data);
  }
  return (
    <div className='flex justify-center items-center w-screen h-screen'
      style={{
        backgroundImage: "url(/2774351.jpg)",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      {/* <Header title="Profile - Avatar" isSignin={true} /> */}
      <form method="POST" onChange={handleOnChange} onSubmit={handleSubmit} className='w-1/4 h-1/2 bg-slate-400 rounded-lg flex flex-col justify-center items-center'>
        <div className='flex flex-col col-span-2' >
          <label for='file' className={!isChoose ? 'cursor-pointer underline hover:underline hover:text-sky-600 my-3' : 'hidden'}>Choose your avatar</label>
          <input className="hidden" type={"file"} id="file" name="file" placeholder='' />

        </div >
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
        <button className={isChoose ? 'mt-4 mb-2 col-span-4 w-1/2 bg-[#336ae1] py-2 px-4 rounded-xl text-white font-bold hover:bg-[#648add] cursor-pointer' : "hidden"}>Upload Avatar</button>
        <Link href={'/profile'} className='text-slate-50 underline font-bold hover:text-[#3d5a91]'>Back to your profile </Link>
      </form>
    </div>
  )
}

export default Avatar