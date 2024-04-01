import { getRandomWords, randomWords } from '@/gamelogic/engine';
import '../app/globals.css';
import { Test } from '../app/api/data/firstapi';

//Tror det är såhär man ska exporta, först funktion sen export i separata statements
export default function Home() {

  const words: string[] = randomWords; // Call getRandomWords to get an array of random words

  return (
    <main>
      {/* <div className="wordBox">
        {words.map((word, index) => (
          // Wrap each word in a span to apply styles individually
          <span key={index} className="word">{word}</span>
        ))}
      </div> */}
      <Test /> {/* Include the Test component here */}
    </main>
  );
}

