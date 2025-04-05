import { useState } from 'react';
import styled from 'styled-components';
import Room from './Room';

const Container = styled.div`
  flex: 2;
  background-color: #fffe;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid #e0e6f0;
  overflow: hidden;
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

const HotelsContainer = styled.div`
  overflow-y: auto;
  flex: 1;
  padding-right: 0.5rem;
`;

const HotelSection = styled.div`
  margin-bottom: 2rem;
`;

const HotelHeader = styled.div`
  background: linear-gradient(0, hsl(41.02deg 84.69% 64%), #ffcf66);
  color: #4a2500;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12);
  }
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

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
`;

const ExpandIcon = styled.span`
  font-size: 1rem;
  transition: transform 0.3s;
  transform: ${(props) => (props.expanded ? 'rotate(180deg)' : 'rotate(0deg)')};
  color: #4a2500;
  opacity: 0.7;
`;

const RoomsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));

  gap: 1rem;
  padding: 0 0.5rem;
  margin-top: -4px;
  padding-top: 4px;
  max-height: ${(props) => (props.expanded ? '2000px' : '0')};
  overflow: hidden;
  opacity: ${(props) => (props.expanded ? '1' : '0')};
  transition: max-height 0.4s ease-in-out, opacity 0.2s ease-in-out;
  transition-delay: ${(props) => (props.expanded ? '0s, 0.1s' : '0s, 0s')};
`;

function HotelList({ hotels, onAssignPerson, onUnassignPerson }) {
  // State to track which hotels are expanded, with first hotel expanded by default
  const [expandedHotels, setExpandedHotels] = useState({
    1: true // Set the first pensiune (Casa Mari) to be expanded by default
  });

  const getHotelIcon = (hotelName) => {
    if (hotelName.includes('Elania')) return '🏨';
    if (hotelName.includes('Casa Mari')) return '🏡';
    if (hotelName.includes('View')) return '🏞️';
    if (hotelName.includes('Făget')) return '🌳';
    return '🏘️';
  };

  const toggleHotelExpansion = (hotelId) => {
    setExpandedHotels((prev) => ({
      ...prev,
      [hotelId]: !prev[hotelId],
    }));
  };

  return (
    <Container>
      <Title>Cazare Disponibilă</Title>
      <HotelsContainer>
        {hotels.map((hotel) => (
          <HotelSection key={hotel.id}>
            <HotelHeader onClick={() => toggleHotelExpansion(hotel.id)}>
              <HeaderContent>
                <HotelIcon>{getHotelIcon(hotel.name)}</HotelIcon>
                <HotelName>{hotel.name}</HotelName>
              </HeaderContent>
              <ExpandIcon expanded={expandedHotels[hotel.id]}>▼</ExpandIcon>
            </HotelHeader>
            <RoomsGrid expanded={expandedHotels[hotel.id]}>
              {hotel.rooms.map((room) => (
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
