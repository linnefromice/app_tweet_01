import React, { useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios"

import { UserContext } from '../../global/contexts'
import ErrorModal from '../common/ErrorModal';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const Row = styled.div`
  margin: 1vh 0;
  height: 5vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
const Input = styled.input`
  margin: 0 0.5vw;
  width: 40vw;
  height: 100%;
  border: none;
  border-radius: 4px;
  box-shadow: inset 0 1px 2px #ccc;
`;
const SubmitButton = styled.div`
  margin: 0 0.5vw;
  width: 10vw;
  height: 100%;
  border: 1px solid #00BFFF;
  border-radius: 4px;
  background-color: #87CEFA;
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    border: 1px solid #646464;
    background-color: #646464;
  }
`;
interface CreateTweetProp {
  setIsNeedReload: React.Dispatch<React.SetStateAction<boolean>>
}
const CreateTweet = (prop: CreateTweetProp) => {
  const { user } = useContext(UserContext)
  const [sentence, setSentence] = useState<string>("")
  const [errors, setErrors] = useState<string[]>([])

  function onChangeSentence(e: React.ChangeEvent<HTMLInputElement>) {
    setSentence(e.target.value)
  }
  function submit() {
    if (sentence === '') return;
    
    axios.post('http://localhost:3001/tweets', {
      user_id: user.id,
      sentence: sentence
    })
    .then(res => {
      console.log(res)
      prop.setIsNeedReload(true)
    })
    .catch(err => {
      console.log(err.response)
      setErrors(err.response.data.errors)
    });
  }

  const Error = () => {
    if (errors.length !== 0) {
      return (
        <ErrorModal errors={errors} setErrors={setErrors} />
      )
    } else {
      return null;
    }
  }

  return (
      <Wrapper>
        <Error/>
        <Row>
          <Input
            placeholder="Please input new tweet!"
            value={sentence}
            onChange={onChangeSentence}
          />
          <SubmitButton onClick={submit}>New Tweet!</SubmitButton>
        </Row>
      </Wrapper>
  )
}

export default CreateTweet;
