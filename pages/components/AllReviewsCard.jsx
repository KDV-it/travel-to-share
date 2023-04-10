import React from 'react'
import Image from 'next/image'

const AllReviewsCard = ({ name, date, avatar, content }) => {
  const dates = new Date(date * 1)
  console.log(dates.getDate())
  const d = dates.getDate()
  const m = dates.getMonth()
  const y = dates.getFullYear()
  return (
    <div className='w-full mb-10 '>
      <div className='grid grid-cols-3 grid-rows-2 w-[50%] '>
        <Image src={avatar ? `${avatar}` : "/avatarStandard.jpg"}
          width="60"
          height="60"
          alt=""
          className='rounded-full row-span-2 col-span-1 mr-10'
        />
        <p className='col-span-2 row-span-1 font-bold'>{name}</p>
        <p className='col-span-2 row-span-1 text-gray-500'>{`${d}/${m}/${y}`}</p>
      </div>
      <div className='mt-6 px-3 text-gray-500'>
        <p >
          {content}
        </p>
      </div>
    </div>
  )
}

export default AllReviewsCard