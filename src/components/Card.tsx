import React from "react";
import styled from "styled-components";

interface CardProps {
  value: string;
}

const CardWrapper = styled.div`
  /* Add styling for the card */
`;

const Card: React.FC<CardProps> = ({ value }) => {
  return <CardWrapper>{value}</CardWrapper>;
};

export default Card;
