'use client'
import { getRandomWords, getExpectedLetter} from '../app/gamelogic/engine'
import '../app/globals.css';
import React, { useState, useEffect } from 'react';


export default function Home() {
  const words: string[] = getRandomWords(40, "1338");
  const [typedLetters, setTypedLetters] = useState<string[]>([]);
  const [currentLetterIndex, setCurrentLetterIndex] = useState<number>(0);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [completedWords, setCompletedWords] = useState<string[]>([]);
  const[charactersTyped, setCharactersTyped] = useState<number>(0);

  

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const { key } = event;
      const currentWord = words[currentWordIndex];
      const currentLetter = currentWord[currentLetterIndex];

      if (/^[a-zA-Z]$/.test(key)) {
        setCharactersTyped(prevCharactersTyped => prevCharactersTyped + 1)
      }
      
      if(key == ' ') {                                       //Handling skipping to next word
        setCurrentWordIndex(prevIndex => prevIndex + 1);
        setCurrentLetterIndex(0);
      }

      if(currentLetterIndex == currentWord.length - 1 && key == ' ') {  //Handling going to next word when previous done
        setCompletedWords(prevCompletedWords => [...prevCompletedWords, currentWord]);
        console.log(completedWords);
        setCurrentWordIndex(prevIndex => prevIndex + 1);
        setCurrentLetterIndex(0);
      }

      
      if (key === currentLetter) {              //Handling individual letters
        setTypedLetters(prevLetters => [...prevLetters, key.toLowerCase()]);
        setCurrentLetterIndex(prevIndex => prevIndex + 1);
        console.log("correct" + completedWords[0])
      }
    };

    window.addEventListener('keypress', handleKeyPress);

    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [currentLetterIndex, currentWordIndex, words]);

  return (
    <main>
      <div className="wordBox">
              {/* Cursor indicator */}
      <div
        className="cursor"
        style={{
          position: 'absolute',
          left: `${charactersTyped * 17.5 + currentWordIndex*10.5}px`, 
          height: '30px', 
          width: '2px',
          backgroundColor: 'red', 
        }}
      ></div>
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className={`word ${wordIndex < currentWordIndex ? 'completedWord' : ''}`}>
            {word.split('').map((letter, letterIndex) => (
              <span
                key={letterIndex}
                className={`letter ${wordIndex === currentWordIndex && letterIndex <= currentLetterIndex - 1 ? 'correct' : ''}`}
              >
                {letter}
              </span>
            ))}
          </span>
        ))}
      </div>
    </main>
  );

}







