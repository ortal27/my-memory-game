import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Card from "./Card";
import GlobalStyle from "../GlobalStyles";
interface GameBoardProps {
  // Define any props needed for the GameBoard component
}

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const GameBoardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  //flex-wrap: wrap;
  justify-content: center;
`;

const ScoreWrapper = styled.div`
  /* Add styling for the score */
`;

const TimerWrapper = styled.div`
  /* Add styling for the timer */
`;

const ResetButton = styled.button`
  /* Add styling for the reset button */
`;
const VictoryMessage = styled.div`
  /* Add styling for the victory message */
`;
const DifficultySelector = styled.select`
  /* Add styling for the difficulty selector */
`;

const ThemeSelector = styled.select`
  /* Add styling for the theme selector */
`;

const SizeSelector = styled.select`
  /* Add styling for the size selector */
`;
const Header = styled.div`
  display: flex;
  gap: 10px;
`;
const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 50px;
`;

const GameBoard: React.FC<GameBoardProps> = ({}) => {
  const [cards, setCards] = useState<string[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [resetGame, setResetGame] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [difficultyLevel, setDifficultyLevel] = useState("medium");
  const [theme, setTheme] = useState("animals");
  const [size, setSize] = useState("medium"); // Default size

  const themeCardValues: { [key: string]: string[] } = {
    animals: [
      "cat",
      "dog",
      "bird",
      "fish",
      "rabbit",
      "turtle",
      "horse",
      "elephant",
    ],
    fruits: [
      "apple",
      "banana",
      "orange",
      "grape",
      "strawberry",
      "watermelon",
      "kiwi",
      "pineapple",
    ],
    colors: [
      "red",
      "blue",
      "green",
      "yellow",
      "orange",
      "purple",
      "pink",
      "brown",
    ],
  };

  useEffect(() => {
    // Generate cards based on the selected difficulty level
    let numCards: number;
    switch (size) {
      case "small":
        numCards = 8;
        break;
      case "medium":
        numCards = 12;
        break;
      case "large":
        numCards = 16;
        break;
      default:
        numCards = 12; // Default to medium size
    }
    const shuffledCards = themeCardValues[theme]
      .slice(0, numCards / 2)
      .flatMap((value) => [value, value])
      .sort(() => Math.random() - 0.5);
    setCards(shuffledCards);

    // Reset the game
    if (resetGame) {
      setGameComplete(false);
      setScore(0);
      setResetGame(false);
      setFlippedCards([]);
      setMatchedCards([]);
      setStartTime(0);
    }
  }, [resetGame, size, difficultyLevel, theme]);

  useEffect(() => {
    // Check for game completion
    if (matchedCards.length > 0 && matchedCards.length === cards.length) {
      setGameComplete(true);
    }
  }, [matchedCards, cards]);

  const handleCardClick = (index: number) => {
    // Start the timer
    if (startTime === 0) {
      setStartTime(Date.now());
    }

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

  const handleResetGame = () => {
    setResetGame(true);
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <GameBoardWrapper>
          {gameComplete ? (
            <>
              <VictoryMessage>
                Congratulations! You've won the game with a score of {score}.
              </VictoryMessage>
              <TimerWrapper>
                Time: {((Date.now() - startTime) / 1000).toFixed(1)} seconds
              </TimerWrapper>
            </>
          ) : (
            <>
              <Header>
                <ResetButton onClick={handleResetGame}>Reset Game</ResetButton>
                <DifficultySelector
                  value={difficultyLevel}
                  onChange={(e) => setDifficultyLevel(e.target.value)}
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </DifficultySelector>
                <ThemeSelector
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                >
                  <option value="animals">Animals</option>
                  <option value="fruits">Fruits</option>
                  <option value="colors">Colors</option>
                </ThemeSelector>
                <SizeSelector
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </SizeSelector>
                <TimerWrapper>
                  Time:{" "}
                  {startTime === 0
                    ? "00:00"
                    : ((Date.now() - startTime) / 1000).toFixed(1)}{" "}
                  seconds
                </TimerWrapper>
                <ScoreWrapper>Score: {score}</ScoreWrapper>
              </Header>
              <Cards>
                {cards.map((value, index) => (
                  <Card
                    key={index}
                    value={value}
                    onClick={() => handleCardClick(index)}
                    flipped={
                      flippedCards.includes(index) ||
                      matchedCards.includes(index)
                    }
                  />
                ))}
              </Cards>
            </>
          )}
        </GameBoardWrapper>
      </Container>
    </>
  );
};
export default GameBoard;
