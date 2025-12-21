import { SidebarTrigger } from '@/components/ui/sidebar'
import { UserButton } from '@clerk/nextjs'
import React from 'react'
import { ThemeToggle } from "@/components/ThemeToggle";



const AppHeader = () => {
  return (
    <div className='flex items-center p-3 shadow justify-between'>
      <SidebarTrigger />
      <div className="flex items-center gap-2">
        <ThemeToggle />
      </div>
      <UserButton />
    </div>
  )
}

export default AppHeader