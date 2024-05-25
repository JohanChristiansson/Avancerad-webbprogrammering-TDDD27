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
                const response = await axios.get(`/api/user/stats?username=${username}`);

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

    const avgWPMNumber = Number(avgWPM) || 0;
    const highestWPMNumber = Number(highestWPM) || 0;
    const avgAccuracyNumber = Number(avgAccuracy) || 0;

    return (
        <div>
            <div className='stats1'>
                <h1>Average WPM: {avgWPMNumber.toFixed(1)}</h1>
                <h1>Highest WPM: {highestWPMNumber.toFixed(1)}</h1>
                <h1>Times played: {timesPlayed}</h1>
                <h1>Average accuracy: {avgAccuracyNumber.toFixed(1)}</h1>
            </div>
            <div className='stats2'>
                <h1>Online wins: get_value</h1>
                <h1>Global ranking: get_value</h1>
            </div>
        </div>
    );
}
