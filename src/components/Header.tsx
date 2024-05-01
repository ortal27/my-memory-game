import React from "react";
import styled from "styled-components";

interface HeaderProps {
  title: string; // The title of the game
}

const HeaderWrapper = styled.header`
  /* Add styling for the header */
`;

const Title = styled.h1`
  text-align: center;
  font-size: 50px;
  background: linear-gradient(to left, yellow, blue, #f5e8dd, pink, green);
  -webkit-background-clip: text;
  color: transparent;
`;

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <HeaderWrapper>
      <Title>{title}</Title>
    </HeaderWrapper>
  );
};

export default Header;
