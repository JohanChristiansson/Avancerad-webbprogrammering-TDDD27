'use client'
import '../globals.css';
import '../profile/profile.css'
import React, { useState, useEffect, useRef, useContext } from 'react';
import { LongButton, RestartButton, LoginButton } from '@/components/ui/button';
import { usePathname, useRouter } from '../../node_modules/next/navigation'
import {User, currentUser} from '../dbConnection/context'


export default function Page() {

    const [avgWPM, setAvgWPM] = useState(0);
    const [highestWPM, setHighestWPM] = useState(0);
    const [timesPlayed, setTimesPlayed] = useState(0);
    const [avgAccuracy, setAvgAccuracy] = useState(0);
    const router = useRouter();



    const handleHomeButtonClick = (event: React.MouseEvent<HTMLAnchorElement>): void => {
        event.preventDefault();
        router.replace('/');
      }

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

            <div className="logo-container">
                <a href="#" onClick={handleHomeButtonClick}>
                    <img src="https://i.postimg.cc/BnbJtyFJ/SignLogo.png"
                        style={{}} />
                </a>
            </div>

                <div className='characterContainer'>
                    <h1>{currentUser.username}</h1>
                    <img src='https://i.postimg.cc/tCpRWb7j/pixelwizard-Gif-ezgif-com-gif-maker.gif'
                        style={{}} 
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