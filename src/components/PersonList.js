import styled from 'styled-components';
import Person from './Person';

const Container = styled.div`
  flex: 1;
  background-color: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 300px;
  border: 1px solid #d4af37;
  overflow: hidden;
`;

const Title = styled.h2`
  margin-top: 0;
  color: #b8860b;
  border-bottom: 2px solid #d4af37;
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
    background: #faf6e9;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #d4af37;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #b8860b;
  }
`;

const EmptyState = styled.div`
  color: #b8860b;
  text-align: center;
  padding: 2rem;
  font-style: italic;
  background-color: #faf6e9;
  border-radius: 0.5rem;
  border: 2px dashed #d4af37;
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