import React, { useState, useCallback } from 'react';
import axios from 'axios';

import { Wrapper, Header, Title, FormWrapper, Row, Label, Input, SubmitButton } from '../../components/auth/AuthCommonComponents';
import ErrorModal from '../../components/common/ErrorModal';
import UserInterface from '../../models/UserInterface';


const Form = () => {
  const [isSignedUp, setIsSignedUp] = useState<boolean>(false)
  const [signedUpUser, setSignedUpUser] = useState<UserInterface|undefined>(undefined)
  const [formName, setFormName] = useState<string>("")
  const [formEmail, setFormEmail] = useState<string>("")
  const [formPassword, setFormPassword] = useState<string>("")
  const [formPasswordConfirmation, setFormPasswordConfirmation] = useState<string>("")
  const [errors, setErrors] = useState<string[]>([])

  const onChangeName = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    setFormName(event.target.value)
  }, [])

  const onChangeEmail = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    setFormEmail(event.target.value)
  }, [])

  const onChangePassword = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    setFormPassword(event.target.value)
  }, [])

  const onChangePasswordConfirmation = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    setFormPasswordConfirmation(event.target.value)
  }, [])

  function signUp() {
    if (formName === "" || formEmail === "" || formPassword === "" || formPasswordConfirmation === "" ) {
      return;
    }

    axios.post('http://localhost:3001/sign_up', {
      name: formName,
      email: formEmail,
      password: formPassword,
      password_confirmation: formPasswordConfirmation,
    }).then(res => {
      console.log(res)
      setIsSignedUp(true)
      setSignedUpUser({
        id: res.data.id,
        email: res.data.email,
        name: res.data.name
      })
    }).catch(err => {
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

  if (isSignedUp) {
    const UserInfo = (signedUpUser !== undefined) ? (
      <div>
        <Row>
          <Label>Username</Label>
          <Label>{signedUpUser.name}</Label>
        </Row>
        <Row>
          <Label>Email</Label>
          <Label>{signedUpUser.email}</Label>
        </Row>
      </div>
    ) : (
      null
    )

    return (
      <FormWrapper>
        <Row>
          Thank you!
        </Row>
        <Row>
          Created new account! Please login!
        </Row>
        {UserInfo}
      </FormWrapper>
    )  
  } else {
    return (
      <FormWrapper>
        <Error/>
        <Row>
          <Label>Name</Label>
          <Input
            placeholder="Input your name"
            value={formName}
            onChange={onChangeName}
          />
        </Row>
        <Row>
          <Label>Email</Label>
          <Input
            placeholder="Input your email"
            value={formEmail}
            onChange={onChangeEmail}
          />
        </Row>
        <Row>
          <Label>Password</Label>
          <Input
            placeholder="Input your password"
            value={formPassword}
            onChange={onChangePassword}
          />
        </Row>
        <Row>
          <Label>Confirm Password</Label>
          <Input
            placeholder="Input your password for confirmation"
            value={formPasswordConfirmation}
            onChange={onChangePasswordConfirmation}
          />
        </Row>
        <Row>
          <SubmitButton onClick={signUp}>SIGN UP</SubmitButton>
        </Row>
      </FormWrapper>
    )
  }
}

const SignUp: React.FC = () => {
    return (
     <Wrapper>
        <Header>
          <Title>Sign Up</Title>
        </Header>
        <Form/>
      </Wrapper>  
    );
}

export default SignUp;