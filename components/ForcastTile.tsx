import moment from 'moment';
import { Moment } from 'moment'
import React from 'react'

type Props = {context: Apiresponse, date:Moment}



type Apiresponse = {
    list: ResponseList[];
  };
  type ResponseList =  {
    "dt": number,
    "main": {
        "temp": number,
        "feels_like": number,
        "temp_min": number,
        "temp_max": number,
        "pressure": number,
        "sea_level": number,
        "grnd_level": number,
        "humidity": number,
        "temp_kf": number
    },
    "weather": [
        {
            "id": number,
            "main": string,
            "description": string,
            "icon": string
        }
    ],
    "clouds": {
        "all": number
    },
    "wind": {
        "speed": number,
        "deg": number,
        "gust": number
    },
    "visibility": number,
    "pop":number,
    "sys": object,
    "dt_txt": string
}

function ForcastTile({date, context}: Props) {
    const result = context;
    const consition = result.list.filter((obj)=>moment(obj.dt_txt).isSame(date,'day'))
    
    const days =["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    const index = moment().isSame(date,'day')? 0:4
    //console.log(consition[index]?.dt_txt, ' ',days[date.day()], index , consition[index]?.weather[0].icon)
    //console.log( moment().isSame(date,'day'),days[date.day()],)
  return (
    <div className='h-[200px] w-[170px] bg-white flex-col flex justify-evenly items-center rounded-md' >
        <h3>{days[date.day()]}</h3>
        <  img src={`http://openweathermap.org/img/wn/${consition[index]?.weather[0].icon}@2x.png`}
         alt="" className='h-[50px] w-[50px]'/>
        <p className='text-1xl font-semibold'>{consition[index]?.weather[0].description}</p>
        <h3 className='tracking-[2px] text-center text-1xl font-thin'>{(consition[index]?.main.temp - 273.15).toFixed(1)}°C%</h3>
    </div>
  )
}

export default ForcastTile