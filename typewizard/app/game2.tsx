'use client'
import { getRandomWords, getExpectedLetter} from '../app/gamelogic/engine'
import '../app/globals.css';
import React, { useState, useEffect } from 'react';


export default function Home() {

    const [words, setWords] = useState<string[]>([]);
  const [typedLetters, setTypedLetters] = useState<string[]>([]);
  const [correctLetterIndex, setcorrectLetterIndex] = useState<number>(0);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [completedWords, setCompletedWords] = useState<string[]>([]);
  const[charactersTyped, setCharactersTyped] = useState<number>(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState<number>(0);

  const [rowToString, setRowToString] = useState<string>('initialValue');

  useEffect(() => {
    // Fetch or generate the random words when the component mounts
    const fetchedWords = getRandomWords(40, "1337");
    setWords(fetchedWords);
  }, []);

  useEffect(() => {
    // Update rowToString when words array changes
    const firstTenWords = words.slice(0, 10).join(' ');
    setRowToString(firstTenWords);
  }, [words]);


  

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const { key } = event;
      const currentWord = words[currentWordIndex];
      const currentLetter = currentWord[correctLetterIndex];

      if (/^[a-zA-Z]$/.test(key)) {
        setCharactersTyped(prevCharactersTyped => prevCharactersTyped + 1);
        setCurrentLetterIndex(prevCurrentLetterIndex => prevCurrentLetterIndex + 1);
      }
      
      if(key == ' ') {                                       //Handling skipping to next word
        setCharactersTyped(prevCharactersTyped => prevCharactersTyped + words[currentWordIndex].length - currentLetterIndex);
        setCurrentLetterIndex(0);
        setCurrentWordIndex(prevIndex => prevIndex + 1);
        setcorrectLetterIndex(0);
        
      }

      if(correctLetterIndex == currentWord.length - 1 && key == ' ') {  //Handling going to next word when previous done
        setCompletedWords(prevCompletedWords => [...prevCompletedWords, currentWord]);
        console.log(completedWords);
        setCurrentWordIndex(prevIndex => prevIndex + 1);
        setcorrectLetterIndex(0);
        setCurrentLetterIndex(0);
      }

      
      if (key === currentLetter) {              //Handling individual letters
        setTypedLetters(prevLetters => [...prevLetters, key.toLowerCase()]);
        setcorrectLetterIndex(prevIndex => prevIndex + 1);
        console.log("correct" + completedWords[0])
      }
    };

    window.addEventListener('keypress', handleKeyPress);

    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [correctLetterIndex, currentWordIndex, words]);

  return (
    <main>
      <div className="wordBox">
      
      <div
        className="cursor"
        style={{
          position: 'absolute',
          left: `${charactersTyped * 17.5 + currentWordIndex*10.5}px`, 
          height: '30px', 
          width: '2px',
          backgroundColor: 'white', 
        }}
      ></div>
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className={`word ${wordIndex < currentWordIndex ? 'completedWord' : ''}`}>
          {word.split('').map((letter, letterIndex) => (
            <span
              key={letterIndex}
              className={`letter ${
                wordIndex === currentWordIndex && letterIndex <= correctLetterIndex - 1 && letter == words[currentWordIndex][currentLetterIndex - 1]
                  ? 'correct'
                  : ''
              } ${
                wordIndex === currentWordIndex && letterIndex === correctLetterIndex && letter !== words[currentWordIndex][currentLetterIndex]
                  ? 'incorrect'
                  : ''
              }`}
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