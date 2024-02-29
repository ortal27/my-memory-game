import React from "react";
import styled from "styled-components";
import Header from "./components/Header";
import GameBoard from "./components/GameBoard";

const AppWrapper = styled.div`
  /* Add global styling for the app */
`;

const App: React.FC = () => {
  return (
    <AppWrapper>
      <Header title="Memory Game" />
      <GameBoard />
    </AppWrapper>
  );
};

export default App;
