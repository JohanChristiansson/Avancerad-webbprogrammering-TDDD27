'use client'
import { pusherClient } from '@/lib/pusher'
import { FC, useEffect, useState } from 'react'

interface MessagesProps {
    initialMessages: {
        text: string,
        id: string
    }[]
    lobbyId: string,
    players: {
        playername: string

    }[]
}

const Messages: FC<MessagesProps> = ({ lobbyId, initialMessages, players }) => {
    const [incomingMessages, setIncomingMessages] = useState<string[]>([])
    //Initial messages dont load correctly
    console.log(initialMessages, "initialMessages")
    console.log(incomingMessages, "incommingMsg")

    useEffect(() => {
        pusherClient.subscribe(lobbyId)

        pusherClient.bind('incoming-message', (text: string) => {
            setIncomingMessages((prev) => [...prev, text])
        })

        pusherClient.bind('player-joined', (text: string) => {
            setIncomingMessages((prev) => [...prev, text])
        })

        return () => {
            pusherClient.unsubscribe(lobbyId)
        }
    }, [lobbyId])
    console.log(incomingMessages, "incommingMessages")
    return (
        <div>
            {players.map((player) => (
                <p key={player.playername}>{player.playername + " has joined the lobby"}</p>
            ))}
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