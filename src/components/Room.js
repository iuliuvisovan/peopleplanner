import { useDrop } from 'react-dnd';
import styled from 'styled-components';
import Person from './Person';

const RoomContainer = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  padding: 1.25rem;
  margin-bottom: 1rem;
  transition: all 0.2s;
  border: 1px solid #ffe0b2;
  background: hsl(41 98% 98% / 1);

  height: ${(props) => (props.capacity === 3 ? '280px' : '222px')};

  ${(props) =>
    props.isOver &&
    `
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
  background-color: ${(props) => {
    if (props.filled > props.capacity) return '#fff';
    if (props.filled === props.capacity) return '#fff2e6';
    return '#fff';
  }};

  color: hsl(39 87% 45% / 1);

  padding: 0.25rem 0.5rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 600;
  font-family: 'Montserrat', sans-serif;
  border: 1px solid hsl(32 100% 75% / 1);
  letter-spacing: 1.5px;
`;

const GuestList = styled.div`
  min-height: ${(props) => (props.capacity === 3 ? '140px' : '100px')};
  background-color: ${(props) => (props.isOver ? '#fff8f0' : 'transparent')};
  border-radius: 0.25rem;
  transition: background-color 0.2s;
  padding: ${(props) => (props.isEmpty ? '0' : '0.5rem 0')};
  height: calc(100% - 56px);
`;

const EmptyState = styled.div`
  text-align: center;
  border: 2px dashed hsl(32 100% 73% / 1);
  border-radius: 10px;
  font-style: italic;
  background-color: #fff;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  min-height: ${(props) => (props.capacity === 3 ? '140px' : '100px')};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

function Room({ id, name, capacity, guests, onAssignPerson, onUnassignPerson }) {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: 'PERSON',
      drop: (item) => {
        onAssignPerson(item.id, id);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [id, onAssignPerson],
  );

  return (
    <RoomContainer isOver={isOver} capacity={capacity}>
      <RoomHeader>
        <RoomName>{name}</RoomName>
        <RoomCapacity filled={guests.length} capacity={capacity}>
          {guests.length}/{capacity}
        </RoomCapacity>
      </RoomHeader>

      <GuestList ref={drop} isOver={isOver} isEmpty={guests.length === 0} capacity={capacity}>
        {guests.length > 0 ? (
          guests.map((guest) => (
            <Person
              key={guest.id}
              id={guest.id}
              name={guest.name}
              inRoom={true}
              roomId={id}
              onUnassign={onUnassignPerson}
              fromWho={guest.fromWho}
            />
          ))
        ) : (
          <EmptyState capacity={capacity}>Trage invitații aici</EmptyState>
        )}
      </GuestList>
    </RoomContainer>
  );
}

export default Room;
