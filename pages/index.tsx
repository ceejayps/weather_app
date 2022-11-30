import Head from 'next/head'
import Image from 'next/image'
import Charts from '../components/charts'
import SideBar from '../components/SideBar'
import axios from "axios";
import React from 'react';
//import styles from '../styles/Home.module.css'

const baseURL = "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=1ecd0e017b429cfd0898dfee1e03a465&q=kingston,jm";

export default function Home() {

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

  
  const [context, setPost] = React.useState<Apiresponse>({list:[]});

  React.useEffect(() => {
  axios.get(baseURL).then((response) => {
      //console.log(response)
      setPost(response.data);
    });
  }, []);

  return context?.list[0]? (
  
    <div >
      

      <section className='p-5 min-h-screen lg:h-screen max-w-screen bg-slate-200 justify-center items-center lg:flex '>
        <div className='h-full w-full bg-white rounded-lg flex lg:flex-row flex-col'>
          <SideBar context={context}/>
          <Charts context={context} />

        </div>

      </section>

      
    </div>
  ):(<div className='h-screen w-screen flex justify-center text-center items-center text-4xl uppercase'><p>Loading...</p></div>)
}
  
      
  
