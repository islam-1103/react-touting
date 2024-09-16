import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";

const cardImages = [
  { src: "/image/helmet-1.png", matched: false },
  { src: "/image/potion-1.png", matched: false },
  { src: "/image/ring-1.png", matched: false },
  { src: "/image/scroll-1.png", matched: false },
  { src: "/image/shield-1.png", matched: false },
  { src: "/image/sword-1.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(0);
    setChoiceOne
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);

    if (choiceOne || choiceTwo) {
      setTurns((prev) => prev + 1);
    }
  };


  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (choiceOne.src === card.src) {
              return { ...card, matched: true };
            }
            return card;
          });
        });

        resetTurn();
      }
    }
    let timerId = setTimeout(() => {
      resetTurn();
    }, 3000);


    return () => {
      clearTimeout(timerId);
    };
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <h1>Магическая битва</h1>
      <button onClick={shuffleCards}>Новая игра</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
        <p>Количество ходов: {turns}</p>
      </div>
    </div>
  );
}

export default App;
