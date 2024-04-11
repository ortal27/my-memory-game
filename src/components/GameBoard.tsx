import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Card from "./Card";

interface GameBoardProps {
  // Define any props needed for the GameBoard component
}

const GameBoardWrapper = styled.div`
  /* Add styling for the game board */
`;

const GameBoard: React.FC<GameBoardProps> = ({}) => {
  const [cards, setCards] = useState<string[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);

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

  const handleCardClick = (index: number) => {
    console.log("here");

    if (flippedCards.includes(index) || matchedCards.includes(index)) return;

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const [firstIndex, secondIndex] = newFlippedCards;
      if (cards[firstIndex] === cards[secondIndex]) {
        // Match found
        setMatchedCards([...matchedCards, firstIndex, secondIndex]);
      } else {
        // No match
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <GameBoardWrapper>
      {/* Render the cards */}
      {cards.map((value, index) => (
        <Card
          key={index}
          value={value}
          onClick={() => handleCardClick(index)}
          flipped={flippedCards.includes(index) || matchedCards.includes(index)}
        />
      ))}
    </GameBoardWrapper>
  );
};
export default GameBoard;
