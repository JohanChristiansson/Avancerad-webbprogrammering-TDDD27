'use client';

import React, { useEffect, useState } from 'react';

export default function ProfileHeader() {
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUsername = localStorage.getItem('user');
            setUsername(storedUsername);
        }
    }, []);

    return (
        <>
            <h1>{username}</h1>
            <img src='https://i.postimg.cc/tCpRWb7j/pixelwizard-Gif-ezgif-com-gif-maker.gif' alt="Character" />
        </>
    );
}