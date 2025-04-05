import { useDrag } from 'react-dnd';
import styled from 'styled-components';

const PersonItem = styled.div`
  padding: 1rem;
  margin-bottom: 0.75rem;
  background-color: ${props => props.isDragging ? '#faf9f0' : 'white'};
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  cursor: grab;
  transition: all 0.2s ease;
  opacity: ${props => props.isDragging ? 0.5 : 1};
  border-left: 4px solid ${props => props.inRoom ? '#b8860b' : '#d4af37'};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
    background-color: ${props => props.inRoom ? '#faf9f0' : '#fefbf0'};
  }
`;

const PersonName = styled.p`
  margin: 0;
  font-weight: 500;
  color: #4a3900;
  font-family: 'Montserrat', sans-serif;
  letter-spacing: 0.2px;
`;

function Person({ id, name, inRoom, roomId, onUnassign }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: inRoom ? 'ASSIGNED_PERSON' : 'PERSON',
    item: { id, name, roomId },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [id, name, inRoom, roomId]);

  const handleClick = () => {
    if (inRoom && onUnassign) {
      onUnassign(id, roomId);
    }
  };

  // Add hover title in Romanian
  const title = inRoom ? 'Apasă pentru a elimina' : 'Trage pentru a atribui';

  return (
    <PersonItem 
      ref={drag} 
      isDragging={isDragging}
      onClick={handleClick}
      inRoom={inRoom}
      title={title}
    >
      <PersonName>{name}</PersonName>
    </PersonItem>
  );
}

export default Person;