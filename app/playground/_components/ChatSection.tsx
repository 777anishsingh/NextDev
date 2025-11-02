import React, { useState } from 'react'
import { Messages } from '../[projectId]/page'
import { Button } from '@/components/ui/button'
import { ArrowUp } from 'lucide-react'

type Props = {
  messages: Messages[]
  onSend: any
}


const ChatSection = ({ messages, onSend }: Props) => {

  const [input, setInput] = useState<string>()

  const handleSend=()=>{
    if(!input?.trim()) return 
    onSend(input)
    setInput('')
  }




  return (
    <div className='w-93 border-b rounded-lg shadow h-[91vh] flex flex-col'>
      {/* message section */}
      <div className='flex-1 overflow-y-auto p-4 space-y-3 flex flex-col'>
        {messages.length === 0 ?
          (
            <p className='text-gray-400 text-center'>No Messages</p>
          ) : (
            messages.map((msg, index) => (
              <div key='index' className={`flex ${msg.role == 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-2 rounded-lg max-w-[80%]
                  ${msg.role == 'user' ? 'bg-blue-200 text-black' : 'bg-gray-400 text-black'}`}>
                  {msg.content}
                </div>
              </div>
            ))
          )}
      </div>

      {/* Footer Section */}

      <div className='p-4 border-t rounded-lg flex items-center gap-2'>
        <textarea defaultValue={input} placeholder='Describe your Website design idea'
          className='flex-1 resize-none border rounded-xl px-3 py-2 focus:outline-none focus:ring-2'
          onChange={(e) => setInput(e.target.value)}
        />

        <Button variant={'default'}><ArrowUp /></Button>
      </div>





    </div>
  )
}

export default ChatSection