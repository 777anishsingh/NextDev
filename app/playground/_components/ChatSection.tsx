import React, { useEffect, useRef, useState } from 'react'
import { Messages } from '../[projectId]/page'
import { Button } from '@/components/ui/button'
import { ArrowUp, Ghost, Loader2, Loader2Icon } from 'lucide-react'

type Props = {
  messages: Messages[]
  onSend: any
  loading: boolean
}


const ChatSection = ({ messages, onSend, loading }: Props) => {

  const [input, setInput] = useState<string>()

  const messagesEndRef = useRef<HTMLDivElement>(null)

  // ✅ Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    if (!input?.trim()) return
    onSend(input)
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }


  return (
    <div className='w-xl border-b rounded-lg shadow h-[91vh] flex flex-col'>


      {/* message section */}
      <div className='flex-1 overflow-y-auto p-4 space-y-3 flex flex-col'>
        {messages.length === 0 ?
          (
            <p className='text-gray-400 text-center'>No Messages</p>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role == 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-2 rounded-lg max-w-[80%]
                  ${msg.role == 'user' ? 'bg-blue-300 text-black' : 'bg-gray-300 text-black'}`}>
                  {msg.content}
                </div>
              </div>
            ))
          )}
        {loading &&
          <div className='flex justify-center items-center p-4'>
            <div className='animate-spin'><Loader2 /></div>
            <span className='pl-2 text-zinc-800'>Thinking... Working on your request...</span>
          </div>
        }
        <div ref={messagesEndRef} />

      </div>

      {/* Footer Section */}

      <div className='p-4 border-t rounded-lg flex items-center gap-2'>
        <textarea value={input} placeholder='Describe your Website design idea'
          className='flex-1 resize-none border rounded-xl px-3 py-2 focus:outline-none focus:ring-2'
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <Button onClick={handleSend}
        > <ArrowUp /> </Button>
      </div>
    </div>
  )
}

export default ChatSection