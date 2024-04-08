'use client'
import {getRandomWords, getWordsPerRow} from '../app/gamelogic/engine'
import '../app/globals.css';
import React, { useState, useEffect, useRef } from 'react';

const getWidthInPx = (element: HTMLElement | null): number => {
  if (!element) return 0;
  return element.offsetWidth;
};


export default function Home() {

  //TIMER
  const [timer, setTimer] = useState(30); // 30 seconds timer
  const [timerRunning, setTimerRunning] = useState(false);

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
                      return prevTimer - 1; // Decrement timer value if greater than 0
                  } else {
                      // Timer reached zero, stop the timer
                      setTimerRunning(false);
                      clearInterval(intervalId);
                      return 0;
                  }
              });
          }, 1000);
      }

      // Clean up function to stop the timer when the component unmounts or when timerRunning becomes false
      return () => clearInterval(intervalId);
  }, [timerRunning]);






  //LOGIC VARIABLES
  const wordBoxRef = useRef<HTMLDivElement>(null);          //Declaring the wordbox div here so we can determine its width regardless of screen size
  const [words, setWords] = useState<string[]>([]);        //The random words
  const [typedLetters, setTypedLetters] = useState<{ letter: string; correct: boolean; wordIndex: number; position: number }[]>([]); //List of all input characters, if they are correct, and their position
  


  //STYLING VARIABLES
  const [nrOfChars, setNrOfChars] = useState<number>(0);
  const [nrOfSpaces, setNrOfSpaces] = useState<number>(0);
  const [currentRowIndex, setCurrentRowIndex] = useState<number>(0); //Which row we are currently on
  const [wordsPerRowState, setWordsPerRowState] = useState<number>(0);
  
  
  
  let letterIndex = 0;     //Which letter in the current word the user is on
  let wordIndex = 0;      //Which word (in total) the user is on
  let simpleRow = 0;
  

  useEffect(() => {                                        //STUFF THAT LOADS WHEN APPLICATION STARTS
    setWords(getRandomWords(100,"1337851"));
  },[]);

  useEffect(() => {
    if (words.length > 0) {
        const wordBoxWidth = getWidthInPx(wordBoxRef.current); 
        console.log(getWordsPerRow(words, getWidthInPx(wordBoxRef.current), 17.5, 10.5));  
    }
}, [words]);





  useEffect(() => {

    
    const handleKeyDown = (event: KeyboardEvent) => {

      const { key, code } = event;
      const currentWord = words[wordIndex];
      const currentLetter = currentWord[letterIndex];
      const letterIndexState = letterIndex;       //letterIndex made const to be used in useState
      const currentWordsPerRow = getWordsPerRow(words, getWidthInPx(wordBoxRef.current), 17.5, 10.5)[simpleRow];

      
      if (/^[a-zA-Z]$/.test(key) && !timerRunning) { //If letter-key
        handleFirstLetterTyped();
    }

      if (/^[a-zA-Z]$/.test(key) && letterIndex < currentWord.length) { //If input is a letter and it is not the last letter of the current word
        setNrOfChars(prevNrOfChars => prevNrOfChars + 1);
        letterIndex = letterIndex + 1;
        const position = letterIndex - 1; // Position of the letter within the word
        if(key == currentLetter) {
          setTypedLetters(prevTypedLetters => [...prevTypedLetters, { letter: key, correct: true, wordIndex, position }]);
        } else {
          setTypedLetters(prevTypedLetters => [...prevTypedLetters, { letter: key, correct: false, wordIndex, position }]);
        }
        
      }

      else if(key == ' ') {
        if(letterIndex != currentWord.length) {   //If not on last letter, aka skipping the word
          setNrOfChars(prevNrOfChars => prevNrOfChars + (currentWord.length - letterIndexState));
        }
        setNrOfSpaces(prevNrOfSpaces => prevNrOfSpaces + 1);
        wordIndex = wordIndex + 1;
        console.log(wordIndex);
        letterIndex = 0;
        if(wordIndex >= currentWordsPerRow) {
          setCurrentRowIndex(prevRowIndex => prevRowIndex + 1);
          setNrOfChars(0);
          setNrOfSpaces(0);
          simpleRow++;
  
        }
      }

      
      else if(code === "Backspace" && letterIndex != 0) { //Pressing backspace, while not on the first letter of a word
        setNrOfChars(prevNrOfChars => prevNrOfChars - 1);
        letterIndex = letterIndex - 1;
        setTypedLetters(prevTypedLetters => prevTypedLetters.slice(0, -1));
      }

      else if(code === "Enter") {
        setCurrentRowIndex(prevRowIndex => prevRowIndex + 1);
        setNrOfChars(0);
        setNrOfSpaces(0);
        simpleRow++;
        wordIndex++;
        letterIndex = 0;
      }

    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  },[words]);



  return (
    <main>
      <h1 className="timer">{timer}</h1>
      <div ref={wordBoxRef} className="wordBox">
     
     {/*CURSOR*/}
      <div
        className="cursor"
        style={{
          position: 'absolute',
          left: `${nrOfChars * 17.5 + nrOfSpaces*10.5}px`, 
          height: '30px', 
          width: '2px',
          backgroundColor: 'yellow', 
        }}
      ></div>


     {/*WORDS*/}
     {words.map((word, wIndex) => (
          <span key={wIndex} className={'word'} style={{ position: 'relative', top: `${-38 * currentRowIndex}px` }}>
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
            {/* Render space after each word */}
            {' '}
          </span>
        ))}
      </div>
    </main>
  );
}







