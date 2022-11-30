import React from "react";
import Image from "next/image";
import moment from "moment";


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

      



const SideBar = (props: Props) => {
    const result = props.context;
    const consition = result.list //.filter((obj)=>moment(obj.dt_txt).isSame(moment(),'day'))
    console.log(consition)

  return (
    <div className="  lg:my-0 lg:mx-20  flex flex-col justify-center items-center h-screen lg:h-full space-y-10 lg:flex-[2_2_0] lg:rounded-lg ">
      <div className="flex lg:space-x-5">
        <p>Your City</p> <input type="text" />
      </div>
      <p>{moment().format('h:mma').toString()} { moment().format('MMMM d, YYYY').toString() }</p>
      <div className="flex items-center">
        <img
          src={`http://openweathermap.org/img/wn/${consition[0]?.weather[0].icon}@2x.png`}
          alt=""
          width={200}
          height={200}
        />
        <h1 className="text-5xl font-semibold">{(consition[0]?.main.temp - 273.15).toFixed(1)}°C</h1>
      </div>
      <h1 className="text-4xl font-semibold">{consition[0]?.weather[0].description}</h1>
      <div className="flex space-x-4">
        <div className=" justify-center text-center">
          <p className=" text-2xl font-thin text-gray-300">humidity</p>
          <p>{consition[0]?.main.humidity}</p>
        </div>
        <div className=" justify-center text-center">
          <p className=" text-2xl font-thin text-gray-300" >WindSpeed</p>
          <p>{consition[0]?.wind.speed}</p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
