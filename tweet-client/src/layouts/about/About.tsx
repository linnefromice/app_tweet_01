import React from 'react';
import styled from 'styled-components';


const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
const DescriptionArea = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
const Area = styled.div`
    width: 100%;
    margin: 2vh 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
const AreaTitle = styled.div`
    font-weight: bold;
`
const AreaContents = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`
const AreaContent = styled.div`
    margin: 0 1vw;
    width: 20%;
    height: 5vh;
    border-radius: 10vh;
    box-shadow: 4px 4px lightgray;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
`
const FrontendContent = styled(AreaContent)`
    background: linear-gradient(to right, #ee9ca7, #ffdde1);
`
const BackendContent = styled(AreaContent)`
    background: linear-gradient(to right, #2193b0, #6dd5ed);
`
const MainContent = () => {
    return (
        <Wrapper>
            <DescriptionArea>
                <p>This site is Client Server System.</p>
                <p>Frontend is "React". Backend is "Ruby on Rails".</p>
                <p>By using apis in json, fetch/store data & display.</p>
            </DescriptionArea>
            <Area>
                <AreaTitle>Frontend</AreaTitle>
                <AreaContents>
                    <FrontendContent>React</FrontendContent>
                    <FrontendContent>TypeScript</FrontendContent>
                    <FrontendContent>styled-components</FrontendContent>
                </AreaContents>
            </Area>
            <Area>
                <AreaTitle>Backend</AreaTitle>
                <AreaContents>
                    <BackendContent>Ruby on Rails</BackendContent>
                    <BackendContent>Rspec</BackendContent>
                </AreaContents>
            </Area>
        </Wrapper>
    )
}

const TopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const Header = styled.div`
  height: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.div`
  color: #646464;
  font-size: 3.0rem;
`;
const Body = styled.div`
  width: 100%;
  height: 75%;
`;
const About = () => {
    return (
        <TopWrapper>
            <Header>
                <Title>About</Title>
            </Header>
            <Body>
                <MainContent/>
            </Body>
        </TopWrapper>
    )
}

export default About;
