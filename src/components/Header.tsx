import React from "react";
import styled from "styled-components";

interface HeaderProps {
  title: string; // The title of the game
}

const HeaderWrapper = styled.header`
  /* Add styling for the header */
`;

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <HeaderWrapper>
      <h1>{title}</h1>
    </HeaderWrapper>
  );
};

export default Header;
