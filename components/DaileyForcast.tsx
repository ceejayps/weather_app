import moment from 'moment'
import React from 'react'
import ForcastTile from './ForcastTile'

type Props = {
    context: object
}

const DaileyForcast = ({context}: Props) => {
  return (
    <div className=' w-full h-[200px] flex justify-evenly space-x-1 mt-20'>
        <ForcastTile context={context} date={moment().add(1,'days')}/>
        <ForcastTile context={context} date={moment().add(1,'days')}/>
        <ForcastTile context={context} date={moment().add(1,'days')}/>
        <ForcastTile context={context} date={moment().add(1,'days')}/>
    </div>
  )
}

export default DaileyForcast