import moment from 'moment'
import React from 'react'
import ForcastTile from './ForcastTile'

type Props = {
    context: Apiresponse
}

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

const DaileyForcast = ({context}: Props) => {
  return (
    <div className=' w-full h-[200px] flex justify-evenly space-x-1 mt-20'>
        <ForcastTile context={context} date={moment().add(1,'days')}/>
        <ForcastTile context={context} date={moment().add(2,'days')}/>
        <ForcastTile context={context} date={moment().add(3,'days')}/>
        <ForcastTile context={context} date={moment().add(4,'days')}/>
    </div>
  )
}

export default DaileyForcast