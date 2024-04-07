'use client'
import { getRandomWords, getExpectedLetter} from '../app/gamelogic/engine'
import '../app/globals.css';
import React, { useState, useEffect, useRef } from 'react';


export default function Home() {

  const [words, setWords] = useState<string[]>([]);               //The random words
  const [typedLetters, setTypedLetters] = useState<{ letter: string; correct: boolean; wordIndex: number; position: number }[]>([]); //List of all input characters, if they are correct, and their position

  //STYLING VARIABLES
  const [nrOfChars, setNrOfChars] = useState<number>(0);
  const [nrOfSpaces, setNrOfSpaces] = useState<number>(0);
  
  let letterIndex = 0;
  let wordIndex = 0;

  useEffect(() => {
    setWords(getRandomWords(40,"1338"));
  },[]);


  useEffect(() => {

    
    const handleKeyDown = (event: KeyboardEvent) => {

      const { key, code } = event;
      const currentWord = words[wordIndex];
      const currentLetter = currentWord[letterIndex];
      const letterIndexState = letterIndex;
  
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
        if(letterIndex != currentWord.length) {
          setNrOfChars(prevNrOfChars => prevNrOfChars + (currentWord.length - letterIndexState));
        }
        setNrOfSpaces(prevNrOfSpaces => prevNrOfSpaces + 1);
        wordIndex = wordIndex + 1;
        letterIndex = 0;
      }

      
      else if(code === "Backspace" && letterIndex != 0) {
        setNrOfChars(prevNrOfChars => prevNrOfChars - 1);
        letterIndex = letterIndex - 1;
        setTypedLetters(prevTypedLetters => prevTypedLetters.slice(0, -1));
      }

    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  },[words]);



  return (
    <main>
      <div className="wordBox">
     
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
          <span key={wIndex} className={'word'}>
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







