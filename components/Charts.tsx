import React from 'react'
import DaileyForcast from './DaileyForcast'
import SplineGraph from './SplineGraph'

type Props = {
    context:Apiresponse};

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

   

const Charts = ({context}: Props) => {
  return (
    <div className='lg:flex-[6_6_0]  w-full h-[60vh]  lg:h-full bg-slate-900 justify-center items-center lg:flex flex-col  p-5  lg:p-20 lg:rounded-r-xl space-y-10 '>
        <SplineGraph context={context}/>
        <DaileyForcast context={context}/>
    </div>
  )
}

export default Charts