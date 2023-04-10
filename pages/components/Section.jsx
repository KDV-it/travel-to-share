import React from 'react'
import Link from 'next/link'
import Card from './Card';
import { useState } from 'react';


const Section = ({ name, data, slug, email }) => {
  const [favorited, setFavorited] = useState(false)


  return (
    <div className="my-14">
      <div className="w-72 group">
        <h1 className="text-3xl font-bold text-gray-600 w-full group-hover:text-gray-800 group-hover:underline group-hover:underline-offset-4 cursor-pointer">
          {/* <Link href={`/${slug}`}> */}
          {name}
          {/* </Link> */}
        </h1>
        <div className="h-1.5 w-1/2 bg-gray-800 mt-2 group-hover:bg-transparent" />
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4 ">
        {data.map(place => {
          // const { slug, ...cardProps } = place;
          let fa = false
          for (let i = 0; i < place.favoriteuser.length; i++) {
            if (place.favoriteuser[i] === email) {
              fa = true
            }
          }
          return <Card key={place.slug}
            name={place.name}
            country={place.country}
            avatarPlace={place.avatarPlace}
            slug={place.slug}
            rating={place.rating}
            isFavorited={fa}
            lon={place.lon}
            lat={place.lat}
          />;
        })}
      </div>
    </div>
  );
}

export default Section