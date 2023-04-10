import React from 'react'
import Image from 'next/image'
import { WiHumidity, WiSunrise, WiSunset } from "react-icons/wi";
import 'animate.css'


const WeatherCard = ({weather }) => {
  const date = new Date(weather.dt * 1000)
  let hour, min, day, month;
  if(date.getHours() < 10) {
    hour = `0${date.getHours()}`
  } else {
    hour = date.getHours()
  }

  if(date.getMinutes() < 10) {
    min = "0" + date.getMinutes()
  } else {
    min = date.getMinutes()
  }

  if(date.getDate() < 10) {
    day = "0" + date.getDate()
  } else {
    day = date.getDate()
  }

  if(date.getMonth() < 10) {
    month = "0" + date.getMonth()
  } else {
    month = date.getMonth()
  }


  return (
    <div className='m-2 rounded-2xl flex flex-col justify-center items-center text-white w-[90%] bg-[#169affb5] animate__animated animate__backInDown'>
    <p className='bg-[#6e55b3bb] w-full text-center rounded-t-2xl'>{ hour + ":" + min + " " + day + "/" + month }</p>
      <Image src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" width="70" height="70" />
      <p className='font-bold'>{weather.weather[0].description}</p>
      <p className='text-[20px] flex flex-row justify-center items-center'>{Math.round(weather.main.temp - 273.15)}&deg;C/ <WiHumidity />{weather.main.humidity}% </p>
    </div>
  )
}

export default WeatherCard