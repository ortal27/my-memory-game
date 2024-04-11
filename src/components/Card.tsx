import React from "react";
import styled from "styled-components";

interface CardProps {
  value: string;
  onClick: () => void;
  flipped: boolean;
}

const CardWrapper = styled.div`
  /* Add styling for the card */
  cursor: pointer;
`;

const Card: React.FC<CardProps> = ({ value, onClick, flipped }) => {
  return <CardWrapper onClick={onClick}>{flipped ? value : "?"}</CardWrapper>;
};

export default Card;
