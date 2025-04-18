import { useDrag } from 'react-dnd';
import styled from 'styled-components';

const PersonItem = styled.div`
  padding: 1rem;
  margin-bottom: 0.75rem;
  background-color: ${(props) => {
    if (props.isDragging) return '#f7f9fc';
    if (props.highlight) return '#fff8f0';
    return 'white';
  }};
  border-radius: 0.5rem;
  box-shadow: ${(props) => (props.highlight ? '0 0 0 2px #ffbd59, 0 4px 8px rgba(0, 0, 0, 0.15)' : '0 0px 4px rgba(0, 0, 0, 0.26)')};
  transition: all 0.05s;
  cursor: ${(props) => (props.inRoom ? 'pointer' : 'grab')};
  opacity: ${(props) => (props.isDragging ? 0.5 : 1)};
  border-left: 4px solid
    ${(props) => {
      if (props.highlight) return '#ffbd59';
      return props.fromWho === 'groom' ? '#1991d2' : 'hsl(349 71% 76% / 1)';
    }};
  position: relative;

  &:hover {
    transform: scale(103%);
    box-shadow: 0 0px 12px rgba(0, 0, 0, 0.12);
  }

  &:active {
    transform: ${(props) => (props.inRoom ? 'scale(97%)' : 'scale(103%)')};
  }
`;

const PersonName = styled.p`
  margin: 0;
  font-weight: 500;
  color: #444240;
  font-family: 'Montserrat', sans-serif;
  letter-spacing: 0.2px;
`;

const Notes = styled.p`
  margin: 0;
  font-size: 0.8rem;
  color: #666;
  font-family: 'Montserrat', sans-serif;
  margin-bottom: -6px;
`;

const NightsTag = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background-color: ${props => props.nights === 1 ? '#8594e5' : '#1a237e'};
  color: white;
  font-size: 0.9rem;
  font-weight: 700;
  padding: 2px 8px;
  border-top-right-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  font-family: 'Montserrat', sans-serif;
`;

function Person({ id, name, inRoom, roomId, onUnassign, fromWho, highlight = false, notes, numberOfNights }) {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: inRoom ? 'ASSIGNED_PERSON' : 'PERSON',
      item: {
        id,
        name,
        roomId,
        fromWho,
        // Add a field to track if this person is already in a room
        inRoom,
      },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [id, name, inRoom, roomId, fromWho],
  );

  // Click handler to unassign a person when they're in a room
  const handleClick = () => {
    if (inRoom && onUnassign) {
      onUnassign(id, roomId);
    }
  };

  // Add hover title in Romanian
  const title = inRoom ? 'Apasă pentru a elimina sau trage pentru a muta' : 'Trage pentru a atribui';

  return (
    <PersonItem
      ref={drag}
      isDragging={isDragging}
      onClick={handleClick}
      inRoom={inRoom}
      fromWho={fromWho}
      highlight={highlight}
      title={title}
    >
      <PersonName style={{ marginTop: notes ? -6 : 0 }}>{name}</PersonName>
      {notes && <Notes>{notes}</Notes>}
      {numberOfNights && <NightsTag nights={numberOfNights}>{numberOfNights} 🌙</NightsTag>}
    </PersonItem>
  );
}

export default Person;
