import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Card from "./Card";

interface GameBoardProps {
  // Define any props needed for the GameBoard component
}

const GameBoardWrapper = styled.div`
  /* Add styling for the game board */
`;

const ScoreWrapper = styled.div`
  /* Add styling for the score */
`;

const VictoryMessage = styled.div`
  /* Add styling for the victory message */
`;

const GameBoard: React.FC<GameBoardProps> = ({}) => {
  const [cards, setCards] = useState<string[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  const cardValues = [
    "cat",
    "dog",
    "bird",
    "fish",
    "rabbit",
    "turtle",
    "horse",
    "elephant",
  ];

  useEffect(() => {
    // Shuffle the card values
    const shuffledCards = [...cardValues, ...cardValues].sort(
      () => Math.random() - 0.5
    );
    setCards(shuffledCards);
  }, []);

  useEffect(() => {
    // Check for game completion
    if (matchedCards.length > 0 && matchedCards.length === cards.length) {
      console.log("matchedCards", matchedCards);

      setGameComplete(true);
    }
  }, [matchedCards, cards]);

  const handleCardClick = (index: number) => {
    if (
      gameComplete ||
      flippedCards.includes(index) ||
      matchedCards.includes(index)
    )
      return;

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const [firstIndex, secondIndex] = newFlippedCards;
      if (cards[firstIndex] === cards[secondIndex]) {
        // Match found
        setMatchedCards([...matchedCards, firstIndex, secondIndex]);
        setFlippedCards([]);
      } else {
        // No match
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
      setScore(score + 1);
    }
  };

  return (
    <GameBoardWrapper>
      {gameComplete ? (
        <VictoryMessage>
          Congratulations! You've won the game with a score of {score}.
        </VictoryMessage>
      ) : (
        <>
          <ScoreWrapper>Score: {score}</ScoreWrapper>
          {/* Render the cards */}
          {cards.map((value, index) => (
            <Card
              key={index}
              value={value}
              onClick={() => handleCardClick(index)}
              flipped={
                flippedCards.includes(index) || matchedCards.includes(index)
              }
            />
          ))}
        </>
      )}
    </GameBoardWrapper>
  );
};
export default GameBoard;
