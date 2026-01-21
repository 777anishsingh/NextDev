"use client"
import React, { useEffect, useState } from 'react'
import PlaygroundHeader from '../_components/PlaygroundHeader'
import ChatSection from '../_components/ChatSection'
import WebsiteDesign from '../_components/WebsiteDesign'
import ElementSettingSection from '../_components/ElementSettingSection'
import { useParams, useSearchParams } from 'next/navigation'
import axios from 'axios'
import { previousDay } from 'date-fns'
import { toast } from 'sonner'



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

const prompt = ``

const PlayGround = () => {
    const { projectId } = useParams()
    const params = useSearchParams()
    const frameId = params.get('frameId')
    // console.log(frameId);

    const [frameDetail, setFrameDetail] = useState<Frame>()
    const [isLoading, setIsLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [messages, setMessages] = useState<Messages[]>([])
    const [generatedCode, setGeneratedCode] = useState<any>('')

    useEffect(() => {
        frameId && getFrameDetails()
    }, [frameId])

    const getFrameDetails = async () => {
        const result = await axios.get(
            `/api/frames?frameId=${frameId}&projectId=${projectId}`
        );

        setFrameDetail(result.data);

        const designCode = result.data?.designCode;

        if (!designCode || typeof designCode !== "string") {
            setGeneratedCode("");
        } else {
            const fence = "```html";
            const fenceIndex = designCode.toLowerCase().indexOf(fence);

            const formattedCode =
                fenceIndex !== -1
                    ? designCode.slice(fenceIndex + fence.length)
                    : designCode;

            setGeneratedCode(formattedCode);
        }

        if (result.data?.chatMessages?.length === 1) {
            SendMessage(result.data.chatMessages[0].content);
        } else {
            setMessages(result.data?.chatMessages ?? []);
        }
    };


    const Prompt = `userInput: {userInput}

                    Instructions:

                    - If the user input is explicitly asking to generate code, design, or HTML/CSS/JS output and the output should always start with <Html> and close with </html> (e.g., "Create a landing page", "Build a dashboard", "Generate HTML Tailwind CSS code"), then:
                    - Do not add any extra text before or after the HTML code other than the code itself.
                    - Only provide the user with code and not any other text or context when asked for code
                    - Generate a complete HTML Tailwind CSS code using Flowbite UI components.  
                    - Use a modern design with **blue as the primary color theme**.  
                    - Only include the <body> content (do not add <head> or <title>). 
                    - Always include a toggle for dark and light mode on the header with sun being the symbol of light mode and moon is for dark mode section with light mode on by default with full working functionality
                    - Make it fully responsive for all screen sizes  
                    - All primary components must match the theme color.  
                    - Add proper padding and margin for each element.  
                    - Components should be independent; do not connect them.  
                    
                    - Use placeholders for all images:  
                        - Light mode: https://community.softr.io/uploads/db9110/original/2X/7/74e6e7e382d0ff5d7773ca9a87e6f6f8817a68a6.jpeg
                        - Dark mode: https://www.cibaky.com/wp-content/uploads/2015/12/placeholder-3.jpg
                        - Add alt tag describing the image prompt.  
                    - Use the following libraries/components where appropriate:  
                        - FontAwesome icons (fa fa-)  
                        - Flowbite UI components: buttons, modals, forms, tables, tabs, alerts, cards, dialogs, dropdowns, accordions, etc.  
                        - Chart.js for charts & graphs if applicable  
                        - Swiper.js for sliders/carousels  
                        - Tippy.js for tooltips & popovers  
                    - Include interactive components like modals, dropdowns, and accordions.  
                    - Ensure proper spacing, alignment, hierarchy, and theme consistency.  
                    - Ensure charts are visually appealing and match the theme color.  
                    - Header menu options should be spread out and not connected.  
                    - Do not include broken links.  
  

                    2. If the user input is **general text or greetings** (e.g., "Hi", "Hello", "How are you?") **or does not explicitly ask to generate code**, then:

                    - Respond with a simple, friendly text message instead of generating any code.  

                    Example:

                    - User: "Hi" → Response: "Hello! How can I help you today?"  
                    - User: "Build a responsive landing page with Tailwind CSS" → Response: [Generate full HTML code as per instructions above]`




    const SendMessage = async (userInput: string) => {
        setLoading(true)
        setGeneratedCode('') // reset previous code

        // add user message to chat
        setMessages((prev: any) => [
            ...prev,
            { role: 'user', content: userInput }
        ])

        const result = await fetch('/api/ai-model', {
            method: 'POST',
            body: JSON.stringify({
                messages: [{ role: 'user', content: Prompt?.replace('{userInput}', userInput) }]
            })
        })

        const reader = result?.body?.getReader()
        const decoder = new TextDecoder();

        let aiResponse = '';
        let nonCodeResponse = '';
        let isCode = false;

        while (true) {
            // @ts-ignore
            const { done, value } = await reader?.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            aiResponse += chunk;

            if (!isCode) {
                // detect code fences or HTML output broadly
                const lower = aiResponse.toLowerCase();
                const fenceIndex = aiResponse.indexOf('```');
                const htmlIndex = lower.indexOf('<!doctype');
                const htmlTagIndex = lower.indexOf('<html');
                const bodyIndex = lower.indexOf('<body');
                const ElementIndex = lower.indexOf('<div');

                const codeMarkerIndices = [fenceIndex, htmlIndex, htmlTagIndex, ElementIndex, bodyIndex].filter(i => i >= 0);
                if (codeMarkerIndices.length > 0) {
                    isCode = true;
                    const splitIndex = Math.min(...codeMarkerIndices);

                    // accumulate any non-code text that appeared before code started
                    nonCodeResponse += aiResponse.slice(0, splitIndex);

                    // determine where actual code content starts (skip backticks if present)
                    let codeStart = splitIndex;
                    if (fenceIndex === splitIndex) {
                        // skip ``` or ```html
                        if (aiResponse.slice(fenceIndex, fenceIndex + 7).toLowerCase().startsWith('```html')) {
                            codeStart = fenceIndex + 7;
                        } else {
                            codeStart = fenceIndex + 3;
                        }
                    }

                    const initialCodeChunk = aiResponse.slice(codeStart);
                    setGeneratedCode((prev: any) => prev + initialCodeChunk);
                } else {
                    // still plain text
                    nonCodeResponse += chunk;
                }
            } else {
                // already in code, append streaming chunk to generatedCode
                setGeneratedCode((prev: any) => prev + chunk);
            }
        }



        // after streaming ends - only push non-code assistant text
        if (!isCode) {
            setMessages((prev: any) => [
                ...prev,
                {
                    role: 'assistant',
                    content: nonCodeResponse
                }
            ]);
        } else {
            setMessages((prev: any) => [
                ...prev,

                {
                    role: 'assistant',
                    content: 'Your Code is ready'
                }

            ]);
            await saveGeneratedCode(aiResponse)
        }


        setLoading(false)
    }

    useEffect(() => {
        if (messages.length > 0) {
            saveMessages();
        }

    }, [messages])

    const saveMessages = async () => {
        const result = await axios.put('/api/chats', {
            messages,
            frameId
        })

        console.log(result);
    }


    const saveGeneratedCode = async (code?: string) => {
        const result = await axios.put('/api/frames', {
            designCode: code,
            frameId: frameId,
            projectId: projectId
        })
        console.log(result.data);
        toast.success("Website is Ready!")
    }


    if (isLoading) return <div>Loading...</div>
    return (
        <div>
            <PlaygroundHeader />
            <div className='flex'>
                {/* Chat Section */}
                <ChatSection messages={messages ?? []}
                    onSend={(input: string) => SendMessage(input)}
                    loading={loading}
                />
                {/* Website Design */}
                <WebsiteDesign generatedCode={(generatedCode || "").replace(/```/g, "")} />

            </div>
        </div>
    )
}

export default PlayGround