import { useState, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styled from 'styled-components';
import './App.css';
import PersonList from './components/PersonList';
import HotelList from './components/HotelList';

// Sample data with Romanian names - replace with your actual data
const samplePeople = [
  { id: 'p1', name: 'Ion Popescu' },
  { id: 'p2', name: 'Maria Ionescu' },
  { id: 'p3', name: 'Andrei Popa' },
  { id: 'p4', name: 'Elena Dumitru' },
  { id: 'p5', name: 'Mihai Stoica' },
  { id: 'p6', name: 'Ana Constantinescu' },
  { id: 'p7', name: 'Alexandru Diaconu' },
  { id: 'p8', name: 'Cristina Moldovan' },
  { id: 'p9', name: 'Bogdan Georgescu' },
  { id: 'p10', name: 'Ioana Stancu' },
  { id: 'p11', name: 'Florin Radu' },
  { id: 'p12', name: 'Gabriela Munteanu' },
  { id: 'p13', name: 'Radu Ștefănescu' },
  { id: 'p14', name: 'Monica Vasilescu' },
  { id: 'p15', name: 'Daniel Iliescu' },
  { id: 'p16', name: 'Simona Toma' },
  { id: 'p17', name: 'Adrian Marin' },
  { id: 'p18', name: 'Ileana Cosma' },
  { id: 'p19', name: 'George Dumitrescu' },
  { id: 'p20', name: 'Alina Florescu' },
  { id: 'p21', name: 'Victor Dragomir' },
  { id: 'p22', name: 'Laura Manolache' },
  { id: 'p23', name: 'Marius Niculescu' },
  { id: 'p24', name: 'Diana Popovici' },
];

// Cazari hardcodate in ordine: mai intai pensiunile, apoi hotelurile
const accommodations = [
  // Mai intai pensiunile
  {
    id: 'h1',
    name: 'Pensiunea "Casa Mari"',
    rooms: [
      { id: 'casa-mari-double-1', name: 'Camera Dublă 1', capacity: 2, guests: [] },
      { id: 'casa-mari-double-2', name: 'Camera Dublă 2', capacity: 2, guests: [] },
      { id: 'casa-mari-triple-1', name: 'Camera Triplă 1', capacity: 3, guests: [] },
      { id: 'casa-mari-triple-2', name: 'Camera Triplă 2', capacity: 3, guests: [] }
    ]
  },
  {
    id: 'h2',
    name: 'Pensiunea "View"',
    rooms: [
      { id: 'view-double-1', name: 'Camera Dublă 1', capacity: 2, guests: [] },
      { id: 'view-double-2', name: 'Camera Dublă 2', capacity: 2, guests: [] },
      { id: 'view-double-3', name: 'Camera Dublă 3', capacity: 2, guests: [] },
      { id: 'view-double-4', name: 'Camera Dublă 4', capacity: 2, guests: [] },
      { id: 'view-double-5', name: 'Camera Dublă 5', capacity: 2, guests: [] },
      { id: 'view-double-6', name: 'Camera Dublă 6', capacity: 2, guests: [] },
      { id: 'view-double-7', name: 'Camera Dublă 7', capacity: 2, guests: [] }
    ]
  },
  {
    id: 'h3',
    name: 'Pensiunea "Casa Făget"',
    rooms: [
      { id: 'faget-double-1', name: 'Camera Dublă 1', capacity: 2, guests: [] },
      { id: 'faget-double-2', name: 'Camera Dublă 2', capacity: 2, guests: [] },
      { id: 'faget-triple-1', name: 'Camera Triplă 1', capacity: 3, guests: [] },
      { id: 'faget-triple-2', name: 'Camera Triplă 2', capacity: 3, guests: [] }
    ]
  },
  // Apoi hotelurile
  {
    id: 'h4',
    name: 'Hotel "Elania Resort"',
    rooms: [
      { id: 'elania-double-1', name: 'Camera Dublă 1', capacity: 2, guests: [] },
      { id: 'elania-double-2', name: 'Camera Dublă 2', capacity: 2, guests: [] },
      { id: 'elania-double-3', name: 'Camera Dublă 3', capacity: 2, guests: [] },
      { id: 'elania-double-4', name: 'Camera Dublă 4', capacity: 2, guests: [] },
      { id: 'elania-double-5', name: 'Camera Dublă 5', capacity: 2, guests: [] },
      { id: 'elania-double-6', name: 'Camera Dublă 6', capacity: 2, guests: [] },
      { id: 'elania-double-7', name: 'Camera Dublă 7', capacity: 2, guests: [] },
      { id: 'elania-double-8', name: 'Camera Dublă 8', capacity: 2, guests: [] },
      { id: 'elania-double-9', name: 'Camera Dublă 9', capacity: 2, guests: [] },
      { id: 'elania-double-10', name: 'Camera Dublă 10', capacity: 2, guests: [] },
      { id: 'elania-double-11', name: 'Camera Dublă 11', capacity: 2, guests: [] },
      { id: 'elania-double-12', name: 'Camera Dublă 12', capacity: 2, guests: [] },
      { id: 'elania-double-13', name: 'Camera Dublă 13', capacity: 2, guests: [] },
      { id: 'elania-double-14', name: 'Camera Dublă 14', capacity: 2, guests: [] },
      { id: 'elania-double-15', name: 'Camera Dublă 15', capacity: 2, guests: [] },
      { id: 'elania-double-16', name: 'Camera Dublă 16', capacity: 2, guests: [] },
      { id: 'elania-double-17', name: 'Camera Dublă 17', capacity: 2, guests: [] },
      { id: 'elania-twin-1', name: 'Camera Twin 1', capacity: 2, guests: [] },
      { id: 'elania-twin-2', name: 'Camera Twin 2', capacity: 2, guests: [] },
      { id: 'elania-twin-3', name: 'Camera Twin 3', capacity: 2, guests: [] },
      { id: 'elania-twin-4', name: 'Camera Twin 4', capacity: 2, guests: [] },
      { id: 'elania-twin-5', name: 'Camera Twin 5', capacity: 2, guests: [] }
    ]
  }
];

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #fff8f0;
  font-family: 'Montserrat', sans-serif;
`;

const Header = styled.header`
  background: linear-gradient(135deg, #ff8c42 0%, #ffbd59 100%);
  color: #4a2500;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const HeaderTitle = styled.h1`
  margin: 0;
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
  letter-spacing: 1px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.15);
`;

const MainContainer = styled.main`
  display: flex;
  flex: 1;
  padding: 2rem;
  gap: 2rem;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

function App() {
  const [hotels, setHotels] = useState(accommodations);
  const [unassignedPeople, setUnassignedPeople] = useState(samplePeople);

  const handleAssignPerson = useCallback((personId, roomId) => {
    // Find the person
    const person = unassignedPeople.find(p => p.id === personId);
    if (!person) return;

    // Remove from unassigned list
    setUnassignedPeople(prev => prev.filter(p => p.id !== personId));

    // Add to room
    setHotels(prev => prev.map(hotel => {
      // Check if the room belongs to this hotel
      const roomIndex = hotel.rooms.findIndex(room => room.id === roomId);
      if (roomIndex === -1) return hotel;

      // Clone the hotel and its rooms
      const updatedHotel = { ...hotel, rooms: [...hotel.rooms] };
      // Update the specific room
      updatedHotel.rooms[roomIndex] = {
        ...updatedHotel.rooms[roomIndex],
        guests: [...updatedHotel.rooms[roomIndex].guests, person]
      };

      return updatedHotel;
    }));
  }, [unassignedPeople]);

  const handleUnassignPerson = useCallback((personId, roomId) => {
    // Find the hotel and room
    let foundPerson = null;

    setHotels(prev => prev.map(hotel => {
      // Check if the room belongs to this hotel
      const roomIndex = hotel.rooms.findIndex(room => room.id === roomId);
      if (roomIndex === -1) return hotel;

      // Find the person in the room
      const room = hotel.rooms[roomIndex];
      const personIndex = room.guests.findIndex(p => p.id === personId);
      if (personIndex === -1) return hotel;

      // Save reference to the person we're removing
      foundPerson = room.guests[personIndex];

      // Clone the hotel and its rooms
      const updatedHotel = { ...hotel, rooms: [...hotel.rooms] };
      // Update the specific room to remove the person
      updatedHotel.rooms[roomIndex] = {
        ...room,
        guests: room.guests.filter(p => p.id !== personId)
      };

      return updatedHotel;
    }));

    // Add the person back to unassigned list if we found them
    if (foundPerson) {
      setUnassignedPeople(prev => [...prev, foundPerson]);
    }
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <AppContainer>
        <Header>
          <HeaderTitle>Planificarea Camerelor pentru Nuntă</HeaderTitle>
        </Header>
        <MainContainer>
          <PersonList 
            people={unassignedPeople} 
          />
          <HotelList 
            hotels={hotels} 
            onAssignPerson={handleAssignPerson}
            onUnassignPerson={handleUnassignPerson}
          />
        </MainContainer>
      </AppContainer>
    </DndProvider>
  );
}

export default App;
