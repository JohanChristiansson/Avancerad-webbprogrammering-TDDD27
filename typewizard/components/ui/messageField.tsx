'use client'

import axios from 'axios'
import { FC, useState } from 'react'

interface MessageFieldProps {
  lobbyId: string,
  name: string
}

const MessageField: FC<MessageFieldProps> = ({ lobbyId, name }) => {
  const [input, setInput] = useState('')

  const sendMessage = async (text: string) => {
    if (text.trim() === '') return // Prevent sending empty messages
    console.log(text, "text")
    console.log("strax innan api anrop", lobbyId)
    text = name + ": " + text
    await axios.post('/api/message', { text, lobbyId })
    setInput('') // Clear the input field after sending the message
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      sendMessage(input)
    }
  }

  return (
    <div className='flex gap-2'>
      <input
        value={input}
        onChange={({ target }) => setInput(target.value)}
        onKeyDown={handleKeyDown}
        className='border border-amber-300 bg-amber-200/50'
        type='text'
      />
      <button onClick={() => sendMessage(input)}>send</button>
    </div>
  )
}

export default MessageField