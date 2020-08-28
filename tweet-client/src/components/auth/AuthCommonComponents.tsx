import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
const FormWrapper = styled.div`
  margin: 3vh 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Row = styled.div`
  margin: 1vh 0;
  height: 5vh;
  display: flex;
  flex-direction: row;
`;
const Label = styled.div`
  margin: 0 1vw;
  width: 5vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Input = styled.input`
  margin: 0 1vw;
  width: 40vw;
  height: 100%;
  border: none;
  border-radius: 4px;
  box-shadow: inset 0 1px 2px #ccc;
`;
const SubmitButton = styled.div`
  width: 10vw;
  border: 1px solid #646464;
  border-radius: 4px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #646464;
  }
`;

export {
    Wrapper,
    Header,
    Title,
    FormWrapper,
    Row,
    Label,
    Input,
    SubmitButton
}