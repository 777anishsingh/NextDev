"use client"
import { Button } from '@/components/ui/button'
import { SignInButton } from '@clerk/nextjs'
import { ArrowUp, ArrowUpSquareIcon, HomeIcon, ImagePlus, Key, LayoutDashboard, User } from 'lucide-react'
import React, { useState } from 'react'




const suggestion = [
    {
        label: 'Dashboard',
        prompt: 'Create an analytics dashboard to track customers and revenue data for a SaaS',
        icon: LayoutDashboard
    },
    {
        label: 'SignUp Form',
        prompt: 'Create a modern sign up form with email/password fields, Google and Github login options, and terms checkbox',
        icon: Key
    },
    {
        label: 'Hero',
        prompt: 'Create a modern header and centered hero section for a productivity SaaS. Include a badge for feature announcement, a title with a subtle gradient effect, subtitle, CTA, small social proof and an image.',
        icon: HomeIcon
    },
    {
        label: 'User Profile Card',
        prompt: 'Create a modern user profile card component for a social media website',
        icon: User
    }
]






const Hero = () => {


    const [userInput, setUserInput] = useState<string>()


    return (
        <div className='flex flex-col items-center h-[80vh] justify-center'>
            {/* Header & Description */}
            <h2 className='font-bold text-6xl'>What should we design</h2>
            <p className='mt-2 text-xl text-grey-500'>Generate, Edit and Explore designs with AI, Export code as well</p>



            {/* input box */}

            <div className='w-full max-w-2xl p-5 border mt-5 rounded-2xl'>
                <textarea placeholder='Describe your page design'

                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}

                    className='w-full h-24 focus:outline-none focus:ring-0 resize-none'
                />
                <div className='flex justify-between'>
                    <Button className='border' variant={'ghost'} size={'icon'}> <ImagePlus /></Button>
                    <SignInButton mode='modal' forceRedirectUrl={'/workspace'}>
                        <Button disabled={!userInput} className='border' variant={'ghost'} size={'icon'}> <ArrowUp /></Button>
                    </SignInButton>
                </div>
            </div>




            {/* suggestion list */}
            <div className='mt-4 flex gap-5'>
                {suggestion.map((sugg, index) => (
                    <Button key={index} variant={'outline'} onClick={() => setUserInput(sugg.prompt)}>
                        <sugg.icon />
                        {sugg.label}
                    </Button>
                ))}
            </div>




        </div>
    )
}

export default Hero