import {useState, useMemo} from 'react';
import styled, {css} from 'styled-components';
import {animals, bios} from './models/Animals';

const Wrapper = styled.div`
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #19375d;
  padding: 16px 24px;
`;

const SearchInput = styled.input`
  height: 40px;
  background: #19375d;
  color: white;
  border: 1px solid white;
  border-radius: 24px;
  padding: 0 16px;
  outline: none;
  font-size: 1rem;
  &::placeholder {
    color: white;
  }
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const FilterSection = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid lightgray;
  padding: 24px;
`;

const TypeTitle = styled.p`
  font-size: 2rem;
  font-weight: 700;
  color: #888888;
`;

const AnimalsTypeList = styled.div`
  display: flex;
  align-items: center;
`;

const AnimalsTypeListItem = styled.div`
  margin: 0 8px;
  padding: 8px 16px;
  background: ${props => props.active ? '#00d5a3' : 'white'};
  color: ${props => props.active ? 'white' : '#4c5365'};
  cursor: pointer;
  border-radius: 24px;
  text-transform: capitalize;
`;

const AnimalCards = styled.div`
  display: grid;
  grid-gap: 24px;
  padding: 24px;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
`;

const AnimalCard = styled.div`
  display: grid;
  grid-template-columns: repeat(4,1fr);
  grid-template-rows: repeat(6,1fr);
  padding: 24px;
  cursor: pointer;
  ${props => props.imgSrc ? css`
    background-image: url('${props.imgSrc}');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  ` :
  'background-color: lightgray;'};
`;

const AnimalCardHeart = styled.div`
  grid-column: 4/5;
  width: 40px;
  height: 40px;
  background: white;
  border-radius: 50%;
  box-shadow: 0px 0px 2px #94948f8c;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: start;
  justify-self: end;
`;

const AnimalCarddescription = styled.div`
  grid-column: 1/-1;
  grid-row: 6/-1;
`;

const AnimalCardName = styled.p`
  color: white;
  font-size: 18px;
  font-weight: 700;
  margin: 0;
`;

const AnimalCardSexAndBreed = styled.p`
  color: white;
  font-size: 16px;
  font-weight: 400;
  margin: 8px 0;
`;

const BioContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const BackButton = styled.div`
  font-size: 24px;
  color: lightgray;
  cursor: pointer;
`;

function App() {
  const [userInput, setUserInput] = useState('');
  const animalTypes = useMemo(() => animals.map(animal => animal.type), [])
  const [currentAnimalType, setCurrentAnimalType] = useState(null);
  const [currentAnimalBio, setCurrentAnimalBio] = useState(null);
  const filteredAnimals = useMemo(() => {
    if (currentAnimalType) {
      return animals.filter(animal => animal.type === currentAnimalType);
    } else {
      return animals;
    }
  }, [currentAnimalType])

  const handleSearch = (e) => {
    setUserInput(e.target.value)
  };

  const animalTypesListContent = animalTypes
  .filter((item, index) => animalTypes.indexOf(item) == index)
  .map(animalType => (
    <AnimalsTypeListItem active={animalType === currentAnimalType} onClick={() => setCurrentAnimalType(currentAnimalType === animalType ? null : animalType)}>
      {animalType}
    </AnimalsTypeListItem>
  ))

  const animalsCardsContent = filteredAnimals.map(animal => (
    <AnimalCard onClick={() => setCurrentAnimalBio(animal)} imgSrc={animal.img}>
      <AnimalCardHeart>❤️</AnimalCardHeart>
      <AnimalCarddescription>
        <AnimalCardName>{animal.name}</AnimalCardName>
        <AnimalCardSexAndBreed>{`${animal.sex} ${animal.breed}`}</AnimalCardSexAndBreed>
      </AnimalCarddescription>
    </AnimalCard>
  ))

  return (
    <Wrapper>
      <Header>
        <SearchInput onInput={handleSearch} value={userInput} placeholder={'Search..'}/>
        <Avatar src={"https://avatars.githubusercontent.com/u/22937530?s=400&u=e38fae08c818ef01fa7e905ec2c374101ddbf16e&v=4"} />
      </Header>
      <Container>
        {currentAnimalBio ?
          <BioContainer>
            <BackButton onClick={() => setCurrentAnimalBio(null)}>Go Back</BackButton>
            {bios.filter(bio => bio.id === currentAnimalBio.id)[0].bio}
          </BioContainer>
        :
        <>
          <FilterSection>
            <TypeTitle>TYPE</TypeTitle>
            <AnimalsTypeList>
              {animalTypesListContent}
            </AnimalsTypeList>
          </FilterSection>
          <AnimalCards>
            {animalsCardsContent}
          </AnimalCards>
        </>
        }
      </Container>
    </Wrapper>
  );
}

export default App;
