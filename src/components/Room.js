import { useDrop } from 'react-dnd';
import styled from 'styled-components';
import Person from './Person';

const RoomContainer = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  padding: 1.25rem;
  margin-bottom: 1rem;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.2s;
  border: 1px solid #ffe0b2;
  
  ${props => props.isOver && `
    box-shadow: 0 0 0 2px #ffbd59, 0 4px 10px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
    background-color: #fff8f0;
  `}
`;

const RoomHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  border-bottom: 1px solid #ffbf47;
  padding-bottom: 0.75rem;
`;

const RoomName = styled.h3`
  margin: 0;
  color: #444240;
  font-weight: 600;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.95rem;
`;

const RoomCapacity = styled.div`
  background-color: ${props => {
    if (props.filled > props.capacity) return '#fff0e0';
    if (props.filled === props.capacity) return '#f0fff4';
    return '#fff2e6';
  }};
  
  color: #444240;
  
  padding: 0.25rem 0.75rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 600;
  font-family: 'Montserrat', sans-serif;
  border: 1px solid #ffbf47;
`;

const GuestList = styled.div`
  min-height: 100px;
  background-color: ${props => props.isOver ? '#fff8f0' : 'transparent'};
  border-radius: 0.25rem;
  transition: background-color 0.2s;
  padding: ${props => props.isEmpty ? '0' : '0.5rem 0'};
`;

const EmptyState = styled.div`
  color: #444240;
  text-align: center;
  padding: 1.5rem;
  border: 2px dashed #ffbf47;
  border-radius: 0.25rem;
  font-style: italic;
  background-color: #fff8f0;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
`;

function Room({ id, name, capacity, guests, onAssignPerson, onUnassignPerson }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'PERSON',
    drop: (item) => {
      onAssignPerson(item.id, id);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }), [id, onAssignPerson]);

  return (
    <RoomContainer isOver={isOver}>
      <RoomHeader>
        <RoomName>{name}</RoomName>
        <RoomCapacity 
          filled={guests.length} 
          capacity={capacity}
        >
          {guests.length}/{capacity}
        </RoomCapacity>
      </RoomHeader>
      
      <GuestList 
        ref={drop} 
        isOver={isOver}
        isEmpty={guests.length === 0}
      >
        {guests.length > 0 ? (
          guests.map(guest => (
            <Person 
              key={guest.id}
              id={guest.id}
              name={guest.name}
              inRoom={true}
              roomId={id}
              onUnassign={onUnassignPerson}
            />
          ))
        ) : (
          <EmptyState>Trage invitații aici</EmptyState>
        )}
      </GuestList>
    </RoomContainer>
  );
}

export default Room;