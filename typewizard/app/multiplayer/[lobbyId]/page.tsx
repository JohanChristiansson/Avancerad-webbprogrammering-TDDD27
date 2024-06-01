'use client'
import '../../globals.css';
import '../[lobbyId]/multiplayer.css'
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation'
import { getRandomWords, getWidthInPx } from '../../gamelogic/engine';
import { HomeButton } from '@/components/ui/tmpButton';
import { pusherClient } from '@/lib/pusher'
import axios from 'axios'

interface PageProps {
  params: {
    lobbyId: string //JUste denna kan också ha caps
  }
}

function SetXPos(nrOfCorrectWords: number, prevPos: number) {
  
  return prevPos + 100 / (nrOfCorrectWords + 3);
}

export default function Page({ params }: PageProps) {
  const lobbyId = params.lobbyId
  const router = useRouter();

  const handleHomeButtonClick = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault();
    router.replace('/');
  }

  //MULTIPLAYER-SPECIFIC VARIAFBLES
  const [characterXpos, setCharacterXpos] = useState<number>(0);
  const [oppXPos, setOppXPos] = useState<number[]>(Array(4).fill(0));
  //const [opp1Xpos, setOpp1Xpos] = useState<number>(0);
  //const [opp2Xpos, setOpp2Xpos] = useState<number>(0);
  //const [opp3Xpos, setOpp3Xpos] = useState<number>(0);
  //const [opp4Xpos, setOpp4Xpos] = useState<number>(0);

  const totNrOfWords = 35;
  const [finished, setFinished] = useState<boolean>(false);
  const [firstPlayerFinished, setFirstPlayerFinished] = useState<boolean>(false);


  //TIMER
  const time = 5;
  const [timer, setTimer] = useState(time);
  const [timerRunning, setTimerRunning] = useState(true); //To start timer
  const [timeLeft, setTimeLeft] = useState(true);         //To end game when timer reaches 0
  const [showStats, setShowStats] = useState(false);     //To show stats when game over

  const gameTime = 0;
  const [finalTime, setFinalTime] = useState(0);
  const [gameTimer, setGameTimer] = useState(gameTime);
  const [gameTimerRunning, setGameTimerRunning] = useState(false);

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

  useEffect(() => {
    if (!timerRunning) {
      setGameTimerRunning(true);
    }
  }, [timerRunning]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (gameTimerRunning) {
      intervalId = setInterval(() => {
        setFinalTime((prevGameTime) => {
          if (!finished) {
            return parseFloat((prevGameTime + 0.1).toFixed(1)); // Update game timer with 1 decimal
          } else {
            // Game finished, stop the game timer
            setGameTimerRunning(false);
            clearInterval(intervalId);
            setShowStats(true); // Show stats when the game is over
            return prevGameTime;
          }
        });
      }, 100);
    }

    // Clean up function to stop the game timer when the component unmounts or when gameTimerRunning becomes false
    return () => clearInterval(intervalId);
  }, [gameTimerRunning, finished]);



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
  const accuracyNumber = parseFloat(accuracy);
  let correctCharacters = 0; //Used to calculate WPM

  useEffect(() => {
    setWords(getRandomWords(totNrOfWords, "1337851", ""));  //Getting random words when loadin page, note that seed is currently deactivated
  }, []);

  const [showExplosion, setShowExplosion] = useState(false);

  useEffect(() => {
    if (finished) {
      setShowExplosion(true);
      // Hide the explosion after 0.5 seconds and show stats
      setTimeout(() => {
        setShowExplosion(false);
        setShowStats(true);
      }, 950); // 0.5 seconds = 500 milliseconds
    }
  }, [finished]);

  interface UserWords {
    [user: string]: number;
  }

  interface UserResult {
    name: string;
    score: number;
    wpm: number;
    accuracy: number;
  }

  const [userResults, setUserResults] = useState<UserResult[]>([]);
  const [userWords, setUserWords] = useState<UserWords>({});

  useEffect(() => {
    pusherClient.subscribe(lobbyId)

    pusherClient.bind('update-words', (resp: {
      user: string,
      words: number
    }) => {
    
      setUserWords(prevUserWords => ({
        ...prevUserWords,
        [resp.user]: (prevUserWords[resp.user] || 0) + 1 // Add 1 to the current value, or initialize to 1 if not present
      }));
    });

    
    pusherClient.bind('finished-game', () => {
    
      setFinished(true);

    });

    pusherClient.bind('send-result', (result: { name: string, score: number, wpm: number, accuracy: number }) => {
      console.log("Kör send-result")
      setUserResults(prevUserResults => [
        ...prevUserResults,
        {
          name: result.name,
          score: result.score,
          wpm: result.wpm,
          accuracy: result.accuracy
        }
      ]);
    });

    return () => {
      pusherClient.unsubscribe(lobbyId);
    };
  }, []);




  useEffect(() => {
    if(!gameTimerRunning && !timerRunning && finished) {
      const sendResult = async (lobbyId: string, wpm: number, accuracy: number, score: number) => {
        const response = await axios.post('/api/game/sendResult', { lobbyId, wpm, accuracy, score});
        console.log("Statustext: ",response.statusText);
      }
      let tempWpm = correctWords * (60 / finalTime);
      let tempAcc = accuracyNumber;
      let tempScore =  (tempAcc) / 100 * (tempWpm) * 69;
      console.log("Tempscores: ", tempWpm, tempAcc, tempScore);
      sendResult(lobbyId, tempWpm, tempAcc, tempScore);
    }


  },[gameTimerRunning, timerRunning, finished])


  useEffect(() => {
    const newOppXPos = [...oppXPos]; // Create a copy of the current state
    Object.keys(userWords).forEach((key, index) => {
      newOppXPos[index] = userWords[key] * (100 / 38);
    });
    setOppXPos(newOppXPos); // Update the state with the new array
  }, [userWords]);




  //THIS IS THE BIG USEEFFECT, BASICALLY CONTROLLING THE WHOLE GAME
  useEffect(() => {

    const handleKeyDown = (event: KeyboardEvent) => {

      if (timeLeft) {
        return;
      }

      const { key, code } = event;
      const currentWord = words[wordIndex];
      const nextWord = words[wordIndex + 1];
      const currentLetter = currentWord[letterIndex];
      const letterIndexState = letterIndex;       //letterIndex made const to be used in useState

      if (/^[a-zA-ZåäöÅÄÖ]$/.test(key) && letterIndex < currentWord.length) { //If input is a letter and it is not the last letter of the current word
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
          const updateWpm = async (lobbyId: string, totNrOfWords: number) => {
            console.log("correct words", totNrOfWords)
            await axios.post('/api/game/updateWords', { lobbyId, totNrOfWords })
          }
          console.log(totNrOfWords, "correct words")
          updateWpm(lobbyId, totNrOfWords)
          
          //setCharacterXpos(prevCharacterXpos => SetXPos(totNrOfWords, prevCharacterXpos));
          correctCharacters = 0;
        }
        wordIndex = wordIndex + 1;

        if (wordIndex == totNrOfWords) {  //For multiplaer the game ends when the user has written a set ammount of words
          setFinished(true);
          setFirstPlayerFinished(true);
        }

        setNrOfSpaces(prevNrOfSpaces => prevNrOfSpaces + 1);
        setRawWordInput(prevRawWordInput => prevRawWordInput + 1);
        letterIndex = 0;
        pxPerRow = pxPerRow + spaceWidth;
        if (wordIndex < totNrOfWords) { //Extra check to prevent error when completing last word
          if (pxPerRow + (nextWord.length * charWidth) + spaceWidth >= getWidthInPx(wordBoxRef.current)) { //Row switching, inside the space statement, triggered when pressing space 
            setCurrentRowIndex(prevRowIndex => prevRowIndex + 1);                           //upon completing last word of the row
            setNrOfChars(0);
            setNrOfSpaces(0);
            pxPerRow = 0;

          }
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

    };


    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [words, timeLeft]);

  const renderExplosion = () => {
    return (
      <div className='multiplayerExplosionContainer'>
        <img
          src='https://i.postimg.cc/nrX6n85W/fireball-Animation.gif'
          style={{}}
        />
      </div>
    );
  };

  if(firstPlayerFinished) {                                      //When the first player is finished, set finished to all other players and post stats
    const finishedGame = async(lobbyId: string) => {
      await axios.post('/api/game/finishedGame', {lobbyId})
    }
    finishedGame(lobbyId);
    setFirstPlayerFinished(false);
  }








  return (
    <main>
      <div className='backgroundPicture'>  {/*BACKGROUND GIF IN THE OUTERMOST DIV*/}

        <div className='home-button'>
          <HomeButton
            disabled={false}
            imgSrc="https://i.postimg.cc/BnbJtyFJ/SignLogo.png"
            style={{}} //Must set size to be visible
          >
          </HomeButton>
        </div>

        <div className='progressionContainer'>
          <div className='lanePlayer1'>
            <img src='https://i.postimg.cc/hj6mpxvv/fxk5t8kqsbp81-ezgif-com-reverse.gif'
              style={{ left: (oppXPos[0] + "%") }}
            />
            <div className='playerGround'></div>
          </div>
          <div className='lanePlayer2'>
            <img src='https://i.postimg.cc/SxRyNPD0/1-m-UYZp-Tpdf-HXKNwc-Ozw2-Jh-A.gif'
              style={{ left: (oppXPos[1] + "%") }}
            />
            <div className='playerGround'></div>
          </div>
          <div className='lanePlayer3'>
            <img src='https://i.postimg.cc/YS12JWdj/9f40ba06dc0476ff84170bba2bed69a0-ezgif-com-crop.gif'
              style={{ left: (oppXPos[2] + "%") }}
            />
            <div className='playerGround'></div>
          </div>
          <div className='lanePlayer4'>

            <img src='https://i.postimg.cc/rz2FZzQT/output-onlinegiftools-ezgif-com-gif-maker.gif'
              style={{ left: (oppXPos[3] + "%") }}
            />
            <div className='playerGround'></div>
          </div>
        </div>
        {timerRunning && (

          <div className='timerBackground'>
            <img src='https://i.postimg.cc/YSBQ5Bjd/30-removebg-preview.png'></img>
            <h1 className="multiplayerTimer">{timer}</h1>
          </div>

        )}
        {!finished && (

          <div className='wordBoxBackgroundMultiPlayer'>
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

        {showExplosion && renderExplosion()}

        {finished && !showExplosion && (
  <div className='multiplayerStatsBox'>
    {userResults[0] && (
      <div className="player1Stats">
        <h2>{userResults[0].name}</h2>
        <h1>Score: {Number((userResults[0].score)).toFixed(0)}</h1>
        <h1>WPM: {Number(userResults[0].wpm).toFixed(0)}</h1>
        <h1>Accuracy: {Number(userResults[0].accuracy).toFixed(1)}%</h1>
      </div>
    )}
    {userResults[1] && (
      <div className="player2Stats">
        <h2>{userResults[1].name}</h2>
        <h1>Score: {Number((userResults[1].score)).toFixed(0)}</h1>
        <h1>WPM: {Number(userResults[1].wpm).toFixed(0)}</h1>
        <h1>Accuracy: {Number(userResults[1].accuracy).toFixed(1)}%</h1>
      </div>
    )}
    {userResults[2] && (
      <div className="player3Stats">
        <h2>{userResults[2].name}</h2>
        <h1>Score: {Number((userResults[2].score)).toFixed(0)}</h1>
        <h1>WPM: {Number(userResults[2].wpm).toFixed(0)}</h1>
        <h1>Accuracy: {Number(userResults[2].accuracy).toFixed(1)}%</h1>
      </div>
    )}
    {userResults[3] && (
      <div className="player4Stats">
        <h2>{userResults[3].name}</h2>
        <h1>Score: {Number((userResults[3].score)).toFixed(0)}</h1>
        <h1>WPM: {Number(userResults[3].wpm).toFixed(0)}</h1>
        <h1>Accuracy: {Number(userResults[3].accuracy).toFixed(1)}%</h1>
      </div>
    )}
  </div>
)}







      </div>
    </main>

  );
}