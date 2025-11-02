"use client"
import React, { useEffect, useState } from 'react'
import PlaygroundHeader from '../_components/PlaygroundHeader'
import ChatSection from '../_components/ChatSection'
import WebsiteDesign from '../_components/WebsiteDesign'
import ElementSettingSection from '../_components/ElementSettingSection'
import { useParams, useSearchParams } from 'next/navigation'
import axios from 'axios'

export type Messages = {
    role: string,
    content: string
}

export type Frame = {
    projectId: string,
    frameId: string,
    designCode: string,
    chatMessages: Messages[]
}

const PlayGround = () => {
    const { projectId } = useParams()
    const params = useSearchParams()
    const frameId = params.get('frameId')
    const [frameDetail, setFrameDetail] = useState<Frame | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (!frameId || !projectId) return
        getFrameDetails()
    }, [frameId, projectId])

    const getFrameDetails = async () => {
        try {
            setIsLoading(true)
            const { data } = await axios.get('/api/frames', {
                params: { frameId, projectId }
            })
            setFrameDetail(data)
        } catch (error) {
            console.error('Error fetching frame details:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const SendMessage = (userInput: string) => {

    }


    if (isLoading) return <div>Loading...</div>
    return (
        <div>
            <PlaygroundHeader />
            <div className='flex'>
                <ChatSection messages={frameDetail?.chatMessages ?? []}
                    onSend={(input: string) => SendMessage(input)}
                />
                <WebsiteDesign />
            </div>
        </div>
    )
}

export default PlayGround