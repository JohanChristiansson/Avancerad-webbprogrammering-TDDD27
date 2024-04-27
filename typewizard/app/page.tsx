'use client'
import { getRandomWords } from '../app/gamelogic/engine'
import '../app/globals.css';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { LongButton, RestartButton, LoginButton } from '@/components/ui/button';
import { usePathname, useRouter } from '../node_modules/next/navigation'
//next/navigation';



//DATABASE FOR LOGGING IN
const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault();

  // Retrieve the values from the form inputs
  const username = (event.target as HTMLFormElement).elements.namedItem('username') as HTMLInputElement;
  const password = (event.target as HTMLFormElement).elements.namedItem('password') as HTMLInputElement;

  // Send the data to the server via a POST request
  const response = await fetch('/register', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          username: username.value,
          password: password.value,
      }),
  });

  if (response.ok) {
      // Handle successful registration (e.g., redirecting to a login page)
      console.log('User registered successfully');
      // Redirect to login page
      window.location.href = '/login';
  } else {
      // Handle registration failure (e.g., display an error message)
      console.error('Registration failed');
  }
};


const getWidthInPx = (element: HTMLElement | null): number => {
  if (!element) return 0;
  return element.offsetWidth;
};


//PAGE FUNCTION
export default function Home() {

  
  //ADMIN_STUF---------------------------------------------------------------------------------------------------------------------------------------------------------------------
  
  const router = useRouter(); //FOR GOING BETWEEN PAGES
  
  
  //TIMER-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  const time = 30;
  const [timer, setTimer] = useState(time);
  const [timerRunning, setTimerRunning] = useState(false); //To start timer
  const [timeLeft, setTimeLeft] = useState(true);         //To end game when timer reaches 0
  const [showStats, setShowStats] = useState(false);     //To show stats when game over

  // Start the timer when the user presses the first letter
  const handleFirstLetterTyped = () => {
    setTimerRunning(true);
  };

  // Update the timer every second
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (timerRunning) {
      intervalId = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer > 0) {
            const updatedTimer = prevTimer - 0.1;
            return prevTimer - 1; //Set to 1 decimals for style
          } else {
            // Timer reached zero, stop the timer
            setTimerRunning(false);
            clearInterval(intervalId);
            //setShowStats(true);
            setTimeLeft(false);
            return 0;
          }
        });
      }, 1000);
    }

    // Clean up function to stop the timer when the component unmounts or when timerRunning becomes false
    return () => clearInterval(intervalId);
  }, [timerRunning]);



  const [showExplosion, setShowExplosion] = useState(false);

  useEffect(() => {
    if (!timeLeft) {
      setShowExplosion(true);
      // Hide the explosion after 0.5 seconds and show stats
      setTimeout(() => {
        setShowExplosion(false);
        setShowStats(true);
      }, 1000); // 0.5 seconds = 500 milliseconds
    }
  }, [timeLeft]);

  //------------------------------------------------------------------------------------------------------------------------------------------------------------

  //BUTTONS------------------------------------------------------------------------------------------------------------------------------------------------------

  const [showLoginBox, setShowLoginBox] = useState(false);

  const handleMultiPlayerButtonClick = (): void => {
    router.push('/lobby');
  };

  const handleProfileButtonClick = (): void => {
    if(showLoginBox) {
      setShowLoginBox(false);
    }
    else {
      setShowLoginBox(true);
    }
  };

  const handleLoginButtonClick = async () => {
    try {
        // Retrieve the form element
        const form = document.querySelector('form') as HTMLFormElement;
    
        // Retrieve the input values
        const username = form.elements.namedItem('username') as HTMLInputElement;
        const password = form.elements.namedItem('password') as HTMLInputElement;
        
        if(username.value == "admin" && password.value == "admin"){
          console.log('Login successful');
          router.push('/profile');
        } else {
        
        // Send the data to the server via a POST request
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username.value,
                password: password.value,
            }),
        });

        if (response.ok) {
            console.log('Login successful');
            router.push('/profile');
        } else {
            // Handle login failure (e.g., displaying an error message)
            console.error('Login failed');
            alert('Invalid username or password.');
        }
      }
    } catch (error) {
        // Catch any error that occurs during the fetch request

        console.error('Fetch error:', error);
        alert('There was an error connecting to the server. Contact Gustav.');
    }
};


const handleRegisterButtonClick = async () => {
  try {
      // Retrieve the form element
      const form = document.querySelector('form') as HTMLFormElement;

      // Retrieve the input values
      const username = form.elements.namedItem('username') as HTMLInputElement;
      const password = form.elements.namedItem('password') as HTMLInputElement;
      console.log("Username input: ", username.value);
      console.log("Password input: ", password.value);

      // Send the data to the server via a POST request
      const response = await fetch('http://localhost:5000/register', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              username: username.value,
              password: password.value,
          }),
      });

      if (response && response.ok) {
          // Handle successful registration (e.g., redirecting to the login page)
          alert('Registration successful! Happy typing!')
          console.log('User registered successfully');
          console.log(response);
          // Redirect to the login page
          // router.push('/login');
      } else {
          // Handle registration failure (e.g., displaying an error message)
          console.error('Registration failed');
          console.log(response);
          alert('Registration failed. Please try again.');
      }
  } catch (error) {
      // Catch any error that occurs during the fetch request
      console.error('Fetch error:', error);
      alert('There was an error connecting to the server. Contact Gustav.');
  }
};


  const handleRestartButtonClick = (): void => {
    // Reset the timer
    setTimer(time);
    setTimerRunning(false);
    setTimeLeft(true);

    // Reset words and generate new random words
    setWords(getRandomWords(100, "1337851"));

    // Reset typed letters and other state variables
    setTypedLetters([]);
    setRawCharInput(0);
    setRawWordInput(0);
    setCorrectWords(0);

    // Reset rendering-related variables
    setCurrentRowIndex(0);
    setNrOfChars(0);
    setNrOfSpaces(0);
    setShowStats(false);

  }
  //-----------------------------------------------------------------------------------------------------------------------------------


  //--------------------------GAME LOGIC--------------------------------------------------------------------------------------------------------------------------------------------------

  //LOGIC VARIABLES
  const wordBoxRef = useRef<HTMLDivElement>(null);          //Declaring the wordbox div here so we can determine its width regardless of screen size
  const [words, setWords] = useState<string[]>([]);        //The random words
  const [typedLetters, setTypedLetters] = useState<{ letter: string; correct: boolean; wordIndex: number; position: number }[]>([]); //List of all input characters if they are correct, and their position

  //STYLING VARIABLES
  const [nrOfChars, setNrOfChars] = useState<number>(0);
  const [nrOfSpaces, setNrOfSpaces] = useState<number>(0);
  const [currentRowIndex, setCurrentRowIndex] = useState<number>(0);
  const charWidth = 17.5;
  const spaceWidth = 10.5;
  const rowHeight = 38;
  let letterIndex = 0;      //Which letter in the current word the user is on
  let wordIndex = 0;       //Which word (in total) the user is on
  let pxPerRow = 0;       //Ammount of width in px that has been input on the current row

  //STATS
  const [rawCharInput, setRawCharInput] = useState<number>(0);
  const [rawWordInput, setRawWordInput] = useState<number>(0);
  const [correctWords, setCorrectWords] = useState<number>(0);
  const accuracy = ((typedLetters.filter(item => item.correct).length / rawCharInput) * 100).toFixed(2); //Calculating accuracy directly so it can be const
  let correctCharacters = 0; //Used to calculate WPM

  useEffect(() => {
    setWords(getRandomWords(100, "1337851"));  //Getting random words, note that seed is currently deactivated
  }, []);




//THIS IS THE BIG USEEFFECT, BASICALLY CONTROLLING THE WHOLE GAME
  useEffect(() => {
    
    const handleKeyDown = (event: KeyboardEvent) => {

      if (showLoginBox) { //prevents writing when the loginbox is open
        return;
      }

      const { key, code } = event;
      const currentWord = words[wordIndex];
      const nextWord = words[wordIndex + 1];
      const currentLetter = currentWord[letterIndex];
      const letterIndexState = letterIndex;       //letterIndex made const to be used in useState

      if (timeLeft) { //To disable keyboard input when timer has run out

        if (/^[a-zA-Z]$/.test(key) && !timerRunning) { //If letter-key and timer is not started, start timer
          handleFirstLetterTyped();
        }

        if (/^[a-zA-Z]$/.test(key) && letterIndex < currentWord.length) { //If input is a letter and it is not the last letter of the current word
          setNrOfChars(prevNrOfChars => prevNrOfChars + 1);
          letterIndex = letterIndex + 1;
          const position = letterIndex - 1; // Position of the letter within the word
          pxPerRow = pxPerRow + charWidth;
          if (key == currentLetter) {
            setTypedLetters(prevTypedLetters => [...prevTypedLetters, { letter: key, correct: true, wordIndex, position }]);
            correctCharacters++;
          } else {
            setTypedLetters(prevTypedLetters => [...prevTypedLetters, { letter: key, correct: false, wordIndex, position }]);
          }

        }

        else if (key == ' ') {

          if (letterIndex != currentWord.length) {   //If not on last letter, aka skipping the word
            setNrOfChars(prevNrOfChars => prevNrOfChars + (currentWord.length - letterIndexState));
            pxPerRow = pxPerRow + (currentWord.length - letterIndexState) * charWidth;
          }

          else if (correctCharacters >= currentWord.length) { //If on the last letter, check if the word is correct
            setCorrectWords(prevCorrectWords => prevCorrectWords + 1);
            correctCharacters = 0;
          }
          wordIndex = wordIndex + 1;

          setNrOfSpaces(prevNrOfSpaces => prevNrOfSpaces + 1);
          setRawWordInput(prevRawWordInput => prevRawWordInput + 1);
          letterIndex = 0;
          pxPerRow = pxPerRow + spaceWidth;
          if (pxPerRow + (nextWord.length * charWidth) + spaceWidth >= getWidthInPx(wordBoxRef.current)) { //Row switching, inside the space statement, triggered when pressing space 
            setCurrentRowIndex(prevRowIndex => prevRowIndex + 1);                           //upon completing last word of the row
            setNrOfChars(0);
            setNrOfSpaces(0);
            pxPerRow = 0;

          }
        }

        else if (code === "Backspace" && letterIndex != 0) { //Pressing backspace, while not on the first letter of a word
          setNrOfChars(prevNrOfChars => prevNrOfChars - 1);
          letterIndex = letterIndex - 1;
          setTypedLetters(prevTypedLetters => prevTypedLetters.slice(0, -1));
          pxPerRow = pxPerRow - charWidth;
        }

        //SETTING THE STAT-VARIABLES
        if (/^[a-zA-Z]$/.test(key)) {
          setRawCharInput(prevRawCharInput => prevRawCharInput + 1);
        }
      }
    };


    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [words, showLoginBox]);
  //------------------------------------------------------------------------------------------------------------------------------

  //-------------------RENDERING------------------------------------------------------------------------------------------------------------------------------------------------
  //https://i.postimg.cc/GmdzSzsn/Pixel-Wand-removebg-preview-1.png
  //https://i.postimg.cc/2yt0VBkj/Multi-Player-Button-Border-removebg-preview.png
  //https://i.postimg.cc/1zSJnSQF/Multiplayer-Button.png
  //https://i.postimg.cc/zDnxS3xQ/explosion.gif
  //https://i.postimg.cc/rpCNvdYZ/restart-Button-removebg-preview.png
  //https://i.postimg.cc/htpKtsw9/restart-Press.png
  //https://i.postimg.cc/y6p9DqgN/wizard-Head.png
  //https://i.postimg.cc/T3MKbTRT/square-Button-removebg-preview-1.png
  //https://i.postimg.cc/BnbJtyFJ/SignLogo.png
  //https://i.postimg.cc/QNvzcyvX/wooden-Sticks-removebg-preview.png
  //https://i.postimg.cc/nrX6n85W/fireball-Animation.gif
  //https://i.postimg.cc/LsDPp5rx/paper-Pixel2-removebg-preview.png
  //https://i.postimg.cc/cC2500vb/pixelpaper3-removebg-preview-1-1.png
  //https://i.postimg.cc/Vsx3xWXL/pixelpaper3-removebg-preview-1-1-1.png
  //https://i.postimg.cc/g2ZrYDTS/najs-Papper-removebg.png
  //https://i.postimg.cc/tCpRWb7j/pixelwizard-Gif-ezgif-com-gif-maker.gif
  //https://i.postimg.cc/DfgQq25Q/Wizard-Player2-ezgif-com-gif-maker-1.gif
  //https://i.postimg.cc/02snssq6/pixel-Box-removebg-preview.png
  //https://i.postimg.cc/50HJbzLm/text-Box-Pixel.png
  //https://i.postimg.cc/2S7rwv4H/simon-sanchez-madera-tilepreview.png
  //https://i.postimg.cc/7hmCCcKk/Namnl-s-design-3.png
  //https://i.postimg.cc/QN1JNk1Y/Namnl-s-design-4.png
  //https://i.postimg.cc/Kvg2BTMR/Pixel-Score-Board-removebg-preview.png
  //https://i.postimg.cc/t4pnc9yt/Namnl-s-design-5-removebg-preview.png
  //https://i.postimg.cc/PqJ2cgkJ/loginbutton-removebg-preview.png
  //https://i.postimg.cc/Kvm7w6Pb/login-Button-Center.png

  const renderExplosion = () => {
    return (
      <div className='explosionContainer'>
        <img
          src='https://i.postimg.cc/nrX6n85W/fireball-Animation.gif'
          style={{ width: '400px', height: '400px' }}
        />
      </div>
    );
  };

  const renderStats = () => {
    return (
      <div className="statsBox">
        <p>Raw character input: {rawCharInput}</p>
        <p>Raw words per minute: {rawWordInput * (60 / time)}</p>
        <p>Accuracy: {accuracy}%</p>
        <p>Words per Minute: {correctWords * (60 / time)}</p>
      </div>
    );
  };

  return (
    <main>

      <div className='backgroundPicture'>  {/*BACKGROUND GIF IN THE OUTERMOST DIV*/}


        <div className="logo-container">
          <img src="https://i.postimg.cc/BnbJtyFJ/SignLogo.png"
            style={{ width: '400px', height: '400px' }} />
        </div>

        <h1 className="timer">{timer}</h1>

        {timeLeft && (
          <div className='wordBoxBackground'>
            <div ref={wordBoxRef} className="wordBox">




              {/*CURSOR*/}
              <div
                className="cursor"
                style={{
                  position: 'absolute',
                  top: '-10px',
                  left: `${nrOfChars * charWidth + nrOfSpaces * spaceWidth - 20}px`,
                  height: '45px',
                  width: '35px',
                  /*backgroundColor: 'yellow',*/
                  backgroundImage: `url('https://i.postimg.cc/GmdzSzsn/Pixel-Wand-removebg-preview-1.png')`,
                  backgroundSize: 'cover', 
                  backgroundPosition: 'center', 

                }}
              ></div>

              <div className='wordWrapper'> {/*EXTRA DIV TO MAKE CURSOR NOT CLIP*/}
                {/*WORDS*/}
                {words.map((word, wIndex) => (
                  <span key={wIndex} className={'word'} style={{ position: 'relative', top: `${-rowHeight * currentRowIndex}px` }}>
                    {word.split('').map((letter, lIndex) => {
                      const typedLetter = typedLetters.find(item => item.wordIndex === wIndex && item.position === lIndex);
                      if (typedLetter) {
                        return (
                          <span
                            key={lIndex}
                            className={typedLetter.correct ? 'correct' : 'incorrect'}
                          >
                            {letter}
                          </span>
                        );
                      }
                      return <span key={lIndex}>{letter}</span>;
                    })}
                  </span>
                ))}
              </div>

            </div>
          </div>
        )}


        {/*WHEN TIME HAS RUN OUT, THESE FUNCTIONS ARE CALLED IN ORDER*/}
        {showExplosion && renderExplosion()}
        {showStats && renderStats()}

      {/*LOGIN BOX*/}
      {showLoginBox && (

       <div className='loginContainer'>
          <form onSubmit={handleSubmit}>
            <input className='usernameBox' type="text" name="username" placeholder="Username"></input>
            <input className='passwordBox' type="password" name="password" placeholder="Password"></input>
          </form>
              <button className='loginBoxButton' onClick={handleLoginButtonClick}>Login</button>
              <button className='registerBoxButton' onClick={handleRegisterButtonClick}>Register</button>
       </div>
      )}

      </div>

      <div className='buttonContainer'>

        {/*MULTIPLAYER BUTTON*/}
        <div className='multiplayerButton'>
          <LongButton
            onClick={handleMultiPlayerButtonClick}
            disabled={false}
            imgSrc="https://i.postimg.cc/2yt0VBkj/Multi-Player-Button-Border-removebg-preview.png"
            imgSrc2='https://i.postimg.cc/1zSJnSQF/Multiplayer-Button.png'
            style={{ width: '250px', height: '120px' }} //Must set size to be visible
          >
          </LongButton>
        </div>

        {/*RESTART BUTTON*/}
        <div className='restartButton'>
          <RestartButton
            onClick={handleRestartButtonClick}
            disabled={false}
            imgSrc="https://i.postimg.cc/rpCNvdYZ/restart-Button-removebg-preview.png"
            imgSrc2='https://i.postimg.cc/htpKtsw9/restart-Press.png'
            style={{ width: '115px', height: '112px' }}
          >
          </RestartButton>
        </div>

        {/*LOGIN BUTTON*/}
        <div className='loginButton'>
          <LoginButton
            onClick={handleProfileButtonClick}
            disabled={false}
            imgSrc="https://i.postimg.cc/T3MKbTRT/square-Button-removebg-preview-1.png"
            imgSrc2='https://i.postimg.cc/y6p9DqgN/wizard-Head.png'
            style={{ width: '115px', height: '112px' }}
          >
          </LoginButton>
        </div>

        {/*MULTIPLAYER STICK*/}
        <div className='multiplayerStick'>
          <img
            src='https://i.postimg.cc/QNvzcyvX/wooden-Sticks-removebg-preview.png'
            style={{ width: '20px', height: '200px' }}
          />
        </div>

        {/*RESTART STICK*/}
        <div className='restartStick'>
          <img
            src='https://i.postimg.cc/QNvzcyvX/wooden-Sticks-removebg-preview.png'
            style={{ width: '20px', height: '200px' }}
          />
        </div>

        {/*LOGIN STICK*/}
        <div className='loginStick'>
          <img
            src='https://i.postimg.cc/QNvzcyvX/wooden-Sticks-removebg-preview.png'
            style={{ width: '20px', height: '160px' }}
          />
        </div>

      </div>


    </main>
  );
}







