"use client"
import { Button } from '@/components/ui/button'
import { SignInButton, useUser } from '@clerk/nextjs'
import axios from 'axios'
import { ArrowUp, ArrowUpSquareIcon, HomeIcon, ImagePlus, Key, LayoutDashboard, Loader2, LoaderCircle, LucideLoader, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'
import { v4 as uuidv4 } from 'uuid'




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

const generateRandomFrameNumber = () => {
    const num = Math.floor(Math.random() * 10000)
    return num
}



const Hero = () => {


    const [userInput, setUserInput] = useState<string>()

    const user = useUser()

    const router = useRouter()

    const [loading, setLoading] = useState(false)

    const CreateNewProject = async () => {

        setLoading(true)
        const projectId = uuidv4()
        const frameId = generateRandomFrameNumber()
        const messages = [
            {
                role: 'user',
                content: userInput
            }
        ]

        try {
            const result = await axios.post('/api/projects', {
                projectId: projectId,
                frameId: frameId,
                messages: messages
            })
            console.log(result.data);
            toast.error('Project Created!')
            //Navigate to Playground
            router.push(`/playground/${projectId}?frameId=${frameId}`)
            setLoading(false)

        } catch (e) {
            toast.error('Internal Server Error! Try again later.')
            console.log(e);

        }
    }




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
                    {!user ? <SignInButton mode='modal' forceRedirectUrl={'/workspace'}>
                        <Button disabled={!userInput} className='border' variant={'ghost'} size={'icon'}> <ArrowUp /></Button>
                    </SignInButton>
                        :
                        <Button disabled={!userInput || loading} onClick={CreateNewProject} className='border' variant={'ghost'} size={'icon'}> {loading ? <Loader2 className='animate-spin' /> : <ArrowUp />} </Button>
                    }
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