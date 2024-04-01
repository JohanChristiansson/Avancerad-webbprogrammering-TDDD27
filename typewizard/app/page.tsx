
import { getRandomWords, randomWords, getExpectedLetter } from '@/gamelogic/engine';
import '../app/globals.css';
import { Test } from '../app/api/data/firstapi';



//Tror det är såhär man ska exporta, först funktion sen export i separata statements
export default function Home() {
  const words: string[] = getRandomWords(); // Call getRandomWords to get an array of random words

  return (
    <main>
      <div className="wordBox">
        {words.map((word, index) => (
          <span key={index} className="word">{word}</span> // Wrap each word in a span to apply styles individually
        ))}

      </div>

    </main>
  );
}





/* 

getWords

update how many words completed 3 times/sec

get how many words opponenent has completed 3 times/sec

end of game, post results, save stats

*/
