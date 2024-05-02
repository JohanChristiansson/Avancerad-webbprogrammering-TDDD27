'use client'
import { pusherClient } from '@/lib/pusher'
import { FC, useEffect, useState } from 'react'

interface MessagesProps {
    initialMessages: {
        text: string
        id: string
    }[]
    lobbyId: string
}

const Messages: FC<MessagesProps> = ({ lobbyId, initialMessages }) => {
    const [incomingMessages, setIncomingMessages] = useState<string[]>([])

    useEffect(() => {
        pusherClient.subscribe(lobbyId)
        pusherClient.subscribe("chat")

        pusherClient.bind('incoming-message', (text: string) => {
            setIncomingMessages((prev) => [...prev, text])
        })

        return () => {
            pusherClient.unsubscribe(lobbyId)
        }
    }, [setIncomingMessages, lobbyId])

    return (
        <div>
            {initialMessages.map((message) => (
                <p key={message.id}>{message.text}</p>
            ))}
            {incomingMessages.map((text, i) => (
                <p key={i}>{text}</p>
            ))}
        </div>
    )
}

export default Messages