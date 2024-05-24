// import '../globals.css';
// import '../profile/profile.css';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios'; // Import Axios
// //import { useRouter } from 'next/router';

// export default function Page() {
//     const [avgWPM, setAvgWPM] = useState(0);
//     const [highestWPM, setHighestWPM] = useState(0);
//     const [timesPlayed, setTimesPlayed] = useState(0);
//     const [avgAccuracy, setAvgAccuracy] = useState(0);
//     //const router = useRouter();

//     // const handleHomeButtonClick = (event) => {
//     //     event.preventDefault();
//     //     router.replace('/');
//     // };

//     useEffect(() => {
//         const fetchUserInfo = async () => {
//             const username = localStorage.user;

//             try {
//                 // Use Axios to make the HTTP request
//                 const response = await axios.post('/api/user/stats', { username: username })

//                 if (response.status === 200) {
//                     const data = response.data;

//                     setAvgWPM(data.averageWPM);
//                     setHighestWPM(data.highestWPM);
//                     setTimesPlayed(data.gamesPlayed);
//                     setAvgAccuracy(data.averageWords);
//                 } else {
//                     console.error('Failed to fetch user information');
//                 }
//             } catch (error) {
//                 console.error('Error fetching user information:', error);
//             }
//         };

//         fetchUserInfo();
//     }, []);

//     return (


//         <main>
//             <div className='backgroundPicture'>  {/*BACKGROUND GIF IN THE OUTERMOST DIV*/}

//                 <div className="logo-container">
//                     {/* <a href="#" onClick={handleHomeButtonClick}> */}
//                     <img src="https://i.postimg.cc/BnbJtyFJ/SignLogo.png"
//                         style={{}} />
//                     {/* </a> */}
//                 </div>

//                 <div className='characterContainer'>
//                     <h1>{localStorage.getItem("")}</h1>
//                     <img src='https://i.postimg.cc/tCpRWb7j/pixelwizard-Gif-ezgif-com-gif-maker.gif'
//                         style={{}}
//                     />
//                 </div>

//                 <div className='profileInfoContainer'>
//                     <div className='profileInfoHeader'>
//                         <h1>Your Profile</h1>
//                     </div>
//                     <div className='stats1'>
//                         <h1>-Average WPM: {avgWPM}</h1>
//                         <h1>-Highest WPM: {highestWPM}</h1>
//                         <h1>-Times played: {timesPlayed}</h1>
//                         <h1>-Average accuracy: {avgAccuracy}</h1>
//                     </div>
//                     <div className='stats2'>
//                         <h1>-Online wins: get_value</h1>
//                         <h1>-Online matches played: get_value</h1>
//                         <h1>-Most played opponent: get_value</h1>
//                         <h1>-Global ranking: get_value</h1>
//                     </div>


//                 </div>
//             </div>
//         </main>


//     );
// }



import '../globals.css';
import './profile.css';
import ProfileStats from '../../components/profile/stats';
import ProfileHeader from '../../components/profile/header';
import {HomeButton} from '../../components/ui/tmpButton';

interface InitialData {
    avgWPM: number;
    highestWPM: number;
    timesPlayed: number;
    avgAccuracy: number;
}

export default async function Page() {
    const initialData: InitialData = {
        avgWPM: 0,
        highestWPM: 0,
        timesPlayed: 0,
        avgAccuracy: 0,
    };

    return (
        <main>
            <div className='backgroundPicture'>
            <div className='home-button'>
                    <HomeButton
                        disabled={false}
                        imgSrc="https://i.postimg.cc/BnbJtyFJ/SignLogo.png"
                        style={{}} //Must set size to be visible
                    >
                    </HomeButton>
                </div>
                <div className='characterContainer'>
                    <ProfileHeader />
                </div>
                <div className='profileInfoContainer'>
                    <div className='profileInfoHeader'>
                        <h1>Your Profile</h1>
                    </div>
                    <ProfileStats initialData={initialData} />
                </div>
            </div>
        </main>
    );
}
