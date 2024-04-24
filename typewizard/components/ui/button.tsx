import React, { useState, useEffect, useRef,MouseEvent, KeyboardEvent, ButtonHTMLAttributes } from 'react';


interface ButtonProps {
  // Event handler
  onClick: () => void;
  

  // Content inside the button
  children: React.ReactNode;

 //? means parameter is optional
  style?: React.CSSProperties;

  
  disabled?: boolean;

  
  imgSrc?: string;
  imgSrc2?: string;
}


export const LongButton: React.FC<ButtonProps> = ({ onClick, children, style, disabled, imgSrc, imgSrc2 }) => {

  const buttonRef = useRef<HTMLButtonElement>(null);

  const ButtonLeft = 16;
  const ButtonTop = 22;

  const [imgPosition, setImgPosition] = useState({
      top: ButtonTop,
      left: ButtonLeft,
  });

  // Define handlePress function
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

  // Handle button click
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      if (onClick) onClick();
      if (handlePress) handlePress();
      if (buttonRef.current) {
          buttonRef.current.blur(); // Remove focus from the button
      }
  };



  return (
    <button
        onClick={handleButtonClick}
        style={{ ...style, position: 'relative' }} // Positioning is important
        disabled={disabled}
        ref={buttonRef}
        
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

export const RestartButton: React.FC<ButtonProps> = ({ onClick, children, style, disabled, imgSrc, imgSrc2 }) => {

  const buttonRef = useRef<HTMLButtonElement>(null);

  const ButtonLeft = 16;
  const ButtonTop = 17;

  const [imgPosition, setImgPosition] = useState({
      top: ButtonTop,
      left: ButtonLeft,
  });

  // Define handlePress function
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

  // Handle button click
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      if (onClick) onClick();
      if (handlePress) handlePress();
      if (buttonRef.current) {
          buttonRef.current.blur(); // Remove focus from the button
      }
  };



  return (
    <button
        onClick={handleButtonClick}
        style={{ ...style, position: 'relative' }} // Positioning is important
        disabled={disabled}
        ref={buttonRef}
        
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
                  width: '70%', // Adjust size as needed
                  height: '66%', // Adjust size as needed
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

export const LoginButton: React.FC<ButtonProps> = ({ onClick, children, style, disabled, imgSrc, imgSrc2 }) => {

  const buttonRef = useRef<HTMLButtonElement>(null);

  const ButtonLeft = 16;
  const ButtonTop = 17;

  const [imgPosition, setImgPosition] = useState({
      top: ButtonTop,
      left: ButtonLeft,
  });

  // Define handlePress function
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

  // Handle button click
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      if (onClick) onClick();
      if (handlePress) handlePress();
      if (buttonRef.current) {
          buttonRef.current.blur(); // Remove focus from the button
      }
  };



  return (
    <button
        onClick={handleButtonClick}
        style={{ ...style, position: 'relative' }} // Positioning is important
        disabled={disabled}
        ref={buttonRef}
        
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
                  width: '70%', // Adjust size as needed
                  height: '66%', // Adjust size as needed
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

