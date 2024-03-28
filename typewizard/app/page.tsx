import { getRandomWords, randomWords } from '@/gamelogic/engine';
import '../app/globals.css';



export default function Home() {
  const words: string[] = randomWords; // Call getRandomWords to get an array of random words

  return (
    <main>
      <div className="wordBox">
      {words.map((word, index) => (
          // Wrap each word in a span to apply styles individually
          <span key={index} className="word">{word}</span>
        ))}

      </div>

    </main>
  );
}

