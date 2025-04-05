import styled from 'styled-components';
import Room from './Room';

const Container = styled.div`
  flex: 2;
  background-color: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  height: 100%;
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

const HotelsContainer = styled.div`
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

const HotelSection = styled.div`
  margin-bottom: 2rem;
`;

const HotelHeader = styled.div`
  background: linear-gradient(90deg, #d4af37 0%, #f5d76e 100%);
  color: #4a3900;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
`;

const HotelName = styled.h3`
  margin: 0;
  font-weight: 600;
  font-family: 'Montserrat', sans-serif;
`;

const HotelIcon = styled.span`
  margin-right: 0.75rem;
  font-size: 1.25rem;
`;

const RoomsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  padding: 0 0.5rem;
`;

function HotelList({ hotels, onAssignPerson, onUnassignPerson }) {
  const getHotelIcon = (hotelName) => {
    if (hotelName.includes('Elania')) return '🏨';
    if (hotelName.includes('Casa Mari')) return '🏡';
    if (hotelName.includes('View')) return '🏞️';
    if (hotelName.includes('Făget')) return '🌳';
    return '🏘️';
  };

  return (
    <Container>
      <Title>Cazare Disponibilă</Title>
      <HotelsContainer>
        {hotels.map(hotel => (
          <HotelSection key={hotel.id}>
            <HotelHeader>
              <HotelIcon>{getHotelIcon(hotel.name)}</HotelIcon>
              <HotelName>{hotel.name}</HotelName>
            </HotelHeader>
            <RoomsGrid>
              {hotel.rooms.map(room => (
                <Room 
                  key={room.id}
                  id={room.id}
                  name={room.name}
                  capacity={room.capacity}
                  guests={room.guests}
                  onAssignPerson={onAssignPerson}
                  onUnassignPerson={onUnassignPerson}
                />
              ))}
            </RoomsGrid>
          </HotelSection>
        ))}
      </HotelsContainer>
    </Container>
  );
}

export default HotelList;