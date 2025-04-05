import { useDrag } from 'react-dnd';
import styled from 'styled-components';

const PersonItem = styled.div`
  padding: 1rem;
  margin-bottom: 0.75rem;
  background-color: ${props => props.isDragging ? '#f7f9fc' : 'white'};
  border-radius: 0.5rem;
  box-shadow: 0 0px 4px rgba(0, 0, 0, 0.26);
  cursor: grab;
  transition: all 0.2s ease;
  opacity: ${props => props.isDragging ? 0.5 : 1};
  border-left: 4px solid ${props => {
    return (props.fromWho === 'groom' ? '#1991d2' : '#e2a1ad');
    // return props.inRoom ? 'green' : '#ffbd59';
  }};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: ${props => {
      if (props.fromWho === 'groom') return '#f0f5ff';
      return props.inRoom ? '#fff4ed' : '#fff8f0';
    }};
  }
`;

const PersonName = styled.p`
  margin: 0;
  font-weight: 500;
  color: #444240;
  font-family: 'Montserrat', sans-serif;
  letter-spacing: 0.2px;
`;

function Person({ id, name, inRoom, roomId, onUnassign, fromWho }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: inRoom ? 'ASSIGNED_PERSON' : 'PERSON',
    item: { id, name, roomId, fromWho },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [id, name, inRoom, roomId, fromWho]);

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
      fromWho={fromWho}
      title={title}
    >
      <PersonName>{name}</PersonName>
    </PersonItem>
  );
}

export default Person;