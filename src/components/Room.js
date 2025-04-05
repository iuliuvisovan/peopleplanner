import { useDrop } from 'react-dnd';
import styled from 'styled-components';
import Person from './Person';

const RoomContainer = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  padding: 1.25rem;
  margin-bottom: 1rem;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.2s;
  border: 1px solid #f0e6ba;
  
  ${props => props.isOver && `
    box-shadow: 0 0 0 2px #d4af37, 0 4px 10px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
    background-color: #faf9f0;
  `}
`;

const RoomHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  border-bottom: 1px solid #d4af37;
  padding-bottom: 0.75rem;
`;

const RoomName = styled.h3`
  margin: 0;
  color: #4a3900;
  font-weight: 600;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.95rem;
`;

const RoomCapacity = styled.div`
  background-color: ${props => {
    if (props.filled > props.capacity) return '#fff0e0';
    if (props.filled === props.capacity) return '#f0fff4';
    return '#fef8e0';
  }};
  
  color: ${props => {
    if (props.filled > props.capacity) return '#9a3412';
    if (props.filled === props.capacity) return '#047857';
    return '#805e00';
  }};
  
  padding: 0.25rem 0.75rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 600;
  font-family: 'Montserrat', sans-serif;
  border: 1px solid ${props => {
    if (props.filled > props.capacity) return '#fdba74';
    if (props.filled === props.capacity) return '#34d399';
    return '#d4af37';
  }};
`;

const GuestList = styled.div`
  min-height: 100px;
  background-color: ${props => props.isOver ? '#faf9f0' : 'transparent'};
  border-radius: 0.25rem;
  transition: background-color 0.2s;
  padding: ${props => props.isEmpty ? '0' : '0.5rem 0'};
`;

const EmptyState = styled.div`
  color: #b8860b;
  text-align: center;
  padding: 1.5rem;
  border: 2px dashed #d4af37;
  border-radius: 0.25rem;
  font-style: italic;
  background-color: #faf9f0;
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