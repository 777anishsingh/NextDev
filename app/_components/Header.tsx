"use client"
import { Button } from '@/components/ui/button'
import { SignInButton } from '@clerk/nextjs'
import { User } from '@clerk/nextjs/server'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { ThemeToggle } from "@/components/ThemeToggle";


const MenuOptions = [
    {
        name: 'Pricing',
        path: '/pricing'
    },

    {
        name: 'About Developer',
        path: '/about'
    }
]

function Header() {
    const { user } = useUser()
    return (
        <div className='flex items-center justify-between p-4 shadow'>

            {/*Logo */}
            <div className='flex gap-2 items-center'>
                <Image src={'/logo.svg'} alt='logo' width={30} height={30} />
                <h2 className='font-bold text-xl'>NextDev</h2>
            </div>


            {/*Menu Options */}
            <div className='flex gap-3'>
                {MenuOptions.map((menu, index) => (
                    <Link key={menu.path} href={menu.path}>
                        <Button variant={'ghost'} key={index}>
                            {menu.name}
                        </Button>
                    </Link>
                ))}
                <div className="flex items-center gap-2">
                    <ThemeToggle />
                </div>
            </div>



            {/* Get started Button */}
            <div>
                {!user ? <SignInButton mode='modal' forceRedirectUrl={'/workspace'}>
                    <Button>Get Started<ArrowRight /></Button>
                </SignInButton>
                    :
                    <Link href={'/workspace'}>
                        <Button>Get Started<ArrowRight /></Button>
                    </Link>
                }
            </div>
        </div>
    )
}

export default Header