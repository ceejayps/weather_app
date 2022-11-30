import { Moment } from 'moment'
import React from 'react'

type Props = {context: object, date:Moment}

function ForcastTile({}: Props) {
  return (
    <div className='h-[200px] w-[170px] bg-white flex-col flex justify-evenly items-center rounded-md' >
        <h3>Today</h3>
        <  img src="http://openweathermap.org/img/wn/10d@2x.png

" alt="" className='h-[50px] w-[50px]'/>
        <p>Humidity</p>
        <h3>30%</h3>
    </div>
  )
}

export default ForcastTile