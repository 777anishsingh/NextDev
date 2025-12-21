import { Button } from '@/components/ui/button'
import { onSaveContext } from '@/context/onSaveContext'
import Image from 'next/image'
import React, { useContext } from 'react'

const PlaygroundHeader = () => {

  const {onSaveData, setOnSaveData}=useContext(onSaveContext)

  return (
            <div className='flex shadow p-3 justify-between items-center'>
                <Image src={'/logo.svg'} alt='logo' width={30} height={30} />
                <Button
                onClick={()=>setOnSaveData(Date.now())}
                >Save</Button>
            </div>
  )
}

export default PlaygroundHeader