'use client'
import '../globals.css';
import '../profilePage/profilepage.css'
import React, { useState, useEffect, useRef } from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"


export default function Page() {


    return (
        <main>
            <div className='backgroundPicture'>  {/*BACKGROUND GIF IN THE OUTERMOST DIV*/}
                <div className='textBox '>
                    <div className="test">
                        <div className="absolute left-20 top-50">
                            <Carousel>
                                <CarouselContent>
                                    <CarouselItem>Väldigt svår text</CarouselItem>
                                    <CarouselItem>Very hard english text </CarouselItem>
                                    <CarouselItem>GOT fanfic</CarouselItem>
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        </div>
                    </div>
                </div>
                <div className="logo-container">
                    <img src="https://i.postimg.cc/BnbJtyFJ/SignLogo.png"
                        style={{ width: '400px', height: '400px' }} />
                </div>
                <div className='playerContainer'>

                    <div className='player1'>
                        <h1>PlayerName</h1>
                        <img
                            src='https://i.postimg.cc/tCpRWb7j/pixelwizard-Gif-ezgif-com-gif-maker.gif' />

                    </div>
                    <div className='player2'>
                        <h1>PlayerName</h1>
                        <img
                            src='https://i.postimg.cc/DfgQq25Q/Wizard-Player2-ezgif-com-gif-maker-1.gif' />
                    </div>
                    <div className='player3'>
                        <h1>PlayerName</h1>
                        <img
                            src='https://i.postimg.cc/tCpRWb7j/pixelwizard-Gif-ezgif-com-gif-maker.gif' />
                    </div>
                    <div className='player4'>
                        <h1>PlayerName</h1>
                        <img
                            src='https://i.postimg.cc/tCpRWb7j/pixelwizard-Gif-ezgif-com-gif-maker.gif' />
                    </div>

                </div>

            </div>
        </main >
    );
}