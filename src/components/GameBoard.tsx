import React from "react";
import styled from "styled-components";
import Card from "./Card";

interface GameBoardProps {
  // Define any props needed for the GameBoard component
}

const GameBoardWrapper = styled.div`
  /* Add styling for the game board */
`;

const GameBoard: React.FC<GameBoardProps> = ({}) => {
  // Define any state or logic needed for the game board

  return (
    <GameBoardWrapper>
      {/* Render the cards here */}
      <Card value="cat" />
      <Card value="dog" />
      {/* Add more cards as needed */}
    </GameBoardWrapper>
  );
};
export default GameBoard;
