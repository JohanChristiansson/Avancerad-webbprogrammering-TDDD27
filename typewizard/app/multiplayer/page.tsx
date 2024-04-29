'use client'
import '../globals.css';
import '../multiplayer/multiplayer.css'
import React, { useState, useEffect, useRef, useContext } from 'react';
import { LongButton, RestartButton, LoginButton } from '@/components/ui/button';
import { usePathname, useRouter } from '../../node_modules/next/navigation'
import {User, currentUser} from '../dbConnection/context'

export default function Page() {

    const router = useRouter();

    const handleHomeButtonClick = (event: React.MouseEvent<HTMLAnchorElement>): void => {
        event.preventDefault();
        router.replace('/');
      }

    return (
        <main>
            <div className='backgroundPicture'>  {/*BACKGROUND GIF IN THE OUTERMOST DIV*/} 

            <div className="logo-container">
                <a href="#" onClick={handleHomeButtonClick}>
                    <img src="https://i.postimg.cc/BnbJtyFJ/SignLogo.png"
                        style={{ width: '380px', height: '380px' }} />
                </a>
            </div>

            <div className='progressionContainer'>
                <div className='lanePlayer1'>
                <img src='https://i.postimg.cc/hj6mpxvv/fxk5t8kqsbp81-ezgif-com-reverse.gif'
                        style={{ }} 
                        />
                    <div className='playerGround'></div>
                </div>
                <div className='lanePlayer2'>
                <img src='https://i.postimg.cc/SxRyNPD0/1-m-UYZp-Tpdf-HXKNwc-Ozw2-Jh-A.gif'
                        style={{ }} 
                        />
                    <div className='playerGround'></div>
                </div>
                <div className='lanePlayer3'>
                <img src='https://i.postimg.cc/YS12JWdj/9f40ba06dc0476ff84170bba2bed69a0-ezgif-com-crop.gif'
                        style={{ }} 
                        />
                    <div className='playerGround'></div>
                </div>
                <div className='lanePlayer4'>
                
                <img src='https://i.postimg.cc/rz2FZzQT/output-onlinegiftools-ezgif-com-gif-maker.gif'
                        style={{ }} 
                        />
                    <div className='playerGround'></div>
                </div>
            </div>
            <div className='wordBoxBackgroundMultiPlayer'></div>







            </div>
        </main>

    );
}