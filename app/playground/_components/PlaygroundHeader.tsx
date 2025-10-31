import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const PlaygroundHeader = () => {
  return (
            <div className='flex shadow p-3 justify-between items-center'>
                <Image src={'/logo.svg'} alt='logo' width={30} height={30} />
                <Button>Save</Button>
            </div>
  )
}

export default PlaygroundHeader