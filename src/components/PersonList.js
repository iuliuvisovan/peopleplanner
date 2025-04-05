import styled from 'styled-components';
import Person from './Person';

const Container = styled.div`
  flex: 1;
  background-color: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 300px;
  border: 1px solid #ffbd59;
  overflow: hidden;
`;

const Title = styled.h2`
  margin-top: 0;
  color: #ff8c42;
  border-bottom: 2px solid #ffbd59;
  padding-bottom: 0.75rem;
  margin-bottom: 1.25rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  letter-spacing: 0.5px;
`;

const List = styled.div`
  overflow-y: auto;
  flex: 1;
  padding-right: 0.5rem;
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #fff2e6;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #ffbd59;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #ff8c42;
  }
`;

const EmptyState = styled.div`
  color: #ff8c42;
  text-align: center;
  padding: 2rem;
  font-style: italic;
  background-color: #fff2e6;
  border-radius: 0.5rem;
  border: 2px dashed #ffbd59;
  font-family: 'Montserrat', sans-serif;
`;

function PersonList({ people }) {
  return (
    <Container>
      <Title>Invitați la Nuntă</Title>
      <List>
        {people.length > 0 ? (
          people.map(person => (
            <Person 
              key={person.id}
              id={person.id}
              name={person.name}
              inRoom={false}
            />
          ))
        ) : (
          <EmptyState>Toți invitații au fost distribuiți!</EmptyState>
        )}
      </List>
    </Container>
  );
}

export default PersonList;