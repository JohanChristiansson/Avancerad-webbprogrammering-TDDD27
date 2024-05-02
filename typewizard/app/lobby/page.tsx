"use client"

import '../globals.css';
import '../profilePage/profilepage.css'
import React, { useState, useEffect, useRef } from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

export default function Page() {
    const [socket, setSocket] = useState<any>(undefined)
    const [inbox, setInbox] = useState<string[]>([])
    const [message, setMessage] = useState("")
    const [roomName, setRoomName] = useState("")


    return (
        <div className="flex flex-col gap-5 mt-20 px-10 lg:px-48">
            <div className="flex flex-col gap-2 border rounded-lg p-10">
                {inbox.map((message: string, index: number) => (
                    <div key={index} className='border rounded px-4 py-2'>{message}</div>
                ))}
            </div>

            <div className='flex gap-2 align-center justify center'>
                <input onChange={(e) => {
                    setMessage(e.target.value)
                }} type="text" name='message' className='border rounded px-4 py-2' />
                <button className='w-40'> Send message </button>
            </div>
            <div className='flex gap-2 align-center justify center'>
                <input onChange={(e) => {
                    setRoomName(e.target.value)
                }} type="text" name='room' className='flex-1 border-black rounded px-2 py-1' />
                <button className='w-40'> Join Room </button>
            </div>
        </div>

    );
};
