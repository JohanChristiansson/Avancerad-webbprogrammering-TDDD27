"use client"
import React, { useState } from 'react';
import { usePathname, redirect, useRouter } from 'next/navigation'

interface ButtonProps {
    // Content inside the button
    children?: React.ReactNode;

    //? means parameter is optional
    style?: React.CSSProperties;


    disabled?: boolean;


    imgSrc?: string;
    imgSrc2?: string;
    lobbyId?: string;
}

export const LongButton: React.FC<ButtonProps> = ({ children, style, disabled, imgSrc, imgSrc2, lobbyId }) => {

    const ButtonLeft = 16;
    const ButtonTop = 22;

    const [imgPosition, setImgPosition] = useState({
        top: ButtonTop,
        left: ButtonLeft,
    });

    // Define handlePress function
    const router = useRouter();
    const handlePress = () => {
        // Update state to adjust the position of the inner button
        setImgPosition({
            top: ButtonTop + 2,
            left: ButtonLeft + 1,
        });

        // Reset position after a short delay
        setTimeout(() => {
            setImgPosition({
                top: ButtonTop,
                left: ButtonLeft,
            });
        }, 100);
    };
    const onClick = async () => {
        console.log(lobbyId, "lobby id in tmpbutton")
        router.push(`/multiplayer/${lobbyId}`)
    };
    // Handle button click
    const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (onClick) onClick();
        if (handlePress) handlePress();
    };



    return (
        <button
            onClick={handleButtonClick}
            style={{ ...style, position: 'relative' }} // Positioning is important
            disabled={disabled}

        >
            {/* Display background/border image if provided */}
            {imgSrc && (
                <img
                    src={imgSrc}
                    alt="Button background/border image"
                    style={{
                        width: '100%', // Make it the full size of the button
                        height: '100%', // Make it the full size of the button
                        position: 'absolute', // Position it absolutely within the button
                        top: 0,
                        left: 0,
                        zIndex: 5, // This image should be the first layer
                    }}
                />
            )}

            {/* Display button image if provided */}
            {imgSrc2 && (
                <img
                    src={imgSrc2}
                    alt="Button image"
                    style={{
                        width: '85%', // Adjust size as needed
                        height: '62%', // Adjust size as needed
                        position: 'absolute', // Position it absolutely within the button
                        top: imgPosition.top, // Adjust position as needed
                        left: imgPosition.left, // Adjust position as needed
                        zIndex: 6, // This image should be on top
                    }}
                />
            )}


            {children}
        </button>
    );
};

export const HomeButton: React.FC<ButtonProps> = ({ children, style, disabled, imgSrc, imgSrc2, lobbyId }) => { 
    const ButtonLeft = 0;
    const ButtonTop = 0;

    const [imgPosition, setImgPosition] = useState({
        top: ButtonTop,
        left: ButtonLeft,
    });

    const router = useRouter();
    const handlePress = () => {
        // Update state to adjust the position of the inner button
        setImgPosition({
            top: ButtonTop + 2,
            left: ButtonLeft + 1,
        });

        // Reset position after a short delay
        setTimeout(() => {
            setImgPosition({
                top: ButtonTop,
                left: ButtonLeft,
            });
        }, 100);
    };
    const onClick = async () => {
        router.push(`/`)
    };
    // Handle button click
    const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (onClick) onClick();
        if (handlePress) handlePress();
    };
    return(
<button
            onClick={handleButtonClick}
            style={{ ...style, position: 'relative' }} // Positioning is important
            disabled={disabled}

        >
            {/* Display background/border image if provided */}
            {imgSrc && (
                <img
                    src={imgSrc}
                    alt="Button background/border image"
                    style={{
                        width: '87%', // Make it the full size of the button
                        height: '87%', // Make it the full size of the button
                        top: '-30%',
                        zIndex: 8, // This image should be the first layer
                    }}
                />
            )}

            {/* Display button image if provided */}
            {imgSrc2 && (
                <img
                    src={imgSrc2}
                    alt="Button image"
                    style={{
                        width: '85%', // Adjust size as needed
                        height: '62%', // Adjust size as needed
                        position: 'absolute', // Position it absolutely within the button
                        top: imgPosition.top, // Adjust position as needed
                        left: imgPosition.left, // Adjust position as needed
                        zIndex: 6, // This image should be on top
                    }}
                />
            )}


            {children}
        </button>
    );
};