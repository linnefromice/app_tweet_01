import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";

const CustomLink = styled(Link)`
    text-decoration: none;
`;
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
    link_to: string
}

const LinkButton = (prop:Prop) => {
    return (
        <CustomLink to={prop.link_to}>
            <Circle>
                <Label>{prop.label}</Label>
            </Circle>
        </CustomLink>
    )
}

export default LinkButton;
