import React from 'react';
import styled from 'styled-components';

const FlexWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
const Title = styled.div`
    margin: 1vh 0;
    font-size: 0.8rem;
    color: #646464;
`;
const Row = styled.div`
    margin: 1vh 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`;
const Icon = styled.div`
    margin 0 0.5vw;
    width 3vh;
    height 3vh;
    border-radius: 4px;
    border: 1px solid #646464;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.5rem;
    &:hover {
        background-color: #646464;
    }
`;
const SnsLinks = () => {
    return (
        <FlexWrapper>
            <Title>SNS Icons</Title>
            <Row>
                <Icon>T</Icon>
                <Icon>F</Icon>
                <Icon>I</Icon>
            </Row>
        </FlexWrapper>
    );
}

export default SnsLinks;