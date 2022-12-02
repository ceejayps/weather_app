import {
  CategoryScale,
  Chart as Chartjs,
  LinearScale,
  LineElement,
  PointElement,
} from "chart.js";
import moment, { max } from "moment";
import React from "react";
import { Line } from "react-chartjs-2";

Chartjs.register(CategoryScale, LinearScale, LineElement, PointElement);

type Props = {
  context: Apiresponse;
  colors:string[]
};

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


const SplineGraph = (props: Props) => {
   // console.log(props.colors)
  const consition = props.context.list
  // .filter((n) => moment(n.dt_txt).isSame(moment("2022-12-4"), "day");
  //console.log(consition.map((n)=> n.main.temp_min -273.15))

  const labels = consition.slice(0, 7).map((n) => moment(n.dt_txt).format("h:mma"));
  const min = Math.min(
    ...props.context.list.slice(0, 7).map((n) => n.main.temp_min - 273.15)
  );
  const max = Math.max(
    ...props.context.list.slice(0, 7).map((n) => n.main.temp_max - 273.15)
  );
  const min_index = [
    Math.min(...props.context.list.slice(0, 7).map((n) => n.main.temp_min - 273.15)) + 1,
    ...props.context.list.slice(0, 7).map((n) => n.main.temp - 273.15),
  ].indexOf(min);
  const max_index = [
    Math.min(...props.context.list.slice(0, 7).map((n) => n.main.temp_min - 273.15)) + 1,
    ...props.context.list.slice(0, 7).map((n) => n.main.temp - 273.15),
  ].indexOf(max);


  
  const data = {
    labels: [
      "",
      "12:00am",
      "3:00am",
      "6:00am",
      "9:00am",
      "12:00pm",
      "3:00pm",
      "6:00pm",
    ],
    datasets: [
      {
        data: [
            props.context.list.slice(0, 7).map((n) => n.main.temp - 273.15)[0]-1,
          ...props.context.list.slice(0, 7).map((n) => n.main.temp - 273.15),
        ],
        backgroundColor: "transparent",
        borderColor: ["blue", "red"],
        pointBorderColor: props.colors,
        pointBorderWidth: 6,
        tension: 0.5,
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
    scaleShowLabels: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        border: { display: false },
        gridLines: {
          drawBorder: false,
        },
        grid: { display: false },
        ticks: {
          display: false, //this will remove only the label
        },
      },
      y: {
        min: Math.min(
          ...props.context.list.slice(0, 7).map((n) => n.main.temp_min - 273.15)
        )-2,
        max: Math.max(
          ...props.context.list.slice(0, 7).map((n) => n.main.temp_max - 273.15)
        ) + 2,
        border: { display: false },
        grid: { display: false },
        ticks: {
          display: false, //this will remove only the label
        },
      },
    },
  };
  return(
    <div className=" lg:w-[100%] lg:max-w-[80%]  h-[200px] flex justify-start items-start flex-col relative ">
      <p className=" text-3xl text-white font-light">Temperature</p>
      <h4 className="text-3xl text-white font-light absolute top-14 left-40">
        72°
      </h4>
      <Line data={data} options={options} />
    </div>
  )
};

export default SplineGraph;
