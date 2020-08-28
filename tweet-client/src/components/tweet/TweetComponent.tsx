import React from "react"
import styled from "styled-components"

import TweetInterface from '../../models/TweetInterface'

const DateWrapper = styled.div`
  margin: 0.2vh 0;
  font-size: 1.25rem;
  font-weight: bold;
`;
const UsernameWrapper = styled.div`
  margin: 0.2vh 0;
  font-size: 1.25rem;
  color: #646464;
  text-decoration: underline;
`;
const SentenceWrapper = styled.div`
  margin: 0.2vh 0;
  color: #646464;
`;

const TweetComponent = (prop: TweetInterface) => {
    return (
        <div>
            <DateWrapper>{prop.created_at}</DateWrapper>
            <UsernameWrapper>{prop.name}</UsernameWrapper>
            <SentenceWrapper>{prop.sentence}</SentenceWrapper>
        </div>
    )
}

export default TweetComponent;