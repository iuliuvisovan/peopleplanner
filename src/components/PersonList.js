import styled from 'styled-components';
import Person from './Person';
import { useDrop } from 'react-dnd';

const Container = styled.div`
  flex: 1;
  background-color: #fffd;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 300px;
  flex: 0.5;
  border: 1px solid #e0e6f0;
  overflow: hidden;
  ${props => props.isOver && `
    box-shadow: 0 0 0 2px #ffbd59, 0 4px 10px rgba(0, 0, 0, 0.12);
    background-color: #fff8f0;
  `}
`;

const Title = styled.h2`
  margin-top: 0;
  color: #444240;
  border-bottom: 2px solid #e0e6f0;
  padding-bottom: 0.75rem;
  margin-bottom: 1.25rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  letter-spacing: 0.5px;
`;

const List = styled.div`
  overflow-y: auto;
  flex: 1;
  padding: 16px 32px;
  margin: -16px -32px;
`;

const EmptyState = styled.div`
  color: #444240;
  text-align: center;
  padding: 2rem;
  font-style: italic;
  background-color: #f7f9fc;
  border-radius: 0.5rem;
  border: 2px dashed #ffbf47;
  font-family: 'Montserrat', sans-serif;
`;

function PersonList({ people }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'ASSIGNED_PERSON',
    drop: (item) => {
      if (item.roomId) {
        // Find the room to unassign from
        window.dispatchEvent(new CustomEvent('unassign-person', { 
          detail: { personId: item.id, roomId: item.roomId } 
        }));
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }), []);

  return (
    <Container ref={drop} isOver={isOver}>
      <Title>Invitați</Title>
      <List>
        {people.length > 0 ? (
          people.map((person) => <Person key={person.id} id={person.id} name={person.name} fromWho={person.fromWho} inRoom={false} />)
        ) : (
          <EmptyState>Toți invitații au fost distribuiți!</EmptyState>
        )}
      </List>
    </Container>
  );
}

export default PersonList;
