// components/ProfileStats.tsx
'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface ProfileStatsProps {
    initialData: {
        avgWPM: number;
        highestWPM: number;
        timesPlayed: number;
        avgAccuracy: number;
    };
}

export default function ProfileStats({ initialData }: ProfileStatsProps) {
    const [avgWPM, setAvgWPM] = useState(initialData.avgWPM);
    const [highestWPM, setHighestWPM] = useState(initialData.highestWPM);
    const [timesPlayed, setTimesPlayed] = useState(initialData.timesPlayed);
    const [avgAccuracy, setAvgAccuracy] = useState(initialData.avgAccuracy);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const username = localStorage.getItem('user');

            try {
                const response = await axios.post('/api/user/stats', { username });

                if (response.status === 200) {
                    const data = response.data;
                    setAvgWPM(data.averageWPM);
                    setHighestWPM(data.highestWPM);
                    setTimesPlayed(data.gamesPlayed);
                    setAvgAccuracy(data.averageWords);
                } else {
                    console.error('Failed to fetch user information');
                }
            } catch (error) {
                console.error('Error fetching user information:', error);
            }
        };

        fetchUserInfo();
    }, []);

    return (
        <div>
            <div className='stats1'>
                <h1>Average WPM: {avgWPM}</h1>
                <h1>Highest WPM: {highestWPM}</h1>
                <h1>Times played: {timesPlayed}</h1>
                <h1>Average accuracy: {avgAccuracy}</h1>
            </div>
            <div className='stats2'>
                <h1>Online wins: get_value</h1>
                <h1>Online matches played: get_value</h1>
                <h1>Most played opponent: get_value</h1>
                <h1>Global ranking: get_value</h1>
            </div>
        </div>
    );
}
