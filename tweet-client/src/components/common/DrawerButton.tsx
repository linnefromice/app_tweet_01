import React from 'react';
import styled from 'styled-components';

const Circle = styled.div`
    height: 3vw;
    width: 3vw;
    border-radius: 6vw;
    border: 0.1rem solid white;
    display: flex;
    justify-content: center;
    align-items: center;  
    background-color: black;
    &:hover {
        background-color: gray;
    }
`;
const Label = styled.span`
    text-align: center;
    color: white;
    font-size: 0.5rem;
`;

interface Prop {
    label: string
    onClick: () => void
}

const DrawerButton = (prop:Prop) => {
  return (
      <Circle onClick={prop.onClick}>
          <Label>{prop.label}</Label>
      </Circle>
  )
}

export default DrawerButton;
