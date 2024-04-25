'use client'
import '../globals.css';
import '../profile/profile.css'
import React, { useState, useEffect, useRef } from 'react';
import { LongButton, RestartButton, LoginButton } from '@/components/ui/button';
import { usePathname, useRouter } from '../../node_modules/next/navigation'


export default function page() {


    return(


    <main>
        <div className='backgroundPicture'>  {/*BACKGROUND GIF IN THE OUTERMOST DIV*/} 
            <div className='characterContainer'>
                <h1>PLAYERNAME</h1>
                <img src='https://i.postimg.cc/tCpRWb7j/pixelwizard-Gif-ezgif-com-gif-maker.gif'
                    style={{
                        width: '600px', // Set the desired width
                        height: '580px', // Maintain aspect ratio (or set specific height)
                    }} 
                 />
            </div>
            <div className='profileInfoContainer'></div>









        </div>
    </main>
    
    
    );
}