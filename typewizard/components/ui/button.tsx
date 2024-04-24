import React from 'react';

interface ButtonProps {
  // Event handler function to be called when the button is clicked
  onClick: () => void;

  // Content inside the button (e.g., text, icons)
  children: React.ReactNode;

  // Optional: Custom styles to apply to the button
  style?: React.CSSProperties;

  // Optional: Whether the button is disabled
  disabled?: boolean;

  // Optional: Image source for the button
  imgSrc?: string;
}


const Button: React.FC<ButtonProps> = ({ onClick, children, style, disabled, imgSrc}) => {
  return (
      // Return a button element with the provided props
      <button
          onClick={onClick} // Event handler for the click event
          style={style} // Custom styles for the button
          disabled={disabled} // Disable the button if true
      >
        
        {/* Display image if imgSrc is provided */}
        {imgSrc && (
            <img
                src={imgSrc}
                alt="Button image"
                style={{ }} // Add margin for spacing
                
            />
            
        )}

        {children}
    </button>
  );
};

export default Button;

