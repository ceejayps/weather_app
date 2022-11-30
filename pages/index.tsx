import Head from "next/head";
import Image from "next/image";
import Charts from "../components/charts";
import SideBar from "../components/SideBar";
import axios from "axios";
import React from "react";
import moment from "moment";
import { Colors } from "chart.js";
//import styles from '../styles/Home.module.css'

const baseURL =
  "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=1ecd0e017b429cfd0898dfee1e03a465&q=kingston,jm";

export default function Home() {
  type Apiresponse = {
    list: ResponseList[];
  };
  type ResponseList = {
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
    weather: [
      {
        id: number;
        main: string;
        description: string;
        icon: string;
      }
    ];
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
    visibility: number;
    pop: number;
    sys: object;
    dt_txt: string;
  };

  const [context, setPost] = React.useState<Apiresponse>({ list: [] });
  const [max, setMax] = React.useState(0)
  const [min, setMin] = React.useState(0)
  const [max_index, setMax_index] = React.useState(0)
  const [min_index, setMin_index] = React.useState(0)
  const [colors, setcolors] = React.useState(['']);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      //console.log(response)
      const max = Math.max(
        ...response.data?.list?.slice(0, 7).map((n: { main: { temp_max: number; }; }) => n.main.temp_max - 273.15)
      )
      setMax(
        max
      )
      const min= Math.min(
        ...response.data?.list?.slice(0, 7).map((n: { main: { temp_min: number; }; }) => n.main.temp_min - 273.15)
      )
      setMin( min)

      const min_index = [
        Math.min(...response.data?.list.slice(0, 7).map((n: { main: { temp_min: number; }; }) => n.main.temp_min - 273.15)) + 1,
        ...response.data?.list.slice(0, 7).map((n: { main: { temp: number; }; }) => n.main.temp - 273.15),
      ].indexOf(min);
      const max_index = [
        Math.min(...response.data?.list.slice(0, 7).map((n: { main: { temp_min: number; }; }) => n.main.temp_min - 273.15)) + 1,
        ...response.data?.list.slice(0, 7).map((n: { main: { temp: number; }; }) => n.main.temp - 273.15),
      ].indexOf(max);

      setMax_index(max_index)
      setMin_index(min_index)
      setPost(response.data);
      const colorArray = ['']
      colorArray.pop()
      for (let index = 0; index < 8; index++) {
        if(index == min_index) colorArray.push('blue') //console.log("blue", index, min_index)
        if(index == max_index) colorArray.push('red')//console.log("red", index, max_index)
        if(index != max_index || index != min_index) colorArray.push('transparent')//console.log("transparent", index, min_index, max_index)
        setcolors(colorArray)
      }
    
      
    }
    
    
    );
  }, []);

  const [time, setTime] = React.useState("");

  React.useEffect(() => {
    const interval = setInterval(() =>
      setTime(
        moment().format("h:mma").toString() +
          " " +
          moment().format("MMMM d, YYYY").toString()
      )
    );
    return () => {
      clearInterval(interval);
    };
  }, []);



  //const consition = context.list.filter((obj)=>moment(obj.dt_txt).isSame(moment().add(1,'days'),'day'))
  //console.log(consition)






//console.log(min, max)




  


  // toUpdateColors[min_index] = "blue",
  // toUpdateColors[max_index] = "red",

  // setcolors(toUpdateColors)



  return context?.list[0] ? (
    <div>
      <section className="p-5 min-h-screen lg:h-screen max-w-screen bg-slate-200 justify-center items-center lg:flex ">
        <div className="h-full w-full bg-white rounded-lg flex lg:flex-row flex-col">
          <SideBar context={context} time={time} />
          <Charts context={context} colors={colors} />
          
        </div>
      </section>
    </div>
  ) : (
    <div className="h-screen w-screen flex justify-center text-center items-center text-4xl uppercase">
      <p>Loading...</p>
    </div>
  );
}
