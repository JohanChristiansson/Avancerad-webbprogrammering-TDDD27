'use client'
import '../globals.css';
import '../profile/profile.css'
import React, { useState, useEffect, useRef, useContext } from 'react';
import { LongButton, RestartButton, LoginButton } from '@/components/ui/button';
import { usePathname, useRouter } from '../../node_modules/next/navigation'
import {User} from '../dbConnection/context'
import { currentUser } from '../page';


export default function page() {

    const [avgWPM, setAvgWPM] = useState(0);
    const [highestWPM, setHighestWPM] = useState(0);
    const [timesPlayed, setTimesPlayed] = useState(0);
    const [avgAccuracy, setAvgAccuracy] = useState(0);
/*
    // Fetch user statistics when the component mounts
useEffect(() => {
    // Function to fetch user's average WPM
    const fetchUserProfile = async () => {
        // Assume `username` is available in your application's state or context
        const username = currentUser.username; // Replace 'someUsername' with your actual username retrieval logic

        try {
            // Pass the username as a query parameter in the URL
            const response = await fetch(`http://localhost:5000/get_avgWPM?username=${username}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                // Update state variables with the fetched data
                setAvgWPM(data.avg_wpm);
                // Here, you would fetch and set other stats (highestWPM, timesPlayed, avgAccuracy) as well
            } else {
                console.error('Failed to fetch user profile data');
            }
        } catch (error) {
            console.error('Error fetching user profile data:', error);
        }
    };

    // Call the function to fetch user statistics
    fetchUserProfile();
}, []); // Empty dependency array to run the effect only once on mount
*/
useEffect(() => {
    // Function to fetch all user information
    const fetchUserInfo = async () => {
        // Assume `username` is available in your application's state or context
        const username = currentUser.username; 

        try {
            // Pass the username as a query parameter in the URL
            const response = await fetch(`http://localhost:5000/get_user_info?username=${username}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Check if the response was successful
            if (response.ok) {
                const data = await response.json();
                
                setAvgWPM(data.avg_wpm);
                setHighestWPM(data.highest_wpm);
                setTimesPlayed(data.times_played);
                setAvgAccuracy(data.avg_accuracy);
                
            } else {
                console.error('Failed to fetch user information');
            }
        } catch (error) {
            console.error('Error fetching user information:', error);
        }
    };

    fetchUserInfo();
}, []); // Empty dependency array to run the effect only once on mount
    
    return(


    <main>
        <div className='backgroundPicture'>  {/*BACKGROUND GIF IN THE OUTERMOST DIV*/} 
            <div className='characterContainer'>
                <h1>{currentUser.username}</h1>
                <img src='https://i.postimg.cc/tCpRWb7j/pixelwizard-Gif-ezgif-com-gif-maker.gif'
                    style={{
                        width: '600px', // Set the desired width
                        height: '580px', // Maintain aspect ratio (or set specific height)
                    }} 
                 />
            </div>
            <div className='profileInfoContainer'>
                <div className='profileInfoHeader'>
                    <h1>Your Profile</h1>
                </div>
                <div className='stats1'>
                    <h1>-Average WPM: {avgWPM}</h1>
                    <h1>-Highest WPM: {highestWPM}</h1>
                    <h1>-Times played: {timesPlayed}</h1>
                    <h1>-Average accuracy: {avgAccuracy}</h1>
                </div>
                <div className='stats2'>
                    <h1>-Online wins: get_value</h1>
                    <h1>-Online matches played: get_value</h1>
                    <h1>-Most played opponent: get_value</h1>
                    <h1>-Global ranking: get_value</h1>
                </div>


            </div>









        </div>
    </main>
    
    
    );
}