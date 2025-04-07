import { useState, useCallback, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styled from 'styled-components';
import './App.css';
import PersonList from './components/PersonList';
import HotelList from './components/HotelList';

const invitees = [
  { id: 1, name: 'Danci Crina', fromWho: 'groom' },
  { id: 2, name: 'Danci Andrei', fromWho: 'groom' },
  { id: 3, name: 'Danci Mariana', fromWho: 'groom' },
  { id: 4, name: 'Danci Vasile', fromWho: 'groom' },
  { id: 5, name: 'Aurelia Vișovan', fromWho: 'groom' },
  { id: 6, name: 'Can Çakmur', fromWho: 'groom' },
  { id: 7, name: 'Iulian Mîcnea', fromWho: 'groom' },
  { id: 8, name: 'Diana Mîcnea', fromWho: 'groom' },
  { id: 9, name: 'Ardelean Ramona', fromWho: 'groom' },
  { id: 10, name: 'Ardelean Petrică', fromWho: 'groom' },
  { id: 11, name: 'Doina Balasz', fromWho: 'groom' },
  { id: 12, name: 'Radu Ilnițchi', fromWho: 'groom' },
  { id: 13, name: 'Paul Balasz', fromWho: 'groom' },
  { id: 14, name: 'Robert Balasz', fromWho: 'groom' },
  { id: 15, name: 'Vasi Teleptean', fromWho: 'groom' },
  { id: 16, name: 'Vasi Teleptean - logodnică', fromWho: 'groom' },
  { id: 17, name: 'Hajdu Romina', fromWho: 'groom' },
  { id: 18, name: 'Hajdu Istvan', fromWho: 'groom' },
  { id: 19, name: 'Pr. Ardelean Cornel', fromWho: 'groom' },
  { id: 20, name: 'Ardelean Niculina', fromWho: 'groom' },
  { id: 21, name: 'Haidu Romulus (Romi)', fromWho: 'groom' },
  { id: 22, name: 'Haidu Diana', fromWho: 'groom' },
  { id: 23, name: 'Haidu Luca', fromWho: 'groom' },
  { id: 24, name: 'Basanciuc Ovidiu', fromWho: 'groom' },
  { id: 25, name: 'Basanciuc Ramona', fromWho: 'groom' },
  { id: 26, name: 'Mursa Cătălin', fromWho: 'groom' },
  { id: 27, name: 'Mursa (Turcan) Valentina', fromWho: 'groom' },
  { id: 28, name: 'Spiridon Iulian', fromWho: 'groom' },
  { id: 29, name: 'Spiridon (Chifor) Ionela', fromWho: 'groom' },
  { id: 30, name: 'Gelu Godjea', fromWho: 'groom' },
  { id: 31, name: 'Flavia Godjea', fromWho: 'groom' },
  { id: 97, name: 'Timoftoaie Georgiana' },
  { id: 98, name: 'Timoftoaie Petru' },
  { id: 99, name: 'Timoftoaie Leonardo' },
  { id: 100, name: 'Mirabela Gherasim' },
  {
    id: 101,
    name: 'Carcea Ionuț',
  },
  {
    id: 102,
    name: 'Andreea Țăruș',
  },
  {
    id: 103,
    name: 'Ilie Vieru',
  },
  {
    id: 104,
    name: 'Alexandra Ciobanu (Manolache)',
  },
  {
    id: 105,
    name: 'Gheorghiță Ciobanu',
  },
  {
    id: 106,
    name: 'Daniel Roșca',
  },
  {
    id: 107,
    name: 'Teodora Angheluță',
  },
  {
    id: 108,
    name: 'George Vrânceanu',
  },
  {
    id: 109,
    name: 'Iubita lu George',
  },
  {
    id: 110,
    name: 'Bogdan Iacob',
  },
  {
    id: 111,
    name: 'Partenera lu Bogdan Iacob',
  },
  {
    id: 114,
    name: 'Lipovanu Dorin',
  },
  {
    id: 115,
    name: 'Lipovanu Iustin copil',
  },
  {
    id: 116,
    name: 'Lipovanu Cristina',
  },
  {
    id: 117,
    name: 'Iuliana Constantiniu',
    note: '"Coca Marțin"',
  },
  {
    id: 118,
    name: 'Tudor Constantiniu',
  },
  {
    id: 121,
    name: 'Valerica Lucan',
  },
  {
    id: 122,
    name: 'iubitu lu valerica Costel Cilof',
  },
  {
    id: 123,
    name: 'Gelu Calin',
  },
  {
    id: 124,
    name: 'Valentina Calin',
  },
  {
    id: 125,
    name: 'Elena Martin',
  },
  {
    id: 126,
    name: 'Alexandra Lucan',
  },
  {
    id: 127,
    name: 'Alexandra Lucan - iubit',
  },
  {
    id: 128,
    name: 'Daniel Lucan',
  },
  {
    id: 129,
    name: 'Iubita lu Daniel Lucan',
  },
  {
    id: 130,
    name: 'Lucan Lenuța',
  },
  {
    id: 131,
    name: 'Lucan Petrisor',
  },
  {
    id: 132,
    name: 'Gabi Martin',
  },
  {
    id: 133,
    name: 'Calina Martin',
  },
  {
    id: 134,
    name: 'Lavinia Amarculesei',
  },
  {
    id: 135,
    name: 'Lavinia Amarculesei - iubit',
  },
  {
    id: 136,
    name: 'Iuliana Tutuianu (Axinte)',
  },
  {
    id: 137,
    name: 'Ovidiu Tutuianu',
  },
  {
    id: 138,
    name: 'Malina Apopei',
  },
  {
    id: 139,
    name: 'Marius Apopei',
  },
  {
    id: 140,
    name: 'Raluca Rebegia  - ex Pavel',
  },
  {
    id: 141,
    name: 'Alin Rebegia  - a lu Raluca',
  },
  {
    id: 142,
    name: 'Gabriela Mandric (Andrioaie)',
  },
  {
    id: 143,
    name: 'Catalin Mandric',
  },
  {
    id: 144,
    name: 'Alexandru Archip',
  },
  {
    id: 145,
    name: 'Cristina Archip',
  },
  {
    id: 146,
    name: 'Luca Petrică',
  },
  {
    id: 147,
    name: 'Luca Marinela',
  },
  {
    id: 148,
    name: 'Anechitoaie Cristian',
  },
  {
    id: 149,
    name: 'Anechitoaie Mariana',
  },
  {
    id: 150,
    name: 'Galbin Gheorghe',
  },
  {
    id: 151,
    name: 'Galbin Anișoara',
  },
  {
    id: 152,
    name: 'Mihaela Mătase',
  },
  {
    id: 153,
    name: 'Puiu Mătase',
  },
  {
    id: 156,
    name: 'Cristina Marinela Balmuș',
    notes: 'Cristina Eșanu',
  },
  {
    id: 157,
    name: 'Ionuț Balmuș',
    notes: 'soț Cristina Eșanu',
  },
  {
    id: 158,
    name: 'Mihaela Chelciuc',
  },
  {
    id: 159,
    name: 'Iubitul lui Mihaela Chelciuc - aka Bogdan',
  },
];

// Cazari hardcodate in ordine: mai intai pensiunile, apoi hotelurile
const accommodations = [
  // Mai intai pensiunile
  {
    id: 1,
    name: 'Pensiunea "Casa Mari"',
    rooms: [
      { id: 'casa-mari-double-1', name: 'Cameră Dublă 1', capacity: 2, guests: [] },
      { id: 'casa-mari-double-2', name: 'Cameră Dublă 2', capacity: 2, guests: [] },
      { id: 'casa-mari-triple-1', name: 'Cameră Triplă 1', capacity: 3, guests: [] },
      { id: 'casa-mari-triple-2', name: 'Cameră Triplă 2', capacity: 3, guests: [] },
    ],
  },
  {
    id: 2,
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
    id: 3,
    name: 'Pensiunea "Casa Făget"',
    rooms: [
      { id: 'faget-double-1', name: 'Cameră Dublă 1', capacity: 2, guests: [] },
      { id: 'faget-double-2', name: 'Cameră Dublă 2', capacity: 2, guests: [] },
      { id: 'faget-triple-1', name: 'Cameră Triplă 1', capacity: 3, guests: [] },
      { id: 'faget-triple-2', name: 'Cameră Triplă 2', capacity: 3, guests: [] },
    ],
  },
  // Apoi hotelurile
  {
    id: 4,
    name: 'Hotel "Elitis"',
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
  color: #fff;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const SearchContainer = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: 16px;
`;

const SearchInput = styled.input`
  padding: 10px 16px;
  border-radius: 20px;
  border: 1px solid #e0e6f0;
  font-family: 'Montserrat', sans-serif;
  min-width: 250px;
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: #ffbd59;
    box-shadow: 0 0 0 2px rgba(255, 189, 89, 0.2);
  }
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
  // Load saved state from localStorage or use defaults
  const loadSavedState = () => {
    try {
      // Try to load saved guest-to-room assignments
      const savedGuestRoomMappings = localStorage.getItem('guestRoomMappings');

      if (savedGuestRoomMappings) {
        // Parse the saved guest-to-room mappings
        const guestRoomMappings = JSON.parse(savedGuestRoomMappings);

        // Create a set of assigned guest IDs for quick lookup
        const assignedGuestIds = new Set();
        guestRoomMappings.forEach((mapping) => {
          assignedGuestIds.add(mapping.guestId);
        });

        // Start with the default accommodations structure
        const hotelsWithSavedGuests = accommodations.map((hotel) => {
          // Create a deep copy of the hotel
          const hotelCopy = { ...hotel, rooms: [...hotel.rooms] };

          // For each room in the hotel, find and apply saved guest assignments
          hotelCopy.rooms = hotelCopy.rooms.map((room) => {
            // Find all guest mappings for this room
            const roomMappings = guestRoomMappings.filter((mapping) => mapping.roomId === room.id);

            if (roomMappings.length > 0) {
              // For each mapping, find the guest in the invitees array
              const guests = roomMappings
                .map((mapping) => {
                  // Find the guest in the invitees array by ID
                  const guest = invitees.find((person) => person.id === mapping.guestId);

                  // If found in invitees, use that; if not, try to use the saved name (for redundancy)
                  if (guest) {
                    return guest;
                  } else if (mapping.guestName) {
                    // Create minimal guest object with the saved name if the original isn't found
                    console.warn(`Guest ID ${mapping.guestId} not found in invitees array, using saved name`);
                    return {
                      id: mapping.guestId,
                      name: mapping.guestName,
                      fromWho: mapping.fromWho || undefined,
                    };
                  }
                  return null;
                })
                .filter((guest) => guest !== null); // Filter out any null guests

              return {
                ...room,
                guests: guests,
              };
            } else {
              return { ...room, guests: [] };
            }
          });

          return hotelCopy;
        });

        // Calculate unassigned people as all invitees not in assignedGuestIds
        const unassignedPeople = invitees.filter((person) => !assignedGuestIds.has(person.id)).sort((a, b) => a.id - b.id);

        return {
          hotels: hotelsWithSavedGuests,
          unassignedPeople: unassignedPeople,
        };
      }
    } catch (err) {
      console.error('Error loading saved state:', err);
    }

    // Return default state if no saved state or error
    return {
      hotels: accommodations,
      unassignedPeople: [...invitees].sort((a, b) => a.id - b.id),
    };
  };

  // Initialize state from localStorage or defaults
  const initialState = loadSavedState();
  const [hotels, setHotels] = useState(initialState.hotels);
  const [unassignedPeople, setUnassignedPeople] = useState(initialState.unassignedPeople);
  const [searchTerm, setSearchTerm] = useState('');
  const [foundPerson, setFoundPerson] = useState(null);

  const handleAssignPerson = useCallback(
    (personId, roomId) => {
      // First, check if person is in unassigned list
      const unassignedPerson = unassignedPeople.find((p) => p.id === personId);

      // If the person is from the unassigned list
      if (unassignedPerson) {
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
              guests: [...updatedHotel.rooms[roomIndex].guests, unassignedPerson],
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
        return;
      }

      // If we get here, person is not in unassigned list
      // The Room component should handle the unassign-and-reassign flow for room-to-room transfers
      // This is a safety fallback only

      // Find the person in an existing room
      let personInRoom = null;
      let sourceRoomId = null;

      // Look through all hotels and rooms to find the person
      const hotelsClone = [...hotels];
      for (const hotel of hotelsClone) {
        for (const room of hotel.rooms) {
          const foundPerson = room.guests.find((p) => p.id === personId);
          if (foundPerson) {
            personInRoom = foundPerson;
            sourceRoomId = room.id;
            break;
          }
        }
        if (personInRoom) break;
      }

      if (personInRoom && sourceRoomId && sourceRoomId !== roomId) {
        // The logic for room-to-room moves is now handled in the Room component's drop handler
        // This is a fallback that shouldn't normally be needed
        console.log('Room-to-room move via handleAssignPerson fallback');
      }
    },
    [unassignedPeople, hotels],
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
        return updatedList.sort((a, b) => a.id - b.id);
      });
    }
  }, []);

  // Setup event listeners for custom events
  useEffect(() => {
    // Event handler for moving from room to unassigned list
    const handleUnassignEvent = (event) => {
      const { personId, roomId } = event.detail;
      handleUnassignPerson(personId, roomId);
    };

    // Event handler for room-to-room transfers
    const handleRoomToRoomTransfer = (event) => {
      const { personId, fromRoomId, toRoomId } = event.detail;

      // Find the person in the source room
      let foundPerson = null;

      // Look through all hotels and rooms to find the person
      for (const hotel of hotels) {
        for (const room of hotel.rooms) {
          if (room.id === fromRoomId) {
            const person = room.guests.find((p) => p.id === personId);
            if (person) {
              foundPerson = { ...person };
              break;
            }
          }
        }
        if (foundPerson) break;
      }

      if (foundPerson) {
        // Perform the room-to-room transfer
        setHotels((prev) => {
          // Clone the hotels
          const updatedHotels = JSON.parse(JSON.stringify(prev));

          // Step 1: Remove from source room
          for (const hotel of updatedHotels) {
            for (let i = 0; i < hotel.rooms.length; i++) {
              if (hotel.rooms[i].id === fromRoomId) {
                hotel.rooms[i].guests = hotel.rooms[i].guests.filter((g) => g.id !== personId);
              }
            }
          }

          // Step 2: Add to destination room
          for (const hotel of updatedHotels) {
            for (let i = 0; i < hotel.rooms.length; i++) {
              if (hotel.rooms[i].id === toRoomId) {
                // Only add if room is not at capacity
                if (hotel.rooms[i].guests.length < hotel.rooms[i].capacity) {
                  hotel.rooms[i].guests.push(foundPerson);
                }
              }
            }
          }

          return updatedHotels;
        });
      }
    };

    window.addEventListener('unassign-person', handleUnassignEvent);
    window.addEventListener('room-to-room-transfer', handleRoomToRoomTransfer);

    // Cleanup
    return () => {
      window.removeEventListener('unassign-person', handleUnassignEvent);
      window.removeEventListener('room-to-room-transfer', handleRoomToRoomTransfer);
    };
  }, [handleUnassignPerson, hotels]);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    try {
      // Create a flat array of guest-to-room mappings with minimum needed info
      const guestRoomMappings = [];

      // Extract all guest->room assignments from hotels
      hotels.forEach((hotel) => {
        hotel.rooms.forEach((room) => {
          // For each guest in the room, create a mapping entry
          room.guests.forEach((guest) => {
            guestRoomMappings.push({
              guestId: guest.id,
              guestName: guest.name, // Save name for redundancy
              fromWho: guest.fromWho, // Save additional info for redundancy
              roomId: room.id,
            });
          });
        });
      });

      // Save only the mapping between guests and rooms, with basic guest info for redundancy
      localStorage.setItem('guestRoomMappings', JSON.stringify(guestRoomMappings));
      console.log('Guest-room mappings saved to localStorage');
    } catch (err) {
      console.error('Error saving state to localStorage:', err);
    }
  }, [hotels, unassignedPeople]);

  // Search for people function
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === '') {
      setFoundPerson(null);
      return;
    }

    // Search in all people (both unassigned and in rooms)
    const lowerTerm = term.toLowerCase();

    // First search in unassigned people
    const foundInUnassigned = unassignedPeople.find((person) => person.name.toLowerCase().includes(lowerTerm));

    if (foundInUnassigned) {
      setFoundPerson({
        person: foundInUnassigned,
        location: 'unassigned',
      });
      return;
    }

    // Then search in assigned people
    for (const hotel of hotels) {
      for (const room of hotel.rooms) {
        const foundInRoom = room.guests.find((person) => person.name.toLowerCase().includes(lowerTerm));

        if (foundInRoom) {
          setFoundPerson({
            person: foundInRoom,
            location: 'assigned',
            hotelName: hotel.name,
            roomName: room.name,
            roomId: room.id,
          });
          return;
        }
      }
    }

    // If no match found
    setFoundPerson(null);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <AppContainer>
        <Header>
          <HeaderContainer>
            <HeaderTitle>Planificarea Cazării la Nuntă 💍🏡</HeaderTitle>
            <SearchContainer>
              <SearchInput type="text" placeholder="Caută persoană..." value={searchTerm} onChange={handleSearch} />
            </SearchContainer>
          </HeaderContainer>
        </Header>
        <MainContainer>
          <PersonList people={unassignedPeople} searchTerm={searchTerm} foundPerson={foundPerson} />
          <HotelList
            hotels={hotels}
            onAssignPerson={handleAssignPerson}
            onUnassignPerson={handleUnassignPerson}
            searchTerm={searchTerm}
            foundPerson={foundPerson}
          />
        </MainContainer>
      </AppContainer>
    </DndProvider>
  );
}

export default App;
