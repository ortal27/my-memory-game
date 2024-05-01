import React from "react";
import styled from "styled-components";

interface CardProps {
  value: string;
  onClick: () => void;
  flipped: boolean;
}

const CardWrapper = styled.div`
  /* Add styling for the card */
`;

const CardContainer = styled.div`
  cursor: pointer;
  width: 150px;
  height: 150px;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;
const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardName = styled.p`
  margin: 10px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

const Card: React.FC<CardProps> = ({ value, onClick, flipped }) => {
  return (
    <>
      <CardContainer onClick={onClick}>
        <CardName> {flipped ? value : "?"}</CardName>
      </CardContainer>
    </>
  );
};

export default Card;
