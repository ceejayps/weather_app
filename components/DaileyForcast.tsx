import React from 'react'
import ForcastTile from './ForcastTile'

type Props = {
    context: object
}

const DaileyForcast = ({context}: Props) => {
  return (
    <div className=' w-full h-[200px] flex justify-evenly space-x-1 mt-20'>
        <ForcastTile context={context}/>
        <ForcastTile context={context}/>
        <ForcastTile context={context}/>
        <ForcastTile context={context}/>
    </div>
  )
}

export default DaileyForcast