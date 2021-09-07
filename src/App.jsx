import {useState, useRef} from 'react';
import styled from 'styled-components';
import './App.css';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 16px 0;
`;

const ArrayItems = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 16px 0;
`;

const ArrayItem = styled.div`
    color: ${props => props.active ? 'green' : 'black'};
    font-weight: ${props => props.active ? '700' : '400'};
    margin: 16px;
    font-size: 20px;
`;

const InputContainer = styled.div`
    margin: 16px 0;
`;

const Input = styled.input`
    margin: 0 8px;
    padding: 8px;
`;

const BaseButton = styled.button`
    padding: 8px;
    font-weight: 600;
    cursor: pointer;

    &:disabled {
        cursor: not-allowed;
    }
`;

const Bracket = styled.span`
    font-size: 40px;
    font-weight: 900;
    margin: 0 8px;
    padding-bottom: 8px;
`;

const Title = styled.h1`
    font-weight: 700;
    margin: 16px 0;
`;

const Message = styled.p`
    font-size: 16px;
`;

function App() {
  const inputRef = useRef(null);
  const [userInput, setUserInput] = useState('');
  const [currentArray, setCurrentArray] = useState([]);
  const [sortArray, setSortArray] = useState([]);
  const [isAllSorted, setIsAllSorted] = useState(false);
  const [swapIndex, setSwapIndex] = useState(null);

  const handleChange = (e) => {
      if (e.target.value.match(/^\d+$/)) {
          setUserInput(e.target.value);
      }
      if (e.target.value !== 0 && !e.target.value) {
        setUserInput('');
      }
  }
  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter') {
        handleAdd()
    }
  }

  const handleAdd = () => {
      if (userInput) {
        setCurrentArray(currentArray.concat(Number(userInput)));
        setUserInput('');
        inputRef.current.focus();
      }
  }

  const handleSort = () => {
      const isFirstTry = sortArray.length === 0;
      const sortingArray = isFirstTry ? currentArray.slice() : sortArray.slice();

      for (let i = 1; i <= sortingArray.length; i++) {
          for (let j = 0; j <= sortingArray.length - 1; j++) {
              
            if (i === currentArray.length) {
                setIsAllSorted(true);
            }

            if (sortingArray[j] > sortingArray[j + 1]) {
                let bigger = sortingArray[j];
                let smaller = sortingArray[j + 1];
                sortingArray[j] = smaller;
                sortingArray[j + 1] = bigger;
                setSwapIndex(j)
                return setSortArray(sortingArray);
            }
          }
      }
  }

  const currentArrayContent = currentArray.map(item => (
    <ArrayItem>{item}</ArrayItem>
  ));
  const sortContent = sortArray.map((item, index) => (
    <ArrayItem active={index === swapIndex}>{item}</ArrayItem>
  ));

  return (
      <Container>
          <Title>Your Array: </Title>
          <ArrayItems>
              <Bracket>[</Bracket>{currentArrayContent}<Bracket>]</Bracket>
          </ArrayItems>
          <InputContainer>
            <Input ref={inputRef} onInput={handleChange} onKeyDown={handleInputKeyDown} value={userInput}/>
            <BaseButton onClick={handleAdd} disabled={userInput.length === 0}>Add to Your Array</BaseButton>
          </InputContainer>
          <BaseButton onClick={handleSort} disabled={isAllSorted || currentArray.length === 0}>Sort Your Array!</BaseButton>
          <ArrayItems>
              <Bracket>[</Bracket>{sortContent}<Bracket>]</Bracket>
          </ArrayItems>
          {isAllSorted ? <Message>Your array is all sorted!</Message> : null}
      </Container>
  );
}

export default App;
