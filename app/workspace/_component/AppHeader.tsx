import { SidebarTrigger } from '@/components/ui/sidebar'
import { UserButton } from '@clerk/nextjs'
import React from 'react'

const AppHeader = () => {
  return (
    <div className='flex items-center p-3 shadow justify-between'>
        <SidebarTrigger/> 
        <UserButton/>
    </div>
  )
}

export default AppHeader