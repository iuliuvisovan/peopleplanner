import { useState, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styled from 'styled-components';
import './App.css';
import PersonList from './components/PersonList';
import HotelList from './components/HotelList';

// Sample data with Romanian names - replace with your actual data
const samplePeople = [
  { id: 'g1', name: 'Danci Crina', fromWho: 'groom' },
  { id: 'g2', name: 'Danci Andrei', fromWho: 'groom' },
  { id: 'g3', name: 'Danci Mariana', fromWho: 'groom' },
  { id: 'g4', name: 'Danci Vasile', fromWho: 'groom' },
  { id: 'g5', name: 'Aurelia Visovan', fromWho: 'groom' },
  { id: 'g6', name: 'Can Cakmur', fromWho: 'groom' },
  { id: 'g7', name: 'Iulian Micnea', fromWho: 'groom' },
  { id: 'g8', name: 'Iulian Micnea - iubita', fromWho: 'groom' },
  { id: 'g9', name: 'Ramona Ardelean', fromWho: 'groom' },
  { id: 'g10', name: 'Petrica Ardelean', fromWho: 'groom' },
  { id: 'g11', name: 'Doina Balasz', fromWho: 'groom' },
  { id: 'g12', name: 'Doina Radu - soț Radu Ilnițchi', fromWho: 'groom' },
  { id: 'g13', name: 'Paul Balasz', fromWho: 'groom' },
  { id: 'g14', name: 'Robert Balasz', fromWho: 'groom' },
  { id: 'g15', name: 'Vasi Teleptean', fromWho: 'groom' },
  { id: 'g16', name: 'Vasi Teleptean - logodnică', fromWho: 'groom' },
  { id: 'g17', name: 'Hajdu Romina', fromWho: 'groom' },
  { id: 'g18', name: 'Hajdu Istvan', fromWho: 'groom' },
  { id: 'g19', name: 'Parintele Ardelean Cornel', fromWho: 'groom' },
  { id: 'g20', name: 'Ardelean Niculina', fromWho: 'groom' },
  { id: 'g21', name: 'Haidu Romulus (Romi)', fromWho: 'groom' },
  { id: 'g22', name: 'Haidu Diana', fromWho: 'groom' },
  { id: 'g23', name: 'Haidu Luca', fromWho: 'groom' },
  { id: 'g24', name: 'Ovidiu Basanciuc', fromWho: 'groom' },
  { id: 'g25', name: 'Ovidiu Basanciuc - sotia Ramona', fromWho: 'groom' },
  { id: 'g26', name: 'Catalin Mursa', fromWho: 'groom' },
  { id: 'g27', name: 'Nevasta lu Mursa', fromWho: 'groom' },
  { id: 'g28', name: 'Spiridon Iulian Marian', fromWho: 'groom' },
  { id: 'g29', name: 'Spiridon Iulian Marian - nevasta', fromWho: 'groom' },
  { id: 'g30', name: 'Gelu Godjea', fromWho: 'groom' },
  { id: 'g31', name: 'Flavia Godjea', fromWho: 'groom' },
  {
    id: 'p100',
    name: 'Mirabela Gherasim',
  },
  {
    id: 'p101',
    name: 'Ionut a lu Mirabela',
  },
  {
    id: 'p102',
    name: 'Andreea Tarus',
  },
  {
    id: 'p103',
    name: 'Ilie a lu Andreea - Ilie Vieru',
  },
  {
    id: 'p104',
    name: 'Alexandra Ciobanu (Manolache)',
  },
  {
    id: 'p105',
    name: 'Gheorghita Ciobanu',
  },
  {
    id: 'p106',
    name: 'Daniel Rosca',
  },
  {
    id: 'p107',
    name: 'Teodora Angheluta',
  },
  {
    id: 'p108',
    name: 'George Vranceanu',
  },
  {
    id: 'p109',
    name: 'Iubita lu George',
  },
  {
    id: 'p110',
    name: 'Bogdan Iacob',
  },
  {
    id: 'p111',
    name: 'Partenera lu Bogdan Iacob',
  },
  {
    id: 'p112',
    name: 'Acatrinei Doina',
  },
  {
    id: 'p113',
    name: 'Acatrinei Doru',
  },
  {
    id: 'p114',
    name: 'Lipovanu Dorin',
  },
  {
    id: 'p115',
    name: 'Lipovanu Iustin copil',
  },
  {
    id: 'p116',
    name: 'Lipovanu Cristina',
  },
  {
    id: 'p117',
    name: 'Coca Martin - nume adev: Iuliana Constantiniu',
  },
  {
    id: 'p118',
    name: 'Sotul Cocai - nume adev Tudor Constantiniu',
  },
  {
    id: 'p119',
    name: 'Sulugiuc Roxana',
  },
  {
    id: 'p120',
    name: 'Sulugiuc Dragos',
  },
  {
    id: 'p121',
    name: 'Valerica Lucan',
  },
  {
    id: 'p122',
    name: 'iubitu lu valerica Costel Cilof',
  },
  {
    id: 'p123',
    name: 'Gelu Calin',
  },
  {
    id: 'p124',
    name: 'Valentina Calin',
  },
  {
    id: 'p125',
    name: 'Elena Martin',
  },
  {
    id: 'p126',
    name: 'Alexandra Lucan',
  },
  {
    id: 'p127',
    name: 'Alexandra Lucan - iubit',
  },
  {
    id: 'p128',
    name: 'Daniel Lucan',
  },
  {
    id: 'p129',
    name: 'Iubita lu Daniel Lucan',
  },
  {
    id: 'p130',
    name: 'Lucan Lenuța',
  },
  {
    id: 'p131',
    name: 'Lucan Petrisor',
  },
  {
    id: 'p132',
    name: 'Gabi Martin',
  },
  {
    id: 'p133',
    name: 'Calina Martin',
  },
  {
    id: 'p134',
    name: 'Lavinia Amarculesei',
  },
  {
    id: 'p135',
    name: 'Lavinia Amarculesei - iubit',
  },
  {
    id: 'p136',
    name: 'Iuliana Tutuianu (Axinte)',
  },
  {
    id: 'p137',
    name: 'Ovidiu Tutuianu',
  },
  {
    id: 'p138',
    name: 'Malina Ostafi',
  },
  {
    id: 'p139',
    name: 'Marius Ostafi',
  },
  {
    id: 'p140',
    name: 'Raluca Rebegia  - ex Pavel',
  },
  {
    id: 'p141',
    name: 'Alin Rebegia  - a lu Raluca',
  },
  {
    id: 'p142',
    name: 'Gabriela Mandric (Andrioaie)',
  },
  {
    id: 'p143',
    name: 'Catalin Mandric',
  },
  {
    id: 'p144',
    name: 'Alexandru Archip',
  },
  {
    id: 'p145',
    name: 'Cristina Archip',
  },
  {
    id: 'p146',
    name: 'Luca Petrica',
  },
  {
    id: 'p147',
    name: 'Luca Marinela',
  },
  {
    id: 'p148',
    name: 'Anechitoaie Cristian',
  },
  {
    id: 'p149',
    name: 'Anechitoaie Mariana',
  },
  {
    id: 'p150',
    name: 'Galbin Gheorghe',
  },
  {
    id: 'p151',
    name: 'Galbin Anisoara',
  },
  {
    id: 'p152',
    name: 'Mihaela Matase',
  },
  {
    id: 'p153',
    name: 'Puiu Matase',
  },
  {
    id: 'p154',
    name: 'Elena Palade',
  },
  {
    id: 'p155',
    name: 'Razvan Livadariu',
  },
  {
    id: 'p156',
    name: 'Cristina Esanu - nume adev Cristina Marinela Balmuș',
  },
  {
    id: 'p157',
    name: 'Sotu lu Cristina Esanu - Ionut Balmuș',
  },
  {
    id: 'p158',
    name: 'Mihaela Chelciuc',
  },
  {
    id: 'p159',
    name: 'Iubitul lui Mihaela Bogdan - aka Bogdan Agache',
  },
  {
    id: 'p160',
    name: 'Inbal Matityahu',
  },
  {
    id: 'p161',
    name: 'Andrei Roba',
  },
  {
    id: 'p162',
    name: 'Razvan Serbanescu',
  },
  {
    id: 'p163',
    name: 'Sotia lu Razvan Serbanescu',
  },
  {
    id: 'p164',
    name: 'Ana Detot',
  },
  {
    id: 'p165',
    name: 'Andrei Detot',
  },
  {
    id: 'p166',
    name: 'Iubitu lu Codruta',
  },
  {
    id: 'p167',
    name: 'Iulia Pascariuc',
  },
  {
    id: 'p168',
    name: 'Ionut Pascariuc',
  },
  {
    id: 'p169',
    name: 'Codruta Cenan',
  },
];

// Cazari hardcodate in ordine: mai intai pensiunile, apoi hotelurile
const accommodations = [
  // Mai intai pensiunile
  {
    id: 'h1',
    name: 'Pensiunea "Casa Mari" - 4 camere',
    rooms: [
      { id: 'casa-mari-double-1', name: 'Cameră Dublă 1', capacity: 2, guests: [] },
      { id: 'casa-mari-double-2', name: 'Cameră Dublă 2', capacity: 2, guests: [] },
      { id: 'casa-mari-triple-1', name: 'Cameră Triplă 1', capacity: 3, guests: [] },
      { id: 'casa-mari-triple-2', name: 'Cameră Triplă 2', capacity: 3, guests: [] },
    ],
  },
  {
    id: 'h2',
    name: 'Pensiunea "View" - 7 camere',
    rooms: [
      { id: 'view-double-1', name: 'Cameră Dublă 1', capacity: 2, guests: [] },
      { id: 'view-double-2', name: 'Cameră Dublă 2', capacity: 2, guests: [] },
      { id: 'view-double-3', name: 'Cameră Dublă 3', capacity: 2, guests: [] },
      { id: 'view-double-4', name: 'Cameră Dublă 4', capacity: 2, guests: [] },
      { id: 'view-double-5', name: 'Cameră Dublă 5', capacity: 2, guests: [] },
      { id: 'view-double-6', name: 'Cameră Dublă 6', capacity: 2, guests: [] },
      { id: 'view-double-7', name: 'Cameră Dublă 7', capacity: 2, guests: [] },
    ],
  },
  {
    id: 'h3',
    name: 'Pensiunea "Casa Făget" - 4 camere',
    rooms: [
      { id: 'faget-double-1', name: 'Cameră Dublă 1', capacity: 2, guests: [] },
      { id: 'faget-double-2', name: 'Cameră Dublă 2', capacity: 2, guests: [] },
      { id: 'faget-triple-1', name: 'Cameră Triplă 1', capacity: 3, guests: [] },
      { id: 'faget-triple-2', name: 'Cameră Triplă 2', capacity: 3, guests: [] },
    ],
  },
  // Apoi hotelurile
  {
    id: 'h4',
    name: 'Hotel "Elania Resort" - 22 camere',
    rooms: [
      { id: 'elania-double-1', name: 'Cameră Dublă 1', capacity: 2, guests: [] },
      { id: 'elania-double-2', name: 'Cameră Dublă 2', capacity: 2, guests: [] },
      { id: 'elania-double-3', name: 'Cameră Dublă 3', capacity: 2, guests: [] },
      { id: 'elania-double-4', name: 'Cameră Dublă 4', capacity: 2, guests: [] },
      { id: 'elania-double-5', name: 'Cameră Dublă 5', capacity: 2, guests: [] },
      { id: 'elania-double-6', name: 'Cameră Dublă 6', capacity: 2, guests: [] },
      { id: 'elania-double-7', name: 'Cameră Dublă 7', capacity: 2, guests: [] },
      { id: 'elania-double-8', name: 'Cameră Dublă 8', capacity: 2, guests: [] },
      { id: 'elania-double-9', name: 'Cameră Dublă 9', capacity: 2, guests: [] },
      { id: 'elania-double-10', name: 'Cameră Dublă 10', capacity: 2, guests: [] },
      { id: 'elania-double-11', name: 'Cameră Dublă 11', capacity: 2, guests: [] },
      { id: 'elania-double-12', name: 'Cameră Dublă 12', capacity: 2, guests: [] },
      { id: 'elania-double-13', name: 'Cameră Dublă 13', capacity: 2, guests: [] },
      { id: 'elania-double-14', name: 'Cameră Dublă 14', capacity: 2, guests: [] },
      { id: 'elania-double-15', name: 'Cameră Dublă 15', capacity: 2, guests: [] },
      { id: 'elania-double-16', name: 'Cameră Dublă 16', capacity: 2, guests: [] },
      { id: 'elania-double-17', name: 'Cameră Dublă 17', capacity: 2, guests: [] },
      { id: 'elania-twin-1', name: 'Camera Twin 1', capacity: 2, guests: [] },
      { id: 'elania-twin-2', name: 'Camera Twin 2', capacity: 2, guests: [] },
      { id: 'elania-twin-3', name: 'Camera Twin 3', capacity: 2, guests: [] },
      { id: 'elania-twin-4', name: 'Camera Twin 4', capacity: 2, guests: [] },
      { id: 'elania-twin-5', name: 'Camera Twin 5', capacity: 2, guests: [] },
    ],
  },
];

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: 'Montserrat', sans-serif;
`;

const Header = styled.header`
  padding: 0 32px;
  padding-top: 24px;
  font-weight: 600;
  margin-bottom: -8px;
`;

const HeaderTitle = styled.h1`
  margin: 0;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
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
  // Sort people by ID initially
  const [unassignedPeople, setUnassignedPeople] = useState([...samplePeople].sort((a, b) => a.id.localeCompare(b.id)));

  const handleAssignPerson = useCallback(
    (personId, roomId) => {
      // Find the person
      const person = unassignedPeople.find((p) => p.id === personId);
      if (!person) return;

      // Add to room
      setHotels((prev) => {
        const updatedHotels = prev.map((hotel) => {
          // Check if the room belongs to this hotel
          const roomIndex = hotel.rooms.findIndex((room) => room.id === roomId);
          if (roomIndex === -1) return hotel;

          const room = hotel.rooms[roomIndex];

          // Check if room is already at capacity
          if (room.guests.length >= room.capacity) {
            return hotel; // Don't add if room is already full
          }

          // Clone the hotel and its rooms
          const updatedHotel = { ...hotel, rooms: [...hotel.rooms] };
          // Update the specific room
          updatedHotel.rooms[roomIndex] = {
            ...updatedHotel.rooms[roomIndex],
            guests: [...updatedHotel.rooms[roomIndex].guests, person],
          };

          return updatedHotel;
        });

        // Check if any hotel was updated (guest was added to a room)
        const wasAdded = JSON.stringify(updatedHotels) !== JSON.stringify(prev);

        // Only remove from unassigned list if the person was added to a room
        if (wasAdded) {
          setUnassignedPeople((prevPeople) => prevPeople.filter((p) => p.id !== personId));
        }

        return updatedHotels;
      });
    },
    [unassignedPeople],
  );

  const handleUnassignPerson = useCallback((personId, roomId) => {
    // Find the hotel and room
    let foundPerson = null;

    setHotels((prev) =>
      prev.map((hotel) => {
        // Check if the room belongs to this hotel
        const roomIndex = hotel.rooms.findIndex((room) => room.id === roomId);
        if (roomIndex === -1) return hotel;

        // Find the person in the room
        const room = hotel.rooms[roomIndex];
        const personIndex = room.guests.findIndex((p) => p.id === personId);
        if (personIndex === -1) return hotel;

        // Save reference to the person we're removing
        foundPerson = room.guests[personIndex];

        // Clone the hotel and its rooms
        const updatedHotel = { ...hotel, rooms: [...hotel.rooms] };
        // Update the specific room to remove the person
        updatedHotel.rooms[roomIndex] = {
          ...room,
          guests: room.guests.filter((p) => p.id !== personId),
        };

        return updatedHotel;
      }),
    );

    // Add the person back to unassigned list if we found them and sort by ID
    if (foundPerson) {
      setUnassignedPeople((prev) => {
        const updatedList = [...prev, foundPerson];
        // Sort by ID (assumes IDs are alphanumeric and should be sorted alphabetically)
        return updatedList.sort((a, b) => a.id.localeCompare(b.id));
      });
    }
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <AppContainer>
        <Header>
          <HeaderTitle>Planificarea Cazării la Nuntă 💍🏡</HeaderTitle>
        </Header>
        <MainContainer>
          <PersonList people={unassignedPeople} />
          <HotelList hotels={hotels} onAssignPerson={handleAssignPerson} onUnassignPerson={handleUnassignPerson} />
        </MainContainer>
      </AppContainer>
    </DndProvider>
  );
}

export default App;
