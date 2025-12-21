import { Button } from '@/components/ui/button'
import { onSaveContext } from '@/context/onSaveContext'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from 'react'
import { ThemeToggle } from "@/components/ThemeToggle";


const PlaygroundHeader = () => {

  const { onSaveData, setOnSaveData } = useContext(onSaveContext)

  return (
    <div className='flex shadow p-3 justify-between items-center'>
      <Link href={'/workspace'}>
        <Image src={'/logo.svg'} alt='logo' width={30} height={30} />
      </Link>
      <div className="flex items-center gap-2">
        <ThemeToggle />
      </div>
      <Button
        onClick={() => setOnSaveData(Date.now())}
      >Save</Button>
    </div>
  )
}

export default PlaygroundHeader