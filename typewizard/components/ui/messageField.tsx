'use client'

import axios from 'axios'
import { FC } from 'react'

interface MessageFieldProps {
  lobbyId: string
}

const MessageField: FC<MessageFieldProps> = ({ lobbyId }) => {
  let input = ''

  const sendMessage = async (text: string) => {
    console.log(text, "text")
    console.log("strax innan api anrop", lobbyId)
    await axios.post('/api/message', { text, lobbyId })
  }

  return (
    <div className='flex gap-2'>
      type a new message:
      <input
        onChange={({ target }) => (input = target.value)}
        className='border border-zinc-300'
        type='text'
      />
      <button onClick={() => sendMessage(input || '')}>send</button>
    </div>
  )
}

export default MessageField