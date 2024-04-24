'use client'
import { getRandomWords } from '../app/gamelogic/engine'
import '../app/globals.css';
import React, { useState, useEffect, useRef } from 'react';

const getWidthInPx = (element: HTMLElement | null): number => {
  if (!element) return 0;
  return element.offsetWidth;
};


export default function Home() {

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
            setShowStats(true);
            setTimeLeft(false);
            return 0;
          }
        });
      }, 1000);
    }

    // Clean up function to stop the timer when the component unmounts or when timerRunning becomes false
    return () => clearInterval(intervalId);
  }, [timerRunning]);

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





  useEffect(() => {

    const handleKeyDown = (event: KeyboardEvent) => {

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
  }, [words]);
  //------------------------------------------------------------------------------------------------------------------------------

  //-------------------RENDERING------------------------------------------------------------------------------------------------------------------------------------------------

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

      <div className='backgroundPicture'>


        <div className="logo-container">
          <img src="https://i.postimg.cc/TPBc4pTN/Type-Wizard-Logo3-removebg-preview.png"
            style={{ width: '650px', height: '200px' }} />
        </div>

        <h1 className="timer">{timer}</h1>
        {timeLeft && (
          <div ref={wordBoxRef} className="wordBox">

            {/*CURSOR*/}
            <div
              className="cursor"
              style={{
                position: 'absolute',
                left: `${nrOfChars * charWidth + nrOfSpaces * spaceWidth}px`,
                height: '30px',
                width: '2px',
                backgroundColor: 'yellow',
              }}
            ></div>


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
        )}
        {showStats && renderStats()}
      </div>
    </main>
  );
}







