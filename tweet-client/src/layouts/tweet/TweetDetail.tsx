import React, { useState, useEffect, useContext, useCallback } from "react"
import styled from "styled-components"
import axios from "axios"

import { UserContext } from '../../global/contexts'
import TweetInterface from '../../models/TweetInterface'
import ErrorModal from '../../components/common/ErrorModal'
import TweetComponent from "../../components/tweet/TweetComponent"

const BodyWrapper = styled.div`
    width: 100%;
`;
const MainTweetArea = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
const TweetComponentWrapper = styled.div`
    width: 90%;
    margin: 1vh 5%;
    display: flex;
    justify-content: center;
    align-items: center;
`
const EditAreaWrapper = styled.div`
    width: 100%;
    margin: 1vh 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`
const InputForUpdate = styled.input`
  width: 40vw;
  height: 3vh;
  margin: 0 2%;
  border: none;
  border-radius: 4px;
  box-shadow: inset 0 1px 2px #ccc;
`
const BaseUpdateButton = styled.div`
    width: 20%;
    margin: 0 2%;
    height: 3vh;
    border-radius: 6vw;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
`
const ActiveUpdateButton = styled(BaseUpdateButton)`
    background-color: lightgreen;
    &:hover {
        border: 1px solid lime;
        background-color: lime;
    }
`
const DisabledUpdateButton = styled(BaseUpdateButton)`
    background-color: gray;
`
const BaseDeleteButton = styled.div`
    width: 20%;
    margin: 0 5%;
    height: 3vh;
    border-radius: 6vw;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
`
const ActiveDeleteButton = styled(BaseDeleteButton)`
    background-color: lightsalmon;
    &:hover {
        border: 1px solid salmon;
        background-color: salmon;
    }
`
const DisabledDeleteButton = styled(BaseDeleteButton)`
    background-color: gray;
`

const BodyContent = (prop:TweetInterface) => {
    const { isLogin, user } = useContext(UserContext);
    const [isDeleted, setIsDeleted] = useState<boolean>(false)
    const [tweet, setTweet] = useState<TweetInterface>(prop)
    const [newSentence, setNewSentence] = useState<string>("")

    const onChangeNewSentence = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        setNewSentence(event.target.value)
    }, [])

    const fetchTweet = () => {
      axios.get(`http://localhost:3001/tweets/detail/${tweet.id}`)
      .then(result => {
        setTweet(result.data)
      })
      .catch(err => console.log(err))
    }

    function updateTweet() {
        axios.put('http://localhost:3001/tweets/', {
            id: prop.id,
            sentence: newSentence
        })
        .then(res => {
            console.log(res)
            fetchTweet()
        })
        .catch(err => console.log(err))
    }

    function deleteTweet() {
        axios.delete(`http://localhost:3001/tweets/${prop.id}`)
        .then(res => {
            console.log(res)
            setIsDeleted(true)
        })
        .catch(err => console.log(err))
    }

    const UpdateButton = isDeleted
        ? <DisabledUpdateButton>UPDATE</DisabledUpdateButton>
        : <ActiveUpdateButton onClick={updateTweet}>UPDATE</ActiveUpdateButton>
    const DeleteButton = isDeleted
        ? <DisabledDeleteButton>DELETE</DisabledDeleteButton>
        : <ActiveDeleteButton onClick={deleteTweet}>DELETE</ActiveDeleteButton>
    const EditArea = isLogin && user.name == tweet.name
        ? <EditAreaWrapper>
            <InputForUpdate
                placeholder="Please input new sentence!"
                value={newSentence}
                onChange={onChangeNewSentence}            
            />
            {UpdateButton}
            {DeleteButton}
         </EditAreaWrapper>
        : null

    return (
        <BodyWrapper>
            <MainTweetArea>
                <TweetComponentWrapper>
                    <TweetComponent
                        id={tweet.id}
                        created_at={tweet.created_at.replace('T', ' ').replace('Z', '')}
                        name={tweet.name}
                        sentence={tweet.sentence}
                    />
                </TweetComponentWrapper>
                {EditArea}
            </MainTweetArea>
        </BodyWrapper>
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
const TweetDetail = (prop:any) => {
    const tweet_id = prop.match.params.id
    const [tweet, setTweet] = useState<TweetInterface|undefined>(undefined)
    const [errors, setErrors] = useState<string[]>([])
    const URL = `http://localhost:3001/tweets/detail/${tweet_id}`

    const fetchTweet = () => {
      axios.get(URL)
      .then(result => {
        setTweet(result.data)
      })
      .catch(err => console.log(err))
    }
  
    useEffect(() => {
      fetchTweet()
    }, [])

    const Error = () => {
        if (errors.length !== 0) {
            return (
                <ErrorModal errors={errors} setErrors={setErrors} />
            )
        } else {
            return null;
        }
    }

    const Body = tweet !== undefined ? <BodyContent
        id={tweet_id}
        created_at={tweet.created_at}
        name={tweet.name}
        sentence={tweet.sentence}
    /> : <Error/>

    return (
        <TopWrapper>
            <Header>
                <Title>Detail</Title>
            </Header>
            {Body}
        </TopWrapper>
    )
}

export default TweetDetail